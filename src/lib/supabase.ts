import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env";

/**
 * Server-only Supabase admin client, using the service-role key.
 *
 * This key bypasses Row Level Security, so it must NEVER reach the browser.
 * The `server-only` import guarantees this module can't be bundled client-side.
 * All public access to the tables is blocked by RLS (see supabase/schema.sql);
 * the app reaches the database exclusively through this trusted server client.
 */
let client: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (client) return client;
  client = createClient(serverEnv.supabase.url, serverEnv.supabase.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function uploadBucket(): string {
  return serverEnv.supabase.uploadBucket;
}
