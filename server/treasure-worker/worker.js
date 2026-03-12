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
let secretRaw = ''

if (process.env.TREASURE_KEYPAIR_JSON) {
  secretRaw = process.env.TREASURE_KEYPAIR_JSON
} else {
  const keypairPath = path.resolve(__dirname, process.env.TREASURE_KEYPAIR_PATH || '')

  if (!keypairPath || !fs.existsSync(keypairPath)) {
    console.error('❌ Treasure keypair not found: missing TREASURE_KEYPAIR_JSON and TREASURE_KEYPAIR_PATH')
    process.exit(1)
  }

  secretRaw = fs.readFileSync(keypairPath, 'utf-8')
}

const secret = JSON.parse(secretRaw)
const treasureWallet = Keypair.fromSecretKey(new Uint8Array(secret))
console.log('✅ Treasure wallet loaded:', treasureWallet.publicKey.toBase58())

// --------------------
// Config
// --------------------
const RPC_URL = String(process.env.RPC_URL || 'https://api.mainnet-beta.solana.com').trim()

if (!RPC_URL.startsWith('http://') && !RPC_URL.startsWith('https://')) {
  console.error('❌ Invalid RPC_URL:', JSON.stringify(RPC_URL))
  process.exit(1)
}

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
  try {
    new PublicKey(String(s || '').trim())
    return true
  } catch {
    return false
  }
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
// DB queries: treasures
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

  const { error: error1 } = await supabase
    .from('treasures')
    .update({
      ...base,
      fail_reason: String(reasonText || ''),
    })
    .eq('id', id)

  if (!error1) return

  const { error: error2 } = await supabase.from('treasures').update(base).eq('id', id)
  if (error2) throw new Error(error2.message)
}

// --------------------
// DB queries: reward_claims
// --------------------
async function fetchNextProcessingRewardClaim() {
  const { data, error } = await supabase
    .from('reward_claims')
    .select('*')
    .eq('status', 'processing')
    .not('claimant_wallet', 'is', null)
    .is('paid_at', null)
    .order('created_at', { ascending: true })
    .limit(1)

  if (error) throw new Error(error.message)
  return data && data[0] ? data[0] : null
}

async function markRewardClaimPaid(id, patch = {}) {
  const { error } = await supabase
    .from('reward_claims')
    .update({
      status: 'paid',
      updated_at: new Date().toISOString(),
      paid_at: new Date().toISOString(),
      ...patch,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

async function markRewardClaimFailed(id, reasonText = '') {
  const base = {
    status: 'failed',
    updated_at: new Date().toISOString(),
  }

  const { error: error1 } = await supabase
    .from('reward_claims')
    .update({
      ...base,
      fail_reason: String(reasonText || ''),
    })
    .eq('id', id)

  if (!error1) return

  const { error: error2 } = await supabase
    .from('reward_claims')
    .update(base)
    .eq('id', id)

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
// Worker cycle: treasures
// --------------------
async function runOnce() {
  const t = await fetchNextProcessingTreasure()
  if (!t) return false

  const id = t.id
  const payoutWallet = String(t.claimant_wallet || '').trim()

  if (!payoutWallet) {
    console.warn('⛔ claimant_wallet empty while processing. Marking failed:', id)
    await markTreasureFailed(id, 'claimant_wallet empty')
    return true
  }

  if (!isLikelySolanaPubkey(payoutWallet)) {
    console.warn('⛔ claimant_wallet invalid format. Marking failed:', id, payoutWallet)
    await markTreasureFailed(id, 'claimant_wallet invalid format')
    return true
  }

  const rewardBonk = toNumberSafe(t.reward_bonk)
  const rewardCbs = toNumberSafe(t.reward_cbs)
  const rewardSol = toNumberSafe(t.reward_sol)

  if (rewardBonk <= 0 && rewardCbs <= 0 && rewardSol <= 0) {
    console.warn('⛔ No rewards configured (all 0). Marking failed:', id)
    await markTreasureFailed(id, 'No rewards configured')
    return true
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

    if (rewardSol > 0) {
      sigs.tx_sol_sig = await paySol(payoutWallet, rewardSol)
    }

    await markTreasurePaid(id, {
      ...sigs,
    })

    console.log('✅ Paid treasure:', id, 'sigs:', sigs)
    return true
  } catch (e) {
    const msg = String(e?.message || e)
    console.warn('⛔ Payment failed:', id, msg)

    if (msg.toLowerCase().includes('insufficient funds')) {
      console.warn('💡 Treasure wallet has not enough BONK/CBS/SOL. Top up wallet or lower reward.')
    }

    await markTreasureFailed(id, msg)
    return true
  }
}

// --------------------
// Worker cycle: reward_claims
// --------------------
async function runRewardClaimOnce() {
  const r = await fetchNextProcessingRewardClaim()
  if (!r) return false

  const id = r.id
  const payoutWallet = String(r.claimant_wallet || '').trim()

  if (!payoutWallet) {
    console.warn('⛔ reward_claim claimant_wallet empty. Marking failed:', id)
    await markRewardClaimFailed(id, 'claimant_wallet empty')
    return true
  }

  if (!isLikelySolanaPubkey(payoutWallet)) {
    console.warn('⛔ reward_claim claimant_wallet invalid format. Marking failed:', id, payoutWallet)
    await markRewardClaimFailed(id, 'claimant_wallet invalid format')
    return true
  }

  const rewardBonk = toNumberSafe(r.reward_bonk)
  const rewardCbs = toNumberSafe(r.reward_cbs)
  const rewardSol = toNumberSafe(r.reward_sol)

  if (rewardBonk <= 0 && rewardCbs <= 0 && rewardSol <= 0) {
    console.warn('⛔ reward_claim has no rewards configured. Marking failed:', id)
    await markRewardClaimFailed(id, 'No rewards configured')
    return true
  }

  console.log(`🎁 Paying reward claim: ${id}`)
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

    if (rewardSol > 0) {
      sigs.tx_sol_sig = await paySol(payoutWallet, rewardSol)
    }

    await markRewardClaimPaid(id, sigs)

    console.log('✅ Paid reward claim:', id, 'sigs:', sigs)
    return true
  } catch (e) {
    const msg = String(e?.message || e)
    console.warn('⛔ Reward claim payment failed:', id, msg)

    if (msg.toLowerCase().includes('insufficient funds')) {
      console.warn('💡 Treasure wallet has not enough BONK/CBS/SOL. Top up wallet or lower reward.')
    }

    await markRewardClaimFailed(id, msg)
    return true
  }
}

async function main() {
  await testConnection().catch(() => {})
  await testSupabase().catch(() => {})

  console.log('🧠 Treasure worker running. Poll:', SLEEP_MS, 'ms')

  while (true) {
    try {
      const didTreasure = await runOnce()
      if (!didTreasure) {
        await runRewardClaimOnce()
      }
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