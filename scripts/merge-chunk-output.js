#!/usr/bin/env node
/*
 * merge-chunk-output.js
 * Extracts + sanitizes a build-workflow output file into a clean dish array.
 *
 * Usage: node scripts/merge-chunk-output.js <workflow-output-file> <out.json>
 *   - workflow-output-file: the task .output file (envelope with .result, or a raw array)
 *   - writes a cleaned array to <out.json> ready for scripts/integrate-foods.js
 *
 * Sanitization (so the QA-gated merge runs unattended):
 *   - unwrap { result: [...] } envelope; parse if result is a string
 *   - decode HTML entities (&amp; &lt; &gt; &#39; &quot;)
 *   - number ranges with en/em dash (300–400) -> hyphen (300-400)
 *   - any remaining en/em/bar/minus dash or "--" -> ", " (clause separator)
 *   - collapse any ",  ," / double spaces introduced
 *   - trim metaDescription to <=155 chars at a word boundary
 */
const fs = require('fs');
const inFile = process.argv[2];
const outFile = process.argv[3];
if (!inFile || !outFile) { console.error('Usage: node scripts/merge-chunk-output.js <workflow-output-file> <out.json>'); process.exit(1); }

let raw = JSON.parse(fs.readFileSync(inFile, 'utf8'));
let arr = raw && !Array.isArray(raw) && raw.result !== undefined ? raw.result : raw;
if (typeof arr === 'string') arr = JSON.parse(arr);
if (!Array.isArray(arr)) { console.error('could not find a dish array'); process.exit(1); }

function fixStr(s) {
  if (typeof s !== 'string') return s;
  let t = s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  // number ranges: 300–400 / 300—400 -> 300-400
  t = t.replace(/(\d)\s*[–—‒―−]\s*(\d)/g, '$1-$2');
  // remaining unicode dashes or double-hyphen acting as clause separators -> comma
  t = t.replace(/\s*(?:[–—‒―−]|--)\s*/g, ', ');
  // tidy artifacts
  t = t.replace(/\s{2,}/g, ' ').replace(/,\s*,/g, ',').replace(/,\s*\./g, '.').trim();
  return t;
}
function walk(v) {
  if (typeof v === 'string') return fixStr(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = walk(v[k]); return o; }
  return v;
}
function trimMeta(m) {
  if (typeof m !== 'string' || m.length <= 155) return m;
  let t = m.slice(0, 155);
  const lastSpace = t.lastIndexOf(' ');
  if (lastSpace > 120) t = t.slice(0, lastSpace);
  return t.replace(/[\s,]+$/, '');
}

arr = arr.map(walk).map(d => {
  if (d && typeof d === 'object') d.metaDescription = trimMeta(d.metaDescription);
  return d;
});

fs.writeFileSync(outFile, JSON.stringify(arr, null, 2));

// report any residual dashes (should be none) and long metas
const DASH = /[‒–—―−]|--/;
let dashes = 0, longMeta = 0;
for (const d of arr) { if (DASH.test(JSON.stringify(d))) dashes++; if ((d.metaDescription || '').length > 155) longMeta++; }
console.log(`wrote ${outFile}: ${arr.length} dishes; residual dashes: ${dashes}; metas>155: ${longMeta}`);
console.log('slugs: ' + arr.map(d => d.slug).join(', '));
