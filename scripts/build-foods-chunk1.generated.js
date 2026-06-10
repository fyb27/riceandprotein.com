export const meta = {
  name: 'foods-chunk1-borneo-gems',
  description: 'Research + write 18 Borneo (Sabah/Sarawak) food calorie pages for the /foods/ pSEO database',
  phases: [
    { title: 'Research', detail: 'triangulate calorie/macro numbers per dish (sonnet)' },
    { title: 'Write', detail: 'mamak-voice content on locked numbers (sonnet)' },
  ],
}

// ---- existing 137 pages (related-link targets) ----
const EXISTING = [
  {"slug":"nasi-lemak","name":"Nasi Lemak","category":"rice"},{"slug":"chicken-rice","name":"Chicken Rice","category":"rice"},{"slug":"char-kuey-teow","name":"Char Kuey Teow","category":"noodles"},{"slug":"roti-canai","name":"Roti Canai","category":"mamak"},{"slug":"mee-goreng-mamak","name":"Mee Goreng Mamak","category":"noodles"},{"slug":"nasi-goreng-kampung","name":"Nasi Goreng Kampung","category":"rice"},{"slug":"bak-kut-teh","name":"Bak Kut Teh","category":"soup"},{"slug":"curry-laksa","name":"Curry Laksa","category":"noodles"},{"slug":"wantan-mee","name":"Wantan Mee","category":"noodles"},{"slug":"teh-tarik","name":"Teh Tarik","category":"drinks"},{"slug":"milo-ais","name":"Milo Ais","category":"drinks"},{"slug":"cendol","name":"Cendol","category":"dessert"},{"slug":"pisang-goreng","name":"Pisang Goreng","category":"snacks"},{"slug":"nasi-goreng-mamak","name":"Nasi Goreng Mamak","category":"rice"},{"slug":"asam-laksa","name":"Asam Laksa","category":"noodles"},{"slug":"kangkung-belacan","name":"Kangkung Belacan","category":"veg"},{"slug":"french-toast","name":"French Toast (Roti Bakar)","category":"mamak"},{"slug":"ufo-tart","name":"UFO Tart","category":"dessert"},{"slug":"egg-tart","name":"Egg Tart","category":"dessert"},{"slug":"karipap","name":"Karipap (Curry Puff)","category":"snacks"},{"slug":"popiah","name":"Popiah","category":"snacks"},{"slug":"wat-tan-hor","name":"Wat Tan Hor","category":"noodles"},{"slug":"satay","name":"Satay","category":"lauk"},{"slug":"sarawak-laksa","name":"Sarawak Laksa","category":"noodles"},{"slug":"laksa-johor","name":"Laksa Johor","category":"noodles"},{"slug":"laksa-kedah","name":"Laksa Kedah","category":"noodles"},{"slug":"nasi-kandar","name":"Nasi Kandar","category":"rice"},{"slug":"nasi-briyani","name":"Nasi Briyani","category":"rice"},{"slug":"nasi-kerabu","name":"Nasi Kerabu","category":"rice"},{"slug":"nasi-dagang","name":"Nasi Dagang","category":"rice"},{"slug":"asam-pedas","name":"Asam Pedas","category":"lauk"},{"slug":"masak-lemak-cili-api","name":"Masak Lemak Cili Api","category":"lauk"},{"slug":"sambal-tumis","name":"Sambal Tumis","category":"lauk"},{"slug":"ayam-masak","name":"Ayam Masak","category":"lauk"},{"slug":"daging-masak","name":"Daging Masak","category":"lauk"},{"slug":"rendang","name":"Rendang","category":"lauk"},{"slug":"serunding","name":"Serunding","category":"lauk"},{"slug":"hokkien-mee-kl","name":"KL Hokkien Mee","category":"noodles"},{"slug":"penang-hokkien-mee","name":"Penang Hokkien Mee","category":"noodles"},{"slug":"pan-mee","name":"Pan Mee","category":"noodles"},{"slug":"mee-rebus","name":"Mee Rebus","category":"noodles"},{"slug":"mee-siam","name":"Mee Siam","category":"noodles"},{"slug":"kolo-mee","name":"Kolo Mee","category":"noodles"},{"slug":"ipoh-hor-fun","name":"Ipoh Hor Fun","category":"noodles"},{"slug":"bee-hoon-goreng","name":"Bee Hoon Goreng","category":"noodles"},{"slug":"maggi-goreng","name":"Maggi Goreng","category":"noodles"},{"slug":"yee-mee","name":"Yee Mee","category":"noodles"},{"slug":"tuaran-mee","name":"Tuaran Mee","category":"noodles"},{"slug":"sabah-beef-noodles","name":"Sabah Beef Noodles (Ngiu Chap)","category":"noodles"},{"slug":"kuih-seri-muka","name":"Kuih Seri Muka","category":"snacks"},{"slug":"kuih-lapis","name":"Kuih Lapis","category":"snacks"},{"slug":"kuih-talam","name":"Kuih Talam","category":"snacks"},{"slug":"onde-onde","name":"Onde-Onde","category":"snacks"},{"slug":"kuih-koci","name":"Kuih Koci","category":"snacks"},{"slug":"kuih-ketayap","name":"Kuih Ketayap","category":"snacks"},{"slug":"apam-balik","name":"Apam Balik","category":"snacks"},{"slug":"kuih-bahulu","name":"Kuih Bahulu","category":"snacks"},{"slug":"kuih-keria","name":"Kuih Keria","category":"snacks"},{"slug":"kuih-cara-berlauk","name":"Kuih Cara Berlauk","category":"snacks"},{"slug":"kuih-kaswi","name":"Kuih Kaswi","category":"snacks"},{"slug":"dodol","name":"Dodol","category":"snacks"},{"slug":"nasi-goreng-cina","name":"Nasi Goreng Cina","category":"rice"},{"slug":"nasi-ulam","name":"Nasi Ulam","category":"rice"},{"slug":"nasi-tomato","name":"Nasi Tomato","category":"rice"},{"slug":"nasi-minyak","name":"Nasi Minyak","category":"rice"},{"slug":"nasi-ambeng","name":"Nasi Ambeng","category":"rice"},{"slug":"nasi-lemuni","name":"Nasi Lemuni","category":"rice"},{"slug":"nasi-ayam-penyet","name":"Nasi Ayam Penyet","category":"rice"},{"slug":"claypot-chicken-rice","name":"Claypot Chicken Rice","category":"rice"},{"slug":"char-siew-rice","name":"Char Siew Rice","category":"rice"},{"slug":"mee-kari","name":"Mee Kari (Curry Mee)","category":"noodles"},{"slug":"mee-bandung-muar","name":"Mee Bandung Muar","category":"noodles"},{"slug":"mee-hailam","name":"Mee Hailam","category":"noodles"},{"slug":"mee-jawa","name":"Mee Jawa","category":"noodles"},{"slug":"mee-tomyam","name":"Mee Tomyam","category":"noodles"},{"slug":"mee-sup","name":"Mee Sup","category":"noodles"},{"slug":"kuey-teow-soup","name":"Kuey Teow Soup","category":"noodles"},{"slug":"kuey-teow-kung-fu","name":"Kuey Teow Kung Fu","category":"noodles"},{"slug":"fish-ball-noodles","name":"Fish Ball Noodles","category":"noodles"},{"slug":"hakka-mee","name":"Hakka Mee","category":"noodles"},{"slug":"claypot-lou-shu-fun","name":"Claypot Lou Shu Fun","category":"noodles"},{"slug":"chee-cheong-fun","name":"Chee Cheong Fun","category":"noodles"},{"slug":"murtabak","name":"Murtabak","category":"mamak"},{"slug":"thosai","name":"Thosai (Tosai)","category":"mamak"},{"slug":"vadai","name":"Vadai","category":"mamak"},{"slug":"idli","name":"Idli","category":"mamak"},{"slug":"sup-kambing","name":"Sup Kambing","category":"soup"},{"slug":"sup-tulang","name":"Sup Tulang","category":"soup"},{"slug":"sup-ekor","name":"Sup Ekor","category":"soup"},{"slug":"sup-ayam","name":"Sup Ayam","category":"soup"},{"slug":"sup-gear-box","name":"Sup Gear Box","category":"soup"},{"slug":"tomyam","name":"Tomyam","category":"soup"},{"slug":"bubur-ayam","name":"Bubur Ayam","category":"soup"},{"slug":"bubur-lambuk","name":"Bubur Lambuk","category":"soup"},{"slug":"yong-tau-foo-soup","name":"Yong Tau Foo (Soup)","category":"soup"},{"slug":"hakka-lei-cha","name":"Hakka Lei Cha (Thunder Tea Rice)","category":"soup"},{"slug":"steamboat","name":"Steamboat","category":"soup"},{"slug":"ayam-percik","name":"Ayam Percik","category":"lauk"},{"slug":"ayam-bakar","name":"Ayam Bakar","category":"lauk"},{"slug":"daging-dendeng","name":"Daging Dendeng","category":"lauk"},{"slug":"daging-harimau-menangis","name":"Daging Harimau Menangis","category":"lauk"},{"slug":"sambal-sotong","name":"Sambal Sotong","category":"lauk"},{"slug":"sambal-udang","name":"Sambal Udang","category":"lauk"},{"slug":"ikan-bakar","name":"Ikan Bakar","category":"lauk"},{"slug":"ikan-masak-lemak","name":"Ikan Masak Lemak","category":"lauk"},{"slug":"ikan-patin-tempoyak","name":"Ikan Patin Masak Tempoyak","category":"lauk"},{"slug":"gulai","name":"Gulai","category":"lauk"},{"slug":"kari-kepala-ikan","name":"Kari Kepala Ikan","category":"lauk"},{"slug":"salted-egg-crab","name":"Salted Egg Crab","category":"lauk"},{"slug":"kam-heong-crab","name":"Kam Heong Crab","category":"lauk"},{"slug":"ketam-masak","name":"Ketam Masak","category":"lauk"},{"slug":"otak-otak","name":"Otak-Otak","category":"lauk"},{"slug":"keropok-lekor","name":"Keropok Lekor","category":"lauk"},{"slug":"nestum-chicken","name":"Nestum Chicken","category":"lauk"},{"slug":"tempoyak","name":"Tempoyak","category":"lauk"},{"slug":"sayur-lemak","name":"Sayur Lemak","category":"veg"},{"slug":"kailan-ikan-masin","name":"Kailan Ikan Masin","category":"veg"},{"slug":"sawi-sos-tiram","name":"Sawi / Broccoli Sos Tiram","category":"veg"},{"slug":"taugeh-ikan-masin","name":"Taugeh Ikan Masin","category":"veg"},{"slug":"tauhu-sumbat","name":"Tauhu Sumbat","category":"veg"},{"slug":"ulam-ulaman","name":"Ulam-Ulaman","category":"veg"},{"slug":"cucur-udang","name":"Cucur Udang","category":"snacks"},{"slug":"cucur-badak","name":"Cucur Badak","category":"snacks"},{"slug":"lok-lok","name":"Lok Lok","category":"snacks"},{"slug":"yong-tau-foo-fried","name":"Yong Tau Foo (Fried)","category":"snacks"},{"slug":"kuih-bangkit","name":"Kuih Bangkit","category":"snacks"},{"slug":"kuih-badak-berendam","name":"Kuih Badak Berendam","category":"snacks"},{"slug":"kuih-kasturi","name":"Kuih Kasturi","category":"snacks"},{"slug":"kuih-jala","name":"Kuih Jala (Roti Jala)","category":"snacks"},{"slug":"kopi-tarik","name":"Kopi Tarik","category":"drinks"},{"slug":"sirap-bandung","name":"Sirap Bandung","category":"drinks"},{"slug":"soya","name":"Soya (Soy Milk)","category":"drinks"},{"slug":"air-tebu","name":"Air Tebu","category":"drinks"},{"slug":"air-kelapa","name":"Air Kelapa","category":"drinks"},{"slug":"cincau","name":"Cincau","category":"drinks"},{"slug":"ais-kacang","name":"Ais Kacang (ABC)","category":"dessert"},{"slug":"bubur-cha-cha","name":"Bubur Cha Cha","category":"dessert"},
]

