export const meta = {
  name: 'foods-build-chunk3',
  description: 'Research + write 23 Malaysian/Bornean food calorie pages for the /foods/ pSEO database',
  phases: [
    { title: 'Research', detail: 'triangulate calorie/macro numbers per dish (sonnet)' },
    { title: 'Write', detail: 'mamak-voice content on locked numbers (sonnet)' },
  ],
}

const EXISTING = [{"slug":"nasi-lemak","name":"Nasi Lemak","category":"rice"},{"slug":"chicken-rice","name":"Chicken Rice","category":"rice"},{"slug":"char-kuey-teow","name":"Char Kuey Teow","category":"noodles"},{"slug":"roti-canai","name":"Roti Canai","category":"mamak"},{"slug":"mee-goreng-mamak","name":"Mee Goreng Mamak","category":"noodles"},{"slug":"nasi-goreng-kampung","name":"Nasi Goreng Kampung","category":"rice"},{"slug":"bak-kut-teh","name":"Bak Kut Teh","category":"soup"},{"slug":"curry-laksa","name":"Curry Laksa","category":"noodles"},{"slug":"wantan-mee","name":"Wantan Mee","category":"noodles"},{"slug":"teh-tarik","name":"Teh Tarik","category":"drinks"},{"slug":"milo-ais","name":"Milo Ais","category":"drinks"},{"slug":"cendol","name":"Cendol","category":"dessert"},{"slug":"pisang-goreng","name":"Pisang Goreng","category":"snacks"},{"slug":"nasi-goreng-mamak","name":"Nasi Goreng Mamak","category":"rice"},{"slug":"asam-laksa","name":"Asam Laksa","category":"noodles"},{"slug":"kangkung-belacan","name":"Kangkung Belacan","category":"veg"},{"slug":"french-toast","name":"French Toast (Roti Bakar)","category":"mamak"},{"slug":"ufo-tart","name":"UFO Tart","category":"dessert"},{"slug":"egg-tart","name":"Egg Tart","category":"dessert"},{"slug":"karipap","name":"Karipap (Curry Puff)","category":"snacks"},{"slug":"popiah","name":"Popiah","category":"snacks"},{"slug":"wat-tan-hor","name":"Wat Tan Hor","category":"noodles"},{"slug":"satay","name":"Satay","category":"lauk"},{"slug":"sarawak-laksa","name":"Sarawak Laksa","category":"noodles"},{"slug":"laksa-johor","name":"Laksa Johor","category":"noodles"},{"slug":"laksa-kedah","name":"Laksa Kedah","category":"noodles"},{"slug":"nasi-kandar","name":"Nasi Kandar","category":"rice"},{"slug":"nasi-briyani","name":"Nasi Briyani","category":"rice"},{"slug":"nasi-kerabu","name":"Nasi Kerabu","category":"rice"},{"slug":"nasi-dagang","name":"Nasi Dagang","category":"rice"},{"slug":"asam-pedas","name":"Asam Pedas","category":"lauk"},{"slug":"masak-lemak-cili-api","name":"Masak Lemak Cili Api","category":"lauk"},{"slug":"sambal-tumis","name":"Sambal Tumis","category":"lauk"},{"slug":"ayam-masak","name":"Ayam Masak","category":"lauk"},{"slug":"daging-masak","name":"Daging Masak","category":"lauk"},{"slug":"rendang","name":"Rendang","category":"lauk"},{"slug":"serunding","name":"Serunding","category":"lauk"},{"slug":"hokkien-mee-kl","name":"KL Hokkien Mee","category":"noodles"},{"slug":"penang-hokkien-mee","name":"Penang Hokkien Mee","category":"noodles"},{"slug":"pan-mee","name":"Pan Mee","category":"noodles"},{"slug":"mee-rebus","name":"Mee Rebus","category":"noodles"},{"slug":"mee-siam","name":"Mee Siam","category":"noodles"},{"slug":"kolo-mee","name":"Kolo Mee","category":"noodles"},{"slug":"ipoh-hor-fun","name":"Ipoh Hor Fun","category":"noodles"},{"slug":"bee-hoon-goreng","name":"Bee Hoon Goreng","category":"noodles"},{"slug":"maggi-goreng","name":"Maggi Goreng","category":"noodles"},{"slug":"yee-mee","name":"Yee Mee","category":"noodles"},{"slug":"tuaran-mee","name":"Tuaran Mee","category":"noodles"},{"slug":"sabah-beef-noodles","name":"Sabah Beef Noodles (Ngiu Chap)","category":"noodles"},{"slug":"kuih-seri-muka","name":"Kuih Seri Muka","category":"snacks"},{"slug":"kuih-lapis","name":"Kuih Lapis","category":"snacks"},{"slug":"kuih-talam","name":"Kuih Talam","category":"snacks"},{"slug":"onde-onde","name":"Onde-Onde","category":"snacks"},{"slug":"kuih-koci","name":"Kuih Koci","category":"snacks"},{"slug":"kuih-ketayap","name":"Kuih Ketayap","category":"snacks"},{"slug":"apam-balik","name":"Apam Balik","category":"snacks"},{"slug":"kuih-bahulu","name":"Kuih Bahulu","category":"snacks"},{"slug":"kuih-keria","name":"Kuih Keria","category":"snacks"},{"slug":"kuih-cara-berlauk","name":"Kuih Cara Berlauk","category":"snacks"},{"slug":"kuih-kaswi","name":"Kuih Kaswi","category":"snacks"},{"slug":"dodol","name":"Dodol","category":"snacks"},{"slug":"nasi-goreng-cina","name":"Nasi Goreng Cina","category":"rice"},{"slug":"nasi-ulam","name":"Nasi Ulam","category":"rice"},{"slug":"nasi-tomato","name":"Nasi Tomato","category":"rice"},{"slug":"nasi-minyak","name":"Nasi Minyak","category":"rice"},{"slug":"nasi-ambeng","name":"Nasi Ambeng","category":"rice"},{"slug":"nasi-lemuni","name":"Nasi Lemuni","category":"rice"},{"slug":"nasi-ayam-penyet","name":"Nasi Ayam Penyet","category":"rice"},{"slug":"claypot-chicken-rice","name":"Claypot Chicken Rice","category":"rice"},{"slug":"char-siew-rice","name":"Char Siew Rice","category":"rice"},{"slug":"mee-kari","name":"Mee Kari (Curry Mee)","category":"noodles"},{"slug":"mee-bandung-muar","name":"Mee Bandung Muar","category":"noodles"},{"slug":"mee-hailam","name":"Mee Hailam","category":"noodles"},{"slug":"mee-jawa","name":"Mee Jawa","category":"noodles"},{"slug":"mee-tomyam","name":"Mee Tomyam","category":"noodles"},{"slug":"mee-sup","name":"Mee Sup","category":"noodles"},{"slug":"kuey-teow-soup","name":"Kuey Teow Soup","category":"noodles"},{"slug":"kuey-teow-kung-fu","name":"Kuey Teow Kung Fu","category":"noodles"},{"slug":"fish-ball-noodles","name":"Fish Ball Noodles","category":"noodles"},{"slug":"hakka-mee","name":"Hakka Mee","category":"noodles"},{"slug":"claypot-lou-shu-fun","name":"Claypot Lou Shu Fun","category":"noodles"},{"slug":"chee-cheong-fun","name":"Chee Cheong Fun","category":"noodles"},{"slug":"murtabak","name":"Murtabak","category":"mamak"},{"slug":"thosai","name":"Thosai (Tosai)","category":"mamak"},{"slug":"vadai","name":"Vadai","category":"mamak"},{"slug":"idli","name":"Idli","category":"mamak"},{"slug":"sup-kambing","name":"Sup Kambing","category":"soup"},{"slug":"sup-tulang","name":"Sup Tulang","category":"soup"},{"slug":"sup-ekor","name":"Sup Ekor","category":"soup"},{"slug":"sup-ayam","name":"Sup Ayam","category":"soup"},{"slug":"sup-gear-box","name":"Sup Gear Box","category":"soup"},{"slug":"tomyam","name":"Tomyam","category":"soup"},{"slug":"bubur-ayam","name":"Bubur Ayam","category":"soup"},{"slug":"bubur-lambuk","name":"Bubur Lambuk","category":"soup"},{"slug":"yong-tau-foo-soup","name":"Yong Tau Foo (Soup)","category":"soup"},{"slug":"hakka-lei-cha","name":"Hakka Lei Cha (Thunder Tea Rice)","category":"soup"},{"slug":"steamboat","name":"Steamboat","category":"soup"},{"slug":"ayam-percik","name":"Ayam Percik","category":"lauk"},{"slug":"ayam-bakar","name":"Ayam Bakar","category":"lauk"},{"slug":"daging-dendeng","name":"Daging Dendeng","category":"lauk"},{"slug":"daging-harimau-menangis","name":"Daging Harimau Menangis","category":"lauk"},{"slug":"sambal-sotong","name":"Sambal Sotong","category":"lauk"},{"slug":"sambal-udang","name":"Sambal Udang","category":"lauk"},{"slug":"ikan-bakar","name":"Ikan Bakar","category":"lauk"},{"slug":"ikan-masak-lemak","name":"Ikan Masak Lemak","category":"lauk"},{"slug":"ikan-patin-tempoyak","name":"Ikan Patin Masak Tempoyak","category":"lauk"},{"slug":"gulai","name":"Gulai","category":"lauk"},{"slug":"kari-kepala-ikan","name":"Kari Kepala Ikan","category":"lauk"},{"slug":"salted-egg-crab","name":"Salted Egg Crab","category":"lauk"},{"slug":"kam-heong-crab","name":"Kam Heong Crab","category":"lauk"},{"slug":"ketam-masak","name":"Ketam Masak","category":"lauk"},{"slug":"otak-otak","name":"Otak-Otak","category":"lauk"},{"slug":"keropok-lekor","name":"Keropok Lekor","category":"lauk"},{"slug":"nestum-chicken","name":"Nestum Chicken","category":"lauk"},{"slug":"tempoyak","name":"Tempoyak","category":"lauk"},{"slug":"sayur-lemak","name":"Sayur Lemak","category":"veg"},{"slug":"kailan-ikan-masin","name":"Kailan Ikan Masin","category":"veg"},{"slug":"sawi-sos-tiram","name":"Sawi / Broccoli Sos Tiram","category":"veg"},{"slug":"taugeh-ikan-masin","name":"Taugeh Ikan Masin","category":"veg"},{"slug":"tauhu-sumbat","name":"Tauhu Sumbat","category":"veg"},{"slug":"ulam-ulaman","name":"Ulam-Ulaman","category":"veg"},{"slug":"cucur-udang","name":"Cucur Udang","category":"snacks"},{"slug":"cucur-badak","name":"Cucur Badak","category":"snacks"},{"slug":"lok-lok","name":"Lok Lok","category":"snacks"},{"slug":"yong-tau-foo-fried","name":"Yong Tau Foo (Fried)","category":"snacks"},{"slug":"kuih-bangkit","name":"Kuih Bangkit","category":"snacks"},{"slug":"kuih-badak-berendam","name":"Kuih Badak Berendam","category":"snacks"},{"slug":"kuih-kasturi","name":"Kuih Kasturi","category":"snacks"},{"slug":"kuih-jala","name":"Kuih Jala (Roti Jala)","category":"snacks"},{"slug":"kopi-tarik","name":"Kopi Tarik","category":"drinks"},{"slug":"sirap-bandung","name":"Sirap Bandung","category":"drinks"},{"slug":"soya","name":"Soya (Soy Milk)","category":"drinks"},{"slug":"air-tebu","name":"Air Tebu","category":"drinks"},{"slug":"air-kelapa","name":"Air Kelapa","category":"drinks"},{"slug":"cincau","name":"Cincau","category":"drinks"},{"slug":"ais-kacang","name":"Ais Kacang (ABC)","category":"dessert"},{"slug":"bubur-cha-cha","name":"Bubur Cha Cha","category":"dessert"},{"slug":"sang-nyuk-mian","name":"Sang Nyuk Mian","category":"noodles"},{"slug":"beaufort-mee","name":"Beaufort Mee","category":"noodles"},{"slug":"tamparuli-mee","name":"Tamparuli Mee","category":"noodles"},{"slug":"tenom-mee","name":"Tenom Mee","category":"noodles"},{"slug":"hinava","name":"Hinava","category":"lauk"},{"slug":"bosou","name":"Bosou","category":"lauk"},{"slug":"pinasakan","name":"Pinasakan","category":"lauk"},{"slug":"sinalau-bakas","name":"Sinalau Bakas","category":"lauk"},{"slug":"tuhau","name":"Tuhau","category":"veg"},{"slug":"bambangan","name":"Bambangan","category":"veg"},{"slug":"sayur-manis","name":"Sayur Manis (Cangkuk Manis / Sabah Veg)","category":"veg"},{"slug":"latok","name":"Latok (Sea Grapes)","category":"veg"},{"slug":"linopot","name":"Linopot","category":"rice"},{"slug":"ambuyat","name":"Ambuyat","category":"rice"},{"slug":"kuih-penjaram","name":"Kuih Penjaram (Pinjaram)","category":"snacks"},{"slug":"kuih-cincin","name":"Kuih Cincin","category":"snacks"},{"slug":"kelupis","name":"Kelupis","category":"snacks"},{"slug":"asam-rebus","name":"Asam Rebus","category":"lauk"},{"slug":"ayam-goreng","name":"Ayam Goreng","category":"lauk"},{"slug":"paru-goreng","name":"Paru Goreng","category":"lauk"},{"slug":"kerang-masak","name":"Kerang Masak","category":"lauk"},{"slug":"lala-masak","name":"Lala Masak","category":"lauk"},{"slug":"ikan-goreng","name":"Ikan Goreng","category":"lauk"},{"slug":"ikan-stim","name":"Ikan Stim","category":"lauk"},{"slug":"sup-daging","name":"Sup Daging","category":"soup"},{"slug":"sup-ikan","name":"Sup Ikan","category":"soup"},{"slug":"sup-sayur","name":"Sup Sayur","category":"soup"},{"slug":"bubur-jagung","name":"Bubur Jagung","category":"dessert"},{"slug":"pulut","name":"Pulut","category":"snacks"},{"slug":"ketupat","name":"Ketupat","category":"rice"},{"slug":"ketupat-sotong","name":"Ketupat Sotong","category":"lauk"},{"slug":"lemang","name":"Lemang","category":"rice"},{"slug":"masak-kicap","name":"Masak Kicap","category":"lauk"},{"slug":"masak-merah","name":"Masak Merah","category":"lauk"},{"slug":"sayur-campur","name":"Sayur Campur","category":"veg"},{"slug":"sambal-petai","name":"Sambal Petai","category":"lauk"}]

