import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Linking, Alert } from 'react-native';
import { router } from 'expo-router';
import { useQuestionnaireStore } from '@/store/questionnaire';
import type { ScoringResult } from '@hassan-sads/questionnaire';

const T = { navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56', coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF', textSecondary: '#5F5E5A', border: '#E2E4E9', amber: '#BA7517' };

const RISK_CONFIG = {
  high: { bg: '#FAEAE5', text: T.coral, border: T.coral, label: 'High Risk — See Your GP', emoji: '⚠️' },
  moderate: { bg: '#FEF3CD', text: T.amber, border: T.amber, label: 'Moderate Risk', emoji: '⚡' },
  low: { bg: '#E6F4F0', text: T.teal, border: T.teal, label: 'Low Risk', emoji: '✓' },
};

export default function ResultsScreen() {
  const { answers, ageBand, participantId, consentGiven, parentConsentGiven, setIsSubmitting, setSubmissionId, reset } = useQuestionnaireStore();
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void submitQuestionnaire();
  }, []);

  const submitQuestionnaire = async () => {
    setLoading(true);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env['EXPO_PUBLIC_API_URL']}/api/questionnaire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId,
          answers,
          ageBand,
          consentConfirmed: consentGiven,
          parentConsentConfirmed: parentConsentGiven,
        }),
      });

      if (!response.ok) {
        const data = await response.json() as { error?: string };
        throw new Error(data.error ?? 'Submission failed');
      }

      const data = await response.json() as { submissionId: string; riskLevel: string; flags: string[]; summary: string; nextSteps: string[] };
      setSubmissionId(data.submissionId);
      setResult({
        riskLevel: data.riskLevel as 'low' | 'moderate' | 'high',
        flaggedQuestions: data.flags,
        recommendGpReferral: data.riskLevel === 'high',
        summary: data.summary,
        nextSteps: data.nextSteps,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={T.navy} />
        <Text style={{ marginTop: 16, color: T.textSecondary, fontSize: 14 }}>Processing your answers…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorBody}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => void submitQuestionnaire()}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!result) return null;

  const config = RISK_CONFIG[result.riskLevel];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Risk badge */}
        <View style={[styles.riskBadge, { backgroundColor: config.bg, borderColor: config.border }]}>
          <Text style={styles.riskEmoji}>{config.emoji}</Text>
          <Text style={[styles.riskLabel, { color: config.text }]}>{config.label}</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>What this means for you</Text>
          <Text style={styles.summaryText}>{result.summary}</Text>
        </View>

        {/* Next steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Next steps</Text>
          {result.nextSteps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* GP Referral CTA (high risk only) */}
        {result.riskLevel === 'high' && (
          <View style={styles.referralCard}>
            <Text style={styles.referralTitle}>⚠️ GP Referral Alert Sent</Text>
            <Text style={styles.referralBody}>
              We have sent an alert to a GP referral pathway. Please book an appointment with your doctor as soon as possible. Show them this report.
            </Text>
            <TouchableOpacity style={styles.referralBtn} onPress={() => void Linking.openURL('https://irishheart.ie')}>
              <Text style={styles.referralBtnText}>Irish Heart Foundation →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Resources */}
        <TouchableOpacity style={styles.resourcesBtn} onPress={() => router.push('/(main)/resources')}>
          <Text style={styles.resourcesBtnText}>SADS Resources &amp; Support</Text>
        </TouchableOpacity>

        {/* Data withdrawal */}
        <TouchableOpacity style={styles.withdrawLink} onPress={() => Alert.alert('Withdraw Data', 'To withdraw your data, please visit the Resources screen and use the data withdrawal option.')}>
          <Text style={styles.withdrawText}>Withdraw my data</Text>
        </TouchableOpacity>

        {/* Start over */}
        <TouchableOpacity style={styles.homeLink} onPress={() => { reset(); router.replace('/(main)/index'); }}>
          <Text style={styles.homeText}>Return to Home</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Built in memory of Hassan — so no family faces this again.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  container: { padding: 24, paddingBottom: 48 },
  riskBadge: { borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 2, marginBottom: 20 },
  riskEmoji: { fontSize: 36, marginBottom: 8 },
  riskLabel: { fontSize: 20, fontWeight: '700' },
  summaryCard: { backgroundColor: T.card, borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: T.border },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: T.navy, marginBottom: 10 },
  summaryText: { fontSize: 15, color: T.textSecondary, lineHeight: 24 },
  stepsCard: { backgroundColor: T.card, borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: T.border },
  stepsTitle: { fontSize: 16, fontWeight: '700', color: T.navy, marginBottom: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  stepNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: T.navy, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepNumberText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 14, color: T.textSecondary, lineHeight: 22 },
  referralCard: { backgroundColor: '#FAEAE5', borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 2, borderColor: T.coral },
  referralTitle: { fontSize: 16, fontWeight: '700', color: T.coral, marginBottom: 8 },
  referralBody: { fontSize: 14, color: T.textSecondary, lineHeight: 22, marginBottom: 14 },
  referralBtn: { backgroundColor: T.coral, borderRadius: 10, padding: 12, alignItems: 'center' },
  referralBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  resourcesBtn: { backgroundColor: T.navy, borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 12 },
  resourcesBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  withdrawLink: { alignItems: 'center', marginBottom: 8 },
  withdrawText: { color: T.textSecondary, fontSize: 13, textDecorationLine: 'underline' },
  homeLink: { alignItems: 'center', marginBottom: 24 },
  homeText: { color: T.navy, fontSize: 14, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 12, color: T.textSecondary, fontStyle: 'italic', lineHeight: 20 },
  errorContainer: { flex: 1, padding: 32, justifyContent: 'center', alignItems: 'center' },
  errorTitle: { fontSize: 20, fontWeight: '700', color: T.coral, marginBottom: 12 },
  errorBody: { fontSize: 15, color: T.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 24 },
  retryBtn: { backgroundColor: T.navy, borderRadius: 12, padding: 15, paddingHorizontal: 32 },
  retryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
