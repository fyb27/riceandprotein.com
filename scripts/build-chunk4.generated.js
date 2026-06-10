export const meta = {
  name: 'foods-build-chunk4',
  description: 'Research + write 20 Malaysian/Bornean food calorie pages for the /foods/ pSEO database',
  phases: [
    { title: 'Research', detail: 'triangulate calorie/macro numbers per dish (sonnet)' },
    { title: 'Write', detail: 'mamak-voice content on locked numbers (sonnet)' },
  ],
}

const EXISTING = [{"slug":"nasi-lemak","name":"Nasi Lemak","category":"rice"},{"slug":"chicken-rice","name":"Chicken Rice","category":"rice"},{"slug":"char-kuey-teow","name":"Char Kuey Teow","category":"noodles"},{"slug":"roti-canai","name":"Roti Canai","category":"mamak"},{"slug":"mee-goreng-mamak","name":"Mee Goreng Mamak","category":"noodles"},{"slug":"nasi-goreng-kampung","name":"Nasi Goreng Kampung","category":"rice"},{"slug":"bak-kut-teh","name":"Bak Kut Teh","category":"soup"},{"slug":"curry-laksa","name":"Curry Laksa","category":"noodles"},{"slug":"wantan-mee","name":"Wantan Mee","category":"noodles"},{"slug":"teh-tarik","name":"Teh Tarik","category":"drinks"},{"slug":"milo-ais","name":"Milo Ais","category":"drinks"},{"slug":"cendol","name":"Cendol","category":"dessert"},{"slug":"pisang-goreng","name":"Pisang Goreng","category":"snacks"},{"slug":"nasi-goreng-mamak","name":"Nasi Goreng Mamak","category":"rice"},{"slug":"asam-laksa","name":"Asam Laksa","category":"noodles"},{"slug":"kangkung-belacan","name":"Kangkung Belacan","category":"veg"},{"slug":"french-toast","name":"French Toast (Roti Bakar)","category":"mamak"},{"slug":"ufo-tart","name":"UFO Tart","category":"dessert"},{"slug":"egg-tart","name":"Egg Tart","category":"dessert"},{"slug":"karipap","name":"Karipap (Curry Puff)","category":"snacks"},{"slug":"popiah","name":"Popiah","category":"snacks"},{"slug":"wat-tan-hor","name":"Wat Tan Hor","category":"noodles"},{"slug":"satay","name":"Satay","category":"lauk"},{"slug":"sarawak-laksa","name":"Sarawak Laksa","category":"noodles"},{"slug":"laksa-johor","name":"Laksa Johor","category":"noodles"},{"slug":"laksa-kedah","name":"Laksa Kedah","category":"noodles"},{"slug":"nasi-kandar","name":"Nasi Kandar","category":"rice"},{"slug":"nasi-briyani","name":"Nasi Briyani","category":"rice"},{"slug":"nasi-kerabu","name":"Nasi Kerabu","category":"rice"},{"slug":"nasi-dagang","name":"Nasi Dagang","category":"rice"},{"slug":"asam-pedas","name":"Asam Pedas","category":"lauk"},{"slug":"masak-lemak-cili-api","name":"Masak Lemak Cili Api","category":"lauk"},{"slug":"sambal-tumis","name":"Sambal Tumis","category":"lauk"},{"slug":"ayam-masak","name":"Ayam Masak","category":"lauk"},{"slug":"daging-masak","name":"Daging Masak","category":"lauk"},{"slug":"rendang","name":"Rendang","category":"lauk"},{"slug":"serunding","name":"Serunding","category":"lauk"},{"slug":"hokkien-mee-kl","name":"KL Hokkien Mee","category":"noodles"},{"slug":"penang-hokkien-mee","name":"Penang Hokkien Mee","category":"noodles"},{"slug":"pan-mee","name":"Pan Mee","category":"noodles"},{"slug":"mee-rebus","name":"Mee Rebus","category":"noodles"},{"slug":"mee-siam","name":"Mee Siam","category":"noodles"},{"slug":"kolo-mee","name":"Kolo Mee","category":"noodles"},{"slug":"ipoh-hor-fun","name":"Ipoh Hor Fun","category":"noodles"},{"slug":"bee-hoon-goreng","name":"Bee Hoon Goreng","category":"noodles"},{"slug":"maggi-goreng","name":"Maggi Goreng","category":"noodles"},{"slug":"yee-mee","name":"Yee Mee","category":"noodles"},{"slug":"tuaran-mee","name":"Tuaran Mee","category":"noodles"},{"slug":"sabah-beef-noodles","name":"Sabah Beef Noodles (Ngiu Chap)","category":"noodles"},{"slug":"kuih-seri-muka","name":"Kuih Seri Muka","category":"snacks"},{"slug":"kuih-lapis","name":"Kuih Lapis","category":"snacks"},{"slug":"kuih-talam","name":"Kuih Talam","category":"snacks"},{"slug":"onde-onde","name":"Onde-Onde","category":"snacks"},{"slug":"kuih-koci","name":"Kuih Koci","category":"snacks"},{"slug":"kuih-ketayap","name":"Kuih Ketayap","category":"snacks"},{"slug":"apam-balik","name":"Apam Balik","category":"snacks"},{"slug":"kuih-bahulu","name":"Kuih Bahulu","category":"snacks"},{"slug":"kuih-keria","name":"Kuih Keria","category":"snacks"},{"slug":"kuih-cara-berlauk","name":"Kuih Cara Berlauk","category":"snacks"},{"slug":"kuih-kaswi","name":"Kuih Kaswi","category":"snacks"},{"slug":"dodol","name":"Dodol","category":"snacks"},{"slug":"nasi-goreng-cina","name":"Nasi Goreng Cina","category":"rice"},{"slug":"nasi-ulam","name":"Nasi Ulam","category":"rice"},{"slug":"nasi-tomato","name":"Nasi Tomato","category":"rice"},{"slug":"nasi-minyak","name":"Nasi Minyak","category":"rice"},{"slug":"nasi-ambeng","name":"Nasi Ambeng","category":"rice"},{"slug":"nasi-lemuni","name":"Nasi Lemuni","category":"rice"},{"slug":"nasi-ayam-penyet","name":"Nasi Ayam Penyet","category":"rice"},{"slug":"claypot-chicken-rice","name":"Claypot Chicken Rice","category":"rice"},{"slug":"char-siew-rice","name":"Char Siew Rice","category":"rice"},{"slug":"mee-kari","name":"Mee Kari (Curry Mee)","category":"noodles"},{"slug":"mee-bandung-muar","name":"Mee Bandung Muar","category":"noodles"},{"slug":"mee-hailam","name":"Mee Hailam","category":"noodles"},{"slug":"mee-jawa","name":"Mee Jawa","category":"noodles"},{"slug":"mee-tomyam","name":"Mee Tomyam","category":"noodles"},{"slug":"mee-sup","name":"Mee Sup","category":"noodles"},{"slug":"kuey-teow-soup","name":"Kuey Teow Soup","category":"noodles"},{"slug":"kuey-teow-kung-fu","name":"Kuey Teow Kung Fu","category":"noodles"},{"slug":"fish-ball-noodles","name":"Fish Ball Noodles","category":"noodles"},{"slug":"hakka-mee","name":"Hakka Mee","category":"noodles"},{"slug":"claypot-lou-shu-fun","name":"Claypot Lou Shu Fun","category":"noodles"},{"slug":"chee-cheong-fun","name":"Chee Cheong Fun","category":"noodles"},{"slug":"murtabak","name":"Murtabak","category":"mamak"},{"slug":"thosai","name":"Thosai (Tosai)","category":"mamak"},{"slug":"vadai","name":"Vadai","category":"mamak"},{"slug":"idli","name":"Idli","category":"mamak"},{"slug":"sup-kambing","name":"Sup Kambing","category":"soup"},{"slug":"sup-tulang","name":"Sup Tulang","category":"soup"},{"slug":"sup-ekor","name":"Sup Ekor","category":"soup"},{"slug":"sup-ayam","name":"Sup Ayam","category":"soup"},{"slug":"sup-gear-box","name":"Sup Gear Box","category":"soup"},{"slug":"tomyam","name":"Tomyam","category":"soup"},{"slug":"bubur-ayam","name":"Bubur Ayam","category":"soup"},{"slug":"bubur-lambuk","name":"Bubur Lambuk","category":"soup"},{"slug":"yong-tau-foo-soup","name":"Yong Tau Foo (Soup)","category":"soup"},{"slug":"hakka-lei-cha","name":"Hakka Lei Cha (Thunder Tea Rice)","category":"soup"},{"slug":"steamboat","name":"Steamboat","category":"soup"},{"slug":"ayam-percik","name":"Ayam Percik","category":"lauk"},{"slug":"ayam-bakar","name":"Ayam Bakar","category":"lauk"},{"slug":"daging-dendeng","name":"Daging Dendeng","category":"lauk"},{"slug":"daging-harimau-menangis","name":"Daging Harimau Menangis","category":"lauk"},{"slug":"sambal-sotong","name":"Sambal Sotong","category":"lauk"},{"slug":"sambal-udang","name":"Sambal Udang","category":"lauk"},{"slug":"ikan-bakar","name":"Ikan Bakar","category":"lauk"},{"slug":"ikan-masak-lemak","name":"Ikan Masak Lemak","category":"lauk"},{"slug":"ikan-patin-tempoyak","name":"Ikan Patin Masak Tempoyak","category":"lauk"},{"slug":"gulai","name":"Gulai","category":"lauk"},{"slug":"kari-kepala-ikan","name":"Kari Kepala Ikan","category":"lauk"},{"slug":"salted-egg-crab","name":"Salted Egg Crab","category":"lauk"},{"slug":"kam-heong-crab","name":"Kam Heong Crab","category":"lauk"},{"slug":"ketam-masak","name":"Ketam Masak","category":"lauk"},{"slug":"otak-otak","name":"Otak-Otak","category":"lauk"},{"slug":"keropok-lekor","name":"Keropok Lekor","category":"lauk"},{"slug":"nestum-chicken","name":"Nestum Chicken","category":"lauk"},{"slug":"tempoyak","name":"Tempoyak","category":"lauk"},{"slug":"sayur-lemak","name":"Sayur Lemak","category":"veg"},{"slug":"kailan-ikan-masin","name":"Kailan Ikan Masin","category":"veg"},{"slug":"sawi-sos-tiram","name":"Sawi / Broccoli Sos Tiram","category":"veg"},{"slug":"taugeh-ikan-masin","name":"Taugeh Ikan Masin","category":"veg"},{"slug":"tauhu-sumbat","name":"Tauhu Sumbat","category":"veg"},{"slug":"ulam-ulaman","name":"Ulam-Ulaman","category":"veg"},{"slug":"cucur-udang","name":"Cucur Udang","category":"snacks"},{"slug":"cucur-badak","name":"Cucur Badak","category":"snacks"},{"slug":"lok-lok","name":"Lok Lok","category":"snacks"},{"slug":"yong-tau-foo-fried","name":"Yong Tau Foo (Fried)","category":"snacks"},{"slug":"kuih-bangkit","name":"Kuih Bangkit","category":"snacks"},{"slug":"kuih-badak-berendam","name":"Kuih Badak Berendam","category":"snacks"},{"slug":"kuih-kasturi","name":"Kuih Kasturi","category":"snacks"},{"slug":"kuih-jala","name":"Kuih Jala (Roti Jala)","category":"snacks"},{"slug":"kopi-tarik","name":"Kopi Tarik","category":"drinks"},{"slug":"sirap-bandung","name":"Sirap Bandung","category":"drinks"},{"slug":"soya","name":"Soya (Soy Milk)","category":"drinks"},{"slug":"air-tebu","name":"Air Tebu","category":"drinks"},{"slug":"air-kelapa","name":"Air Kelapa","category":"drinks"},{"slug":"cincau","name":"Cincau","category":"drinks"},{"slug":"ais-kacang","name":"Ais Kacang (ABC)","category":"dessert"},{"slug":"bubur-cha-cha","name":"Bubur Cha Cha","category":"dessert"},{"slug":"sang-nyuk-mian","name":"Sang Nyuk Mian","category":"noodles"},{"slug":"beaufort-mee","name":"Beaufort Mee","category":"noodles"},{"slug":"tamparuli-mee","name":"Tamparuli Mee","category":"noodles"},{"slug":"tenom-mee","name":"Tenom Mee","category":"noodles"},{"slug":"hinava","name":"Hinava","category":"lauk"},{"slug":"bosou","name":"Bosou","category":"lauk"},{"slug":"pinasakan","name":"Pinasakan","category":"lauk"},{"slug":"sinalau-bakas","name":"Sinalau Bakas","category":"lauk"},{"slug":"tuhau","name":"Tuhau","category":"veg"},{"slug":"bambangan","name":"Bambangan","category":"veg"},{"slug":"sayur-manis","name":"Sayur Manis (Cangkuk Manis / Sabah Veg)","category":"veg"},{"slug":"latok","name":"Latok (Sea Grapes)","category":"veg"},{"slug":"linopot","name":"Linopot","category":"rice"},{"slug":"ambuyat","name":"Ambuyat","category":"rice"},{"slug":"kuih-penjaram","name":"Kuih Penjaram (Pinjaram)","category":"snacks"},{"slug":"kuih-cincin","name":"Kuih Cincin","category":"snacks"},{"slug":"kelupis","name":"Kelupis","category":"snacks"},{"slug":"asam-rebus","name":"Asam Rebus","category":"lauk"},{"slug":"ayam-goreng","name":"Ayam Goreng","category":"lauk"},{"slug":"paru-goreng","name":"Paru Goreng","category":"lauk"},{"slug":"kerang-masak","name":"Kerang Masak","category":"lauk"},{"slug":"lala-masak","name":"Lala Masak","category":"lauk"},{"slug":"ikan-goreng","name":"Ikan Goreng","category":"lauk"},{"slug":"ikan-stim","name":"Ikan Stim","category":"lauk"},{"slug":"sup-daging","name":"Sup Daging","category":"soup"},{"slug":"sup-ikan","name":"Sup Ikan","category":"soup"},{"slug":"sup-sayur","name":"Sup Sayur","category":"soup"},{"slug":"bubur-jagung","name":"Bubur Jagung","category":"dessert"},{"slug":"pulut","name":"Pulut","category":"snacks"},{"slug":"ketupat","name":"Ketupat","category":"rice"},{"slug":"ketupat-sotong","name":"Ketupat Sotong","category":"lauk"},{"slug":"lemang","name":"Lemang","category":"rice"},{"slug":"masak-kicap","name":"Masak Kicap","category":"lauk"},{"slug":"masak-merah","name":"Masak Merah","category":"lauk"},{"slug":"sayur-campur","name":"Sayur Campur","category":"veg"},{"slug":"sambal-petai","name":"Sambal Petai","category":"lauk"},{"slug":"banana-leaf-rice","name":"Banana Leaf Rice","category":"rice"},{"slug":"varuval","name":"Varuval","category":"lauk"},{"slug":"kari-ayam","name":"Kari Ayam (Chicken Curry)","category":"lauk"},{"slug":"kari-kambing","name":"Kari Kambing (Mutton Curry)","category":"lauk"},{"slug":"tandoori-chicken","name":"Tandoori Chicken","category":"lauk"},{"slug":"naan","name":"Naan","category":"mamak"},{"slug":"chapati","name":"Chapati","category":"mamak"},{"slug":"roti-tisu","name":"Roti Tisu","category":"mamak"},{"slug":"poori","name":"Poori (Puri)","category":"mamak"},{"slug":"samosa","name":"Samosa","category":"snacks"},{"slug":"pakora","name":"Pakora","category":"snacks"},{"slug":"lassi","name":"Lassi","category":"drinks"},{"slug":"teh-halia","name":"Teh Halia","category":"drinks"},{"slug":"chicken-65","name":"Chicken 65","category":"lauk"},{"slug":"lempeng","name":"Lempeng","category":"snacks"},{"slug":"kuih-putu","name":"Kuih Putu","category":"snacks"},{"slug":"kuih-bom","name":"Kuih Bom","category":"snacks"},{"slug":"kuih-siput","name":"Kuih Siput","category":"snacks"},{"slug":"kuih-ros","name":"Kuih Ros (Kuih Loyang)","category":"snacks"},{"slug":"tepung-pelita","name":"Tepung Pelita","category":"snacks"},{"slug":"amplang","name":"Amplang","category":"snacks"},{"slug":"kuih-kapit","name":"Kuih Kapit (Love Letters)","category":"snacks"},{"slug":"keropok-keping","name":"Keropok Keping","category":"snacks"}]