// ---- 18 new Borneo (Sabah/Sarawak/Brunei) gem dishes to build (chunk 1) ----
const NEW = [
  // NOODLES (4)
  {slug:"sang-nyuk-mian",name:"Sang Nyuk Mian",category:"noodles",serving:"1 bowl",hint:"Sabah (KK) Hakka fresh pork noodle soup; thin slices of fresh pork and pork liver in a clear peppery broth; variants by noodle type: mee, mee hoon (bee hoon), kuey teow; also dry (kon lou) version"},
  {slug:"beaufort-mee",name:"Beaufort Mee",category:"noodles",serving:"1 plate",hint:"Sabah Beaufort smoky wok-fried (charcoal wok hei) yellow noodles with pork slices, choy sum and a starchy gravy; variants with extra meat or seafood"},
  {slug:"tamparuli-mee",name:"Tamparuli Mee",category:"noodles",serving:"1 plate",hint:"Sabah Tamparuli fried springy yellow noodles, slightly sweet dark soy sauce, with veg and meat/seafood; a fried noodle dish"},
  {slug:"tenom-mee",name:"Tenom Mee",category:"noodles",serving:"1 bowl or plate",hint:"Sabah Tenom springy fresh egg noodles (sang mee); served dry tossed with sauce and char siew/minced pork, or in soup; variants dry vs soup"},
  // LAUK (4)
  {slug:"hinava",name:"Hinava",category:"lauk",serving:"1 serving (small plate)",hint:"Kadazan-Dusun raw fish ceviche; mackerel (ikan tenggiri) cured in lime juice with sliced ginger, shallot, chilli and grated bambangan seed; very low calorie, lean protein; variants ikan tenggiri, with bambangan, udang (prawn)"},
  {slug:"bosou",name:"Bosou",category:"lauk",serving:"2 tbsp (condiment portion)",hint:"Kadazan-Dusun fermented raw fish or meat preserved with rice (pinongian) and pangi seed; pungent sour condiment eaten in small amounts with rice; variants ikan (fish), daging (meat/wild boar), bambangan"},
  {slug:"pinasakan",name:"Pinasakan",category:"lauk",serving:"1 serving",hint:"Sabah fish simmered with turmeric and a souring agent (takob-akob or bambangan); light, broth-y, little to no oil; variants pinasakan sada, basung (small mackerel)"},
  {slug:"sinalau-bakas",name:"Sinalau Bakas",category:"lauk",serving:"1 serving",hint:"Sabah smoked wild boar; fatty pork slow-smoked over fire; rich and smoky; non-halal; variants original sliced, in rice set, in sandwich/bun"},
  // VEG (4)
  {slug:"tuhau",name:"Tuhau",category:"veg",serving:"1 serving (condiment portion)",hint:"Sabah/Sarawak wild ginger (Etlingera) stem, finely sliced; eaten raw in sambal/with lime and chilli, stir-fried, or pickled (jeruk); pungent; near-free calories as a condiment; variants raw sambal tuhau, goreng (fried), jeruk (pickled)"},
  {slug:"bambangan",name:"Bambangan",category:"veg",serving:"1 serving",hint:"wild Sabah mango (Mangifera pajang); usually eaten pickled/jeruk (grated flesh with the soured seed) or cooked in coconut gulai; sour, fibrous; variants jeruk/pickle, gulai (coconut), in salad/hinava"},
  {slug:"sayur-manis",name:"Sayur Manis (Cangkuk Manis / Sabah Veg)",category:"veg",serving:"1 plate",hint:"Sabah sweet-leaf vegetable (Sauropus, locally 'sabah veg'); stir-fried with egg or with garlic/dried shrimp; very low calorie leafy veg, oil is the main calorie driver; variants goreng telur (with egg), tumis garlic"},
  {slug:"latok",name:"Latok (Sea Grapes)",category:"veg",serving:"1 small plate",hint:"sea grapes / green caviar seaweed, eaten raw as a crunchy briny salad with chilli-lime or sambal belacan dressing; near-zero calorie; variants plain, as latok salad with onion and tomato"},
  // RICE / STAPLE (2)
  {slug:"linopot",name:"Linopot",category:"rice",serving:"1 parcel",hint:"Kadazan-Dusun rice (often hill rice or red/purple rice) wrapped and pressed in tarap or wild doringin leaf into a ball; a rice portion eaten with grilled fish or meat; variants white rice vs hill/red rice, with ikan bakar"},
  {slug:"ambuyat",name:"Ambuyat",category:"rice",serving:"1 serving (per person share)",hint:"sago starch staple of Brunei/Sabah/Sarawak; a sticky translucent glue-like paste twirled on a bamboo fork (chandas) and dipped in sour cacah sauce; mostly starch carbs, almost no protein or fat; eaten with fish/sambal sides; variants plain with cacah, full set with ikan/sayur"},
  // SNACKS (2)
  {slug:"kuih-penjaram",name:"Kuih Penjaram (Pinjaram)",category:"snacks",serving:"1 piece",hint:"deep-fried palm-sugar (gula apong/gula merah) rice-flour fritter shaped like a hat/UFO with a thick chewy centre and lacy crisp edge; popular Sabah/Sarawak pasar tamu kuih; spelling variants penjaram/pinjaram/penyaram are the same kuih"},
  {slug:"kuih-cincin",name:"Kuih Cincin",category:"snacks",serving:"1 piece",hint:"Sabah (Bajau/Brunei) ring-shaped deep-fried cookie of rice flour and palm sugar (gula apong), dense, hard and crunchy, dark brown; a long-keeping traditional snack; variants soft vs hard/crunchy"},
  {slug:"kelupis",name:"Kelupis",category:"snacks",serving:"1 piece",hint:"Sabah/Sarawak/Brunei glutinous rice cooked with coconut milk and steamed/wrapped in nyirik (lygodium) or daun nyiru leaf, similar to lemang/ketupat; eaten with serunding, curry or rendang; small parcel"},
]

