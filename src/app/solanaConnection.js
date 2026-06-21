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

/** Absolute same-origin proxy URL (works on custom domain + avoids relative-path quirks). */
export function resolveRpcProxyUrl() {
  if (typeof window === 'undefined') return RPC_PROXY_PATH;
  try {
    return new URL(RPC_PROXY_PATH, window.location.origin).href;
  } catch {
    return RPC_PROXY_PATH;
  }
}

function isProxyUrl(url) {
  const s = String(url || '');
  return s.endsWith('/api/rpc') || s.includes('/api/rpc?');
}

/** Safe label for logs — never prints API keys or full URLs with secrets. */
export function describeRpcSource(url) {
  if (!url) return 'unknown';

  if (isProxyUrl(url)) {
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

/** User-facing wallet panel message from RPC/proxy errors. */
export function userFacingRpcError(err) {
  const code = String(err?.code || '');
  const status = Number(err?.status || 0);
  const msg = String(err?.message || err || '').toLowerCase();

  if (code === 'RPC_HELIUS_MISSING' || (status === 503 && msg.includes('helius'))) {
    return 'Helius env missing';
  }
  if (code === 'RPC_PROXY_UNAVAILABLE' || status === 404) {
    return 'RPC proxy unavailable';
  }
  if (code === 'RPC_UNAVAILABLE') {
    return 'RPC unavailable';
  }
  if (
    code === 'RPC_REQUEST_FAILED' ||
    status >= 400 ||
    msg.includes('rpc request failed') ||
    msg.includes('rpc proxy failed')
  ) {
    return 'RPC request failed';
  }
  if (msg.includes('failed to fetch') || msg.includes('network')) {
    return 'RPC request failed';
  }
  return '';
}

/**
 * Log which RPC sources are available (no secrets).
 * VITE_* values are baked in at build time — redeploy Vercel after changing them.
 */
export function logRpcEnvDiagnostics() {
  const candidates = getSolanaRpcCandidates();
  const proxyUrl = resolveRpcProxyUrl();
  console.info('[CBSGO RPC] diagnostics', {
    prod: import.meta.env.PROD,
    origin: typeof window !== 'undefined' ? window.location.origin : 'ssr',
    proxyUrl,
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
    candidates.push(resolveRpcProxyUrl());
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

async function readRpcErrorDetail(response) {
  try {
    const text = await response.clone().text();
    const parsed = JSON.parse(text);
    return String(parsed?.error?.message || parsed?.message || '').trim();
  } catch {
    return '';
  }
}

/** Wrap fetch so /api/rpc HTTP failures log status and fall back cleanly. */
function createInstrumentedFetch(rpcUrl) {
  const proxy = isProxyUrl(rpcUrl);

  return async function instrumentedFetch(input, init) {
    let response;
    try {
      response = await fetch(input, init);
    } catch (err) {
      if (proxy) {
        console.warn('[CBSGO RPC] /api/rpc network error', err?.message || err);
      }
      throw err;
    }

    if (proxy && !response.ok) {
      const detail = await readRpcErrorDetail(response);
      console.warn('[CBSGO RPC] /api/rpc HTTP', response.status, detail || response.statusText);

      if (response.status === 503 && /helius|not configured/i.test(detail)) {
        const err = new Error('Helius env missing');
        err.code = 'RPC_HELIUS_MISSING';
        err.status = response.status;
        throw err;
      }
      if (response.status === 404 || response.status === 405) {
        const err = new Error('RPC proxy unavailable');
        err.code = 'RPC_PROXY_UNAVAILABLE';
        err.status = response.status;
        throw err;
      }

      const err = new Error('RPC request failed');
      err.code = 'RPC_REQUEST_FAILED';
      err.status = response.status;
      throw err;
    }

    return response;
  };
}

export function getSolanaConnection(url = SOLANA_RPC_URL) {
  const target = url || SOLANA_RPC_URL;
  if (!_connection || _connectionUrl !== target) {
    _connection = new Connection(target, {
      commitment: 'confirmed',
      fetch: createInstrumentedFetch(target),
    });
    _connectionUrl = target;
  }
  return _connection;
}

/** Clear cached connection so Refresh balance retries from a clean state. */
export function resetSolanaConnectionCache() {
  _connection = null;
  _connectionUrl = '';
}

function isRpcFailure(err) {
  const msg = String(err?.message || err || '').toLowerCase();
  const code = String(err?.code || '');

  if (
    code === 'RPC_HELIUS_MISSING' ||
    code === 'RPC_PROXY_UNAVAILABLE' ||
    code === 'RPC_REQUEST_FAILED' ||
    code === 'RPC_UNAVAILABLE'
  ) {
    return true;
  }

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
    msg.includes('rpc unavailable') ||
    msg.includes('rpc request failed') ||
    msg.includes('helius env missing') ||
    msg.includes('unexpected token') ||
    msg.includes('not valid json') ||
    msg.includes('json') ||
    msg.includes('502') ||
    msg.includes('503') ||
    msg.includes('504')
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
      resetSolanaConnectionCache();
      const connection = getSolanaConnection(url);
      const result = await fn(connection, url);
      console.info('[CBSGO RPC] success', source);
      return result;
    } catch (err) {
      lastError = err;
      const status = err?.status ? ` HTTP ${err.status}` : '';
      console.warn('[CBSGO RPC] failed', source + status, err?.message || err);
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
