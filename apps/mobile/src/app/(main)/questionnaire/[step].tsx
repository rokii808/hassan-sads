import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { QUESTIONS, getVisibleQuestions } from '@hassan-sads/questionnaire';
import { useQuestionnaireStore } from '@/store/questionnaire';
import type { Question } from '@hassan-sads/questionnaire';

const T = { navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56', coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF', textSecondary: '#5F5E5A', border: '#E2E4E9', amber: '#BA7517' };

export default function QuestionStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const { answers, setAnswer } = useQuestionnaireStore();

  const answersById = Object.fromEntries(answers.map((a) => [a.questionId, a.value]));
  const visibleQuestions = getVisibleQuestions(answersById);
  const stepIndex = Math.max(0, Number(step) - 1);
  const question = visibleQuestions[stepIndex];
  const totalSteps = visibleQuestions.length;
  const isLast = stepIndex >= totalSteps - 1;
  const currentAnswer = answers.find((a) => a.questionId === question?.id);

  const handleAnswer = useCallback(
    (value: string | boolean | number) => {
      if (!question) return;
      setAnswer({ questionId: question.id, value });
    },
    [question, setAnswer],
  );

  const handleNext = () => {
    if (isLast) {
      router.push('/(main)/questionnaire/verify');
    } else {
      router.push(`/(main)/questionnaire/${stepIndex + 2}`);
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      router.push('/(main)/age-check');
    } else {
      router.push(`/(main)/questionnaire/${stepIndex}`);
    }
  };

  if (!question) return null;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${((stepIndex + 1) / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{stepIndex + 1} of {totalSteps}</Text>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.questionCard}>
          <Text style={styles.questionId}>{question.id}</Text>
          <Text style={styles.questionText}>{question.text}</Text>
          {question.hint && (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>ℹ {question.hint}</Text>
            </View>
          )}
        </View>

        <View style={styles.answersSection}>
          <QuestionInput question={question} currentValue={currentAnswer?.value ?? null} onAnswer={handleAnswer} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, !currentAnswer && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!currentAnswer}
        >
          <Text style={styles.nextBtnText}>{isLast ? 'Review Answers' : 'Next →'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function QuestionInput({ question, currentValue, onAnswer }: { question: Question; currentValue: unknown; onAnswer: (v: string | boolean | number) => void }) {
  if (question.type === 'yes_no') {
    return (
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[true, false].map((v) => (
          <TouchableOpacity
            key={String(v)}
            style={[inputStyles.yesNoBtn, currentValue === v && inputStyles.yesNoBtnSelected]}
            onPress={() => onAnswer(v)}
          >
            <Text style={[inputStyles.yesNoText, currentValue === v && inputStyles.yesNoTextSelected]}>
              {v ? 'Yes' : 'No'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (question.type === 'multiple_choice' && question.options) {
    return (
      <View style={{ gap: 8 }}>
        {question.options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[inputStyles.optionBtn, currentValue === opt && inputStyles.optionBtnSelected]}
            onPress={() => onAnswer(opt)}
          >
            <Text style={[inputStyles.optionText, currentValue === opt && inputStyles.optionTextSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  progressContainer: { height: 4, backgroundColor: T.border },
  progressBar: { height: 4, backgroundColor: T.teal },
  progressText: { textAlign: 'center', fontSize: 12, color: T.textSecondary, paddingVertical: 6 },
  container: { padding: 24, paddingBottom: 32 },
  backBtn: { marginBottom: 16 },
  backText: { color: T.textSecondary, fontSize: 14 },
  questionCard: { backgroundColor: T.card, borderRadius: 16, padding: 24, marginBottom: 24 },
  questionId: { fontSize: 12, fontWeight: '700', color: T.teal, marginBottom: 8, letterSpacing: 0.5 },
  questionText: { fontSize: 18, fontWeight: '700', color: T.navy, lineHeight: 28 },
  hintBox: { backgroundColor: '#E6F4F0', borderRadius: 10, padding: 12, marginTop: 14 },
  hintText: { fontSize: 13, color: T.teal, lineHeight: 20 },
  answersSection: { gap: 8 },
  footer: { padding: 20, backgroundColor: T.card, borderTopWidth: 1, borderTopColor: T.border },
  nextBtn: { backgroundColor: T.navy, borderRadius: 12, padding: 16, alignItems: 'center' },
  nextBtnDisabled: { opacity: 0.35 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

const inputStyles = StyleSheet.create({
  yesNoBtn: { flex: 1, padding: 18, borderRadius: 12, borderWidth: 2, borderColor: T.border, alignItems: 'center', backgroundColor: T.card },
  yesNoBtnSelected: { borderColor: T.navy, backgroundColor: T.navy },
  yesNoText: { fontSize: 16, fontWeight: '700', color: T.textSecondary },
  yesNoTextSelected: { color: '#fff' },
  optionBtn: { padding: 16, borderRadius: 12, borderWidth: 1.5, borderColor: T.border, backgroundColor: T.card },
  optionBtnSelected: { borderColor: T.navy, backgroundColor: '#EEF2FF' },
  optionText: { fontSize: 15, color: T.textSecondary },
  optionTextSelected: { color: T.navy, fontWeight: '600' },
});