const CATEGORY_KEYS = ['rice','noodles','mamak','soup','lauk','veg','snacks','dessert','drinks']
const ALL = [...EXISTING, ...NEW]
const SLUG_MENU = ALL.map(d => `${d.slug} (${d.name}, ${d.category})`).join('\n')

const VOICE = `VOICE RULES (this is a Malaysian weight-loss blog written like a guy talking to his friend at the mamak):
- Casual, blunt, warm, slightly funny. Real numbers always. Educational but never preachy.
- Use lah / bah / bro / kan / liao naturally but sparingly (max 2-3 across the whole entry).
- Self-deprecating about being fat before is fine. Never sound like a health blog or fitness influencer.
- BANNED: the words "fuel your body", "clean eating", "wellness journey", "nutrient-dense". No generic openers like "Losing weight is hard".
- ABSOLUTE HARD RULE: NEVER use an em dash (the long dash) ANYWHERE, in any field. Use a comma, full stop, or the word "and" instead. This rule has zero exceptions. Also avoid en dashes; for number ranges write "300 to 400" or "300-400" with a normal hyphen.
- Do not use the word "delve". Do not start sentences with "Look,".
- These are Borneo (Sabah/Sarawak/Brunei) dishes, many less famous than peninsular food. Write with genuine respect and a "let me put you on to this" energy, not exoticising. Some are non-halal (pork, wild boar); state that plainly where relevant.`

