import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBrowserClient } from '@hassan-sads/db';

const supabaseUrl = process.env['EXPO_PUBLIC_SUPABASE_URL']!;
const supabaseAnonKey = process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY']!;

export const supabase = getBrowserClient(supabaseUrl, supabaseAnonKey);

// Set up AsyncStorage for session persistence on mobile
supabase.auth.onAuthStateChange((_event, _session) => {
  // Session is handled by Supabase internals with AsyncStorage
});
