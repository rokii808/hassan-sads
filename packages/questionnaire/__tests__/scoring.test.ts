import { describe, it, expect } from 'vitest';
import { scoreQuestionnaire } from '../src/scoring';
import type { Answer } from '../src/types';

function makeAnswers(overrides: Record<string, boolean | string | number>): Answer[] {
  return Object.entries(overrides).map(([questionId, value]) => ({ questionId, value }));
}

describe('scoreQuestionnaire', () => {
  it('returns low risk for no flag or concern answers', () => {
    const answers = makeAnswers({
      Q01: '1995-03-15',
      Q02: 'Male',
      Q04: false,
      Q06: false,
      Q07: false,
      Q08: false,
      Q11: false,
      Q12: false,
      Q13: false,
      Q15: false,
      Q17: false,
      Q18: false,
      Q19: false,
      Q23: false,
    });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('low');
    expect(result.flaggedQuestions).toHaveLength(0);
    expect(result.recommendGpReferral).toBe(false);
  });

  it('returns high risk when Q11 (fainting during exercise) is true', () => {
    const answers = makeAnswers({ Q11: true });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('high');
    expect(result.flaggedQuestions).toContain('Q11');
    expect(result.recommendGpReferral).toBe(true);
  });

  it('returns high risk when Q15 (family history of sudden death) is true', () => {
    const answers = makeAnswers({ Q15: true });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('high');
    expect(result.flaggedQuestions).toContain('Q15');
    expect(result.recommendGpReferral).toBe(true);
  });

  it('returns high risk with multiple flags — reports all flagged IDs', () => {
    const answers = makeAnswers({ Q11: true, Q13: true, Q17: true });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('high');
    expect(result.flaggedQuestions).toContain('Q11');
    expect(result.flaggedQuestions).toContain('Q13');
    expect(result.flaggedQuestions).toContain('Q17');
  });

  it('returns moderate risk when only moderate concerns (Q06) are present', () => {
    const answers = makeAnswers({ Q06: true, Q11: false, Q15: false });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('moderate');
    expect(result.flaggedQuestions).toHaveLength(0);
    expect(result.recommendGpReferral).toBe(false);
  });

  it('returns high risk when Q19 (heart medication) is true', () => {
    const answers = makeAnswers({ Q19: true });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('high');
    expect(result.recommendGpReferral).toBe(true);
  });

  it('high risk takes precedence over moderate concerns', () => {
    const answers = makeAnswers({ Q06: true, Q07: true, Q11: true });
    const result = scoreQuestionnaire(answers);
    expect(result.riskLevel).toBe('high');
  });

  it('includes plain-language summary for all risk levels', () => {
    const low = scoreQuestionnaire([]);
    expect(low.summary).toBeTruthy();
    expect(low.nextSteps.length).toBeGreaterThan(0);

    const high = scoreQuestionnaire(makeAnswers({ Q11: true }));
    expect(high.summary).toBeTruthy();
    expect(high.nextSteps.length).toBeGreaterThan(0);
  });
});
