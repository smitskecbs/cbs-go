import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appVersionPath = join(root, 'src/app/appVersion.js');
const outPath = join(root, 'public/version.json');

const content = readFileSync(appVersionPath, 'utf8');
const match = content.match(/CBSGO_APP_VERSION\s*=\s*['"]([^'"]+)['"]/);
if (!match) {
  console.error('sync-version-json: CBSGO_APP_VERSION not found in appVersion.js');
  process.exit(1);
}

const payload = { version: match[1] };
writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`sync-version-json: wrote ${outPath} (${payload.version})`);
