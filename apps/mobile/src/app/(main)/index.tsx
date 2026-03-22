import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

const T = {
  navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56',
  coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF',
  textSecondary: '#5F5E5A', border: '#E2E4E9',
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Hassan SADS</Text>
          <View style={styles.goldLine} />
          <Text style={styles.tagline}>Cardiac Screening · Ireland</Text>
        </View>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>SADS affects young people in Ireland every year.</Text>
          <Text style={styles.heroBody}>
            Sudden Arrhythmic Death Syndrome (SADS) is the leading cause of sudden cardiac death in people under 40 — with no warning signs on a post-mortem. But many risk factors can be detected before a cardiac event occurs.
          </Text>
          <Text style={styles.heroBody}>
            This screening takes about 5 minutes. Your answers help protect you — and advance life-saving SADS research in Ireland.
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatBox value="5×" label="Under-reported in official data" />
          <StatBox value="50%" label="Bereaved families carry identifiable inherited condition" />
          <StatBox value="12+" label="Years old — all ages welcome" />
        </View>

        {/* Dedication */}
        <View style={styles.dedicationCard}>
          <Text style={styles.goldDot}>◆</Text>
          <Text style={styles.dedication}>Built in memory of Hassan — so no family faces this again.</Text>
        </View>

        {/* CTAs */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(main)/consent')}>
          <Text style={styles.primaryBtnText}>Start Screening</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(main)/resources')}>
          <Text style={styles.secondaryBtnText}>Learn about SADS</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Irish GDPR compliant · Your data is protected · Withdraw anytime
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.navy },
  container: { padding: 24, paddingBottom: 48 },
  header: { alignItems: 'center', marginBottom: 32, paddingTop: 16 },
  appName: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  goldLine: { width: 40, height: 3, backgroundColor: T.gold, marginVertical: 10, borderRadius: 2 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5, textTransform: 'uppercase' },
  heroCard: { backgroundColor: T.card, borderRadius: 16, padding: 24, marginBottom: 20 },
  heroTitle: { fontSize: 20, fontWeight: '700', color: T.navy, marginBottom: 12, lineHeight: 28 },
  heroBody: { fontSize: 15, color: T.textSecondary, lineHeight: 24, marginBottom: 10 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statValue: { fontSize: 24, fontWeight: '700', color: T.gold, marginBottom: 4 },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 16 },
  dedicationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(201,168,76,0.12)', borderRadius: 12, padding: 16, marginBottom: 28, borderWidth: 1, borderColor: 'rgba(201,168,76,0.25)' },
  goldDot: { fontSize: 12, color: T.gold, marginRight: 10 },
  dedication: { flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', lineHeight: 22 },
  primaryBtn: { backgroundColor: T.teal, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  secondaryBtn: { backgroundColor: 'transparent', borderRadius: 12, padding: 15, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 24 },
  secondaryBtnText: { color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 18 },
});
