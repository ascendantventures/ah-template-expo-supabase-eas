import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: '__PROJECT_NAME__',
  slug: '__PROJECT_SLUG__',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '__SPLASH_COLOR__',
  },
  ios: {
    bundleIdentifier: '__BUNDLE_ID__',
    supportsTablet: true,
  },
  android: {
    package: '__BUNDLE_ID__',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '__SPLASH_COLOR__',
    },
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: '__EAS_PROJECT_ID__',
    },
  },
  plugins: ['expo-router'],
});
