export const meta = {
  name: 'foods-review',
  description: 'Quality review of the 90 new /foods/ pages (autonomous batch): voice, calorie plausibility, factual sanity',
  phases: [{ title: 'Review', detail: 'one reviewer per page (sonnet)' }],
}

const NEW = ["sang-nyuk-mian","beaufort-mee","tamparuli-mee","tenom-mee","hinava","bosou","pinasakan","sinalau-bakas","tuhau","bambangan","sayur-manis","latok","linopot","ambuyat","kuih-penjaram","kuih-cincin","kelupis","asam-rebus","ayam-goreng","paru-goreng","kerang-masak","lala-masak","ikan-goreng","ikan-stim","sup-daging","sup-ikan","sup-sayur","bubur-jagung","pulut","ketupat","ketupat-sotong","lemang","masak-kicap","masak-merah","sayur-campur","sambal-petai","banana-leaf-rice","varuval","kari-ayam","kari-kambing","tandoori-chicken","naan","chapati","roti-tisu","poori","samosa","pakora","lassi","teh-halia","chicken-65","lempeng","kuih-putu","kuih-bom","kuih-siput","kuih-ros","tepung-pelita","amplang","kuih-kapit","keropok-keping","umai","manok-pansoh","midin","paku-pakis","butod","ikan-empurau","kek-lapis-sarawak","khau-yuk","abacus-seeds","ayam-masak-arak","butter-prawns","chili-crab","ikan-pari-bakar","nasi-kukus","daun-ubi-tumbuk","wild-boar","sago-gula-melaka","tenom-coffee","air-barli","coffee-bun","teh-o-limau","air-mata-kucing","rojak-buah","pasembur","ais-krim","durian","cempedak-goreng","ubi-kayu","jagung","coconut-shake","kaya-toast"]

const DIR = 'Z:\\sites\\riceandprotein\\foods\\'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug','caloriesPlausible','calorieConcern','voiceVerdict','voiceIssues','factualConcerns','faqOk','severity','fixSuggestion'],
  properties: {
    slug: { type: 'string' },
    caloriesPlausible: { type: 'boolean', description: 'is the headline calorie number believable for the stated serving of this dish' },
    calorieConcern: { type: 'string', description: 'empty if fine; else what is off and the rough expected range you would expect' },
    voiceVerdict: { type: 'string', enum: ['on-voice','borderline','off-voice'] },
    voiceIssues: { type: 'array', items: { type: 'string' }, description: 'specific voice problems; empty if none' },
    factualConcerns: { type: 'array', items: { type: 'string' }, description: 'any wrong or misleading claim in the prose; empty if none' },
    faqOk: { type: 'boolean' },
    severity: { type: 'string', enum: ['ok','minor','major'], description: 'major = wrong number or off-voice or factual error that should block; minor = polish; ok = ship it' },
    fixSuggestion: { type: 'string', description: 'if minor or major, a concrete suggested edit; else empty' }
  }
}

phase('Review')
const results = await parallel(NEW.map(slug => () =>
  agent(
`Review ONE page from a Malaysian food calorie database for quality. Read the file first:
${DIR}${slug}.html

Judge it on four things:

1. CALORIE PLAUSIBILITY. Look at the headline calorie number and the stated serving. Using your knowledge of Malaysian hawker/kopitiam/restaurant food, is that number believable for that serving size? Flag only clear errors (e.g. a plain drink at 800 cal, or a rich crab dish at 120 cal). Small differences are fine, these are explicitly estimates. If off, say the rough range you'd expect.

2. VOICE. The site voice is a Malaysian guy talking to his friend at the mamak: casual, blunt, warm, specific real numbers, occasional lah/bro/kan (sparingly). It must NOT read like a health blog or fitness influencer. Hard fails: any em dash or en dash, the phrases "fuel your body" / "clean eating" / "wellness journey" / "nutrient-dense", the word "delve", generic openers like "Losing weight is hard", or slang so heavy it sounds forced. Mark off-voice only for real problems, not taste.

3. FACTUAL. Any claim in the prose that is wrong or misleading about the dish (ingredients, how it's cooked, what drives the calories)?

4. FAQ. Are the three FAQs genuinely useful and accurate, with the first one answering "how many calories"?

Be a tough but fair reviewer. Most pages are probably fine, do not invent problems. Reserve "major" for a wrong calorie number, off-voice writing, or a real factual error. Return ONLY the structured object for slug "${slug}".`,
    { label: `review:${slug}`, phase: 'Review', model: 'sonnet', schema: SCHEMA }
  )
))

return results.filter(Boolean)
