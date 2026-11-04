import fs from 'node:fs';
import path from 'node:path';

const frDir = path.resolve('src/i18n/locales/fr');
const enDir = path.resolve('src/i18n/locales/en');

function flattenKeys(obj, prefix = '') {
  let keys = {};
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(keys, flattenKeys(v, fullKey));
    } else {
      keys[fullKey] = v;
    }
  }
  return keys;
}

function findPlaceholders(str) {
  if (typeof str !== 'string') return [];
  const matches = str.match(/\{\{[^}]+\}\}/g);
  return matches ? matches.sort() : [];
}

const frFiles = fs.readdirSync(frDir).filter((f) => f.endsWith('.json'));
const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith('.json'));

console.log('='.repeat(70));
console.log('  NetOps Academy - i18n Dictionary Parity & Quality Audit');
console.log('='.repeat(70));

let totalFrKeys = 0;
let totalEnKeys = 0;
let hasError = false;

const allNamespaces = Array.from(new Set([...frFiles, ...enFiles])).sort();

console.log(`\nFound ${allNamespaces.length} namespaces across FR and EN locales:\n`);

for (const file of allNamespaces) {
  const frPath = path.join(frDir, file);
  const enPath = path.join(enDir, file);

  if (!fs.existsSync(frPath)) {
    console.error(`❌ [${file}] Missing in FR locale: ${frPath}`);
    hasError = true;
    continue;
  }
  if (!fs.existsSync(enPath)) {
    console.error(`❌ [${file}] Missing in EN locale: ${enPath}`);
    hasError = true;
    continue;
  }

  const frData = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  const frKeys = flattenKeys(frData);
  const enKeys = flattenKeys(enData);

  const frKeyList = Object.keys(frKeys);
  const enKeyList = Object.keys(enKeys);

  totalFrKeys += frKeyList.length;
  totalEnKeys += enKeyList.length;

  const missingInEn = frKeyList.filter((k) => !(k in enKeys));
  const missingInFr = enKeyList.filter((k) => !(k in frKeys));

  let emptyValues = [];
  for (const [k, v] of Object.entries(frKeys)) {
    if (v === '' || v === null || v === undefined) emptyValues.push(`FR: ${k}`);
  }
  for (const [k, v] of Object.entries(enKeys)) {
    if (v === '' || v === null || v === undefined) emptyValues.push(`EN: ${k}`);
  }

  let interpolationMismatches = [];
  for (const k of frKeyList) {
    if (k in enKeys) {
      const frHolders = findPlaceholders(frKeys[k]);
      const enHolders = findPlaceholders(enKeys[k]);
      if (JSON.stringify(frHolders) !== JSON.stringify(enHolders)) {
        interpolationMismatches.push(`${k} (FR: ${frHolders.join(', ')} vs EN: ${enHolders.join(', ')})`);
      }
    }
  }

  const nsName = file.replace('.json', '').padEnd(14, ' ');
  if (missingInEn.length === 0 && missingInFr.length === 0 && emptyValues.length === 0 && interpolationMismatches.length === 0) {
    console.log(`  ✓ ${nsName} : ${frKeyList.length} keys | Strict 1:1 Parity [PASS]`);
  } else {
    console.log(`  ✗ ${nsName} : FR=${frKeyList.length} vs EN=${enKeyList.length} [FAIL]`);
    if (missingInEn.length) {
      console.log(`    Missing in EN (${missingInEn.length}):`, missingInEn.slice(0, 5).join(', '));
      hasError = true;
    }
    if (missingInFr.length) {
      console.log(`    Missing in FR (${missingInFr.length}):`, missingInFr.slice(0, 5).join(', '));
      hasError = true;
    }
    if (emptyValues.length) {
      console.log(`    Empty values:`, emptyValues.join(', '));
      hasError = true;
    }
    if (interpolationMismatches.length) {
      console.log(`    Interpolation placeholder mismatches:`, interpolationMismatches.join(', '));
      hasError = true;
    }
  }
}

console.log('\n' + '-'.repeat(70));
console.log(`Total Keys Across Namespaces -> FR: ${totalFrKeys} | EN: ${totalEnKeys}`);
console.log('-'.repeat(70));

if (hasError || totalFrKeys !== totalEnKeys) {
  console.error('\n❌ Audit completed with parity errors or missing keys.\n');
  process.exit(1);
} else {
  console.log('\n✓ 100% Dictionary parity achieved across all 10 namespaces.\n');
  process.exit(0);
}
