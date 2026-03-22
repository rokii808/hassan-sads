import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useQuestionnaireStore } from '@/store/questionnaire';
import type { AgeBand } from '@hassan-sads/questionnaire';

const T = { navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56', surface: '#F8F9FB', card: '#FFFFFF', textSecondary: '#5F5E5A', border: '#E2E4E9', coral: '#C04828' };

function calculateAge(dob: string): number | null {
  const parts = dob.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getAgeBand(age: number): AgeBand {
  if (age <= 17) return '12-17';
  if (age <= 25) return '18-25';
  if (age <= 35) return '26-35';
  return '36+';
}

export default function AgeCheckScreen() {
  const [dob, setDob] = useState('');
  const [parentConfirmed, setParentConfirmed] = useState(false);
  const [showParentPrompt, setShowParentPrompt] = useState(false);
  const { setAgeBand, setParentConsentGiven } = useQuestionnaireStore();

  const handleContinue = () => {
    const age = calculateAge(dob);
    if (!age || age < 12) {
      Alert.alert('Age Requirement', 'You must be at least 12 years old to complete this screening.');
      return;
    }
    if (age > 80) {
      Alert.alert('Age Check', 'Please double-check your date of birth and try again.');
      return;
    }

    const band = getAgeBand(age);
    setAgeBand(band);

    if (band === '12-17') {
      setShowParentPrompt(true);
    } else {
      router.push('/(main)/questionnaire/1');
    }
  };

  const handleParentConfirm = () => {
    setParentConsentGiven(true);
    router.push('/(main)/questionnaire/1');
  };

  if (showParentPrompt) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>👨‍👩‍👧</Text>
            <Text style={styles.cardTitle}>Parent or Guardian Required</Text>
            <Text style={styles.cardBody}>
              Because you are between 12 and 17 years old, a parent or guardian must be present and agree to your participation.
            </Text>
            <Text style={styles.cardBody}>
              Please hand the phone to your parent or guardian to confirm their consent before you continue.
            </Text>
            <View style={styles.checkRow}>
              <TouchableOpacity
                style={[styles.checkbox, parentConfirmed && styles.checkboxChecked]}
                onPress={() => setParentConfirmed(!parentConfirmed)}
              >
                {parentConfirmed && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkLabel}>I am a parent or guardian and I consent to my child completing this screening.</Text>
            </View>
            <TouchableOpacity
              style={[styles.primaryBtn, !parentConfirmed && styles.btnDisabled]}
              onPress={handleParentConfirm}
              disabled={!parentConfirmed}
            >
              <Text style={styles.primaryBtnText}>Continue to Screening</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>How old are you?</Text>
          <Text style={styles.subtitle}>Your age helps us give you the right advice and route you to the right support.</Text>

          <Text style={styles.label}>Date of birth (DD/MM/YYYY)</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="e.g. 15/06/2005"
            keyboardType="numeric"
            maxLength={10}
            accessibilityLabel="Date of birth"
          />
          <Text style={styles.hint}>Your date of birth is not stored in our research dataset — only your age band (e.g. 12–17, 18–25).</Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleContinue}>
            <Text style={styles.primaryBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  container: { flex: 1, padding: 24 },
  backBtn: { marginBottom: 20 },
  backText: { color: T.textSecondary, fontSize: 14 },
  card: { backgroundColor: T.card, borderRadius: 16, padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: T.navy, marginBottom: 8 },
  subtitle: { fontSize: 15, color: T.textSecondary, lineHeight: 24, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: T.navy, marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: T.border, borderRadius: 10, padding: 14, fontSize: 16, fontFamily: 'monospace', marginBottom: 8 },
  hint: { fontSize: 12, color: T.textSecondary, lineHeight: 18, marginBottom: 24 },
  primaryBtn: { backgroundColor: T.teal, borderRadius: 12, padding: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardIcon: { fontSize: 40, textAlign: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: T.navy, textAlign: 'center', marginBottom: 12 },
  cardBody: { fontSize: 15, color: T.textSecondary, lineHeight: 24, marginBottom: 12 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 24, marginTop: 8 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: T.navy, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  checkboxChecked: { backgroundColor: T.navy },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { flex: 1, fontSize: 14, color: T.textSecondary, lineHeight: 22 },
});
