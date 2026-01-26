// src/app/supabaseClient.js
// Centrale Supabase client voor CBS-GO (met stabiele session storage)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://cxfedvowjgkqrakkkjpi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT';

// Belangrijk: Edge/desktop kan anders omgaan met default storage.
// We zetten dit expliciet zodat sessies hetzelfde werken op Chrome + Edge.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // Unieke key zodat je niet “clashed” met andere supabase projecten op dezelfde domain
    storageKey: 'cbsgo-supabase-auth',
  },
});

// ✅ Debug helper: expose Supabase client for DevTools console (GH Pages friendly)
if (typeof window !== 'undefined') {
  window.__cbsgo_supabase = supabase;
}

// Laat de app weten wanneer Supabase auth/session “ready” is.
// Hierdoor kan appShell evt wachten / of op z’n minst weten dat auth bestaat.
async function fireReady() {
  try {
    // getSession triggert het laden uit localStorage
    await supabase.auth.getSession();
  } catch (e) {
    console.warn('CBS GO: supabase getSession failed', e);
  } finally {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:supabaseReady'));
    }
  }
}

// Init once
if (typeof window !== 'undefined') {
  // 1) direct proberen session te laden
  fireReady();

  // 2) elke auth change opnieuw “ready” signaal geven
  supabase.auth.onAuthStateChange((_event, _session) => {
    window.dispatchEvent(new CustomEvent('cbsgo:supabaseReady'));
  });
}
// Debug: allow console testing on production pages
if (typeof window !== 'undefined') {
  window.cbsgoSupabase = supabase;
}
