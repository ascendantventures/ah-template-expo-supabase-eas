/**
 * Environment variable validation.
 * Import this file early in your app (e.g., in app/_layout.tsx) to catch
 * missing env vars at startup.
 */

const required = [
  'EXPO_PUBLIC_SUPABASE_URL',
  'EXPO_PUBLIC_SUPABASE_ANON_KEY',
] as const;

type RequiredEnvKey = (typeof required)[number];

function getEnvVar(key: RequiredEnvKey): string {
  const value = process.env[key];
  if (!value) {
    console.warn(
      `[env] Missing required environment variable: ${key}\n` +
        `  Copy .env.example → .env and fill in the values.`
    );
  }
  return value ?? '';
}

export const env = {
  supabaseUrl: getEnvVar('EXPO_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
};
