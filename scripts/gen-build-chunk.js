#!/usr/bin/env node
/*
 * gen-build-chunk.js
 * Stamps out a build workflow script for one chunk of new dishes.
 *
 * Usage: node scripts/gen-build-chunk.js <chunk-def.json> <out-workflow.js>
 *   - chunk-def.json: array of { slug, name, category, serving, hint }
 *   - reads data/foods.json for the EXISTING related-link menu (current state)
 *   - the related menu = current foods.json + this chunk's new dishes
 *     (so dishes can cross-link within the chunk; QA gate resolves them at merge)
 *
 * Then: Workflow({scriptPath: <out-workflow.js>}) -> returns array of dish objects.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const defPath = process.argv[2];
const outPath = process.argv[3];
if (!defPath || !outPath) { console.error('Usage: node scripts/gen-build-chunk.js <chunk-def.json> <out-workflow.js>'); process.exit(1); }

const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'foods.json'), 'utf8'));
const existing = db.foods.map(f => ({ slug: f.slug, name: f.name, category: f.category }));
const existingSlugs = new Set(existing.map(d => d.slug));

const NEW = JSON.parse(fs.readFileSync(defPath, 'utf8'));

// guard: drop any chunk dish whose slug already exists (dedupe safety)
const filtered = NEW.filter(d => {
  if (existingSlugs.has(d.slug)) { console.log('  ! skipping already-existing slug: ' + d.slug); return false; }
  return true;
});

const EXISTING_JSON = existing.map(d => JSON.stringify(d)).join(',');
const NEW_JSON = filtered.map(d => JSON.stringify(d)).join(',\n  ');

const tpl = `export const meta = {
  name: 'foods-build-${path.basename(defPath, '.json')}',
  description: 'Research + write ${filtered.length} Malaysian/Bornean food calorie pages for the /foods/ pSEO database',
  phases: [
    { title: 'Research', detail: 'triangulate calorie/macro numbers per dish (sonnet)' },
    { title: 'Write', detail: 'mamak-voice content on locked numbers (sonnet)' },
  ],
}

const EXISTING = [${EXISTING_JSON}]

const NEW = [
  ${NEW_JSON}
]

const CATEGORY_KEYS = ['rice','noodles','mamak','soup','lauk','veg','snacks','dessert','drinks']
const ALL = [...EXISTING, ...NEW]
const SLUG_MENU = ALL.map(d => \`\${d.slug} (\${d.name}, \${d.category})\`).join('\\n')

const VOICE = \`VOICE RULES (this is a Malaysian weight-loss blog written like a guy talking to his friend at the mamak):
- Casual, blunt, warm, slightly funny. Real numbers always. Educational but never preachy.
- Use lah / bah / bro / kan / liao naturally but sparingly (max 2-3 across the whole entry).
- Self-deprecating about being fat before is fine. Never sound like a health blog or fitness influencer.
- BANNED: the words "fuel your body", "clean eating", "wellness journey", "nutrient-dense". No generic openers like "Losing weight is hard".
- ABSOLUTE HARD RULE: NEVER use an em dash or en dash ANYWHERE, in any field, including inside metaDescription and summary. Use a comma, full stop, or the word "and" instead. Zero exceptions. For number ranges write "300 to 400" or "300-400" with a normal hyphen.
- Do not use the word "delve". Do not start sentences with "Look,".
- Do NOT use HTML entities like &amp; in any field; write a plain "and".
- Some dishes are Borneo (Sabah/Sarawak/Brunei) or Indian-Muslim; write with genuine "let me put you on to this" energy, not exoticising. Some are non-halal (pork, wild boar); state that plainly where relevant.\`

const RESEARCH_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug','serving','servingGrams','calories','protein','carbs','fat','components','confidence','isEstimate','sourceNote'],
  properties: {
    slug: { type: 'string' },
    serving: { type: 'string' },
    servingGrams: { type: 'integer' },
    calories: { type: 'integer' },
    protein: { type: 'integer' },
    carbs: { type: 'integer' },
    fat: { type: 'integer' },
    components: { type: 'array', minItems: 2, maxItems: 5,
      items: { type: 'object', additionalProperties: false, required: ['name','grams','calories'],
        properties: { name: { type: 'string' }, grams: { type: 'integer' }, calories: { type: 'integer' } } } },
    variants: { type: 'array', minItems: 0, maxItems: 8,
      items: { type: 'object', additionalProperties: false, required: ['name','calories','note'],
        properties: { name: { type: 'string' }, calories: { type: 'integer' }, note: { type: 'string' } } } },
    confidence: { type: 'string', enum: ['high','medium','low'] },
    isEstimate: { type: 'boolean' },
    sourceNote: { type: 'string' }
  }
}

const WRITE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','components','faq','related'],
  properties: {
    slug: { type: 'string' }, name: { type: 'string' }, category: { type: 'string', enum: CATEGORY_KEYS },
    serving: { type: 'string' }, servingGrams: { type: 'integer' },
    calories: { type: 'integer' }, protein: { type: 'integer' }, carbs: { type: 'integer' }, fat: { type: 'integer' },
    metaDescription: { type: 'string', maxLength: 155 }, summary: { type: 'string' }, answer: { type: 'string' },
    realTalk: { type: 'array', minItems: 2, maxItems: 2, items: { type: 'string' } },
    lighter: { type: 'array', minItems: 3, maxItems: 5, items: { type: 'string' } },
    components: { type: 'array', minItems: 2, maxItems: 5,
      items: { type: 'object', additionalProperties: false, required: ['name','grams','calories'],
        properties: { name: { type: 'string' }, grams: { type: 'integer' }, calories: { type: 'integer' } } } },
    variants: { type: 'array', minItems: 0, maxItems: 8,
      items: { type: 'object', additionalProperties: false, required: ['name','calories','note'],
        properties: { name: { type: 'string' }, calories: { type: 'integer' }, note: { type: 'string' } } } },
    faq: { type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q','a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } } },
    related: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string' } }
  }
}

phase('Research')
const dishes = await pipeline(
  NEW,
  (d) => agent(
\`You are a nutrition researcher for a Malaysian food calorie database. Research realistic calorie and macro numbers for ONE dish as it is typically served in Malaysia (hawker stall, kopitiam, mamak, kedai kopi, pasar or restaurant).

DISH: \${d.name}
SLUG (echo exactly): \${d.slug}
TYPICAL SERVING TO PRICE AROUND: \${d.serving}
CONTEXT: \${d.hint}

Do web research. Triangulate calories and macros from at least two of: published nutrition databases (MyFitnessPal, FatSecret, Nutritionix, MyFCD Malaysia), Malaysian sources, or component math (sum the rice/protein/oil/gravy). Numbers are for a TYPICAL real-world serving, not a diet portion. When published data is thin (common for regional dishes), build the number honestly from component math and ingredient weights.

Rules:
- servingGrams is the approximate edible weight of that serving.
- components: 2 to 5 rows showing where the calories come from; their calories MUST sum to within 10 percent of the total.
- variants: if the dish has meaningful ordering variants (soup vs dry, different protein, with/without santan, flavour variants), list them as rows ranked from lowest to highest calories, each with a short note. Otherwise return an empty array.
- If you cannot find solid data, make a reasoned estimate from component math and set isEstimate true and confidence low.
- Round calories to the nearest 5 or 10. Protein/carbs/fat are grams.
- Return ONLY the structured object.\`,
    { label: \`research:\${d.slug}\`, phase: 'Research', model: 'sonnet', schema: RESEARCH_SCHEMA }
  ),
  (research, d) => {
    if (!research) return null
    const locked = JSON.stringify({
      serving: research.serving, servingGrams: research.servingGrams,
      calories: research.calories, protein: research.protein, carbs: research.carbs, fat: research.fat,
      components: research.components, variants: research.variants || [],
      confidence: research.confidence, isEstimate: research.isEstimate
    }, null, 2)
    return agent(
\`You are writing one page for a Malaysian food calorie database. The numbers are ALREADY DECIDED and locked. Your job is the words only. Echo the locked numbers EXACTLY (do not change a single figure).

\${VOICE}

DISH: \${d.name}
SLUG (echo exactly): \${d.slug}
CATEGORY (echo exactly): \${d.category}
CONTEXT: \${d.hint}

LOCKED NUMBERS (copy verbatim into your output, including components and variants):
\${locked}

Write these fields:
- metaDescription: max 155 characters, conversational, mentions the calorie number. NO dash characters.
- summary: one sentence describing the dish, sits under the title. NO dash characters.
- answer: a short paragraph that LEADS with the calorie number and directly answers "how many calories", snippet-friendly but in voice.
- realTalk: EXACTLY 2 paragraphs. First: the honest take on the dish and its calories, what drives them, who it suits; briefly orient a reader who may not know the dish. Second: the practical "what actually changes the maths" angle (portion, oil, gravy, protein swap, noodle choice) with specific gram and calorie numbers.
- lighter: 3 to 5 concrete tips to eat it lighter, specific to THIS dish.
- faq: EXACTLY 3 q/a pairs. First question MUST be "How many calories in \${d.name}?" answered with the number. Other two are real dieter questions (what it is, is it healthy, how it compares).
- related: EXACTLY 3 slugs from the menu below, the most genuinely related dishes (same category or natural comparisons; prefer regional siblings where they fit). Exact slug strings. Do NOT invent slugs. Do NOT include "\${d.slug}".

\${research.isEstimate ? 'NOTE: numbers are an estimate. Somewhere in realTalk, honestly flag that this is a ballpark estimate because hard data is thin for this dish.' : ''}

RELATED SLUG MENU (choose 3, exact strings before the parenthesis):
\${SLUG_MENU}

Return ONLY the structured object with every required field. Reproduce serving, servingGrams, calories, protein, carbs, fat, components and variants exactly as given.\`,
      { label: \`write:\${d.slug}\`, phase: 'Write', model: 'sonnet', schema: WRITE_SCHEMA }
    )
  }
)

return dishes.filter(Boolean)
`;

fs.writeFileSync(outPath, tpl);
console.log(`wrote ${outPath} for ${filtered.length} dishes (menu: ${existing.length} existing + ${filtered.length} new)`);
