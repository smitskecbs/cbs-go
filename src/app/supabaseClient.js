// src/app/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cxfedvowjgkqrakkkjpi.supabase.co';
const SUPABASE_PUBLIC_ANON_KEY = 'sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLIC_ANON_KEY
);
