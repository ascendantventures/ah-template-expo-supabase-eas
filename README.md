# __PROJECT_NAME__

A production-ready mobile app built with [Expo](https://expo.dev) SDK 54, [Supabase](https://supabase.com), and [EAS Build](https://docs.expo.dev/eas/).

## Stack

| Layer | Tech |
|-------|------|
| Framework | Expo SDK 54 + React Native 0.81 |
| Routing | Expo Router (file-based) |
| Auth & DB | Supabase |
| Build | EAS Build + EAS Submit |
| Language | TypeScript (strict) |

---

## Getting started

### 1. Prerequisites

- [Node 20+](https://nodejs.org)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [EAS CLI](https://docs.expo.dev/eas/) — `npm install -g eas-cli`
- A [Supabase](https://supabase.com) project

### 2. Clone & install

```bash
git clone <your-repo-url>
cd <your-repo>
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Run locally

```bash
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/go) (iOS/Android) or press `w` for web.

---

## Project structure

```
app/
  _layout.tsx          Root layout — session-based auth redirect
  index.tsx            Fallback redirect to login
  (auth)/
    _layout.tsx
    login.tsx          Email/password sign in
    signup.tsx         New account creation
  (app)/
    _layout.tsx        Tab bar (protected)
    index.tsx          Home screen
lib/
  supabase.ts          Supabase client (AsyncStorage session)
  env.ts               Env var validation
hooks/
  useSession.ts        Auth session hook
scripts/
  customize.js         Angel Agents BUILD customization script
components/
  ui/                  Reusable UI components (add yours here)
```

---

## Authentication

Auth is handled by Supabase. The root layout redirects unauthenticated users to `/(auth)/login` and authenticated users away from the auth group.

To enable providers (Google, GitHub, etc.) add them in your [Supabase dashboard](https://supabase.com/dashboard) → Authentication → Providers.

---

## EAS Build

### Set up EAS for your project

```bash
eas init           # links your Expo account
eas build:configure
```

Update the `eas.projectId` in `app.config.ts` (or run `scripts/customize.js`).

### Build profiles

| Profile | Description |
|---------|-------------|
| `development` | Dev client build for local development |
| `preview` | Internal distribution (TestFlight / Play internal) |
| `production` | App Store / Play Store release |

### Trigger builds

```bash
# Development client
eas build --profile development --platform ios
eas build --profile development --platform android

# Preview (internal test)
eas build --profile preview --platform all

# Production
eas build --profile production --platform all
```

### Submit to stores

```bash
eas submit --platform ios
eas submit --platform android
```

---

## Environment variables in EAS

EAS builds need your env vars. Add them via the EAS dashboard or CLI:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://xxxx.supabase.co"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJ..."
```

---

## Customisation (Angel Agents BUILD)

Run the bundled script to replace template tokens with your project values:

```bash
node scripts/customize.js --manifest='{
  "name": "__PROJECT_NAME__",
  "slug": "__PROJECT_SLUG__",
  "bundleId": "__BUNDLE_ID__",
  "primaryColor": "#6366F1",
  "splashColor": "#ffffff",
  "easProjectId": "your-eas-project-id",
  "supabaseUrl": "https://xxx.supabase.co",
  "supabaseAnonKey": "eyJ..."
}'
```

---

## TypeScript

```bash
npx tsc --noEmit
```

---

## License

MIT
