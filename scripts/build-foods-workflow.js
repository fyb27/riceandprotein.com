export const meta = {
  name: 'foods-boil-the-ocean',
  description: 'Research + write 76 Malaysian food calorie pages for the /foods/ pSEO database',
  phases: [
    { title: 'Research', detail: 'triangulate calorie/macro numbers per dish (sonnet)' },
    { title: 'Write', detail: 'mamak-voice content on locked numbers (sonnet)' },
  ],
}

// ---- existing 61 pages (related-link targets) ----
const EXISTING = [
  {slug:"nasi-lemak",name:"Nasi Lemak",category:"rice"},{slug:"chicken-rice",name:"Chicken Rice",category:"rice"},{slug:"char-kuey-teow",name:"Char Kuey Teow",category:"noodles"},{slug:"roti-canai",name:"Roti Canai",category:"mamak"},{slug:"mee-goreng-mamak",name:"Mee Goreng Mamak",category:"noodles"},{slug:"nasi-goreng-kampung",name:"Nasi Goreng Kampung",category:"rice"},{slug:"bak-kut-teh",name:"Bak Kut Teh",category:"soup"},{slug:"curry-laksa",name:"Curry Laksa",category:"noodles"},{slug:"wantan-mee",name:"Wantan Mee",category:"noodles"},{slug:"teh-tarik",name:"Teh Tarik",category:"drinks"},{slug:"milo-ais",name:"Milo Ais",category:"drinks"},{slug:"cendol",name:"Cendol",category:"dessert"},{slug:"pisang-goreng",name:"Pisang Goreng",category:"snacks"},{slug:"nasi-goreng-mamak",name:"Nasi Goreng Mamak",category:"rice"},{slug:"asam-laksa",name:"Asam Laksa",category:"noodles"},{slug:"kangkung-belacan",name:"Kangkung Belacan",category:"veg"},{slug:"french-toast",name:"French Toast (Roti Bakar)",category:"mamak"},{slug:"ufo-tart",name:"UFO Tart",category:"dessert"},{slug:"egg-tart",name:"Egg Tart",category:"dessert"},{slug:"karipap",name:"Karipap (Curry Puff)",category:"snacks"},{slug:"popiah",name:"Popiah",category:"snacks"},{slug:"wat-tan-hor",name:"Wat Tan Hor",category:"noodles"},{slug:"satay",name:"Satay",category:"lauk"},{slug:"sarawak-laksa",name:"Sarawak Laksa",category:"noodles"},{slug:"laksa-johor",name:"Laksa Johor",category:"noodles"},{slug:"laksa-kedah",name:"Laksa Kedah",category:"noodles"},{slug:"nasi-kandar",name:"Nasi Kandar",category:"rice"},{slug:"nasi-briyani",name:"Nasi Briyani",category:"rice"},{slug:"nasi-kerabu",name:"Nasi Kerabu",category:"rice"},{slug:"nasi-dagang",name:"Nasi Dagang",category:"rice"},{slug:"asam-pedas",name:"Asam Pedas",category:"lauk"},{slug:"masak-lemak-cili-api",name:"Masak Lemak Cili Api",category:"lauk"},{slug:"sambal-tumis",name:"Sambal Tumis",category:"lauk"},{slug:"ayam-masak",name:"Ayam Masak",category:"lauk"},{slug:"daging-masak",name:"Daging Masak",category:"lauk"},{slug:"rendang",name:"Rendang",category:"lauk"},{slug:"serunding",name:"Serunding",category:"lauk"},{slug:"hokkien-mee-kl",name:"KL Hokkien Mee",category:"noodles"},{slug:"penang-hokkien-mee",name:"Penang Hokkien Mee",category:"noodles"},{slug:"pan-mee",name:"Pan Mee",category:"noodles"},{slug:"mee-rebus",name:"Mee Rebus",category:"noodles"},{slug:"mee-siam",name:"Mee Siam",category:"noodles"},{slug:"kolo-mee",name:"Kolo Mee",category:"noodles"},{slug:"ipoh-hor-fun",name:"Ipoh Hor Fun",category:"noodles"},{slug:"bee-hoon-goreng",name:"Bee Hoon Goreng",category:"noodles"},{slug:"maggi-goreng",name:"Maggi Goreng",category:"noodles"},{slug:"yee-mee",name:"Yee Mee",category:"noodles"},{slug:"tuaran-mee",name:"Tuaran Mee",category:"noodles"},{slug:"sabah-beef-noodles",name:"Sabah Beef Noodles (Ngiu Chap)",category:"noodles"},{slug:"kuih-seri-muka",name:"Kuih Seri Muka",category:"snacks"},{slug:"kuih-lapis",name:"Kuih Lapis",category:"snacks"},{slug:"kuih-talam",name:"Kuih Talam",category:"snacks"},{slug:"onde-onde",name:"Onde-Onde",category:"snacks"},{slug:"kuih-koci",name:"Kuih Koci",category:"snacks"},{slug:"kuih-ketayap",name:"Kuih Ketayap",category:"snacks"},{slug:"apam-balik",name:"Apam Balik",category:"snacks"},{slug:"kuih-bahulu",name:"Kuih Bahulu",category:"snacks"},{slug:"kuih-keria",name:"Kuih Keria",category:"snacks"},{slug:"kuih-cara-berlauk",name:"Kuih Cara Berlauk",category:"snacks"},{slug:"kuih-kaswi",name:"Kuih Kaswi",category:"snacks"},{slug:"dodol",name:"Dodol",category:"snacks"},
]

