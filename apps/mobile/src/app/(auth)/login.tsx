import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

const T = {
  navy: '#0A1628', gold: '#C9A84C', teal: '#0F6E56',
  surface: '#F8F9FB', card: '#FFFFFF',
  textSecondary: '#5F5E5A', border: '#E2E4E9',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Sign in failed', error.message);
    } else {
      router.replace('/(main)/index');
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Please enter your email and a password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Registration failed', error.message);
    } else {
      Alert.alert('Check your email', 'We sent you a confirmation link. Please verify your email before signing in.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.appName}>Hassan SADS</Text>
            <View style={styles.goldLine} />
            <Text style={styles.tagline}>Cardiac Screening · Ireland</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign In</Text>
            <Text style={styles.cardSubtitle}>
              Sign in to track your screening history and results.
            </Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.ie"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              accessibilityLabel="Email address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="password"
              accessibilityLabel="Password"
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Ages 12–17: Please complete this with a parent or guardian.
                Your data is protected under Irish GDPR law.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.btnDisabled]}
              onPress={() => void handleSignIn()}
              disabled={loading}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={() => void handleRegister()} disabled={loading}>
              <Text style={styles.secondaryBtnText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/(main)/index')}>
              <Text style={styles.skipText}>Continue without account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Built in memory of Hassan — so no family faces this again.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.navy },
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 28 },
  appName: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  goldLine: { width: 36, height: 3, backgroundColor: T.gold, marginVertical: 10, borderRadius: 2 },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, textTransform: 'uppercase' },
  card: { backgroundColor: T.card, borderRadius: 20, padding: 24 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: T.navy, marginBottom: 6 },
  cardSubtitle: { fontSize: 14, color: T.textSecondary, lineHeight: 22, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: T.navy, marginBottom: 6 },
  input: {
    borderWidth: 1.5, borderColor: T.border, borderRadius: 10,
    padding: 13, fontSize: 15, marginBottom: 14,
    fontFamily: 'System', backgroundColor: T.surface,
  },
  infoBox: { backgroundColor: '#E6F4F0', borderRadius: 10, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: T.teal },
  infoText: { fontSize: 12, color: T.teal, lineHeight: 19 },
  primaryBtn: { backgroundColor: T.navy, borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 10 },
  btnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { borderWidth: 1.5, borderColor: T.navy, borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 16 },
  secondaryBtnText: { color: T.navy, fontSize: 15, fontWeight: '600' },
  skipBtn: { alignItems: 'center' },
  skipText: { color: T.textSecondary, fontSize: 13, textDecorationLine: 'underline' },
  footer: { textAlign: 'center', marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', lineHeight: 18 },
});
