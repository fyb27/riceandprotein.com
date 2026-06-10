#!/usr/bin/env node
/*
 * integrate-foods.js
 * Merges workflow-produced dish objects into data/foods.json after a QA pass.
 *
 * Usage: node scripts/integrate-foods.js path/to/new-foods.json
 *   - new-foods.json is the array the build-foods-workflow returned.
 *
 * Does NOT generate HTML. After this succeeds, run:
 *   node scripts/generate-foods.js
 *
 * QA gates (a failure here aborts the merge so foods.json is never corrupted):
 *   - no em dashes / en dashes anywhere in any string field
 *   - every related slug resolves against the final combined set
 *   - no duplicate slugs vs existing data
 *   - component calories sum within 15% of the stated total (warn only)
 *   - calories within a sane 5..2500 range (warn only)
 *   - required fields present
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');
const inFile = process.argv[2];
if (!inFile) { console.error('Usage: node scripts/integrate-foods.js <new-foods.json>'); process.exit(1); }

const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const incoming = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const newFoods = Array.isArray(incoming) ? incoming : incoming.foods;

const REQUIRED = ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','components','faq','related'];
const CATEGORY_KEYS = Object.keys(db.categories);
const DASH = /[‒–—―−]|--/; // figure/en/em/horizontal-bar/minus, or double hyphen

const errors = [];
const warns = [];

// walk every string in an object, report any em/en dash
function dashScan(slug, val, pathStr) {
  if (typeof val === 'string') {
    if (DASH.test(val)) errors.push(`[${slug}] dash found in ${pathStr}: "${val}"`);
  } else if (Array.isArray(val)) {
    val.forEach((v, i) => dashScan(slug, v, `${pathStr}[${i}]`));
  } else if (val && typeof val === 'object') {
    for (const k of Object.keys(val)) dashScan(slug, val[k], `${pathStr}.${k}`);
  }
}

const existingSlugs = new Set(db.foods.map(f => f.slug));
const incomingSlugs = new Set(newFoods.map(f => f.slug));
const finalSlugs = new Set([...existingSlugs, ...incomingSlugs]);

for (const f of newFoods) {
  const slug = f.slug || '(no slug)';
  for (const r of REQUIRED) if (f[r] === undefined || f[r] === null) errors.push(`[${slug}] missing field: ${r}`);
  if (existingSlugs.has(f.slug)) errors.push(`[${slug}] duplicate of an existing slug`);
  if (!CATEGORY_KEYS.includes(f.category)) errors.push(`[${slug}] bad category: ${f.category}`);
  dashScan(slug, f, 'food');

  // related must resolve and not self-reference
  (f.related || []).forEach(rs => {
    if (!finalSlugs.has(rs)) errors.push(`[${slug}] related slug does not resolve: ${rs}`);
    if (rs === f.slug) errors.push(`[${slug}] related references itself`);
  });

  // component sum sanity (warn)
  if (Array.isArray(f.components) && f.components.length) {
    const sum = f.components.reduce((a, c) => a + (c.calories || 0), 0);
    const diff = Math.abs(sum - f.calories);
    if (f.calories > 0 && diff / f.calories > 0.15) warns.push(`[${slug}] components sum ${sum} vs total ${f.calories} (off ${Math.round(diff / f.calories * 100)}%)`);
  }
  // calorie range sanity (warn)
  if (f.calories < 5 || f.calories > 2500) warns.push(`[${slug}] calories out of expected range: ${f.calories}`);
  // meta length (warn)
  if (typeof f.metaDescription === 'string' && f.metaDescription.length > 158) warns.push(`[${slug}] metaDescription ${f.metaDescription.length} chars (>155)`);
}

// dup within incoming
const seen = new Set();
for (const f of newFoods) { if (seen.has(f.slug)) errors.push(`[${f.slug}] duplicated within incoming set`); seen.add(f.slug); }

console.log(`Incoming: ${newFoods.length} dishes. Existing: ${db.foods.length}. Final would be: ${db.foods.length + newFoods.length}.`);
if (warns.length) { console.log(`\n${warns.length} WARNINGS (non-blocking):`); warns.forEach(w => console.log('  ! ' + w)); }
if (errors.length) {
  console.log(`\n${errors.length} ERRORS (merge aborted):`);
  errors.forEach(e => console.log('  x ' + e));
  process.exit(2);
}

// keep only the canonical fields in canonical order so foods.json stays clean
const ORDER = ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','variants','components','faq','related','deepPost'];
const clean = newFoods.map(f => {
  const o = {};
  for (const k of ORDER) if (f[k] !== undefined) o[k] = f[k];
  return o;
});

db.foods.push(...clean);
fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n');
console.log(`\nOK. Merged ${clean.length} dishes into data/foods.json (now ${db.foods.length}).`);
console.log('Next: node scripts/generate-foods.js');
