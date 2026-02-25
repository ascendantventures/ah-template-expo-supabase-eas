import { Redirect } from 'expo-router';

/**
 * Root index — redirect based on auth state is handled in _layout.tsx.
 * This file is a fallback that sends unauthenticated users to login.
 */
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
