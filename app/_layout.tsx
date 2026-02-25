import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useSession } from '@/hooks/useSession';

export default function RootLayout() {
  const { session, loading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(app)');
    }
  }, [session, loading]);

  return <Slot />;
}