// ---- 76 new dishes to build ----
const NEW = [
  // RICE (9)
  {slug:"nasi-goreng-cina",name:"Nasi Goreng Cina",category:"rice",serving:"1 plate",hint:"Chinese-style fried rice; variants: kampung-style, with egg, seafood, with extra char siew"},
  {slug:"nasi-ulam",name:"Nasi Ulam",category:"rice",serving:"1 plate",hint:"herb rice salad with shredded raw herbs and fish; one of the lighter rice dishes"},
  {slug:"nasi-tomato",name:"Nasi Tomato",category:"rice",serving:"1 plate with ayam masak merah",hint:"kenduri tomato rice; variant with ayam masak merah, plain"},
  {slug:"nasi-minyak",name:"Nasi Minyak",category:"rice",serving:"1 plate",hint:"ghee/oil rice served at kenduri with dalca and kurma; rich"},
  {slug:"nasi-ambeng",name:"Nasi Ambeng",category:"rice",serving:"1 portion (shared platter share)",hint:"Javanese communal platter with rice, ayam, serunding, urap, bihun, sambal goreng"},
  {slug:"nasi-lemuni",name:"Nasi Lemuni",category:"rice",serving:"1 plate",hint:"Kelantan/Terengganu herb (daun lemuni) rice; niche, served with sambal and ulam"},
  {slug:"nasi-ayam-penyet",name:"Nasi Ayam Penyet",category:"rice",serving:"1 plate",hint:"smashed fried chicken with rice, sambal, tofu, tempeh; variants ayam bakar, sambal level"},
  {slug:"claypot-chicken-rice",name:"Claypot Chicken Rice",category:"rice",serving:"1 claypot",hint:"clay pot rice with chicken, lap cheong, salted fish, dark soy; often shared"},
  {slug:"char-siew-rice",name:"Char Siew Rice",category:"rice",serving:"1 plate",hint:"roast pork over rice; variants with egg, with siew yoke, mixed roast"},
  // NOODLES (12)
  {slug:"mee-kari",name:"Mee Kari (Curry Mee)",category:"noodles",serving:"1 bowl",hint:"curry coconut noodle soup; variants ayam, udang, seafood; close to curry laksa"},
  {slug:"mee-bandung-muar",name:"Mee Bandung Muar",category:"noodles",serving:"1 bowl",hint:"sweet-spicy dried shrimp gravy noodles from Muar, Johor; with egg, prawns, beef"},
  {slug:"mee-hailam",name:"Mee Hailam",category:"noodles",serving:"1 plate",hint:"Hainanese-style saucy yellow noodles with thick gravy, veg, meat"},
  {slug:"mee-jawa",name:"Mee Jawa",category:"noodles",serving:"1 bowl",hint:"Javanese sweet-spicy sweet-potato gravy noodles; with egg, tauhu, prawn fritter"},
  {slug:"mee-tomyam",name:"Mee Tomyam",category:"noodles",serving:"1 bowl",hint:"tomyam soup noodles; variants ayam, seafood, campur"},
  {slug:"mee-sup",name:"Mee Sup",category:"noodles",serving:"1 bowl",hint:"clear soup noodles, Sabah staple; variants tulang, ayam, daging"},
  {slug:"kuey-teow-soup",name:"Kuey Teow Soup",category:"noodles",serving:"1 bowl",hint:"clear soup flat rice noodles with fishball, meat slices; light"},
  {slug:"kuey-teow-kung-fu",name:"Kuey Teow Kung Fu",category:"noodles",serving:"1 plate",hint:"crispy deep-fried kuey teow topped with egg starch gravy and seafood"},
  {slug:"fish-ball-noodles",name:"Fish Ball Noodles",category:"noodles",serving:"1 bowl",hint:"fishball noodles; variants soup vs dry, mee/kuey teow/bee hoon"},
  {slug:"hakka-mee",name:"Hakka Mee",category:"noodles",serving:"1 bowl",hint:"dry egg noodles topped with minced pork sauce; with soup on side"},
  {slug:"claypot-lou-shu-fun",name:"Claypot Lou Shu Fun",category:"noodles",serving:"1 claypot",hint:"rat-tail/pin noodles in claypot with egg, minced pork, dark soy"},
  {slug:"chee-cheong-fun",name:"Chee Cheong Fun",category:"noodles",serving:"1 plate",hint:"steamed rice noodle rolls; variants KL sweet sauce, Ipoh/Penang curry, with yong tau foo"},
  // MAMAK & BREAD (4)
  {slug:"murtabak",name:"Murtabak",category:"mamak",serving:"1 piece",hint:"thick fried bread stuffed with egg, onion, minced meat; variants ayam, daging, kambing"},
  {slug:"thosai",name:"Thosai (Tosai)",category:"mamak",serving:"1 piece plain",hint:"fermented rice/lentil crepe; variants plain, masala, telur, paper; light by itself"},
  {slug:"vadai",name:"Vadai",category:"mamak",serving:"1 piece",hint:"fried lentil fritter; variants dhal vadai, prawn vadai"},
  {slug:"idli",name:"Idli",category:"mamak",serving:"2 pieces",hint:"steamed fermented rice cakes with chutney/sambar; one of the lightest mamak items"},
  // SOUPS (11)
  {slug:"sup-kambing",name:"Sup Kambing",category:"soup",serving:"1 bowl",hint:"spiced mutton soup; with bread"},
  {slug:"sup-tulang",name:"Sup Tulang",category:"soup",serving:"1 bowl",hint:"bone and marrow soup; variant sup tulang merah (red sauce)"},
  {slug:"sup-ekor",name:"Sup Ekor",category:"soup",serving:"1 bowl",hint:"oxtail soup; rich and fatty"},
  {slug:"sup-ayam",name:"Sup Ayam",category:"soup",serving:"1 bowl",hint:"clear spiced chicken soup; one of the lighter soups"},
  {slug:"sup-gear-box",name:"Sup Gear Box",category:"soup",serving:"1 bowl",hint:"beef shank/marrow bone soup, niche; eaten with a straw for marrow"},
  {slug:"tomyam",name:"Tomyam",category:"soup",serving:"1 bowl (shared, per serving)",hint:"tomyam soup as a dish not noodles; variants ayam, seafood, campur, putih (creamy) vs clear"},
  {slug:"bubur-ayam",name:"Bubur Ayam",category:"soup",serving:"1 bowl",hint:"chicken rice congee with shredded chicken, spring onion, fried shallots; light and filling"},
  {slug:"bubur-lambuk",name:"Bubur Lambuk",category:"soup",serving:"1 bowl",hint:"Ramadan spiced savoury rice porridge with meat and vegetables"},
  {slug:"yong-tau-foo-soup",name:"Yong Tau Foo (Soup)",category:"soup",serving:"1 bowl (8 pieces)",hint:"stuffed tofu, tofu skin, vegetables and fishpaste items in clear soup; calories depend on piece mix"},
  {slug:"hakka-lei-cha",name:"Hakka Lei Cha (Thunder Tea Rice)",category:"soup",serving:"1 bowl",hint:"rice with chopped vegetables and herb tea broth; very healthy, high fibre"},
  {slug:"steamboat",name:"Steamboat",category:"soup",serving:"1 serving (per person)",hint:"hotpot of soup-cooked meats, seafood, veg, noodles; varies hugely by broth and dipping"},
  // LAUK (18)
  {slug:"ayam-percik",name:"Ayam Percik",category:"lauk",serving:"1 piece",hint:"grilled chicken glazed with spiced coconut sauce; Kelantan/Terengganu"},
  {slug:"ayam-bakar",name:"Ayam Bakar",category:"lauk",serving:"1 piece",hint:"grilled marinated chicken; variants madu (honey), berempah, kicap"},
  {slug:"daging-dendeng",name:"Daging Dendeng",category:"lauk",serving:"1 serving",hint:"thin spicy fried/dried beef with sambal; Minang style"},
  {slug:"daging-harimau-menangis",name:"Daging Harimau Menangis",category:"lauk",serving:"1 serving",hint:"grilled beef slices with raw chilli-soy dip; the dip is near free, beef carries it"},
  {slug:"sambal-sotong",name:"Sambal Sotong",category:"lauk",serving:"1 serving",hint:"squid in sambal tumis; variants goreng kunyit, bakar, with petai"},
  {slug:"sambal-udang",name:"Sambal Udang",category:"lauk",serving:"1 serving",hint:"prawns in sambal; variants petai, butter prawn (heavier), goreng tepung"},
  {slug:"ikan-bakar",name:"Ikan Bakar",category:"lauk",serving:"1 piece",hint:"grilled fish in banana leaf; variants sambal, percik, cili kicap, with petai; lean choice"},
  {slug:"ikan-masak-lemak",name:"Ikan Masak Lemak",category:"lauk",serving:"1 serving",hint:"fish in coconut turmeric gravy; the santan drives the calories"},
  {slug:"ikan-patin-tempoyak",name:"Ikan Patin Masak Tempoyak",category:"lauk",serving:"1 serving",hint:"patin fish in fermented durian and coconut gravy; Pahang specialty"},
  {slug:"gulai",name:"Gulai",category:"lauk",serving:"1 serving",hint:"spiced coconut curry; variants ayam, ikan, tempoyak, kawah, tongkol"},
  {slug:"kari-kepala-ikan",name:"Kari Kepala Ikan",category:"lauk",serving:"1 serving (with head portion)",hint:"fish head curry with okra, tomato, coconut gravy; often shared"},
  {slug:"salted-egg-crab",name:"Salted Egg Crab",category:"lauk",serving:"1 serving (about half a crab)",hint:"crab in rich salted egg yolk butter sauce; the sauce is calorie dense"},
  {slug:"kam-heong-crab",name:"Kam Heong Crab",category:"lauk",serving:"1 serving (about half a crab)",hint:"crab stir-fried in aromatic dried-shrimp curry-leaf sauce"},
  {slug:"ketam-masak",name:"Ketam Masak",category:"lauk",serving:"1 serving (about half a crab)",hint:"crab dishes; variants masak sambal, cili, telur masin (salted egg), masak lemak"},
  {slug:"otak-otak",name:"Otak-Otak",category:"lauk",serving:"1 piece",hint:"grilled spiced fish paste in banana leaf; small, snack-sized"},
  {slug:"keropok-lekor",name:"Keropok Lekor",category:"lauk",serving:"1 serving",hint:"Terengganu fish sausage; variants lekor (chewy boiled-then-fried) vs losong; deep fried absorbs oil"},
  {slug:"nestum-chicken",name:"Nestum Chicken",category:"lauk",serving:"1 serving",hint:"fried chicken tossed in buttery Nestum cereal; sweet, calorie dense"},
  {slug:"tempoyak",name:"Tempoyak",category:"lauk",serving:"2 tbsp",hint:"fermented durian sambal/condiment eaten with rice; small portion, pungent"},
  // VEG (6)
  {slug:"sayur-lemak",name:"Sayur Lemak",category:"veg",serving:"1 serving",hint:"vegetables in coconut gravy; variants labu (pumpkin), pucuk manis, kobis; santan adds calories"},
  {slug:"kailan-ikan-masin",name:"Kailan Ikan Masin",category:"veg",serving:"1 serving",hint:"kailan stir-fried with salted fish and garlic; oil and salted fish add up"},
  {slug:"sawi-sos-tiram",name:"Sawi / Broccoli Sos Tiram",category:"veg",serving:"1 serving",hint:"blanched greens in oyster sauce; one of the lightest sides"},
  {slug:"taugeh-ikan-masin",name:"Taugeh Ikan Masin",category:"veg",serving:"1 serving",hint:"beansprouts stir-fried with salted fish; light but oily"},
  {slug:"tauhu-sumbat",name:"Tauhu Sumbat",category:"veg",serving:"1 serving (4 pieces)",hint:"fried tofu pockets stuffed with cucumber and beansprouts, sweet chilli sauce"},
  {slug:"ulam-ulaman",name:"Ulam-Ulaman",category:"veg",serving:"1 serving with sambal belacan",hint:"raw herb and vegetable platter with sambal belacan; nearly free calories"},
  // SNACKS (8)
  {slug:"cucur-udang",name:"Cucur Udang",category:"snacks",serving:"1 piece",hint:"prawn and vegetable fritter; deep fried"},
  {slug:"cucur-badak",name:"Cucur Badak",category:"snacks",serving:"1 piece",hint:"sweet potato fritter with spiced coconut-dried-shrimp filling"},
  {slug:"lok-lok",name:"Lok Lok",category:"snacks",serving:"per stick",hint:"skewers of meat, seafood, veg, tofu, processed items boiled or steamed; sauce adds calories; price per stick"},
  {slug:"yong-tau-foo-fried",name:"Yong Tau Foo (Fried)",category:"snacks",serving:"per piece",hint:"deep-fried stuffed tofu, fishpaste chilli, beancurd skin; oilier than the soup version"},
  {slug:"kuih-bangkit",name:"Kuih Bangkit",category:"snacks",serving:"1 piece",hint:"melt-in-mouth tapioca coconut cookie; festive; small but sugary"},
  {slug:"kuih-badak-berendam",name:"Kuih Badak Berendam",category:"snacks",serving:"1 piece",hint:"glutinous coconut dumpling sitting in sweet santan"},
  {slug:"kuih-kasturi",name:"Kuih Kasturi",category:"snacks",serving:"1 piece",hint:"fried glutinous ball filled with sweet grated coconut, sesame coated"},
  {slug:"kuih-jala",name:"Kuih Jala (Roti Jala)",category:"snacks",serving:"2 pieces with curry",hint:"lacy net pancake eaten with curry or sweet kuah; light per piece"},
  // DRINKS (6)
  {slug:"kopi-tarik",name:"Kopi Tarik",category:"drinks",serving:"1 glass",hint:"pulled coffee with condensed and evaporated milk; variants kopi O (black), kopi peng (iced), kurang manis"},
  {slug:"sirap-bandung",name:"Sirap Bandung",category:"drinks",serving:"1 glass",hint:"rose syrup with evaporated milk; variant bandung soda (with sarsi)"},
  {slug:"soya",name:"Soya (Soy Milk)",category:"drinks",serving:"1 cup",hint:"soy milk; variants kosong (no sugar), with cincau (soya cincau), sweetened"},
  {slug:"air-tebu",name:"Air Tebu",category:"drinks",serving:"1 glass",hint:"fresh-pressed sugarcane juice; pure sugar, no fat; variant with lime/asam boi"},
  {slug:"air-kelapa",name:"Air Kelapa",category:"drinks",serving:"1 coconut",hint:"fresh coconut water; low calorie if just the water, more if you eat the flesh"},
  {slug:"cincau",name:"Cincau",category:"drinks",serving:"1 glass",hint:"grass jelly drink with syrup; variants with soya, with milk; jelly is near free, syrup is the calories"},
  // DESSERTS (2)
  {slug:"ais-kacang",name:"Ais Kacang (ABC)",category:"dessert",serving:"1 bowl",hint:"shaved ice with red beans, jelly, corn, syrup, condensed milk; variants with ice cream, with durian"},
  {slug:"bubur-cha-cha",name:"Bubur Cha Cha",category:"dessert",serving:"1 bowl",hint:"sweet potato and yam cubes with sago in sweet coconut milk; served warm or cold"},
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
- Do not use the word "delve". Do not start sentences with "Look,".`

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
`You are a nutrition researcher for a Malaysian food calorie database. Research realistic calorie and macro numbers for ONE dish as it is typically served at a Malaysian hawker stall, kopitiam, mamak or restaurant.

DISH: ${d.name}
SLUG (echo exactly): ${d.slug}
TYPICAL SERVING TO PRICE AROUND: ${d.serving}
CONTEXT: ${d.hint}

Do web research. Triangulate the calories and macros from at least two of: published nutrition databases (MyFitnessPal, FatSecret, Nutritionix, MyFCD Malaysia), Malaysian sources, or component math (sum the rice/protein/oil/gravy). Numbers are for a TYPICAL real-world serving, not a diet portion.

Rules:
- servingGrams is the approximate edible weight of that serving.
- components: 2 to 5 rows showing where the calories come from; their calories should roughly add up to the total (within ~10 percent).
- variants: if the dish has meaningful ordering variants (e.g. soup vs dry, different proteins, with/without santan), list them as rows ranked from lowest to highest calories, each with a short note. If there are no meaningful variants, return an empty array.
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
- realTalk: EXACTLY 2 paragraphs. First paragraph: the honest take on the dish and its calories, what drives them, who it suits. Second paragraph: the practical "what actually changes the maths" angle (portion, oil, gravy, protein swap). Use specific gram and calorie numbers. This is the heart of the page, make it sound like a real person at the mamak.
- lighter: 3 to 5 concrete tips to eat it lighter, specific to THIS dish.
- faq: EXACTLY 3 question/answer pairs. The first question MUST be "How many calories in ${d.name}?" answered with the number. The other two are real questions a dieter would Google about this dish.
- related: pick EXACTLY 3 slugs from the menu below, choosing the most genuinely related dishes (same category or natural comparisons). Use the slug strings exactly. Do NOT invent slugs. Do NOT include "${d.slug}" itself.

${research.isEstimate ? 'NOTE: numbers are an estimate. Somewhere in realTalk, honestly flag that this is a ballpark estimate because hard data is thin for this dish.' : ''}

RELATED SLUG MENU (choose 3, exact strings before the parenthesis):
${SLUG_MENU}

Return ONLY the structured object with every required field. Reproduce serving, servingGrams, calories, protein, carbs, fat, components and variants exactly as given in the locked numbers.`,
      { label: `write:${d.slug}`, phase: 'Write', model: 'sonnet', schema: WRITE_SCHEMA }
    )
  }
)

return dishes.filter(Boolean)
