#!/usr/bin/env node
/* Generates scripts/fix-foods-workflow.generated.js with the flagged dishes
 * and reviewer findings embedded, so the repair workflow can run without
 * filesystem access. Run: node scripts/gen-fix-workflow.js */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'foods.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'review-results.json'), 'utf8'));
const bySlug = Object.fromEntries(db.foods.map(f => [f.slug, f]));

// If a repair-remaining.json exists (some fixers failed last run), only rebuild
// for those slugs. Otherwise build for every minor/major dish.
const remainingPath = path.join(ROOT, 'data', 'repair-remaining.json');
const onlySlugs = fs.existsSync(remainingPath) ? new Set(JSON.parse(fs.readFileSync(remainingPath, 'utf8'))) : null;

const flagged = reviews
  .filter(r => r.severity === 'minor' || r.severity === 'major')
  .filter(r => !onlySlugs || onlySlugs.has(r.slug))
  .map(r => ({
    dish: bySlug[r.slug],
    review: {
      calorieConcern: r.calorieConcern,
      factualConcerns: r.factualConcerns,
      voiceIssues: r.voiceIssues,
      fixSuggestion: r.fixSuggestion,
      severity: r.severity,
    },
  }))
  .filter(x => x.dish);

console.log('flagged for repair:', flagged.length);

// Build the workflow script as a plain string. Use a placeholder for the
// embedded data and the prompt template, then assemble. No nested backticks
// in this generator: the generated file uses template literals itself.
const lines = [];
lines.push('export const meta = {');
lines.push('  name: "foods-repair",');
lines.push('  description: "Repair flagged /foods/ pages: reconcile breakdown sums, fix factual + voice issues, keep prose and numbers consistent",');
lines.push('  phases: [{ title: "Repair", detail: "one fixer per flagged dish (sonnet)" }],');
lines.push('}');
lines.push('');
lines.push('const FLAGGED = ' + JSON.stringify(flagged) + ';');
lines.push('');
lines.push('const CATEGORY_KEYS = ["rice","noodles","mamak","soup","lauk","veg","snacks","dessert","drinks"];');
lines.push('');
lines.push('const SCHEMA = {');
lines.push('  type: "object", additionalProperties: false,');
lines.push('  required: ["slug","name","category","serving","servingGrams","calories","protein","carbs","fat","metaDescription","summary","answer","realTalk","lighter","components","faq","related"],');
lines.push('  properties: {');
lines.push('    slug:{type:"string"}, name:{type:"string"}, category:{type:"string",enum:CATEGORY_KEYS},');
lines.push('    serving:{type:"string"}, servingGrams:{type:"integer"},');
lines.push('    calories:{type:"integer"}, protein:{type:"integer"}, carbs:{type:"integer"}, fat:{type:"integer"},');
lines.push('    metaDescription:{type:"string",maxLength:160}, summary:{type:"string"}, answer:{type:"string"},');
lines.push('    realTalk:{type:"array",minItems:2,maxItems:2,items:{type:"string"}},');
lines.push('    lighter:{type:"array",minItems:3,maxItems:5,items:{type:"string"}},');
lines.push('    components:{type:"array",minItems:2,maxItems:5,items:{type:"object",additionalProperties:false,required:["name","grams","calories"],properties:{name:{type:"string"},grams:{type:"integer"},calories:{type:"integer"}}}},');
lines.push('    variants:{type:"array",minItems:0,maxItems:8,items:{type:"object",additionalProperties:false,required:["name","calories","note"],properties:{name:{type:"string"},calories:{type:"integer"},note:{type:"string"}}}},');
lines.push('    faq:{type:"array",minItems:3,maxItems:3,items:{type:"object",additionalProperties:false,required:["q","a"],properties:{q:{type:"string"},a:{type:"string"}}}},');
lines.push('    related:{type:"array",minItems:3,maxItems:3,items:{type:"string"}}');
lines.push('  }');
lines.push('};');
lines.push('');
lines.push('const VOICE = "Mamak-friend voice: casual, blunt, warm, specific real numbers, occasional lah/bro/kan used sparingly. NOT a health blog or fitness influencer. ABSOLUTE HARD RULE: NEVER use an em dash or en dash anywhere; use a comma or full stop or the word and. Banned: fuel your body, clean eating, eat clean, wellness journey, nutrient-dense, the word delve, generic openers, and starting a paragraph with Look,.";');
lines.push('');
lines.push('phase("Repair")');
lines.push('const fixed = await parallel(FLAGGED.map(item => () => {');
lines.push('  const prompt = [');
lines.push('    "You are repairing ONE page in a Malaysian food calorie database. A reviewer flagged specific issues. Fix ONLY what is needed, keep everything else intact, and return the COMPLETE corrected dish object.",');
lines.push('    "",');
lines.push('    VOICE,');
lines.push('    "",');
lines.push('    "CURRENT DISH OBJECT (JSON):",');
lines.push('    JSON.stringify(item.dish, null, 2),');
lines.push('    "",');
lines.push('    "REVIEWER FINDINGS:",');
lines.push('    "- calorie concern: " + (item.review.calorieConcern || "(none)"),');
lines.push('    "- factual concerns: " + JSON.stringify(item.review.factualConcerns),');
lines.push('    "- voice issues: " + JSON.stringify(item.review.voiceIssues),');
lines.push('    "- suggested fix: " + (item.review.fixSuggestion || "(none)"),');
lines.push('    "",');
lines.push('    "REPAIR RULES:",');
lines.push('    "1. KEEP the headline calories figure as-is (reviewer judged it plausible). Do NOT change calories, protein, carbs, fat, serving, servingGrams, slug, name, or category.",');
lines.push('    "2. The components breakdown MUST sum to within 5 kcal of the headline calories. Adjust component figures so they add up. If you change a component number that the prose mentions, update that sentence so they never contradict.",');
lines.push('    "3. Fix every factual concern the reviewer raised. Correct misleading claims.",');
lines.push('    "4. Fix every voice issue: remove banned phrases, remove any em or en dash, warm up flat writing, fix typos.",');
lines.push('    "5. Do not invent new variants or related slugs. Keep the existing related and variants unless a fix specifically requires it.",');
lines.push('    "6. Keep realTalk to exactly 2 paragraphs, faq to exactly 3 items, related to exactly 3 slugs.",');
lines.push('    "",');
lines.push('    "Return the full corrected dish object with every required field."');
lines.push('  ].join("\\n");');
lines.push('  return agent(prompt, { label: "fix:" + item.dish.slug, phase: "Repair", model: "sonnet", schema: SCHEMA });');
lines.push('}));');
lines.push('');
lines.push('return fixed.filter(Boolean);');

fs.writeFileSync(path.join(ROOT, 'scripts', 'fix-foods-workflow.generated.js'), lines.join('\n') + '\n');
console.log('wrote scripts/fix-foods-workflow.generated.js');
