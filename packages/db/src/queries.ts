import type { TypedSupabaseClient } from './client';
import type { RiskLevel, QuestionnaireSubmission, ResearchCohortRow, AgeBand } from './types';

/** Fetch a participant's own record (participant JWT) */
export async function getParticipant(client: TypedSupabaseClient, participantId: string) {
  const { data, error } = await client
    .from('participants')
    .select('*')
    .eq('id', participantId)
    .single();
  if (error) throw error;
  return data;
}

/** Fetch all submissions for a participant */
export async function getParticipantSubmissions(
  client: TypedSupabaseClient,
  participantId: string,
) {
  const { data, error } = await client
    .from('questionnaire_submissions')
    .select('*, question_responses(*)')
    .eq('participant_id', participantId)
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Admin: list all submissions with optional risk level filter */
export async function adminListSubmissions(
  client: TypedSupabaseClient,
  options: {
    riskLevel?: RiskLevel;
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
  } = {},
) {
  let query = client
    .from('questionnaire_submissions')
    .select('*, participants(age_band, county)', { count: 'exact' })
    .order('submitted_at', { ascending: false });

  if (options.riskLevel) query = query.eq('risk_level', options.riskLevel);
  if (options.from) query = query.gte('submitted_at', options.from);
  if (options.to) query = query.lte('submitted_at', options.to);
  if (options.limit) query = query.limit(options.limit);
  if (options.offset) query = query.range(options.offset, options.offset + (options.limit ?? 50) - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: data as unknown as QuestionnaireSubmission[] | null, count };
}

/** Research cohort query — NO PII */
export async function getResearchCohort(
  client: TypedSupabaseClient,
  options: { from?: string; to?: string; ageBand?: string } = {},
) {
  let query = client
    .from('research_cohort')
    .select('*', { count: 'exact' });

  if (options.from) query = query.gte('submitted_month', options.from);
  if (options.to) query = query.lte('submitted_month', options.to);
  if (options.ageBand && options.ageBand !== 'all') {
    query = query.eq('age_band', options.ageBand as AgeBand);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: data as unknown as ResearchCohortRow[] | null, count };
}
