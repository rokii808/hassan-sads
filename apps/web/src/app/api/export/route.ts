import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getResearchCohort } from '@hassan-sads/db';

export async function GET(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') ?? 'csv';
  const from = searchParams.get('from') ?? undefined;
  const to = searchParams.get('to') ?? undefined;
  const ageBand = searchParams.get('age_band') ?? undefined;

  const { data } = await getResearchCohort(supabase, { from, to, ageBand });

  if (format === 'json') {
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="hassan-sads-cohort-${Date.now()}.json"`,
      },
    });
  }

  // CSV export
  if (!data || data.length === 0) {
    return new NextResponse('No data found for the selected filters.', { status: 404 });
  }

  const headers = Object.keys(data[0]!);
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((h) => {
        const val = (row as Record<string, unknown>)[h];
        const str = Array.isArray(val) ? `"${val.join(';')}"` : String(val ?? '');
        return str.includes(',') ? `"${str}"` : str;
      }).join(',')
    ),
  ];

  return new NextResponse(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="hassan-sads-cohort-${Date.now()}.csv"`,
    },
  });
}
