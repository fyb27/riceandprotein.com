#!/usr/bin/env node
/* One-off: add the Western category + 50 new foods from data/_batch/*.json into foods.json.
   Run once: node scripts/add-batch.js   then: node scripts/generate-foods.js */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');
const BATCH = path.join(ROOT, 'data', '_batch');

const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));

// New category "Western & Burgers", slotted after snacks (street-food neighbourhood).
const cats = {};
for (const [k, v] of Object.entries(db.categories)) {
  cats[k] = v;
  if (k === 'snacks') cats['western'] = 'Western & Burgers';
}
db.categories = cats;

const files = ['drinks.json', 'dessert.json', 'western.json', 'snacks.json', 'lauk.json', 'ricenoodlesoup.json'];
let NEW = [];
for (const f of files) {
  const arr = JSON.parse(fs.readFileSync(path.join(BATCH, f), 'utf8'));
  NEW = NEW.concat(arr);
}

// ---- QA gates ----
const errors = [];
const DASH = /[‒–—―−]/; // figure/en/em/horiz/minus dashes
const REQ = ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','components','portions','faq','related'];

const existingSlugs = new Set(db.foods.map(f => f.slug));
const newSlugs = new Set();
const validCats = new Set(Object.keys(db.categories));

for (const f of NEW) {
  const id = f.slug || '(no slug)';
  for (const k of REQ) if (!(k in f)) errors.push(`${id}: missing field ${k}`);
  if (existingSlugs.has(f.slug)) errors.push(`${id}: slug already exists in DB`);
  if (newSlugs.has(f.slug)) errors.push(`${id}: duplicate slug within batch`);
  newSlugs.add(f.slug);
  if (!validCats.has(f.category)) errors.push(`${id}: unknown category ${f.category}`);
  if (!Array.isArray(f.realTalk) || f.realTalk.length !== 2) errors.push(`${id}: realTalk must be 2`);
  if (!Array.isArray(f.lighter) || f.lighter.length < 3) errors.push(`${id}: lighter must be >=3`);
  if (!Array.isArray(f.portions) || f.portions.length !== 3) errors.push(`${id}: portions must be 3`);
  if (!Array.isArray(f.faq) || f.faq.length !== 3) errors.push(`${id}: faq must be 3`);
  if (!Array.isArray(f.related) || f.related.length !== 3) errors.push(`${id}: related must be 3`);
  // macro sanity: 4/4/9 within tolerance
  const kcalFromMacros = f.protein*4 + f.carbs*4 + f.fat*9;
  if (Math.abs(kcalFromMacros - f.calories) > f.calories*0.18 + 25)
    errors.push(`${id}: macro kcal ${kcalFromMacros} vs stated ${f.calories} (off)`);
  // component sum sanity
  const compSum = (f.components||[]).reduce((s,c)=>s+(c.calories||0),0);
  if (Math.abs(compSum - f.calories) > f.calories*0.12 + 20)
    errors.push(`${id}: component sum ${compSum} vs ${f.calories} (off)`);
  // dash scan across all string content
  const blob = JSON.stringify(f);
  if (DASH.test(blob)) errors.push(`${id}: contains an em/en dash`);
}

// related resolution against final union
const finalSlugs = new Set([...existingSlugs, ...newSlugs]);
for (const f of NEW) {
  for (const r of (f.related||[])) {
    if (!finalSlugs.has(r)) errors.push(`${f.slug}: related slug '${r}' does not resolve`);
    if (r === f.slug) errors.push(`${f.slug}: related references itself`);
  }
}

if (errors.length) {
  console.error('QA FAILED, aborting. No files written.\n');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

db.foods = db.foods.concat(NEW);
fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`QA passed. Added ${NEW.length} foods. Total now ${db.foods.length}.`);
console.log(`New category: Western & Burgers. Categories now: ${Object.keys(db.categories).join(', ')}`);