// ---------- STAGE 1: research numbers ----------
const RESEARCH_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug','serving','servingGrams','calories','protein','carbs','fat','components','confidence','isEstimate','sourceNote'],
  properties: {
    slug: { type: 'string' },
    serving: { type: 'string', description: 'human serving label, e.g. "1 bowl" or "1 plate with ayam percik"' },
    servingGrams: { type: 'integer', description: 'approx edible weight of that serving in grams' },
    calories: { type: 'integer' },
    protein: { type: 'integer' },
    carbs: { type: 'integer' },
    fat: { type: 'integer' },
    components: {
      type: 'array', minItems: 2, maxItems: 5,
      description: 'where the calories come from; component calories should roughly sum to total',
      items: { type: 'object', additionalProperties: false, required: ['name','grams','calories'],
        properties: { name: { type: 'string' }, grams: { type: 'integer' }, calories: { type: 'integer' } } }
    },
    variants: {
      type: 'array', minItems: 0, maxItems: 8,
      description: 'ordering variants as rows, ranked low to high calories; omit if dish has no meaningful variants',
      items: { type: 'object', additionalProperties: false, required: ['name','calories','note'],
        properties: { name: { type: 'string' }, calories: { type: 'integer' }, note: { type: 'string' } } }
    },
    confidence: { type: 'string', enum: ['high','medium','low'] },
    isEstimate: { type: 'boolean', description: 'true if no solid source found and the number is a reasoned estimate' },
    sourceNote: { type: 'string', description: 'one short line on where the numbers came from' }
  }
}