const NEW = [
  {"slug":"banana-leaf-rice","name":"Banana Leaf Rice","category":"rice","serving":"1 serving (with refills)","hint":"South Indian rice on banana leaf with vegetable sides, rasam, curries, papadom and refillable rice; calories vary hugely with how many curry and rice refills you take; flag the refill trap"},
  {"slug":"varuval","name":"Varuval","category":"lauk","serving":"1 serving","hint":"South Indian/mamak dry-fried spiced meat with a thick clinging masala, less gravy than curry but more oil; variants chicken varuval, mutton varuval"},
  {"slug":"kari-ayam","name":"Kari Ayam (Chicken Curry)","category":"lauk","serving":"1 serving","hint":"chicken curry in spiced gravy; variants mamak (thinner, oilier), kampung (coconut-based), with potato; the gravy oil and santan drive calories, the chicken is lean"},
  {"slug":"kari-kambing","name":"Kari Kambing (Mutton Curry)","category":"lauk","serving":"1 serving","hint":"mutton/goat curry in rich spiced gravy; fattier than chicken curry because of the mutton fat and oil; mamak staple with bread or rice"},
  {"slug":"tandoori-chicken","name":"Tandoori Chicken","category":"lauk","serving":"1 quarter (leg or breast)","hint":"yogurt and spice marinated chicken roasted in a tandoor; relatively lean if you skip the skin, one of the better mamak protein choices; usually eaten with naan"},
  {"slug":"naan","name":"Naan","category":"mamak","serving":"1 piece","hint":"tandoor-baked leavened flatbread; variants plain, butter, garlic, cheese; butter and cheese versions add a lot, plain is just refined flour carbs"},
  {"slug":"chapati","name":"Chapati","category":"mamak","serving":"1 piece","hint":"wholemeal unleavened flatbread, lighter and higher fibre than naan, little to no oil; eaten with dhal or curry; a smarter mamak bread choice"},
  {"slug":"roti-tisu","name":"Roti Tisu","category":"mamak","serving":"1 piece","hint":"giant paper-thin crispy cone-shaped sweet roti dusted with sugar and often condensed milk; mostly sugar and ghee, a dessert disguised as bread"},
  {"slug":"poori","name":"Poori (Puri)","category":"mamak","serving":"2 pieces with curry","hint":"small deep-fried puffed wheat bread served with potato curry (aloo) and dhal; oil absorbed in deep frying drives calories"},
  {"slug":"samosa","name":"Samosa","category":"snacks","serving":"1 piece","hint":"deep-fried pastry triangle with spiced filling; variants vegetable (potato/peas), chicken; pastry and frying oil are most of the calories"},
  {"slug":"pakora","name":"Pakora","category":"snacks","serving":"1 serving","hint":"chickpea-batter fritters deep fried; variants vegetable pakora, onion bhaji; batter plus absorbed oil drive calories"},
  {"slug":"lassi","name":"Lassi","category":"drinks","serving":"1 glass","hint":"blended yogurt drink; variants sweet mango lassi (sugar and fruit puree), salted lassi (much lower calorie); sugar is the main calorie driver in sweet versions"},
  {"slug":"teh-halia","name":"Teh Halia","category":"drinks","serving":"1 glass","hint":"pulled ginger milk tea with condensed and evaporated milk; similar to teh tarik plus ginger; condensed milk sugar and fat drive calories"},
  {"slug":"chicken-65","name":"Chicken 65","category":"lauk","serving":"1 serving","hint":"South Indian/mamak spicy deep-fried battered chicken bites, bright red, tossed in curry leaf and chili; batter and deep frying make it calorie dense"},
  {"slug":"lempeng","name":"Lempeng","category":"snacks","serving":"1 piece","hint":"Malay coconut pancake/crepe cooked on a griddle; variants kelapa (coconut), pisang (banana), jagung (corn); eaten with sambal or sugar; modest unless lots of oil"},
  {"slug":"kuih-putu","name":"Kuih Putu","category":"snacks","serving":"2 pieces","hint":"steamed rice-flour kuih with gula melaka centre and grated coconut; variants putu bambu (steamed in bamboo tubes), putu piring (disc shaped); palm sugar drives calories"},
  {"slug":"kuih-bom","name":"Kuih Bom","category":"snacks","serving":"1 piece","hint":"deep-fried dough ball with sweet grated coconut or chocolate filling, sometimes sesame coated; dough plus filling plus frying oil"},
  {"slug":"kuih-siput","name":"Kuih Siput","category":"snacks","serving":"1 small handful","hint":"crunchy fried snail-shaped savoury snack made from spiced dough, a popular Raya cookie eaten by the handful; flour and frying oil, easy to overeat"},
  {"slug":"kuih-ros","name":"Kuih Ros (Kuih Loyang)","category":"snacks","serving":"2 pieces","hint":"deep-fried crispy rose/honeycomb cookie made by dipping a brass mould in coconut-egg batter then frying; light per piece but oily, eaten many at a time"},
  {"slug":"tepung-pelita","name":"Tepung Pelita","category":"snacks","serving":"1 piece","hint":"two-layer pandan and salted coconut-milk kuih steamed in small banana-leaf cups, a Ramadan bazaar staple; santan and sugar drive calories"},
  {"slug":"amplang","name":"Amplang","category":"snacks","serving":"1 small handful","hint":"bite-sized fish crackers from Sabah/Sarawak/East Coast made from mackerel and sago flour, deep fried and puffy; variants ikan, udang; oil and easy snacking volume"},
  {"slug":"kuih-kapit","name":"Kuih Kapit (Love Letters)","category":"snacks","serving":"3 pieces","hint":"thin crisp folded wafer of egg, coconut milk and sugar pressed in a hot mould, a Chinese New Year staple; variants kuih sepit/sapit; light each but eaten in quantity"},
  {"slug":"keropok-keping","name":"Keropok Keping","category":"snacks","serving":"1 serving","hint":"flat fish crackers (sliced and sun-dried then deep fried), the keping form of keropok; per piece light but absorbs oil and eaten with sweet chili dip"}
]