const NEW = [
  {"slug":"umai","name":"Umai","category":"lauk","serving":"1 serving","hint":"Sarawak Melanau raw fish ceviche, thin slices of fresh fish (tenggiri or terubok) tossed with lime, sliced shallot, chili and salt; very low calorie lean protein; variants udang (prawn), ikan tenggiri"},
  {"slug":"manok-pansoh","name":"Manok Pansoh","category":"lauk","serving":"1 serving","hint":"Sarawak Iban/Bidayuh chicken cooked inside a bamboo tube with lemongrass, ginger, garlic and bungai kantan over fire; lean, broth-y, almost no added oil; one of the healthiest Borneo dishes; variants halia (ginger), cili"},
  {"slug":"midin","name":"Midin","category":"veg","serving":"1 plate","hint":"Sarawak crunchy jungle fern (midin) stir-fried fast over high heat; very low calorie leafy veg, oil is the main calorie driver; variants belacan, garlic, masak lemak (with santan, higher)"},
  {"slug":"paku-pakis","name":"Paku Pakis","category":"veg","serving":"1 plate","hint":"fiddlehead fern shoots (pucuk paku) stir-fried with belacan or sambal, common across Sabah/Sarawak/East Coast; low calorie veg, oil and any santan drive calories; variants belacan, goreng telur, masak lemak"},
  {"slug":"butod","name":"Butod","category":"snacks","serving":"1 grub","hint":"sago grub (sago worm) eaten in Sabah, raw and wriggling or skewered and grilled/fried; tourist novelty; high in fat for its size, coconut-creamy when raw, crispy when fried"},
  {"slug":"ikan-empurau","name":"Ikan Empurau","category":"lauk","serving":"1 serving","hint":"prized expensive Sarawak river fish, usually steamed simply with ginger and soy to show off the fat from its wild diet of buah engkabang; lean-rich protein, premium dish"},
  {"slug":"kek-lapis-sarawak","name":"Kek Lapis Sarawak","category":"snacks","serving":"1 slice","hint":"Sarawak layered cake, dense bands of butter-and-egg-rich batter baked layer by layer; extremely calorie dense from butter, condensed milk, eggs and sugar; many flavour variants (original/plain, chocolate, cheese, durian, gula apong, pandan) as rows ranked by calories"},
  {"slug":"khau-yuk","name":"Khau Yuk","category":"lauk","serving":"1 serving","hint":"Hakka braised pork belly with fermented bean curd or preserved mustard greens (mui choy) and sometimes yam, slow-braised until the fat is soft; very fatty, the pork belly is most of the calories"},
  {"slug":"abacus-seeds","name":"Abacus Seeds","category":"noodles","serving":"1 plate","hint":"Hakka stir-fried yam-dough beads shaped like abacus seeds, chewy QQ texture, tossed with minced pork, dried shrimp, mushroom and black fungus; yam dough is the carb base, the toppings and oil add the rest"},
  {"slug":"ayam-masak-arak","name":"Ayam Masak Arak (Rice Wine Chicken)","category":"lauk","serving":"1 serving","hint":"Foochow/Sarawak chicken braised in red glutinous rice wine (arak/ang chao) with ginger and sesame oil, a confinement dish from Sibu; sesame oil and wine sugars add calories"},
  {"slug":"butter-prawns","name":"Butter Prawns","category":"lauk","serving":"1 serving","hint":"prawns in a rich creamy butter sauce with curry leaves and egg-floss (nestum or egg strands); the butter, evaporated milk and oil make the sauce very calorie dense; salted-egg version similar"},
  {"slug":"chili-crab","name":"Chili Crab","category":"lauk","serving":"1 serving (about half a crab)","hint":"crab in a sweet, spicy, tomato-and-chili sauce thickened with egg, eaten with mantou or rice; the sugary starchy sauce is calorie dense, the crab meat itself is lean"},
  {"slug":"ikan-pari-bakar","name":"Ikan Pari Bakar (Grilled Stingray)","category":"lauk","serving":"1 serving","hint":"stingray wing grilled in banana leaf smothered in sambal belacan, hawker favourite; the fish is lean, the sambal oil and any extra sauce drive calories"},
  {"slug":"nasi-kukus","name":"Nasi Kukus","category":"rice","serving":"1 plate","hint":"steamed rice served with crispy spiced fried chicken (ayam goreng berempah) and sambal, a mamak and East Coast/Sabah favourite; the fried chicken and sambal drive calories, the steamed rice is plain"},
  {"slug":"daun-ubi-tumbuk","name":"Daun Ubi Tumbuk","category":"veg","serving":"1 serving","hint":"pounded young cassava leaves cooked with coconut milk, lemongrass and sometimes salted fish or ikan bilis, popular in Sarawak/Sabah; fibrous greens, the santan adds the calories"},
  {"slug":"wild-boar","name":"Wild Boar (Babi Hutan)","category":"lauk","serving":"1 serving","hint":"wild boar meat, leaner and gamier than farmed pork, eaten in Sabah/Sarawak; variants curry, stir-fry with bamboo shoot, smoked; non-halal; fat content depends a lot on the cut and cooking"},
  {"slug":"sago-gula-melaka","name":"Sago Gula Melaka","category":"dessert","serving":"1 bowl","hint":"chilled sago pearl pudding drenched in palm sugar (gula melaka) syrup and coconut milk; the gula melaka syrup and santan are most of the calories, the sago is light"},
  {"slug":"tenom-coffee","name":"Tenom Coffee","category":"drinks","serving":"1 cup","hint":"Sabah Tenom wok-roasted robusta coffee (Yit Foh), strong and aromatic; variants kopi O (black, near zero), kopi C (with evaporated milk), white coffee with condensed milk; milk and sugar drive calories"},
  {"slug":"air-barli","name":"Air Barli","category":"drinks","serving":"1 glass","hint":"barley drink, boiled pearl barley sweetened with sugar and often rock sugar, sometimes with lemon (barli limau); the added sugar is most of the calories, the barley is minimal"},
  {"slug":"coffee-bun","name":"Coffee Bun (Rotiboy)","category":"snacks","serving":"1 bun","hint":"Rotiboy-style soft bun with a butter core and a baked-on crisp coffee-cream topping; the butter filling and sweet topping make it surprisingly calorie dense for its size"}
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
