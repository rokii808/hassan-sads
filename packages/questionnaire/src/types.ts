export type QuestionType = 'yes_no' | 'multiple_choice' | 'numeric' | 'text';

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface ShowIfCondition {
  questionId: string;
  answer: string | boolean | number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  /** The answer value that triggers a risk flag, if applicable */
  flagOnAnswer?: string | boolean | number;
  /** Show this question only if a prior question has a specific answer */
  showIf?: ShowIfCondition;
  /** Plain-English hint shown below the question */
  hint?: string;
}

export interface Answer {
  questionId: string;
  value: string | boolean | number | null;
}

export interface ScoringResult {
  riskLevel: RiskLevel;
  flaggedQuestions: string[];
  recommendGpReferral: boolean;
  summary: string;
  nextSteps: string[];
}

export interface SubmissionPayload {
  participantId: string;
  answers: Answer[];
  ageBand: '12-17' | '18-25' | '26-35' | '36+';
  consentConfirmed: boolean;
  parentConsentConfirmed?: boolean;
}
