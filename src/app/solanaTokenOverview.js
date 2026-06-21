// src/app/solanaTokenOverview.js
// Haalt SOL + SPL token balances op voor een owner (local Solana wallet).

import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { getSolanaConnection } from './solanaConnection.js';

// Bekende mints mooi weergeven (symbol + name)
const KNOWN_MINTS = {
  // CBS Coin
  'B9z8cEWFmc7LvQtjKsaLoKqW5MJmGRCWqs1DPKupCfkk': {
    symbol: 'CBS',
    name: 'CBS Coin',
  },
  // BONK (let op: juiste mint + BONK heeft 5 decimals, komt van chain)
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
    symbol: 'BONK',
    name: 'BONK',
  },
  // USDC (optioneel, nice to have)
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    symbol: 'USDC',
    name: 'USD Coin',
  },
};

// Kleine helper om netjes te formatteren
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
    return [];
  }
}

/**
 * Haal on-chain balances op voor een owner
 * @param {string} ownerAddress - base58 public key
 * @returns {Promise<{ sol:number, tokens:Array<{mint,symbol,name,decimals,uiAmount,uiAmountStr}> }>}
 */
export async function fetchTokenOverview(ownerAddress) {
  if (!ownerAddress) {
    throw new Error('Missing owner address');
  }

  let owner;
  try {
    owner = new PublicKey(ownerAddress);
  } catch {
    throw new Error('Invalid wallet address');
  }

  const connection = getSolanaConnection();

  const [lamports, legacyAccounts, token2022Accounts] = await Promise.all([
    connection.getBalance(owner, 'confirmed'),
    fetchParsedTokenAccounts(connection, owner, TOKEN_PROGRAM_ID),
    fetchParsedTokenAccounts(connection, owner, TOKEN_2022_PROGRAM_ID),
  ]);

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

  return { sol, tokens };
}
