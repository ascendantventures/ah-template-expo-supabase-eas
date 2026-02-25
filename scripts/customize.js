#!/usr/bin/env node
/**
 * customize.js — Angel Agents BUILD script
 *
 * Usage:
 *   node scripts/customize.js --manifest='{"name":"My App","slug":"my-app","bundleId":"com.example.myapp","primaryColor":"#6366F1","splashColor":"#ffffff","easProjectId":"abc-123","supabaseUrl":"https://xxx.supabase.co","supabaseAnonKey":"eyJ..."}'
 */
const fs = require('fs');
const path = require('path');

const manifestArg = process.argv.find((a) => a.startsWith('--manifest='));
if (!manifestArg) {
  console.error('Missing --manifest=<json>');
  process.exit(1);
}

const manifest = JSON.parse(manifestArg.replace('--manifest=', ''));

const {
  name,
  slug,
  bundleId,
  primaryColor = '#000000',
  splashColor = '#ffffff',
  easProjectId = 'REPLACE_ME',
  supabaseUrl = '',
  supabaseAnonKey = '',
} = manifest;

if (!name) {
  console.error('manifest.name is required');
  process.exit(1);
}

const derivedSlug = slug ?? name.toLowerCase().replace(/\s+/g, '-');
const derivedBundleId =
  bundleId ??
  `com.angelagents.${derivedSlug.toLowerCase().replace(/\W/g, '')}`;

const tokens = {
  __PROJECT_NAME__: name,
  __PROJECT_SLUG__: derivedSlug,
  __BUNDLE_ID__: derivedBundleId,
  __PRIMARY_COLOR__: primaryColor,
  __SPLASH_COLOR__: splashColor,
  __EAS_PROJECT_ID__: easProjectId,
};

const targets = [
  'app.config.ts',
  'app/(auth)/login.tsx',
  'app/(auth)/signup.tsx',
  'app/(app)/index.tsx',
  'README.md',
];

targets.forEach((file) => {
  const fp = path.join(process.cwd(), file);
  if (!fs.existsSync(fp)) {
    console.warn(`⚠  Skipping missing file: ${file}`);
    return;
  }
  let content = fs.readFileSync(fp, 'utf8');
  Object.entries(tokens).forEach(([t, v]) => {
    content = content.replaceAll(t, v);
  });
  fs.writeFileSync(fp, content);
  console.log(`✓ ${file}`);
});

// Generate .env
fs.writeFileSync(
  '.env',
  `EXPO_PUBLIC_SUPABASE_URL=${supabaseUrl}\nEXPO_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}\n`
);
console.log('✓ .env generated');

console.log(`\n✅ Customized for: ${name}`);
console.log(`   Bundle ID : ${derivedBundleId}`);
console.log(`   EAS ID    : ${easProjectId}`);
