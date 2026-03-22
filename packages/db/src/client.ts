import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export type TypedSupabaseClient = SupabaseClient<Database>;

let _browserClient: TypedSupabaseClient | null = null;

/** Browser / React Native client — uses anon key, respects RLS */
export function getBrowserClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
): TypedSupabaseClient {
  if (_browserClient) return _browserClient;
  _browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  return _browserClient;
}

/** Server-side admin client — uses service role key. NEVER expose to browser or mobile. */
export function getServiceRoleClient(
  supabaseUrl: string,
  supabaseServiceRoleKey: string,
): TypedSupabaseClient {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
