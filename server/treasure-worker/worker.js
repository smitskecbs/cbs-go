import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import {
  getOrCreateAssociatedTokenAccount,
  createTransferCheckedInstruction,
} from '@solana/spl-token'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// --------------------
// Paths
// --------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const keypairPath = path.resolve(__dirname, process.env.TREASURE_KEYPAIR_PATH || '')

// --------------------
// Load keypair safely
// --------------------
if (!keypairPath || !fs.existsSync(keypairPath)) {
  console.error('❌ Treasure keypair not found:', keypairPath || '(missing TREASURE_KEYPAIR_PATH)')
  process.exit(1)
}

const secret = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'))
const treasureWallet = Keypair.fromSecretKey(new Uint8Array(secret))
console.log('✅ Treasure wallet loaded:', treasureWallet.publicKey.toBase58())

// --------------------
// Config
// --------------------
const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com'
const connection = new Connection(RPC_URL, 'confirmed')

// CBS + BONK config
const CBS_MINT = new PublicKey('B9z8cEWFmc7LvQtjKsaLoKqW5MJmGRCWqs1DPKupCfkk')
const CBS_DECIMALS = 9

const BONK_MINT = new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263')
const BONK_DECIMALS = 5

// --------------------
// Supabase
// --------------------
if (!process.env.SUPABASE_URL) {
  console.error('❌ Missing SUPABASE_URL in .env')
  process.exit(1)
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// --------------------
// Helpers
// --------------------
const SLEEP_MS = Number(process.env.WORKER_POLL_MS || 2000)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function toNumberSafe(v) {
  const n = Number(v ?? 0)
  return Number.isFinite(n) ? n : 0
}

function short(addr) {
  const s = String(addr || '')
  return s.length > 10 ? `${s.slice(0, 4)}…${s.slice(-4)}` : s
}

function isLikelySolanaPubkey(s) {
  const v = String(s || '').trim()
  return v.length >= 32 && v.length <= 44
}

async function testConnection() {
  const bal = await connection.getBalance(treasureWallet.publicKey)
  console.log('💰 SOL balance:', bal / 1e9, 'SOL')
}

async function testSupabase() {
  const { error } = await supabase.from('treasures').select('id').limit(1)
  if (error) console.error('❌ Supabase connection failed:', error.message)
  else console.log('✅ Supabase connected')
}

// --------------------
// DB queries
// --------------------
async function fetchNextProcessingTreasure() {
  const { data, error } = await supabase
    .from('treasures')
    .select('*')
    .eq('status', 'processing')
    .not('claimant_wallet', 'is', null)
    .is('paid_at', null)
    .order('claimed_at', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(1)

  if (error) throw new Error(error.message)
  return data && data[0] ? data[0] : null
}

async function markTreasurePaid(id, patch = {}) {
  const { error } = await supabase
    .from('treasures')
    .update({
      status: 'paid',
      updated_at: new Date().toISOString(),
      paid_at: new Date().toISOString(),
      ...patch,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

async function markTreasureFailed(id, reasonText = '') {
  const base = {
    status: 'failed',
    updated_at: new Date().toISOString(),
  }

  // probeer eerst fail_reason te schrijven
  const { error: error1 } = await supabase
    .from('treasures')
    .update({
      ...base,
      fail_reason: String(reasonText || ''),
    })
    .eq('id', id)

  if (!error1) return

  // fallback zonder fail_reason kolom
  const { error: error2 } = await supabase.from('treasures').update(base).eq('id', id)
  if (error2) throw new Error(error2.message)
}

// --------------------
// Payments
// --------------------
async function paySol(toAddress, amountSol) {
  const lamports = Math.round(Number(amountSol) * 1e9)
  if (!lamports || lamports <= 0) return null

  const to = new PublicKey(toAddress)
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: treasureWallet.publicKey,
      toPubkey: to,
      lamports,
    })
  )

  const sig = await sendAndConfirmTransaction(connection, tx, [treasureWallet], {
    commitment: 'confirmed',
  })
  return sig
}

async function paySpl({ mint, decimals, toAddress, amountTokens }) {
  const amt = Number(amountTokens)
  if (!amt || amt <= 0) return null

  const to = new PublicKey(toAddress)

  const fromAta = await getOrCreateAssociatedTokenAccount(
    connection,
    treasureWallet,
    mint,
    treasureWallet.publicKey
  )

  const toAta = await getOrCreateAssociatedTokenAccount(
    connection,
    treasureWallet,
    mint,
    to
  )

  const rawNumber = Math.round(amt * 10 ** decimals)
  const raw = BigInt(rawNumber)

  const ix = createTransferCheckedInstruction(
    fromAta.address,
    mint,
    toAta.address,
    treasureWallet.publicKey,
    raw,
    decimals
  )

  const tx = new Transaction().add(ix)
  const sig = await sendAndConfirmTransaction(connection, tx, [treasureWallet], {
    commitment: 'confirmed',
  })
  return sig
}

// --------------------
// Worker cycle
// --------------------
async function runOnce() {
  const t = await fetchNextProcessingTreasure()
  if (!t) return

  const id = t.id
  const payoutWallet = String(t.claimant_wallet || '').trim()

  if (!payoutWallet) {
    console.warn('⛔ claimant_wallet empty while processing. Marking failed:', id)
    await markTreasureFailed(id, 'claimant_wallet empty')
    return
  }

  if (!isLikelySolanaPubkey(payoutWallet)) {
    console.warn('⛔ claimant_wallet invalid format. Marking failed:', id, payoutWallet)
    await markTreasureFailed(id, 'claimant_wallet invalid format')
    return
  }

  const rewardBonk = toNumberSafe(t.reward_bonk)
  const rewardCbs = toNumberSafe(t.reward_cbs)
  const rewardSol = toNumberSafe(t.reward_sol)

  if (rewardBonk <= 0 && rewardCbs <= 0 && rewardSol <= 0) {
    console.warn('⛔ No rewards configured (all 0). Marking failed:', id)
    await markTreasureFailed(id, 'No rewards configured')
    return
  }

  console.log(`🎯 Paying treasure: ${id}`)
  console.log(`💸 Paying ${rewardBonk} BONK + ${rewardCbs} CBS + ${rewardSol} SOL -> ${short(payoutWallet)}`)

  try {
    const sigs = {}

    if (rewardBonk > 0) {
      sigs.tx_bonk_sig = await paySpl({
        mint: BONK_MINT,
        decimals: BONK_DECIMALS,
        toAddress: payoutWallet,
        amountTokens: rewardBonk,
      })
    }

    if (rewardCbs > 0) {
      sigs.tx_cbs_sig = await paySpl({
        mint: CBS_MINT,
        decimals: CBS_DECIMALS,
        toAddress: payoutWallet,
        amountTokens: rewardCbs,
      })
    }

    // SOL alleen versturen als reward_sol bestaat en > 0
    if (rewardSol > 0) {
      await paySol(payoutWallet, rewardSol)
    }

    await markTreasurePaid(id, {
      ...sigs,
    })

    console.log('✅ Paid treasure:', id, 'sigs:', sigs)
  } catch (e) {
    const msg = String(e?.message || e)
    console.warn('⛔ Payment failed:', id, msg)

    if (msg.toLowerCase().includes('insufficient funds')) {
      console.warn('💡 Treasure wallet has not enough BONK/CBS. Top up wallet or lower reward.')
    }

    await markTreasureFailed(id, msg)
  }
}

async function main() {
  await testConnection().catch(() => {})
  await testSupabase().catch(() => {})

  console.log('🧠 Treasure worker running. Poll:', SLEEP_MS, 'ms')

  while (true) {
    try {
      await runOnce()
    } catch (e) {
      console.warn('⚠️ Worker cycle error:', e?.message || e)
    }
    await sleep(SLEEP_MS)
  }
}

main().catch((e) => {
  console.error('❌ Worker crashed:', e)
  process.exit(1)
})