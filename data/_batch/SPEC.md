# Food record batch spec (Asian expansion, 2026-09)

You are writing food calorie records for riceandprotein.com, a static calorie
reference site. Each record becomes one page: "How Many Calories in X?".
Output: JSON files in `data/_batch/`, nothing else. Do NOT touch any other file.

## Files you produce

- `data/_batch/<cc>-1.json`, `<cc>-2.json`, ... each a JSON ARRAY of at most
  15 records. `<cc>` is your region code (sg, id, th, vn, ph, hk, jp, kr).
- `data/_batch/<cc>-sources.md`: one line per dish: slug, kcal used, source
  name + URL (or "estimate from components" if no source). Keep it short.

Validate every file parses as JSON before you finish (node -e or python).

## Record shape (all fields required unless marked optional)

```json
{
  "slug": "bak-chor-mee",                 // lowercase, hyphens, unique, must NOT exist in _existing-slugs.txt
  "name": "Bak Chor Mee",                 // English/romanised display name, Title Case
  "aka": ["Minced Meat Noodles", "肉脞面"],// optional. Other spellings + NATIVE SCRIPT name. Very valuable for search.
  "category": "noodles",                  // one of: rice noodles dimsum mamak soup lauk veg snacks western drinks dessert
  "region": ["sg"],                       // your region code, always
  "serving": "1 bowl",                    // English. "1 bowl", "1 plate", "1 piece", "2 pieces", "1 glass", "1 skewer"
  "servingGrams": 311,
  "calories": 511,
  "protein": 22, "carbs": 58, "fat": 21,  // grams. 4/4/9 must land within ~18% of calories
  "metaDescription": "...",              // 70 to 155 chars. States the kcal number. Conversational, no keyword stuffing.
  "summary": "...",                       // 1 to 2 sentences, under the H1. What the dish is.
  "answer": "...",                        // 2 to 3 sentences. Direct answer with the number and the serving. This is the featured-snippet target.
  "realTalk": ["...", "...", "..."],      // 2 to 4 paragraphs, 60 to 120 words each. See VOICE.
  "lighter": ["...", "...", "..."],       // 3 to 5 practical tips, one sentence or two each.
  "components": [                         // 3 to 6 items. Sum of calories must be within ~12% of "calories".
    {"name": "Egg noodles", "grams": 150, "calories": 210}
  ],
  "portions": [                           // exactly 3. Small/standard/large or plain/with X/with Y. Middle one usually = calories.
    {"label": "Small bowl", "calories": 380},
    {"label": "Standard bowl", "calories": 511},
    {"label": "Large with extra pork lard", "calories": 680}
  ],
  "variants": [                           // optional, 3 to 6. Ranked by calories ascending.
    {"name": "Soup version", "calories": 420, "note": "No lard dressing"}
  ],
  "faq": [                                // 3 to 4. Real questions people search. Answers 1 to 3 sentences with numbers.
    {"q": "Is bak chor mee healthy?", "a": "..."}
  ],
  "related": ["wantan-mee", "kway-chap", "fish-ball-noodles"], // 3 to 4 slugs. Existing slugs from _existing-slugs.txt OR slugs in your own batch. Must resolve.
  "source": "HPB iDAT via danielfooddiary.com 2015"           // short. Where the kcal came from.
}
```

## Sourcing rules (this is health-adjacent content, numbers matter)

1. Use WebSearch/WebFetch to find a published kcal figure per dish. Preferred:
   national food composition tables and health agencies (HPB Singapore, TKPI /
   Kemenkes Indonesia, Thai Bureau of Nutrition / INMU, Vietnam NIN, FNRI
   Philippines PhilFCT, CFS Hong Kong nutrient database, MEXT Japan Standard
   Tables, Korea MFDS / KFDA), then hospital dietitian pages, then FatSecret
   local sites, then reputable food blogs quoting the above.
2. If two sources disagree, pick the one closest to a normal street/restaurant
   serving and say so in sources.md.
3. If no source exists, build it from components (ingredient kcal x grams)
   and mark `"source": "estimate from components"`. Never invent a source.
4. Macros usually are not published. Estimate them sensibly from ingredients.
   The QA gate checks protein*4 + carbs*4 + fat*9 is within 18% of calories.
5. Serving size must be a realistic local portion, not a 100g lab portion.

## VOICE (read twice)

Written by a Malaysian guy who lost 42kg eating normal food. Direct, warm,
slightly blunt, real numbers everywhere. Talks to you like a friend, not a
health blog. For NON-Malaysian dishes, do NOT use Malaysian slang (no lah,
bro, bah, kan, shiok). Plain conversational English with the local dish
vocabulary of that country (warteg, hawker centre, som tam cart, carinderia,
cha chaan teng, izakaya, pojangmacha etc). Local currency prices are fine.

Good: "A bowl of pho is about 420 calories, and most of that is the rice
noodles. The broth itself is nearly free. The problem is the plate of
fried dough sticks on the side, which is another 300 before you notice."

Bad: "Pho is a nutrient-dense Vietnamese soup that can be part of a balanced
diet when consumed mindfully."

Hard rules:
- NEVER use em dashes or en dashes (no "—" or "–" anywhere). Use commas or
  full stops. The QA gate rejects any dash character.
- No fitness influencer language (fuel your body, clean eating, wellness journey).
- No "Not just X but Y", no "serves as", no "delve", no "vibrant", no
  "tapestry", no triplet adjective lists.
- No generic openers ("X is a popular dish in Y"). Start with the number or
  the thing nobody tells you.
- Every paragraph should contain at least one concrete number.
- Do not mention the author's weight loss in every record. Once per batch at most.

## Which dishes

Cover the dishes people in that country actually search calories for: the
top street food, the top restaurant staples, the top drinks and desserts,
the top snacks. Aim for the count in your instructions. Skip dishes that
already exist in `_existing-slugs.txt` (shared dishes like chicken rice or
satay are already covered; you can list them in `related`).

Balance categories: roughly rice 15%, noodles 15%, soup 10%, lauk (meat and
mains) 20%, veg 5%, snacks 15%, drinks 10%, dessert 10%. dimsum/mamak/
western only where they fit (hk uses dimsum, ph uses western for fast food
style items).

## Length

Each record lands at roughly 450 to 650 words of prose across summary,
answer, realTalk, lighter, faq. Do not pad. Do not go under 400.