const CATEGORY_KEYS = ['rice','noodles','mamak','soup','lauk','veg','snacks','dessert','drinks']
const ALL = [...EXISTING, ...NEW]
const SLUG_MENU = ALL.map(d => `${d.slug} (${d.name}, ${d.category})`).join('\n')

const VOICE = `VOICE RULES (this is a Malaysian weight-loss blog written like a guy talking to his friend at the mamak):
- Casual, blunt, warm, slightly funny. Real numbers always. Educational but never preachy.
- Use lah / bah / bro / kan / liao naturally but sparingly (max 2-3 across the whole entry).
- Self-deprecating about being fat before is fine. Never sound like a health blog or fitness influencer.
- BANNED: the words "fuel your body", "clean eating", "wellness journey", "nutrient-dense". No generic openers like "Losing weight is hard".
- ABSOLUTE HARD RULE: NEVER use an em dash or en dash ANYWHERE, in any field, including inside metaDescription and summary. Use a comma, full stop, or the word "and" instead. Zero exceptions. For number ranges write "300 to 400" or "300-400" with a normal hyphen.
- Do not use the word "delve". Do not start sentences with "Look,".
- Do NOT use HTML entities like &amp; in any field; write a plain "and".
- Some dishes are Borneo (Sabah/Sarawak/Brunei) or Indian-Muslim; write with genuine "let me put you on to this" energy, not exoticising. Some are non-halal (pork, wild boar); state that plainly where relevant.`

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
`You are a nutrition researcher for a Malaysian food calorie database. Research realistic calorie and macro numbers for ONE dish as it is typically served in Malaysia (hawker stall, kopitiam, mamak, kedai kopi, pasar or restaurant).

DISH: ${d.name}
SLUG (echo exactly): ${d.slug}
TYPICAL SERVING TO PRICE AROUND: ${d.serving}
CONTEXT: ${d.hint}

Do web research. Triangulate calories and macros from at least two of: published nutrition databases (MyFitnessPal, FatSecret, Nutritionix, MyFCD Malaysia), Malaysian sources, or component math (sum the rice/protein/oil/gravy). Numbers are for a TYPICAL real-world serving, not a diet portion. When published data is thin (common for regional dishes), build the number honestly from component math and ingredient weights.

Rules:
- servingGrams is the approximate edible weight of that serving.
- components: 2 to 5 rows showing where the calories come from; their calories MUST sum to within 10 percent of the total.
- variants: if the dish has meaningful ordering variants (soup vs dry, different protein, with/without santan, flavour variants), list them as rows ranked from lowest to highest calories, each with a short note. Otherwise return an empty array.
- If you cannot find solid data, make a reasoned estimate from component math and set isEstimate true and confidence low.
- Round calories to the nearest 5 or 10. Protein/carbs/fat are grams.
- Return ONLY the structured object.`,
    { label: `research:${d.slug}`, phase: 'Research', model: 'sonnet', schema: RESEARCH_SCHEMA }
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
`You are writing one page for a Malaysian food calorie database. The numbers are ALREADY DECIDED and locked. Your job is the words only. Echo the locked numbers EXACTLY (do not change a single figure).

${VOICE}

DISH: ${d.name}
SLUG (echo exactly): ${d.slug}
CATEGORY (echo exactly): ${d.category}
CONTEXT: ${d.hint}

LOCKED NUMBERS (copy verbatim into your output, including components and variants):
${locked}

Write these fields:
- metaDescription: max 155 characters, conversational, mentions the calorie number. NO dash characters.
- summary: one sentence describing the dish, sits under the title. NO dash characters.
- answer: a short paragraph that LEADS with the calorie number and directly answers "how many calories", snippet-friendly but in voice.
- realTalk: EXACTLY 2 paragraphs. First: the honest take on the dish and its calories, what drives them, who it suits; briefly orient a reader who may not know the dish. Second: the practical "what actually changes the maths" angle (portion, oil, gravy, protein swap, noodle choice) with specific gram and calorie numbers.
- lighter: 3 to 5 concrete tips to eat it lighter, specific to THIS dish.
- faq: EXACTLY 3 q/a pairs. First question MUST be "How many calories in ${d.name}?" answered with the number. Other two are real dieter questions (what it is, is it healthy, how it compares).
- related: EXACTLY 3 slugs from the menu below, the most genuinely related dishes (same category or natural comparisons; prefer regional siblings where they fit). Exact slug strings. Do NOT invent slugs. Do NOT include "${d.slug}".

${research.isEstimate ? 'NOTE: numbers are an estimate. Somewhere in realTalk, honestly flag that this is a ballpark estimate because hard data is thin for this dish.' : ''}

RELATED SLUG MENU (choose 3, exact strings before the parenthesis):
${SLUG_MENU}

Return ONLY the structured object with every required field. Reproduce serving, servingGrams, calories, protein, carbs, fat, components and variants exactly as given.`,
      { label: `write:${d.slug}`, phase: 'Write', model: 'sonnet', schema: WRITE_SCHEMA }
    )
  }
)

return dishes.filter(Boolean)
