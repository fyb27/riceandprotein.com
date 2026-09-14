#!/usr/bin/env node
/*
 * add-region-batch.js <cc>
 * Merges data/_batch/<cc>-*.json into data/foods.json behind a QA gate.
 *
 *   node scripts/add-region-batch.js sg          then: node scripts/generate-foods.js
 *   node scripts/add-region-batch.js sg --dry    QA only, writes nothing
 *
 * For sg it also tags the shared Malaysian dishes with region sg and adds the
 * Singapore spellings as aliases (the SHARED map below). Re-running for a
 * region whose files are all already merged is a no-op; files containing only
 * merged slugs are skipped, so top-up files can be added and merged later.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');
const BATCH = path.join(ROOT, 'data', '_batch');
const ADDED = '2026-09-14';

const cc = (process.argv[2] || '').toLowerCase();
const DRY = process.argv.includes('--dry'); // QA only, never writes foods.json
const VALID = ['my', 'sg', 'id', 'th', 'vn', 'ph', 'hk', 'jp', 'kr'];
if (!VALID.includes(cc)) {
  console.error('usage: node scripts/add-region-batch.js <' + VALID.join('|') + '>');
  process.exit(1);
}

// Hub slugs the generator owns. A food can never use these.
const HUB_SLUGS = new Set([
  'rice-meals', 'noodles', 'dim-sum', 'mamak-and-bread', 'soups', 'meat-grills-and-lauk',
  'vegetables-and-sides', 'snacks-and-kuih', 'western-and-burgers', 'drinks', 'desserts',
  'malaysia', 'singapore', 'indonesia', 'thailand', 'vietnam', 'philippines', 'hong-kong', 'japan', 'korea'
]);

const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const bySlug = Object.fromEntries(db.foods.map(f => [f.slug, f]));

// ---- shared dishes (sg only) ----
// Existing Malaysian dishes that are just as much Singapore hawker food.
// Value = Singapore spellings worth an alias (empty = tag only).
const SHARED_SG = {
  'chicken-rice': ['Hainanese Chicken Rice', 'Singapore Chicken Rice'],
  'char-kuey-teow': ['Char Kway Teow'],
  'roti-canai': ['Roti Prata', 'Prata'],
  'nasi-campur': ['Cai Png', 'Cai Fan', 'Economy Rice'],
  'curry-laksa': ['Laksa Lemak', 'Katong Laksa', 'Singapore Laksa'],
  'wantan-mee': ['Wanton Mee', 'Wonton Noodles'],
  'fish-ball-noodles': ['Fishball Noodles', 'Mee Pok Fishball'],
  'pan-mee': ['Ban Mian', 'Mee Hoon Kueh'],
  'lor-mee': [],
  'mee-siam': [],
  'mee-rebus': [],
  'bak-kut-teh': ['Teochew Bak Kut Teh'],
  'popiah': [],
  'char-siew-rice': [],
  'roast-duck': ['Duck Rice'],
  'kaya-toast': ['Ya Kun Kaya Toast'],
  'murtabak': [],
  'nasi-briyani': ['Nasi Biryani'],
  'nasi-lemak': [],
  'thosai': [],
  'yong-tau-foo-soup': ['Yong Tau Foo', 'YTF'],
  'hakka-lei-cha': ['Thunder Tea Rice', 'Lei Cha Fan'],
  'cheng-tng': [],
  'tau-fu-fah': ['Tau Huay', 'Beancurd Pudding'],
  'ais-kacang': ['Ice Kacang', 'Ice Kachang'],
  'cendol': ['Chendol'],
  'chee-cheong-fun': [],
  'satay': [],
  'bubur-cha-cha': ['Bubor Cha Cha'],
  'pulut-hitam': ['Black Glutinous Rice Dessert'],
  'soya-cincau': ['Michael Jackson', 'Soya Grass Jelly'],
  'teh-tarik': [],
  'teh-ais': ['Teh Peng'],
  'kopi-tarik': ['Kopi', 'Kopi Susu', 'Kopi Peng'],
  'kopi-o': ['Kopi O Kosong', 'Kopi O Peng'],
  'milo-dinosaur': [],
  'milo-ais': ['Milo Peng'],
  'bubble-tea': [],
  'sirap-bandung': ['Bandung'],
  'air-tebu': ['Sugarcane Juice'],
  'apam-balik': ['Min Jiang Kueh', 'Mee Chiang Kueh'],
  'kuih-seri-muka': ['Kueh Salat'],
  'kuih-lapis': ['Kueh Lapis'],
  'onde-onde': ['Ondeh Ondeh'],
  'karipap': [],
  'pisang-goreng': ['Goreng Pisang'],
  'chili-crab': ['Singapore Chilli Crab'],
  'lo-mai-kai': ['Lor Mai Kai'],
  'siew-mai': [],
  'egg-tart': [],
  'ikan-pari-bakar': ['Sambal Stingray', 'BBQ Stingray'],
  'sup-kambing': ['Mutton Soup'],
  'kuih-putu': ['Putu Bambu'],
};

let tagged = 0, aliased = 0;
if (cc === 'sg') {
  for (const [slug, akas] of Object.entries(SHARED_SG)) {
    const f = bySlug[slug];
    if (!f) { console.error('SHARED slug not found: ' + slug); process.exit(1); }
    const regs = new Set(Array.isArray(f.region) && f.region.length ? f.region : ['my']);
    if (!regs.has('sg')) { regs.add('sg'); tagged++; }
    f.region = Array.from(regs);
    if (akas.length) {
      const before = (f.aka || []).length;
      f.aka = Array.from(new Set([...(f.aka || []), ...akas]));
      if (f.aka.length > before) { aliased++; f.updated = ADDED; }
    }
  }
}

// ---- new foods ----
const files = fs.readdirSync(BATCH).filter(n => new RegExp('^' + cc + '-\\d+\\.json$').test(n)).sort();
if (!files.length) { console.error('no data/_batch/' + cc + '-N.json files found'); process.exit(1); }
let NEW = [];
const used = [];
for (const n of files) {
  const arr = JSON.parse(fs.readFileSync(path.join(BATCH, n), 'utf8'));
  if (!Array.isArray(arr)) { console.error(n + ' is not a JSON array'); process.exit(1); }
  // A file whose every slug is already in the DB was merged on an earlier run: skip it,
  // so top-up files (<cc>-2.json, <cc>-3.json) can be merged later without touching <cc>-1.
  if (arr.length && arr.every(f => bySlug[f.slug])) { console.log('  skip ' + n + ' (already merged)'); continue; }
  used.push(n);
  NEW = NEW.concat(arr);
}
if (!NEW.length) { console.log('nothing new to merge for ' + cc); process.exit(0); }

const errors = [];
const warnings = [];
const DASH = /[‒–—―−]/;
const REQ = ['slug', 'name', 'category', 'serving', 'servingGrams', 'calories', 'protein', 'carbs', 'fat',
  'metaDescription', 'summary', 'answer', 'realTalk', 'lighter', 'components', 'portions', 'faq', 'related'];
const existingSlugs = new Set(db.foods.map(f => f.slug));
const newSlugs = new Set();
const validCats = new Set(Object.keys(db.categories));
const wc = s => String(s).split(/\s+/).filter(Boolean).length;

for (const f of NEW) {
  const id = f.slug || '(no slug)';
  for (const k of REQ) if (!(k in f)) errors.push(`${id}: missing field ${k}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(f.slug || '')) errors.push(`${id}: bad slug format`);
  if (HUB_SLUGS.has(f.slug)) errors.push(`${id}: slug collides with a hub page`);
  if (existingSlugs.has(f.slug)) errors.push(`${id}: slug already exists in DB`);
  if (newSlugs.has(f.slug)) errors.push(`${id}: duplicate slug within batch`);
  newSlugs.add(f.slug);
  if (!validCats.has(f.category)) errors.push(`${id}: unknown category ${f.category}`);
  if (!Array.isArray(f.realTalk) || f.realTalk.length < 2 || f.realTalk.length > 5) errors.push(`${id}: realTalk must be 2 to 5 paragraphs`);
  if (!Array.isArray(f.lighter) || f.lighter.length < 3) errors.push(`${id}: lighter must be >=3`);
  if (!Array.isArray(f.portions) || f.portions.length !== 3) errors.push(`${id}: portions must be 3`);
  if (!Array.isArray(f.faq) || f.faq.length < 3 || f.faq.length > 5) errors.push(`${id}: faq must be 3 to 5`);
  if (!Array.isArray(f.related) || f.related.length < 2 || f.related.length > 4) errors.push(`${id}: related must be 2 to 4`);
  if (!Array.isArray(f.region) || !f.region.includes(cc)) errors.push(`${id}: region must include ${cc}`);
  if (typeof f.metaDescription !== 'string' || f.metaDescription.length < 70 || f.metaDescription.length > 158) errors.push(`${id}: meta length ${(f.metaDescription || '').length}`);
  for (const k of ['servingGrams', 'calories', 'protein', 'carbs', 'fat']) {
    if (typeof f[k] !== 'number' || !(f[k] >= 0)) errors.push(`${id}: ${k} must be a number`);
  }
  if (typeof f.calories === 'number') {
    const kcalFromMacros = f.protein * 4 + f.carbs * 4 + f.fat * 9;
    if (Math.abs(kcalFromMacros - f.calories) > f.calories * 0.18 + 25)
      errors.push(`${id}: macro kcal ${kcalFromMacros} vs stated ${f.calories} (off)`);
    const compSum = (f.components || []).reduce((s, c) => s + (c.calories || 0), 0);
    if (Math.abs(compSum - f.calories) > f.calories * 0.12 + 20)
      errors.push(`${id}: component sum ${compSum} vs ${f.calories} (off)`);
    if (f.servingGrams && f.calories / f.servingGrams > 6) warnings.push(`${id}: ${Math.round(f.calories / f.servingGrams * 100)} kcal per 100g looks high`);
  }
  for (const v of (f.variants || [])) if (typeof v.calories !== 'number') errors.push(`${id}: variant without numeric calories`);
  for (const p of (f.portions || [])) if (typeof p.calories !== 'number') errors.push(`${id}: portion without numeric calories`);
  if (DASH.test(JSON.stringify(f))) errors.push(`${id}: contains an em/en dash`);
  const words = wc([f.summary, f.answer, ...(f.realTalk || []), ...(f.lighter || []), ...((f.faq || []).map(x => x.q + ' ' + x.a))].join(' '));
  if (words < 300) errors.push(`${id}: only ${words} words of prose`);
  if (words < 400) warnings.push(`${id}: ${words} words, under the 400 target`);
  const blob = JSON.stringify(f).toLowerCase();
  for (const bad of ['delve', 'tapestry', 'testament', 'vibrant', 'nestled', 'serves as', 'fuel your body', 'clean eating', 'wellness journey']) {
    if (blob.includes(bad)) errors.push(`${id}: banned phrase "${bad}"`);
  }
  if (cc !== 'my' && cc !== 'sg' && /\b(lah|bro|bah)\b/i.test(blob)) warnings.push(`${id}: Malaysian slang in a ${cc} record`);
  f.added = f.added || ADDED;
}
const finalSlugs = new Set([...existingSlugs, ...newSlugs]);
for (const f of NEW) {
  for (const r of (f.related || [])) {
    if (!finalSlugs.has(r)) warnings.push(`${f.slug}: related slug '${r}' not written yet (generator skips it until it exists)`);
    if (r === f.slug) errors.push(`${f.slug}: related references itself`);
  }
}
for (const w of warnings) console.warn('  warn: ' + w);
if (errors.length) {
  console.error('\nQA FAILED for ' + cc + ', aborting. No files written.\n');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

if (DRY) { console.log('QA passed for ' + cc + ' (dry run). ' + NEW.length + ' new foods from ' + used.length + ' files. Nothing written.'); process.exit(0); }
db.foods = db.foods.concat(NEW);
fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`QA passed for ${cc}. Tagged ${tagged} shared foods, aliased ${aliased}. Added ${NEW.length} new foods from ${used.length} files. Total now ${db.foods.length}.`);
