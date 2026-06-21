/**
 * Vercel serverless proxy for Solana JSON-RPC.
 * Keeps HELIUS_RPC_URL server-side (never exposed to the browser).
 *
 * Set on Vercel (Project → Settings → Environment Variables):
 *   HELIUS_RPC_URL = https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
 *
 * Redeploy after adding/changing env vars.
 */

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function getRequestBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') return req.body;
    return JSON.stringify(req.body);
  }
  const raw = await readRawBody(req);
  return raw || '{}';
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      jsonrpc: '2.0',
      error: { code: -32600, message: 'Method not allowed' },
      id: null,
    });
    return;
  }

  const upstream = process.env.HELIUS_RPC_URL || process.env.SOLANA_RPC_URL || '';

  if (!upstream) {
    console.error('[api/rpc] HELIUS_RPC_URL is not configured');
    res.status(503).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'RPC proxy not configured (set HELIUS_RPC_URL on Vercel)',
      },
      id: null,
    });
    return;
  }

  try {
    const body = await getRequestBody(req);
    const response = await fetch(upstream, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const text = await response.text();
    res.status(response.status);
    res.setHeader('Content-Type', 'application/json');
    res.end(text);
  } catch (err) {
    console.error('[api/rpc] upstream fetch failed', err?.message || err);
    res.status(502).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'RPC proxy failed' },
      id: null,
    });
  }
}
