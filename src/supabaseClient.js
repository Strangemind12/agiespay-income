// This connects your frontend to Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';  // 👈 get from your Supabase project
const supabaseAnonKey = 'your-anon-key-here';           // 👈 copy it from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
