import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase-server';
import crypto from 'crypto';

const ConsentSchema = z.object({
  action: z.enum(['opt_out', 'withdraw']),
  participantId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = ConsentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 422 });

  const { action, participantId } = parsed.data;
  const supabase = createServiceRoleClient();
  const ipHash = crypto.createHash('sha256').update(request.headers.get('x-forwarded-for') ?? 'unknown').digest('hex');

  if (action === 'opt_out') {
    await supabase.from('participants').update({ opted_out_at: new Date().toISOString() } as Record<string, unknown>).eq('id', participantId);
  } else {
    // Full GDPR withdrawal — delete PII, keep anonymised research record
    await supabase.from('participants').update({
      email: `deleted_${participantId}@withdrawn.invalid`,
      full_name: '[Withdrawn]',
      date_of_birth: '1900-01-01',
      withdrawn_at: new Date().toISOString(),
    } as Record<string, unknown>).eq('id', participantId);
  }

  await supabase.from('consent_events').insert({
    participant_id: participantId,
    event_type: action,
    timestamp: new Date().toISOString(),
    ip_hash: ipHash,
    metadata: null,
  });

  return NextResponse.json({ status: 'acknowledged' });
}
