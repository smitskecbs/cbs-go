// src/app/solanaTokenOverview.js
// Haalt SOL + SPL token balances op voor een owner (local Solana wallet).

import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { withSolanaRpc } from './solanaConnection.js';

const KNOWN_MINTS = {
  'B9z8cEWFmc7LvQtjKsaLoKqW5MJmGRCWqs1DPKupCfkk': {
    symbol: 'CBS',
    name: 'CBS Coin',
  },
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
    symbol: 'BONK',
    name: 'BONK',
  },
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    symbol: 'USDC',
    name: 'USD Coin',
  },
};

function formatAmount(uiAmount, decimals) {
  if (!Number.isFinite(uiAmount)) return '0';
  const maxFrac = decimals > 0 ? Math.min(decimals, 6) : 0;
  return uiAmount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFrac,
  });
}

function parseTokenUiAmount(amountInfo) {
  if (!amountInfo) return { uiAmount: 0, decimals: 0, uiAmountStr: '0' };

  const decimals = Number(amountInfo.decimals || 0);
  let uiAmount = Number(amountInfo.uiAmount);

  if (!Number.isFinite(uiAmount) && amountInfo.uiAmountString != null) {
    uiAmount = Number(amountInfo.uiAmountString);
  }

  if (!Number.isFinite(uiAmount) && amountInfo.amount != null) {
    const raw = Number(amountInfo.amount);
    if (Number.isFinite(raw)) {
      uiAmount = raw / 10 ** decimals;
    }
  }

  if (!Number.isFinite(uiAmount)) uiAmount = 0;

  const uiAmountStr =
    amountInfo.uiAmountString != null && String(amountInfo.uiAmountString).trim()
      ? String(amountInfo.uiAmountString)
      : formatAmount(uiAmount, decimals);

  return { uiAmount, decimals, uiAmountStr };
}

async function fetchParsedTokenAccounts(connection, owner, programId) {
  try {
    const res = await connection.getParsedTokenAccountsByOwner(owner, { programId });
    return res?.value || [];
  } catch (err) {
    console.warn('CBS GO: getParsedTokenAccountsByOwner failed', programId?.toBase58?.(), err);
    throw err;
  }
}

function classifyWalletError(err) {
  const msg = String(err?.message || err || '').toLowerCase();
  const code = String(err?.code || '');

  if (code === 'RPC_UNAVAILABLE' || msg.includes('rpc unavailable') || msg.includes('failed to fetch')) {
    const e = new Error('RPC unavailable');
    e.code = 'RPC_UNAVAILABLE';
    return e;
  }
  if (msg.includes('missing owner') || msg.includes('invalid wallet')) {
    const e = new Error('Wallet public key missing');
    e.code = 'NO_WALLET';
    return e;
  }
  if (msg.includes('parse token') || msg.includes('parsed')) {
    const e = new Error('Token account parsing failed');
    e.code = 'PARSE_FAILED';
    return e;
  }
  return err instanceof Error ? err : new Error(String(err || 'Could not load wallet balances'));
}

/**
 * @param {string} ownerAddress
 * @returns {Promise<{ sol:number, tokens:Array, rpcUrl?:string }>}
 */
export async function fetchTokenOverview(ownerAddress) {
  if (!ownerAddress) {
    const e = new Error('Wallet public key missing');
    e.code = 'NO_WALLET';
    throw e;
  }

  let owner;
  try {
    owner = new PublicKey(ownerAddress);
  } catch {
    const e = new Error('Wallet public key missing');
    e.code = 'NO_WALLET';
    throw e;
  }

  try {
    return await withSolanaRpc(async (connection, rpcUrl) => {
      let lamports = 0;
      let legacyAccounts = [];
      let token2022Accounts = [];

      try {
        lamports = await connection.getBalance(owner, 'confirmed');
      } catch (err) {
        console.warn('[CBSGO wallet] SOL balance failed', err?.message || err);
        throw classifyWalletError(err);
      }

      try {
        [legacyAccounts, token2022Accounts] = await Promise.all([
          fetchParsedTokenAccounts(connection, owner, TOKEN_PROGRAM_ID),
          fetchParsedTokenAccounts(connection, owner, TOKEN_2022_PROGRAM_ID),
        ]);
      } catch (err) {
        console.warn('[CBSGO wallet] SPL accounts failed', err?.message || err);
        const wrapped = classifyWalletError(err);
        wrapped.code = wrapped.code || 'PARSE_FAILED';
        throw wrapped;
      }

      const sol = lamports / LAMPORTS_PER_SOL;
      const byMint = new Map();

      for (const { account } of [...legacyAccounts, ...token2022Accounts]) {
        try {
          const parsed = account?.data?.parsed?.info;
          if (!parsed) continue;

          const mint = parsed.mint;
          const amountInfo = parsed.tokenAmount;
          if (!mint || !amountInfo) continue;

          const { uiAmount, decimals } = parseTokenUiAmount(amountInfo);
          if (!Number.isFinite(uiAmount) || uiAmount <= 0) continue;

          const existing = byMint.get(mint) || { mint, uiAmount: 0, decimals };
          existing.uiAmount += uiAmount;
          existing.decimals = decimals;
          byMint.set(mint, existing);
        } catch (err) {
          console.warn('CBS GO: parse token account failed', err);
        }
      }

      const tokens = Array.from(byMint.values())
        .sort((a, b) => b.uiAmount - a.uiAmount)
        .map((t) => {
          const meta = KNOWN_MINTS[t.mint] || {};
          const symbol = meta.symbol || t.mint.slice(0, 4);
          const name = meta.name || 'SPL Token';
          const uiAmountStr = formatAmount(t.uiAmount, t.decimals);

          return {
            mint: t.mint,
            symbol,
            name,
            decimals: t.decimals,
            uiAmount: t.uiAmount,
            uiAmountStr,
          };
        });

      return { sol, tokens, rpcUrl };
    });
  } catch (err) {
    throw classifyWalletError(err);
  }
}
