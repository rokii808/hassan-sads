import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { router } from 'expo-router';

const T = { navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56', coral: '#C04828', surface: '#F8F9FB', card: '#FFFFFF', textSecondary: '#5F5E5A', border: '#E2E4E9' };

const RESOURCES = [
  { name: 'Irish Heart Foundation', desc: 'SADS screening support, family resources, and cardiac referral pathways.', url: 'https://irishheart.ie', color: T.coral },
  { name: 'CRY Ireland', desc: 'Cardiac Risk in the Young — support for families bereaved by sudden cardiac death.', url: 'https://www.crying.ie', color: T.navy },
  { name: 'CRY UK', desc: 'International SADS research and family screening programmes.', url: 'https://www.cry.org.uk', color: '#1A4A8A' },
  { name: 'Irish Data Protection Commission', desc: 'Your rights under Irish GDPR law. Complaints and data access requests.', url: 'https://www.dataprotection.ie', color: T.textSecondary },
];

export default function ResourcesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>SADS Resources</Text>
        <Text style={styles.subtitle}>Information, support, and referral pathways for SADS in Ireland.</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What is SADS?</Text>
          <Text style={styles.infoBody}>
            Sudden Arrhythmic Death Syndrome (SADS) is sudden cardiac death in people under 40 where no structural cause is found at post-mortem. It is most commonly caused by inherited heart rhythm conditions — many of which can be detected with an ECG or genetic test.
          </Text>
          <Text style={styles.infoBody}>
            In Ireland, SADS is the leading cause of sudden cardiac death in young people. If you have lost a family member to sudden unexpected cardiac death, we strongly recommend that all first-degree relatives (parents, siblings, children) are screened.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Organisations</Text>
        {RESOURCES.map((r) => (
          <TouchableOpacity
            key={r.name}
            style={styles.resourceCard}
            onPress={() => void Linking.openURL(r.url)}
            accessibilityLabel={`Open ${r.name} website`}
          >
            <View style={[styles.resourceDot, { backgroundColor: r.color }]} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceName}>{r.name}</Text>
              <Text style={styles.resourceDesc}>{r.desc}</Text>
              <Text style={styles.resourceLink}>{r.url.replace('https://', '')} →</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Warning signs of SADS risk</Text>
          {[
            'Fainting or collapse during or after exercise',
            'Unexplained seizures (not related to epilepsy)',
            'Chest pain during exercise',
            'Unexplained rapid or irregular heartbeat',
            'Family history of sudden cardiac death under 40',
          ].map((sign) => (
            <View key={sign} style={styles.warningRow}>
              <Text style={styles.warningBullet}>▸</Text>
              <Text style={styles.warningText}>{sign}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Built in memory of Hassan — so no family faces this again.{'\n'}
          This app does not provide medical advice. Always consult your GP.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.surface },
  container: { padding: 24, paddingBottom: 48 },
  backBtn: { marginBottom: 16 },
  backText: { color: T.textSecondary, fontSize: 14 },
  title: { fontSize: 28, fontWeight: '700', color: T.navy, marginBottom: 6 },
  subtitle: { fontSize: 15, color: T.textSecondary, lineHeight: 24, marginBottom: 24 },
  infoCard: { backgroundColor: T.card, borderRadius: 14, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: T.border },
  infoTitle: { fontSize: 17, fontWeight: '700', color: T.navy, marginBottom: 12 },
  infoBody: { fontSize: 14, color: T.textSecondary, lineHeight: 22, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: T.navy, marginBottom: 12 },
  resourceCard: { backgroundColor: T.card, borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', gap: 14, borderWidth: 1, borderColor: T.border },
  resourceDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
  resourceContent: { flex: 1 },
  resourceName: { fontSize: 15, fontWeight: '700', color: T.navy, marginBottom: 4 },
  resourceDesc: { fontSize: 13, color: T.textSecondary, lineHeight: 20, marginBottom: 6 },
  resourceLink: { fontSize: 12, color: T.teal, fontWeight: '600' },
  warningCard: { backgroundColor: '#FAEAE5', borderRadius: 14, padding: 20, marginTop: 8, marginBottom: 24, borderWidth: 1, borderColor: T.coral },
  warningTitle: { fontSize: 15, fontWeight: '700', color: T.coral, marginBottom: 12 },
  warningRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  warningBullet: { color: T.coral, fontWeight: '700', flexShrink: 0 },
  warningText: { flex: 1, fontSize: 14, color: '#7A2A18', lineHeight: 20 },
  footer: { textAlign: 'center', fontSize: 12, color: T.textSecondary, lineHeight: 20, fontStyle: 'italic' },
});
