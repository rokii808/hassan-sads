import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { QUESTIONS, getVisibleQuestions } from '@hassan-sads/questionnaire';
import { useQuestionnaireStore } from '@/store/questionnaire';

const T = {
  navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56',
  coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF',
  textSecondary: '#5F5E5A', border: '#E2E4E9',
};

export default function VerifyScreen() {
  const { answers } = useQuestionnaireStore();
  const answersById = Object.fromEntries(answers.map((a) => [a.questionId, a.value]));
  const visibleQuestions = getVisibleQuestions(answersById);

  const formatAnswer = (value: unknown): string => {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    if (value === null || value === undefined) return '—';
    return String(value);
  };

  const isAnswerFlagged = (questionId: string, value: unknown): boolean => {
    const q = QUESTIONS.find((q) => q.id === questionId);
    return q?.flagOnAnswer !== undefined && value === q.flagOnAnswer;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Edit answers</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Review Your Answers</Text>
        <Text style={styles.subtitle}>Check everything looks right before we calculate your result.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {visibleQuestions.map((q, index) => {
          const answer = answersById[q.id];
          const flagged = isAnswerFlagged(q.id, answer);

          return (
            <View key={q.id} style={[styles.row, flagged && styles.rowFlagged]}>
              <View style={styles.rowLeft}>
                <Text style={styles.qid}>{q.id}</Text>
                <Text style={styles.qtext} numberOfLines={3}>{q.text}</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={[styles.answer, flagged && styles.answerFlagged]}>
                  {formatAnswer(answer)}
                </Text>
                <TouchableOpacity onPress={() => router.push(`/(main)/questionnaire/${index + 1}`)}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            ⚠ Highlighted answers are ones that may be clinically significant. They do not mean something is
            definitely wrong — a doctor will review in context.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => router.push('/(main)/results')}>
          <Text style={styles.submitBtnText}>Submit &amp; See My Result →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  header: { backgroundColor: T.navy, padding: 20 },
  backBtn: { marginBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 20 },
  container: { padding: 16, paddingBottom: 32 },
  row: {
    backgroundColor: T.card, borderRadius: 10, padding: 14,
    marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', borderWidth: 1, borderColor: T.border,
  },
  rowFlagged: { borderColor: T.coral, backgroundColor: '#FEF6F4' },
  rowLeft: { flex: 1, paddingRight: 12 },
  qid: { fontSize: 10, fontWeight: '700', color: T.teal, marginBottom: 3, letterSpacing: 0.5 },
  qtext: { fontSize: 13, color: T.navy, lineHeight: 19 },
  rowRight: { alignItems: 'flex-end', gap: 6 },
  answer: { fontSize: 14, fontWeight: '700', color: T.navy },
  answerFlagged: { color: T.coral },
  editLink: { fontSize: 12, color: T.teal, fontWeight: '600', textDecorationLine: 'underline' },
  notice: { backgroundColor: '#FEF3CD', borderRadius: 10, padding: 14, marginTop: 8, borderWidth: 1, borderColor: '#BA7517' },
  noticeText: { fontSize: 13, color: '#7A4E0A', lineHeight: 20 },
  footer: { padding: 20, backgroundColor: T.card, borderTopWidth: 1, borderTopColor: T.border },
  submitBtn: { backgroundColor: T.teal, borderRadius: 12, padding: 16, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
