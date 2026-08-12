import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True only when both Vite environment variables are present.
 * The UI uses this flag to show a clear message instead of crashing
 * when the .env file has not been configured yet.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    '[Supabase] Missing environment variables. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file and restart the Vite dev server.',
    { hasUrl: Boolean(supabaseUrl), hasAnonKey: Boolean(supabaseAnonKey) }
  );
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

/**
 * Returns an initialized client or throws a readable error.
 * Every data-access helper goes through here so a missing .env
 * never produces an obscure "cannot read property of null".
 */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase no está configurado: falta VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env.'
    );
  }
  return supabase;
}

export const SUPABASE_URL = supabaseUrl ?? '';
