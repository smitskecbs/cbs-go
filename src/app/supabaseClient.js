// src/app/supabaseClient.js
// Centrale Supabase client voor CBS-GO

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://cxfedvowjgkqrakkkjpi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT';

// 1 gedeelde client voor de hele app
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
