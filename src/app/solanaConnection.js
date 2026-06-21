// Shared Solana RPC connection for CBS-GO (reads, sends, token overview).

import { Connection, clusterApiUrl } from '@solana/web3.js';

export const SOLANA_RPC_URL =
  import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');

let _connection = null;

export function getSolanaConnection() {
  if (!_connection) {
    _connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  }
  return _connection;
}
