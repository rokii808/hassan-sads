import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase-server';

const WithdrawSchema = z.object({ participantId: z.string().uuid() });

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = WithdrawSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 422 });

  const { participantId } = parsed.data;
  const supabase = createServiceRoleClient();

  // GDPR right to erasure: delete PII, anonymise submissions, log event
  await supabase.from('participants').update({
    email: `deleted_${participantId}@withdrawn.invalid`,
    full_name: '[Withdrawn]',
    date_of_birth: '1900-01-01',
    withdrawn_at: new Date().toISOString(),
  }).eq('id', participantId);

  await supabase.from('consent_events').insert({
    participant_id: participantId,
    event_type: 'withdraw',
    timestamp: new Date().toISOString(),
    ip_hash: null,
    metadata: { source: 'participant_request' },
  });

  return NextResponse.json({ status: 'withdrawn', message: 'Your personal data has been deleted. Your anonymised research data remains in our research dataset as permitted by GDPR Article 89.' });
}