// ---------- STAGE 2: write full dish object ----------
const WRITE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug','name','category','serving','servingGrams','calories','protein','carbs','fat','metaDescription','summary','answer','realTalk','lighter','components','faq','related'],
  properties: {
    slug: { type: 'string' },
    name: { type: 'string' },
    category: { type: 'string', enum: CATEGORY_KEYS },
    serving: { type: 'string' },
    servingGrams: { type: 'integer' },
    calories: { type: 'integer' },
    protein: { type: 'integer' },
    carbs: { type: 'integer' },
    fat: { type: 'integer' },
    metaDescription: { type: 'string', maxLength: 160, description: 'max 155 chars, conversational, no keyword stuffing' },
    summary: { type: 'string', description: 'one sentence under the title' },
    answer: { type: 'string', description: 'snippet-bait paragraph that directly answers how many calories, leading with the number' },
    realTalk: { type: 'array', minItems: 2, maxItems: 2, items: { type: 'string' }, description: 'exactly 2 mamak-voice paragraphs' },
    lighter: { type: 'array', minItems: 3, maxItems: 5, items: { type: 'string' }, description: 'how to eat it lighter, actionable tips' },
    components: {
      type: 'array', minItems: 2, maxItems: 5,
      items: { type: 'object', additionalProperties: false, required: ['name','grams','calories'],
        properties: { name: { type: 'string' }, grams: { type: 'integer' }, calories: { type: 'integer' } } }
    },
    variants: {
      type: 'array', minItems: 0, maxItems: 8,
      items: { type: 'object', additionalProperties: false, required: ['name','calories','note'],
        properties: { name: { type: 'string' }, calories: { type: 'integer' }, note: { type: 'string' } } }
    },
    faq: {
      type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q','a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } }
    },
    related: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string' }, description: 'slugs from the provided menu only' }
  }
}

