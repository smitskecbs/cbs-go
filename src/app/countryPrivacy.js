// Country + leaderboard-flag privacy prefs (remote: player_state).
// Map location sharing stays in cbsgo_shareLocation / playerSync (unchanged).

import { supabase } from './supabaseClient.js';
import { getProfileOwner } from './playerNickname.js';

/** ISO 3166-1 alpha-2 → English name (explicit user selection only). */
export const COUNTRY_OPTIONS = [
  { code: '', name: 'Not set' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'ES', name: 'Spain' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IT', name: 'Italy' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'HU', name: 'Hungary' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'GR', name: 'Greece' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IS', name: 'Iceland' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'PH', name: 'Philippines' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'IL', name: 'Israel' },
  { code: 'TR', name: 'Türkiye' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'RU', name: 'Russia' },
];

const VALID_CODES = new Set(
  COUNTRY_OPTIONS.map((c) => c.code).filter(Boolean),
);

export function normalizeCountryCode(raw) {
  const code = String(raw ?? '')
    .trim()
    .toUpperCase();
  if (!code) return '';
  if (!/^[A-Z]{2}$/.test(code)) return '';
  if (!VALID_CODES.has(code)) return '';
  return code;
}

export function normalizeShowCountryFlag(raw) {
  if (raw === true || raw === 'true' || raw === 1 || raw === '1') return true;
  return false;
}

/**
 * Load remote privacy prefs for the authenticated user.
 * @returns {Promise<{ countryCode: string, showCountryFlag: boolean, ok: boolean, reason?: string }>}
 */
export async function loadCountryPrivacyPrefs() {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user?.id) {
      return { countryCode: '', showCountryFlag: false, ok: false, reason: 'no-auth' };
    }

    const userId = authData.user.id;

    const { data, error } = await supabase
      .from('player_state')
      .select('user_id, country_code, show_country_flag')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      const msg = String(error.message || '').toLowerCase();
      if (msg.includes('show_country_flag') || msg.includes('country_code')) {
        console.warn('CBS GO: country privacy columns missing or unreadable', error.message);
        return { countryCode: '', showCountryFlag: false, ok: false, reason: 'schema' };
      }
      console.warn('CBS GO: loadCountryPrivacyPrefs failed', error);
      return { countryCode: '', showCountryFlag: false, ok: false, reason: 'error' };
    }

    return {
      countryCode: normalizeCountryCode(data?.country_code),
      showCountryFlag: normalizeShowCountryFlag(data?.show_country_flag),
      ok: true,
    };
  } catch (e) {
    console.warn('CBS GO: loadCountryPrivacyPrefs crashed', e);
    return { countryCode: '', showCountryFlag: false, ok: false, reason: 'crash' };
  }
}

/**
 * Save remote country + flag preference for the authenticated owner only.
 * Does not change location-sharing (shareLocation / playerSync).
 */
export async function saveCountryPrivacyPrefs({ countryCode, showCountryFlag }) {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user?.id) {
    return { ok: false, message: 'Please log in again.' };
  }

  const userId = authData.user.id;
  const owner = getProfileOwner();
  if (owner.userId && owner.userId !== userId) {
    console.warn('CBS GO: blocked country privacy save (owner mismatch)', {
      authUserId: userId,
      localOwner: owner.userId,
    });
    return { ok: false, message: 'Profile ownership mismatch. Reload and try again.' };
  }

  const code = normalizeCountryCode(countryCode);
  const showFlag = normalizeShowCountryFlag(showCountryFlag);

  const payload = {
    user_id: userId,
    country_code: code || null,
    show_country_flag: showFlag,
  };

  const { error } = await supabase
    .from('player_state')
    .upsert(payload, { onConflict: 'user_id' });

  if (error) {
    console.warn('CBS GO: saveCountryPrivacyPrefs failed', {
      code: error.code,
      message: error.message,
    });
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('show_country_flag') || msg.includes('schema cache')) {
      return {
        ok: false,
        message:
          'Country settings need a database update. Ask an admin to run the country-flag SQL script.',
      };
    }
    return { ok: false, message: 'Could not save country settings. Try again.' };
  }

  return { ok: true, countryCode: code, showCountryFlag: showFlag };
}

export function countryOptionsHtml(selectedCode = '') {
  const sel = normalizeCountryCode(selectedCode);
  return COUNTRY_OPTIONS.map((opt) => {
    const selected = opt.code === sel ? ' selected' : '';
    const label = opt.code ? `${opt.name} (${opt.code})` : opt.name;
    return `<option value="${opt.code}"${selected}>${label}</option>`;
  }).join('');
}
