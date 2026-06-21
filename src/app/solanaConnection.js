// Shared Solana RPC connection for CBS-GO (reads, sends, token overview).

import { Connection, clusterApiUrl } from '@solana/web3.js';

const RPC_PROXY_PATH = '/api/rpc';

function envSet(name) {
  const v = import.meta.env[name];
  return !!(v && String(v).trim());
}

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

/** Safe label for logs — never prints API keys or full URLs with secrets. */
export function describeRpcSource(url) {
  if (!url) return 'unknown';

  if (url === RPC_PROXY_PATH || url.endsWith('/api/rpc')) {
    return 'same-origin /api/rpc proxy';
  }

  if (envSet('VITE_SOLANA_RPC_URL') && url === String(import.meta.env.VITE_SOLANA_RPC_URL).trim()) {
    return 'VITE_SOLANA_RPC_URL (build-time, direct)';
  }

  if (envSet('VITE_SOLANA_RPC') && url === String(import.meta.env.VITE_SOLANA_RPC).trim()) {
    return 'VITE_SOLANA_RPC (build-time, direct)';
  }

  if (url.includes('ankr.com')) return 'Ankr public fallback';

  try {
    const host = new URL(url).hostname;
    if (host.includes('mainnet-beta.solana.com')) return 'Solana public fallback';
    return `${host} (direct)`;
  } catch {
    return 'direct RPC';
  }
}

/**
 * Log which RPC sources are available (no secrets).
 * VITE_* values are baked in at build time — redeploy Vercel after changing them.
 */
export function logRpcEnvDiagnostics() {
  const candidates = getSolanaRpcCandidates();
  console.info('[CBSGO RPC] diagnostics', {
    prod: import.meta.env.PROD,
    VITE_SOLANA_RPC_URL: envSet('VITE_SOLANA_RPC_URL') ? 'set at build' : 'missing at build',
    VITE_SOLANA_RPC: envSet('VITE_SOLANA_RPC') ? 'set at build' : 'missing at build',
    candidateOrder: candidates.map(describeRpcSource),
    note: 'HELIUS_RPC_URL is server-only via /api/rpc (not visible in browser bundle)',
  });
}

export function getSolanaRpcCandidates() {
  const candidates = [];

  // Production web: prefer same-origin proxy (avoids Helius/browser CORS).
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    candidates.push(RPC_PROXY_PATH);
  }

  candidates.push(
    import.meta.env.VITE_SOLANA_RPC_URL,
    import.meta.env.VITE_SOLANA_RPC,
    'https://rpc.ankr.com/solana',
    clusterApiUrl('mainnet-beta'),
  );

  return uniqueUrls(candidates);
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
    msg.includes('401') ||
    msg.includes('429') ||
    msg.includes('timeout') ||
    msg.includes('blockhash') ||
    msg.includes('fetch') ||
    msg.includes('rpc proxy') ||
    msg.includes('rpc unavailable')
  );
}

/**
 * Run a Solana RPC operation with fallback endpoints.
 * @template T
 * @param {(connection: Connection, rpcUrl: string) => Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function withSolanaRpc(fn) {
  const candidates = getSolanaRpcCandidates();
  let lastError = null;

  for (const url of candidates) {
    const source = describeRpcSource(url);
    try {
      console.info('[CBSGO RPC] trying', source);
      const connection = getSolanaConnection(url);
      const result = await fn(connection, url);
      console.info('[CBSGO RPC] success', source);
      return result;
    } catch (err) {
      lastError = err;
      console.warn('[CBSGO RPC] failed', source, err?.message || err);
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