phase('Research')
const dishes = await pipeline(
  NEW,
  // stage 1: research numbers
  (d) => agent(
`You are a nutrition researcher for a Malaysian food calorie database. Research realistic calorie and macro numbers for ONE dish as it is typically served in Sabah, Sarawak or Brunei (hawker stall, kedai kopi, pasar tamu or restaurant).

DISH: ${d.name}
SLUG (echo exactly): ${d.slug}
TYPICAL SERVING TO PRICE AROUND: ${d.serving}
CONTEXT: ${d.hint}

Do web research. Triangulate the calories and macros from at least two of: published nutrition databases (MyFitnessPal, FatSecret, Nutritionix, MyFCD Malaysia), Malaysian/Bornean sources, or component math (sum the rice/protein/oil/gravy). Numbers are for a TYPICAL real-world serving, not a diet portion. These Borneo dishes often have thin published data; when so, build the number honestly from component math and ingredient weights.

Rules:
- servingGrams is the approximate edible weight of that serving.
- components: 2 to 5 rows showing where the calories come from; their calories should roughly add up to the total (within ~10 percent).
- variants: if the dish has meaningful ordering variants (e.g. soup vs dry, different noodle, different protein, raw vs fried vs pickled), list them as rows ranked from lowest to highest calories, each with a short note. If there are no meaningful variants, return an empty array.
- If you cannot find solid data, make a reasoned estimate from component math and set isEstimate true and confidence low.
- Round calories to the nearest 5 or 10. Protein/carbs/fat are grams.
- Return ONLY the structured object.`,
    { label: `research:${d.slug}`, phase: 'Research', model: 'sonnet', schema: RESEARCH_SCHEMA }
  ),
  // stage 2: write voice content on locked numbers
  (research, d) => {
    if (!research) return null
    const locked = JSON.stringify({
      serving: research.serving, servingGrams: research.servingGrams,
      calories: research.calories, protein: research.protein, carbs: research.carbs, fat: research.fat,
      components: research.components, variants: research.variants || [],
      confidence: research.confidence, isEstimate: research.isEstimate
    }, null, 2)
    return agent(
`You are writing one page for a Malaysian food calorie database. The numbers are ALREADY DECIDED and locked. Your job is the words only. Echo the locked numbers EXACTLY into your output object (do not change a single figure).

${VOICE}

DISH: ${d.name}
SLUG (echo exactly): ${d.slug}
CATEGORY (echo exactly): ${d.category}
CONTEXT: ${d.hint}

LOCKED NUMBERS (copy these fields verbatim into your output, including components and variants):
${locked}

Write these fields:
- metaDescription: max 155 characters, conversational, mentions the calorie number.
- summary: one sentence describing the dish, sits under the title.
- answer: a short paragraph that LEADS with the calorie number and directly answers "how many calories", written for a featured snippet but still in voice. Reference the real figure.
- realTalk: EXACTLY 2 paragraphs. First paragraph: the honest take on the dish and its calories, what drives them, who it suits. For these Borneo dishes, briefly orient a peninsular/foreign reader on what the dish actually is. Second paragraph: the practical "what actually changes the maths" angle (portion, oil, gravy, protein swap, noodle choice). Use specific gram and calorie numbers. This is the heart of the page, make it sound like a real person.
- lighter: 3 to 5 concrete tips to eat it lighter, specific to THIS dish.
- faq: EXACTLY 3 question/answer pairs. The first question MUST be "How many calories in ${d.name}?" answered with the number. The other two are real questions a dieter would Google about this dish (e.g. what it is, is it healthy, how it compares).
- related: pick EXACTLY 3 slugs from the menu below, choosing the most genuinely related dishes (same category or natural comparisons, prefer other Borneo dishes where they fit). Use the slug strings exactly. Do NOT invent slugs. Do NOT include "${d.slug}" itself.

${research.isEstimate ? 'NOTE: numbers are an estimate. Somewhere in realTalk, honestly flag that this is a ballpark estimate because hard data is thin for this dish.' : ''}

RELATED SLUG MENU (choose 3, exact strings before the parenthesis):
${SLUG_MENU}

Return ONLY the structured object with every required field. Reproduce serving, servingGrams, calories, protein, carbs, fat, components and variants exactly as given in the locked numbers.`,
      { label: `write:${d.slug}`, phase: 'Write', model: 'sonnet', schema: WRITE_SCHEMA }
    )
  }
)

return dishes.filter(Boolean)
