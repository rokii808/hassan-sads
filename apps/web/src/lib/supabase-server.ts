import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getServiceRoleClient } from '@hassan-sads/db';
import type { Database } from '@hassan-sads/db';

/** Server Component / Route Handler client — reads auth from cookies */
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: Record<string, unknown>) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: Record<string, unknown>) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );
}

/** Admin/service role client — only for API routes, never in components */
export function createServiceRoleClient() {
  return getServiceRoleClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['SUPABASE_SERVICE_ROLE_KEY']!,
  );
}
