// Shared Solana RPC connection for CBS-GO (reads, sends, token overview).

import { Connection, clusterApiUrl } from '@solana/web3.js';

function uniqueUrls(urls) {
  const seen = new Set();
  const out = [];
  for (const raw of urls) {
    const url = String(raw || '').trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

export function getSolanaRpcCandidates() {
  return uniqueUrls([
    import.meta.env.VITE_SOLANA_RPC_URL,
    import.meta.env.VITE_SOLANA_RPC,
    'https://rpc.ankr.com/solana',
    clusterApiUrl('mainnet-beta'),
  ]);
}

export const SOLANA_RPC_URL = getSolanaRpcCandidates()[0] || clusterApiUrl('mainnet-beta');

let _connection = null;
let _connectionUrl = '';

export function getSolanaConnection(url = SOLANA_RPC_URL) {
  const target = url || SOLANA_RPC_URL;
  if (!_connection || _connectionUrl !== target) {
    _connection = new Connection(target, 'confirmed');
    _connectionUrl = target;
  }
  return _connection;
}

function isRpcFailure(err) {
  const msg = String(err?.message || err || '').toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('network') ||
    msg.includes('cors') ||
    msg.includes('403') ||
    msg.includes('429') ||
    msg.includes('timeout') ||
    msg.includes('blockhash') ||
    msg.includes('fetch')
  );
}

/**
 * Run a Solana RPC operation with fallback endpoints (browser/CORS friendly).
 * @template T
 * @param {(connection: Connection, rpcUrl: string) => Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function withSolanaRpc(fn) {
  const candidates = getSolanaRpcCandidates();
  let lastError = null;

  for (const url of candidates) {
    try {
      const connection = getSolanaConnection(url);
      return await fn(connection, url);
    } catch (err) {
      lastError = err;
      console.warn('[CBSGO RPC] request failed', url, err?.message || err);
      if (!isRpcFailure(err)) {
        throw err;
      }
    }
  }

  const err = new Error('RPC unavailable');
  err.cause = lastError;
  err.code = 'RPC_UNAVAILABLE';
  throw err;
}
