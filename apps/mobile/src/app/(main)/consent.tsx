import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useQuestionnaireStore } from '@/store/questionnaire';

const T = {
  navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56',
  coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF',
  textSecondary: '#5F5E5A', border: '#E2E4E9',
  consentOptOut: '#1A6FFF', consentProceed: '#0F6E56',
};

export default function ConsentScreen() {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const { setConsentGiven } = useQuestionnaireStore();

  const handleScroll = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 40) {
      setScrolledToBottom(true);
    }
  };

  const handleOptOut = () => {
    Alert.alert(
      'No problem',
      'You have chosen not to participate. You can start the screening any time you change your mind.',
      [{ text: 'OK', onPress: () => router.replace('/(main)/index') }],
    );
  };

  const handleProceed = () => {
    setConsentGiven(true);
    router.push('/(main)/age-check');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Before We Begin</Text>
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={100}
        >
          <Text style={styles.sectionTitle}>What we collect</Text>
          <Text style={styles.bodyText}>
            We will ask you 25 questions about your health, activity, and family history. These questions are based on internationally validated SADS screening guidelines.
          </Text>

          <Text style={styles.sectionTitle}>Why we collect it</Text>
          <Text style={styles.bodyText}>
            Your answers help identify whether you may be at risk of Sudden Arrhythmic Death Syndrome (SADS). If we identify a concern, we will advise you to see your GP. Your anonymised answers also contribute to SADS prevention research in Ireland.
          </Text>

          <Text style={styles.sectionTitle}>How we protect it</Text>
          <Text style={styles.bodyText}>
            Your data is stored on encrypted servers in Ireland/EU. We comply fully with Irish GDPR law. Only you and authorised researchers (who cannot see your name or contact details) will have access to your data.
          </Text>

          <Text style={styles.sectionTitle}>Your rights</Text>
          <Text style={styles.bodyText}>
            You can withdraw your consent at any time. Choosing to withdraw will delete all of your personal information from our system within 24 hours. Anonymised research data may be retained as permitted under GDPR Article 89 (research exception).
          </Text>

          <Text style={styles.sectionTitle}>Ages 12–17</Text>
          <Text style={styles.bodyText}>
            If you are between 12 and 17 years old, a parent or guardian must complete the next step with you. Please have them nearby before proceeding.
          </Text>

          <View style={styles.gdprNote}>
            <Text style={styles.gdprNoteText}>
              ✓ Lawful basis: Explicit consent (GDPR Article 6(1)(a)) + research exception (Article 89){'\n'}
              ✓ Data controller: Hassan SADS Research Initiative, Ireland{'\n'}
              ✓ Registered with the Irish Data Protection Commission
            </Text>
          </View>

          {!scrolledToBottom && (
            <Text style={styles.scrollHint}>↓ Please scroll to read all information before proceeding</Text>
          )}
        </ScrollView>

        <View style={styles.buttonRow}>
          {/* BLUE OPT-OUT — non-negotiable per GDPR spec */}
          <TouchableOpacity
            style={styles.optOutBtn}
            onPress={handleOptOut}
            accessibilityLabel="No thanks, I do not want to take part"
            accessibilityHint="Returns you to the home screen without collecting any data"
          >
            <Text style={styles.optOutBtnText}>No Thanks</Text>
          </TouchableOpacity>

          {/* GREEN PROCEED — only enabled after scroll to bottom */}
          <TouchableOpacity
            style={[styles.proceedBtn, !scrolledToBottom && styles.proceedBtnDisabled]}
            onPress={handleProceed}
            disabled={!scrolledToBottom}
            accessibilityLabel="I understand and agree to participate"
          >
            <Text style={styles.proceedBtnText}>I Agree — Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  container: { flex: 1 },
  header: { backgroundColor: T.navy, padding: 20, paddingTop: 12 },
  backBtn: { marginBottom: 8 },
  backBtnText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  scrollArea: { flex: 1 },
  scrollContent: { padding: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: T.navy, marginTop: 20, marginBottom: 6 },
  bodyText: { fontSize: 15, color: T.textSecondary, lineHeight: 24 },
  gdprNote: { backgroundColor: '#E6F4F0', borderRadius: 10, padding: 16, marginTop: 24, borderWidth: 1, borderColor: T.teal },
  gdprNoteText: { fontSize: 13, color: T.teal, lineHeight: 22 },
  scrollHint: { textAlign: 'center', color: T.gold, fontSize: 13, marginTop: 20, fontStyle: 'italic' },
  buttonRow: { flexDirection: 'row', gap: 12, padding: 20, backgroundColor: T.card, borderTopWidth: 1, borderTopColor: T.border },
  optOutBtn: { flex: 1, backgroundColor: T.consentOptOut, borderRadius: 12, padding: 15, alignItems: 'center', minHeight: 50, justifyContent: 'center' },
  optOutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  proceedBtn: { flex: 2, backgroundColor: T.consentProceed, borderRadius: 12, padding: 15, alignItems: 'center', minHeight: 50, justifyContent: 'center' },
  proceedBtnDisabled: { opacity: 0.4 },
  proceedBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
