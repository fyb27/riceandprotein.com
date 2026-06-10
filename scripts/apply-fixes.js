#!/usr/bin/env node
/*
 * apply-fixes.js
 * Applies repaired dish objects back into data/foods.json by REPLACING the
 * matching slugs in place. Re-runs the QA gate. Aborts on any hard failure so
 * foods.json is never left in a bad state.
 *
 * Usage: node scripts/apply-fixes.js path/to/fixed.json
 * Then:  node scripts/generate-foods.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');

const inFile = process.argv[2];
if (!inFile) { console.error('Usage: node scripts/apply-fixes.js <fixed.json>'); process.exit(1); }

const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const fixed = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const bySlug = Object.fromEntries(db.foods.map((f, i) => [f.slug, { f, i }]));
const allSlugs = new Set(db.foods.map(f => f.slug));
const CATEGORY_KEYS = Object.keys(db.categories);
const DASH = /[‒–—―−]|--/;
const BANNED = [/fuel your body/i, /clean eating/i, /\beat clean\b/i, /wellness journey/i, /nutrient[- ]dense/i, /\bdelve\b/i, /(^|")\s*Look,/];
const LOCKED = ['slug', 'name', 'category', 'serving', 'servingGrams', 'calories', 'protein', 'carbs', 'fat'];
const REQUIRED = ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','components','faq','related'];

const errors = [];
const warns = [];

function dashScan(slug, val, p) {
  if (typeof val === 'string') { if (DASH.test(val)) errors.push(`[${slug}] dash in ${p}: "${val}"`); }
  else if (Array.isArray(val)) val.forEach((v, i) => dashScan(slug, v, `${p}[${i}]`));
  else if (val && typeof val === 'object') for (const k of Object.keys(val)) dashScan(slug, val[k], `${p}.${k}`);
}

for (const nf of fixed) {
  const slug = nf.slug || '(no slug)';
  const cur = bySlug[slug];
  if (!cur) { errors.push(`[${slug}] not found in foods.json (repair must replace an existing dish)`); continue; }

  for (const r of REQUIRED) if (nf[r] === undefined || nf[r] === null) errors.push(`[${slug}] missing field: ${r}`);
  if (!CATEGORY_KEYS.includes(nf.category)) errors.push(`[${slug}] bad category: ${nf.category}`);

  // locked fields must not have drifted
  for (const k of LOCKED) if (JSON.stringify(nf[k]) !== JSON.stringify(cur.f[k])) warns.push(`[${slug}] locked field ${k} changed: ${JSON.stringify(cur.f[k])} -> ${JSON.stringify(nf[k])}`);

  dashScan(slug, nf, 'food');
  const blob = JSON.stringify(nf);
  for (const b of BANNED) if (b.test(blob)) errors.push(`[${slug}] banned phrase ${b}`);

  (nf.related || []).forEach(rs => {
    if (!allSlugs.has(rs)) errors.push(`[${slug}] related slug does not resolve: ${rs}`);
    if (rs === nf.slug) errors.push(`[${slug}] related references itself`);
  });

  if (Array.isArray(nf.components) && nf.components.length && nf.calories > 0) {
    const sum = nf.components.reduce((a, c) => a + (c.calories || 0), 0);
    if (Math.abs(sum - nf.calories) > 6) errors.push(`[${slug}] components sum ${sum} vs total ${nf.calories} (must be within 6)`);
  }
  if (typeof nf.metaDescription === 'string' && nf.metaDescription.length > 158) warns.push(`[${slug}] metaDescription ${nf.metaDescription.length} chars`);

  // macro energy sanity
  const fromMacro = nf.protein * 4 + nf.carbs * 4 + nf.fat * 9;
  if (nf.calories > 0 && Math.abs(fromMacro - nf.calories) / nf.calories > 0.30) warns.push(`[${slug}] macro-math ${fromMacro} vs ${nf.calories}`);
}

console.log(`Repairs to apply: ${fixed.length}`);
if (warns.length) { console.log(`\n${warns.length} WARNINGS:`); warns.forEach(w => console.log('  ! ' + w)); }
if (errors.length) { console.log(`\n${errors.length} ERRORS (apply aborted):`); errors.forEach(e => console.log('  x ' + e)); process.exit(2); }

const ORDER = ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','variants','components','faq','related','deepPost'];
let applied = 0;
for (const nf of fixed) {
  const { i } = bySlug[nf.slug];
  const o = {};
  for (const k of ORDER) if (nf[k] !== undefined) o[k] = nf[k];
  db.foods[i] = o;
  applied++;
}
fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n');
console.log(`\nOK. Replaced ${applied} dishes in data/foods.json (still ${db.foods.length} total).`);
console.log('Next: node scripts/generate-foods.js');
