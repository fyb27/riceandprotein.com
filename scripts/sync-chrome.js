#!/usr/bin/env node
/*
 * sync-chrome.js
 * Replaces the <header class="site-header"> ... </header> and
 * <footer class="site-footer"> ... </footer> blocks in the hand written pages
 * with the generator's header()/footer(), so the country list in the nav is
 * the same everywhere. Run after generate-foods.js whenever a country is added.
 *
 *   node scripts/sync-chrome.js
 */
const fs = require('fs');
const path = require('path');
const { header, footer } = require('./generate-foods.js');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  ['index.html', ''],
  ['about.html', ''],
  ['contact.html', ''],
  ['diets.html', ''],
  ['diets/keto.html', '../'],
  ['diets/if.html', '../'],
  ['diets/paleo.html', '../'],
  ['diets/cico.html', '../'],
  ['diets/volume-eating.html', '../'],
  ['diets/omad.html', '../'],
];

const HEADER_RE = /<header class="site-header">[\s\S]*?<\/header>/;
const FOOTER_RE = /<footer class="site-footer">[\s\S]*?<\/footer>/;

let changed = 0;
for (const [rel, prefix] of PAGES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.warn('  skip (missing): ' + rel); continue; }
  const before = fs.readFileSync(file, 'utf8');
  if (!HEADER_RE.test(before) || !FOOTER_RE.test(before)) {
    console.error('  no header/footer block found in ' + rel);
    process.exit(1);
  }
  const after = before
    .replace(HEADER_RE, header(prefix).trim())
    .replace(FOOTER_RE, footer(prefix).trim());
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('  synced ' + rel);
  }
}
console.log('Done. ' + changed + ' of ' + PAGES.length + ' pages updated.');
