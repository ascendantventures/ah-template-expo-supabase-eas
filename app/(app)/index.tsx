import { Pressable, StyleSheet, Text, View } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to __PROJECT_NAME__!</Text>
      <Text style={styles.subtitle}>You're logged in 🎉</Text>

      <Pressable style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 40 },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
