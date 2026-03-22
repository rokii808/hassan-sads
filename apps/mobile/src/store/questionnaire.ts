import { create } from 'zustand';
import type { Answer, AgeBand } from '@hassan-sads/questionnaire';

interface QuestionnaireState {
  participantId: string | null;
  ageBand: AgeBand | null;
  answers: Answer[];
  currentStep: number;
  consentGiven: boolean;
  parentConsentGiven: boolean;
  isSubmitting: boolean;
  submissionId: string | null;

  setParticipantId: (id: string) => void;
  setAgeBand: (band: AgeBand) => void;
  setAnswer: (answer: Answer) => void;
  setCurrentStep: (step: number) => void;
  setConsentGiven: (v: boolean) => void;
  setParentConsentGiven: (v: boolean) => void;
  setIsSubmitting: (v: boolean) => void;
  setSubmissionId: (id: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  participantId: null,
  ageBand: null,
  answers: [],
  currentStep: 0,
  consentGiven: false,
  parentConsentGiven: false,
  isSubmitting: false,
  submissionId: null,

  setParticipantId: (id) => set({ participantId: id }),
  setAgeBand: (band) => set({ ageBand: band }),
  setAnswer: (answer) =>
    set((state) => ({
      answers: [
        ...state.answers.filter((a) => a.questionId !== answer.questionId),
        answer,
      ],
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setConsentGiven: (v) => set({ consentGiven: v }),
  setParentConsentGiven: (v) => set({ parentConsentGiven: v }),
  setIsSubmitting: (v) => set({ isSubmitting: v }),
  setSubmissionId: (id) => set({ submissionId: id }),
  reset: () =>
    set({
      answers: [],
      currentStep: 0,
      consentGiven: false,
      parentConsentGiven: false,
      isSubmitting: false,
      submissionId: null,
      ageBand: null,
    }),
}));
