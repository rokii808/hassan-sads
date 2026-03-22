import type { Answer, ScoringResult, RiskLevel } from './types';
import { HIGH_RISK_FLAG_IDS, MODERATE_CONCERN_IDS } from './questions';

export function scoreQuestionnaire(answers: Answer[]): ScoringResult {
  const answersById = new Map(answers.map((a) => [a.questionId, a.value]));

  const flaggedQuestions: string[] = [];
  const moderateConcerns: string[] = [];

  for (const [id, value] of answersById) {
    if (HIGH_RISK_FLAG_IDS.has(id) && value === true) {
      flaggedQuestions.push(id);
    } else if (MODERATE_CONCERN_IDS.has(id) && value === true) {
      moderateConcerns.push(id);
    }
  }

  const riskLevel: RiskLevel =
    flaggedQuestions.length > 0
      ? 'high'
      : moderateConcerns.length > 0
        ? 'moderate'
        : 'low';

  const recommendGpReferral = riskLevel === 'high';

  const summary = buildSummary(riskLevel, flaggedQuestions.length);
  const nextSteps = buildNextSteps(riskLevel);

  return {
    riskLevel,
    flaggedQuestions,
    recommendGpReferral,
    summary,
    nextSteps,
  };
}

function buildSummary(risk: RiskLevel, flagCount: number): string {
  switch (risk) {
    case 'high':
      return `Your answers have identified ${flagCount} important concern${flagCount === 1 ? '' : 's'} that a doctor should check. This does not mean something is definitely wrong — but it does mean you should see your GP soon. Please do not wait.`;
    case 'moderate':
      return `Your answers suggest a few things worth discussing with your GP at your next routine appointment. There is no immediate cause for alarm, but it is a good idea to mention these to your doctor.`;
    case 'low':
      return `Your answers do not suggest any immediate cardiac concerns. Well done for taking the time to complete this screening. Keep staying active and be aware of the signs of SADS.`;
  }
}

function buildNextSteps(risk: RiskLevel): string[] {
  switch (risk) {
    case 'high':
      return [
        'Book an urgent appointment with your GP — show them this report.',
        'Ask your GP for a referral to a cardiac specialist or ECG.',
        'Avoid high-intensity exercise until you have been seen by a doctor.',
        'Tell a trusted adult (parent, guardian, teacher) that you have received this result.',
        'Contact the Irish Heart Foundation or CRY Ireland for support and guidance.',
      ];
    case 'moderate':
      return [
        'Mention these findings to your GP at your next routine appointment.',
        'Download and bring this report to your appointment.',
        'Learn the warning signs of SADS — visit irishheart.ie for information.',
        'Make sure your family members are also aware of SADS.',
      ];
    case 'low':
      return [
        'Continue with regular physical activity — it is good for your heart.',
        'Be aware of SADS warning signs: fainting during exercise, palpitations, unexplained chest pain.',
        'Share information about SADS screening with your family and friends.',
        'If anything changes, come back and complete the screening again.',
      ];
  }
}
