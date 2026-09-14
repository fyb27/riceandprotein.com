#!/usr/bin/env node
/*
 * generate-foods.js
 * Programmatic SEO generator for the /foods/ calorie database.
 *
 * Reads data/foods.json and produces:
 *   - foods/<slug>.html          one leaf page per food
 *   - foods/<category>.html      one hub per category (pan-Asian, ranked)
 *   - foods/<country>.html       one hub per country/region
 *   - foods.html                 the master hub
 *   - sitemap.xml                refreshes the /foods/ url block in place
 *
 * Output is plain static HTML. GitHub Pages never runs this script.
 * Run locally after editing foods.json, then commit the output:
 *   node scripts/generate-foods.js
 *
 * Styling: every page links ../css/site.css (the design system) and carries a
 * small inline block of page specific rules. House rules: no em dashes
 * anywhere, colours only via CSS variables.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');
const FOODS_DIR = path.join(ROOT, 'foods');
const HUB = path.join(ROOT, 'foods.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const BASE = 'https://riceandprotein.com';
// Fallback only. Real dates live on each record: `added` (first published) and
// optional `updated` (last content change).
const TODAY = '2026-09-14';
const AUTHOR = { '@id': 'https://riceandprotein.com/#author' };
const PUBLISHER = { '@id': 'https://riceandprotein.com/#organization' };
function foodAdded(f) { return f.added || TODAY; }
function foodUpdated(f) { return f.updated || f.added || TODAY; }
function latestDate(list) {
  return list.map(foodUpdated).sort().pop() || TODAY;
}

const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const CATEGORIES = db.categories;
const FOODS = db.foods;

// ---------- helpers ----------

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function per100(food, key) {
  return Math.round((food[key] / food.servingGrams) * 100);
}

function byCategory() {
  const groups = {};
  for (const key of Object.keys(CATEGORIES)) groups[key] = [];
  for (const f of FOODS) {
    if (!groups[f.category]) groups[f.category] = [];
    groups[f.category].push(f);
  }
  return groups;
}

const bySlug = Object.fromEntries(FOODS.map(f => [f.slug, f]));

// A record with no region is a Malaysian dish (the original 291). Shared
// dishes carry several codes, e.g. ['my', 'sg'].
function foodRegions(f) {
  return Array.isArray(f.region) && f.region.length ? f.region : ['my'];
}
function byRegion(key) {
  return FOODS.filter(f => foodRegions(f).includes(key));
}
function primaryRegion(f) {
  return foodRegions(f)[0];
}

// ---------- regions ----------
// Order here is the order in the nav and on the master hub.
const REGION_PAGES = {
  my: {
    slug: 'malaysia',
    label: 'Malaysian Food',
    short: 'Malaysia',
    title: 'Malaysian Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: 'ms',
    ctx: 'hawker, mamak or kopitiam',
    sources: 'the Malaysian Nutrient Database (MyNutri), HPB Singapore portion data and USDA reference values for the ingredients',
    intro: [
      'Malaysian food is where this site started, and it is still the biggest section. Every dish here is priced against a normal hawker, mamak or kopitiam portion, not a lab plate. Nasi lemak, roti canai, char kuey teow, teh tarik, the kuih from the pasar, the tai chow dishes, the Sabah and Sarawak specialities: all of it, ranked lightest to heaviest inside each category.',
      'Nothing on this page is banned. I ate at mamak and kopitiam the whole way from 128kg to 86kg. The only thing that changed was that I knew what each plate cost before I ordered it. Click any dish for the macro breakdown, where the calories actually hide, and how to order it lighter.'
    ]
  },
  sg: {
    slug: 'singapore',
    label: 'Singapore Hawker Food',
    short: 'Singapore',
    title: 'Singapore Hawker Food Calories, Ranked | Rice and Protein',
    added: '2026-09-02',
    lang: 'ms',
    ctx: 'hawker centre or kopitiam',
    sources: 'the Health Promotion Board (HPB) energy figures for standard hawker portions, cross checked against KKH and SingHealth dietitian numbers',
    intro: [
      'Singapore hawker food and Malaysian hawker food are mostly the same food with different spelling. Char kway teow, roti prata, kopi peng, cai png: same plate, same oil, same calories. This page pulls every dish you would find at a Singapore hawker centre or kopitiam into one place, plus the ones that are properly Singaporean like bak chor mee, kway chap, chwee kueh and carrot cake.',
      'Calorie figures for the Singapore specific dishes are built on Health Promotion Board portion data (the standard hawker plate and bowl) cross checked against KKH and SingHealth dietitian numbers. Where the Malaysian and Singapore versions differ, the page for that dish says so.'
    ]
  },
  id: {
    slug: 'indonesia',
    label: 'Indonesian Food',
    short: 'Indonesia',
    title: 'Indonesian Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: 'id',
    ctx: 'warung or restaurant',
    sources: 'the Indonesian Food Composition Table (TKPI, Kemenkes), nilaigizi.com and FatSecret Indonesia entries for typical warung portions',
    intro: [
      'Indonesian food runs on rice, coconut, palm sugar and a deep fryer, which makes it some of the easiest food in Asia to overeat without noticing. A plate of nasi padang with rendang and the free gravy can pass 900 calories. A bowl of soto ayam is under 350. Both are lunch. This page ranks every warung, warteg and kaki lima dish we have numbers for, lightest to heaviest inside each category.',
      'Calorie figures come from the Indonesian Food Composition Table (TKPI) and published dietitian data where it exists, sized to a normal warung portion rather than a 100g lab sample. Every page shows where the calories hide and how to order the same dish lighter.'
    ]
  },
  th: {
    slug: 'thailand',
    label: 'Thai Food',
    short: 'Thailand',
    title: 'Thai Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'street stall or food court',
    sources: 'the Thai Bureau of Nutrition and INMU Mahidol food composition data, plus Thai hospital dietitian figures for standard street portions',
    intro: [
      'Thai food has a reputation for being light, and some of it is. Som tam, tom yum and a plate of grilled moo ping are honest food. But pad thai is fried in a lot of oil, the curries are built on coconut cream, and a mango sticky rice is a full meal pretending to be dessert. This page ranks the street stall, food court and restaurant dishes people actually order, lightest to heaviest inside each category.',
      'Calorie figures come from the Thai Bureau of Nutrition, the INMU food composition database and Thai hospital dietitian data, sized to a normal street portion. Click any dish for the macro breakdown, where the calories hide, and how to order it lighter.'
    ]
  },
  vn: {
    slug: 'vietnam',
    label: 'Vietnamese Food',
    short: 'Vietnam',
    title: 'Vietnamese Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'street stall or quan',
    sources: 'the Vietnam National Institute of Nutrition food composition table and Vietnamese hospital dietitian figures for standard street portions',
    intro: [
      'Vietnamese food is the closest thing Asia has to a built in diet plan. Clear broths, fresh herbs, rice paper, grilled meat, not much oil. A bowl of pho is around 400 calories and keeps you full for hours. The traps are smaller than elsewhere but they exist: banh mi with pate and butter, a plate of cha gio, the condensed milk in every coffee. This page ranks it all, lightest to heaviest inside each category.',
      'Calorie figures come from the Vietnam National Institute of Nutrition food composition table and published dietitian data, sized to a normal quan portion. Every page shows where the calories hide and what to order instead.'
    ]
  },
  ph: {
    slug: 'philippines',
    label: 'Filipino Food',
    short: 'Philippines',
    title: 'Filipino Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'carinderia or restaurant',
    sources: 'the FNRI Philippine Food Composition Tables (PhilFCT) and published fast food chain nutrition data for standard servings',
    intro: [
      'Filipino food is built around rice, pork, and sauce, then rice again. A cup of garlic rice under a serving of lechon kawali is 700 calories before the drink. A bowl of sinigang with the same rice is under 450. That gap, on the same carinderia counter, is the whole point of this page. Every dish is ranked lightest to heaviest inside each category, from silog breakfasts to Jollibee.',
      'Calorie figures come from the FNRI Philippine Food Composition Tables and published chain nutrition data where it exists, sized to a normal carinderia serving. Click any dish for the macro breakdown, where the calories hide, and how to eat it lighter.'
    ]
  },
  hk: {
    slug: 'hong-kong',
    label: 'Hong Kong Food',
    short: 'Hong Kong',
    title: 'Hong Kong Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'cha chaan teng, dai pai dong or dim sum',
    sources: 'the Hong Kong Centre for Food Safety nutrient database and the Department of Health EatSmart restaurant dish data',
    intro: [
      'Hong Kong food is cha chaan teng breakfasts, dim sum trolleys, siu mei rice and street snacks, and most of it is heavier than it looks. A bo lo yau with its slab of butter is 400 calories. A baked pork chop rice with cheese is 900 plus. Har gow at 50 calories a piece is fine until the basket count hits double digits. This page ranks the dishes people actually order, lightest to heaviest inside each category.',
      'Calorie figures come from the Hong Kong Centre for Food Safety nutrient database and the Department of Health EatSmart dish data, sized to a normal restaurant portion. Every page shows where the calories hide and how to order the same thing lighter.'
    ]
  },
  jp: {
    slug: 'japan',
    label: 'Japanese Food',
    short: 'Japan',
    title: 'Japanese Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'restaurant, ramen shop or konbini',
    sources: 'the MEXT Standard Tables of Food Composition in Japan and published chain restaurant nutrition data',
    intro: [
      'Japanese food is either very light or very heavy and rarely in between. Sashimi, miso soup, a bowl of zaru soba: hard to overeat. Tonkotsu ramen, katsu curry, a gyudon with extra rice: 800 to 1,000 calories in one sitting, and you will want it again tomorrow. This page ranks ramen shop, teishoku, izakaya and konbini food, lightest to heaviest inside each category.',
      'Calorie figures come from the MEXT Standard Tables of Food Composition in Japan and published chain nutrition data (the big ramen, gyudon and curry chains all publish theirs), sized to a normal restaurant serving. Click any dish for the macro breakdown and the lighter order.'
    ]
  },
  kr: {
    slug: 'korea',
    label: 'Korean Food',
    short: 'Korea',
    title: 'Korean Food Calories, Ranked | Rice and Protein',
    added: '2026-09-14',
    lang: null,
    ctx: 'restaurant or pojangmacha',
    sources: 'the Korea MFDS food nutrition database and the Rural Development Administration Korean Food Composition Table, plus published chain nutrition data',
    intro: [
      'Korean food gives you a table of banchan for free and then charges you in calories for the main. A kimchi jjigae with rice is around 500 and honestly filling. A half of yangnyeom fried chicken with a beer is 1,200 and gone in twenty minutes. Samgyeopsal depends entirely on how many wraps you build. This page ranks the dishes people actually order, lightest to heaviest inside each category.',
      'Calorie figures come from the Korea MFDS food nutrition database and the Korean Food Composition Table, plus published chain data for the fried chicken brands, sized to a normal restaurant serving. Every page shows where the calories hide and how to eat the same meal lighter.'
    ]
  }
};

const REGION_ORDER = Object.keys(REGION_PAGES);
function liveRegions() {
  return REGION_ORDER.filter(r => byRegion(r).length);
}
function regionUrl(r) {
  return REGION_PAGES[r].slug + '.html';
}
function regionTag(f) {
  const r = primaryRegion(f);
  return REGION_PAGES[r] ? REGION_PAGES[r].short : '';
}

// ---------- categories ----------
// One hub per category, lives at foods/<slug>.html. Pan-Asian: every dish in
// the category from every country, ranked. Each intro is unique copy.
const CAT_PAGES = {
  rice: {
    slug: 'rice-meals',
    title: 'Asian Rice Dishes: Calories Ranked | Rice and Protein',
    intro: [
      'Rice is not the enemy. I lost 42kg eating rice almost every day, so this page is never going to tell you to quit nasi. What matters is which rice dish and what goes on top of it. A plate of steamed chicken rice and a nasi kandar with three lauk can be 700 calories apart, and both look like "just rice with stuff". The same is true of a gyudon versus a katsu curry, or a bibimbap versus a plate of nasi padang.',
      'Every rice meal below, from every country on the site, is ranked from lightest to heaviest. Use the country filter to narrow it. Click any dish for the full macro breakdown, where the calories actually hide, and how to order it lighter without eating sad food.'
    ]
  },
  noodles: {
    slug: 'noodles',
    title: 'Asian Noodles: Calories Ranked | Rice and Protein',
    intro: [
      'Asian noodles run from surprisingly safe to full calorie bombs, and you cannot tell by looking. Most soup noodles sit around 300 to 450 calories a bowl, whether that is pho, mee soto or kake udon. The moment a wok and a ladle of oil get involved, char kuey teow, pad thai and mie goreng territory, you are flirting with 700 plus. Tonkotsu ramen gets there with pork fat instead of a wok.',
      'Simple rule: soup beats dry, dry beats fried. The full ranking is below, lightest first, across every country on the site, with macros and lighter swaps one click away for every bowl.'
    ]
  },
  dimsum: {
    slug: 'dim-sum',
    title: 'Dim Sum Calories, Ranked Per Piece | Rice and Protein',
    intro: [
      'Dim sum is dangerous precisely because everything is small. One siew mai is nothing. But one basket here, one plate there, some fried wu kok because it looked nice, and suddenly you have eaten 1,200 calories before 11am. Hong Kong or Kuala Lumpur, the trolley works the same way.',
      'The steamed baskets are mostly fine. The fried items and anything drowning in sweet sauce are where it stacks up. Everything below is ranked so you know what each basket costs before the trolley reaches your table.'
    ]
  },
  mamak: {
    slug: 'mamak-and-bread',
    title: 'Mamak Food Calories, Ranked | Rice and Protein',
    intro: [
      'The mamak at 1am is where diets go to die. Here is the honest math: one roti kosong is about 300 calories, which is fine. The problem is nobody stops at one, nobody eats it without dhal and sambal, and the teh tarik next to it is another 160. The Singapore prata shop and the Indonesian martabak cart play the same game.',
      'This page ranks every roti, prata, murtabak and mamak staple from lightest to heaviest so you can still hang out with your friends at 1am and know exactly what the damage is.'
    ]
  },
  soup: {
    slug: 'soups',
    title: 'Asian Soup Calories, Ranked | Rice and Protein',
    intro: [
      'Soup is your best friend when you are cutting. Water has zero calories, it takes up space in your stomach, and a big bowl of sup ayam, tom yum or samgyetang keeps you full for hours at a very low cost. I ate soup constantly on my way from 128kg to 86kg.',
      'The catch: some Asian soups are soups in name only. Anything built on coconut milk, or served with a mountain of rice on the side, plays by different rules. The ranking below sorts the genuinely light bowls from the ones wearing a disguise.'
    ]
  },
  lauk: {
    slug: 'meat-grills-and-lauk',
    title: 'Meat, Grills & Lauk Calories, Ranked | Rice and Protein',
    intro: [
      'This is the biggest category on the site because Asian meals are built around the protein dish. It is also where your diet is quietly decided. Grilled, steamed and braised is how I stayed full while losing 42kg. Fried, rendang style and anything with a coconut gravy is where the calories hide, sometimes double for the same piece of chicken. Yakitori versus karaage. Ayam bakar versus ayam goreng kremes. Same bird, different bill.',
      'Every main dish below is ranked lightest to heaviest across every country on the site. Learn the difference between grilled and fried once and it pays you back at every stall forever.'
    ]
  },
  veg: {
    slug: 'vegetables-and-sides',
    title: 'Vegetable Dish Calories, Ranked | Rice and Protein',
    intro: [
      'Vegetables should be the safest thing on your plate, and steamed or lightly stir fried, they are. This is the category you pile on when you want a mountain of food for almost nothing. Volume eating starts here, whether that is a plate of kangkung, a bowl of sayur asem, or the banchan on a Korean table.',
      'But be honest with yourself about the oil. Kangkung belacan glistening under the lamp at the tai chow is not a health food anymore, and neither is laing cooked in a litre of coconut milk. The ranking below shows which veg dishes are basically free and which ones are secretly a main.'
    ]
  },
  snacks: {
    slug: 'snacks-and-kuih',
    title: 'Asian Snack & Kuih Calories, Ranked | Rice and Protein',
    intro: [
      'Snacks are sneaky. Each piece looks tiny and innocent, but most sit between 150 and 300 calories, and nobody in history has eaten one piece of kuih, one takoyaki or one hotteok. Three pieces from the pasar and you have eaten a full meal without noticing.',
      'This page exists so you know exactly what that box from the pasar malam, the konbini shelf or the street cart costs. Everything ranked lightest to heaviest, per piece or per serving, so you can pick your favourites on purpose instead of by accident.'
    ]
  },
  western: {
    slug: 'western-and-burgers',
    title: 'Western & Fast Food Calories, Ranked | Rice and Protein',
    intro: [
      'Ramly burger, chicken chop, Jollibee, the cha chaan teng baked rice. Big portions, lots of oil, sauce on everything, usually 600 plus calories a plate before you touch the fries.',
      'You do not have to give it up. You just need to know which plates are 500 calories and which are 900, because they look identical under the fluorescent light. Full ranking below.'
    ]
  },
  drinks: {
    slug: 'drinks',
    title: 'Asian Drink Calories, Ranked | Rice and Protein',
    intro: [
      'Drinks are the easiest 300 calories you will never notice. Teh tarik, Thai iced tea, ca phe sua da, Hong Kong milk tea, es teler: all of them are sugar and condensed milk delivery systems that do nothing for your hunger. You drink them, you are still hungry, you just spent a roti canai worth of calories.',
      'Switching to unsweetened drinks was genuinely the single easiest change I made in my whole 42kg loss. Every drink below is ranked so you can see exactly what your daily order costs you per month.'
    ]
  },
  dessert: {
    slug: 'desserts',
    title: 'Asian Dessert Calories, Ranked | Rice and Protein',
    intro: [
      'Cendol, halo halo, mango sticky rice, bingsu, a slab of mochi. Desserts are pure enjoyment calories, close to zero nutrition, and that is completely fine as long as you spend them on purpose.',
      'My rule while losing weight: dessert is a decision, not a habit. The ranking below tells you what each bowl costs so you can budget for the ones you actually love and skip the ones you eat out of politeness.'
    ]
  }
};

function catUrl(cat) {
  return CAT_PAGES[cat] ? CAT_PAGES[cat].slug + '.html' : '../foods.html';
}

// ---------- shared chrome ----------

function headLinks(prefix) {
  return `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}css/site.css">`;
}

// Same header on every page. Country list is built from the regions that
// actually have foods so the nav never links to a page that does not exist.
function header(prefix) {
  const countries = liveRegions().map(r =>
    `              <li><a href="${prefix}foods/${regionUrl(r)}">${esc(REGION_PAGES[r].short)}</a></li>`
  ).join('\n');
  return `  <header class="site-header">
    <div class="header-inner">
      <a href="${prefix}index.html" class="site-logo">Rice and <span>Protein</span></a>
      <nav class="site-nav" id="site-nav">
        <ul class="nav-list">
          <li><a href="${prefix}index.html">Calculator</a></li>
          <li class="has-dropdown">
            <a href="${prefix}foods.html">Food Calories</a>
            <ul class="nav-dropdown">
${countries}
              <li><a href="${prefix}foods.html">All foods by category</a></li>
            </ul>
          </li>
          <li class="has-dropdown">
            <a href="${prefix}diets.html">Diets</a>
            <ul class="nav-dropdown">
              <li><a href="${prefix}diets/keto.html">Keto Diet</a></li>
              <li><a href="${prefix}diets/if.html">Intermittent Fasting</a></li>
              <li><a href="${prefix}diets/paleo.html">Paleo Diet</a></li>
              <li><a href="${prefix}diets/cico.html">Calorie Counting</a></li>
              <li><a href="${prefix}diets/volume-eating.html">Volume Eating</a></li>
              <li><a href="${prefix}diets/omad.html">OMAD</a></li>
            </ul>
          </li>
          <li><a href="${prefix}about.html">About</a></li>
          <li><a href="${prefix}contact.html">Contact</a></li>
        </ul>
      </nav>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu" type="button">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function footer(prefix) {
  return `  <footer class="site-footer">
    <div class="footer-logo">Rice and <span>Protein</span></div>
    <p class="footer-tag">Calorie counts for Asian food, plus a free TDEE calculator.</p>
    <ul class="footer-links">
      <li><a href="${prefix}foods.html">Food Calories</a></li>
      <li><a href="${prefix}diets.html">Diets</a></li>
      <li><a href="${prefix}about.html">About</a></li>
      <li><a href="${prefix}contact.html">Contact</a></li>
    </ul>
    <p class="footer-backlink">Web design by <a href="https://sabahwebs.com">Sabah Webs</a></p>
  </footer>`;
}

const NAV_SCRIPT = `  <script>
  (function () {
    var t = document.getElementById('nav-toggle');
    var n = document.getElementById('site-nav');
    if (t && n) t.addEventListener('click', function () { n.classList.toggle('is-open'); });
  })();
  </script>`;

const ANALYTICS = `<script data-goatcounter="https://riceandprotein.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`;

function ctaBand(prefix) {
  return `  <div class="band">
    <div class="band__title">How many calories do you actually need?</div>
    <p class="band__sub">Free TDEE calculator. Thirty seconds, no sign up.</p>
    <a href="${prefix}index.html" class="btn btn--primary btn--lg">Use the calculator</a>
  </div>`;
}

// Page specific rules for the leaf and listing pages. Everything generic
// (header, footer, cards, tables, buttons) lives in css/site.css.
function leafStyles() {
  return `  <style>
    .food-hero { padding: 28px 0 0; text-align: center; }
    .food-hero__eyebrow { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 12px; }
    .food-hero__eyebrow a:hover { text-decoration: underline; }
    .food-hero__region { color: var(--muted); font-weight: 500; }
    .food-hero__region a { color: var(--muted); }
    .food-hero__region a:hover { color: var(--text); }
    .food-hero__title { font-size: clamp(34px, 6vw, 56px); font-weight: 700; line-height: 1.07; letter-spacing: -0.03em; margin: 0 auto 16px; max-width: 640px; }
    .food-hero__aka { font-size: 14px; color: var(--muted); margin-bottom: 12px; }
    .food-hero__summary { font-size: 19px; line-height: 1.42; color: var(--muted); max-width: 560px; margin: 0 auto; letter-spacing: -0.015em; }
    .answer-box { margin: 44px 0 72px; text-align: center; }
    .answer-box__num { font-size: clamp(88px, 14vw, 128px); font-weight: 700; line-height: .95; letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
    .answer-box__num small { display: block; font-size: 14px; font-weight: 500; letter-spacing: -0.01em; color: var(--muted); margin-top: 14px; }
    .answer-box__text { font-size: 17px; line-height: 1.55; max-width: 600px; margin: 28px auto 0; }
    .food-section { padding: 0 0 72px; }
    .portion-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .portion-card { background: var(--bg2); border-radius: var(--r); padding: 30px 18px 26px; text-align: center; }
    .portion-card__cal { font-size: 40px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin-bottom: 10px; font-variant-numeric: tabular-nums; }
    .portion-card__cal small { font-size: 13px; font-weight: 500; letter-spacing: 0; color: var(--muted); }
    .portion-card__label { font-size: 14px; color: var(--muted); line-height: 1.35; }
    .source-line { font-size: 12px; color: var(--muted); text-align: center; max-width: 520px; margin: -24px auto 40px; line-height: 1.5; }
    .about-link { text-align: center; font-size: 14px; color: var(--muted); padding-bottom: 48px; }
    @media (max-width: 640px) {
      .portion-grid { grid-template-columns: 1fr; }
      .food-section { padding-bottom: 52px; }
      .answer-box { margin: 36px 0 56px; }
    }
  </style>`;
}

function listingStyles() {
  return `  <style>
    .food-hero { padding: 28px 0 40px; text-align: center; }
    .food-hero__eyebrow { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 12px; }
    .food-hero__title { font-size: clamp(34px, 6vw, 56px); font-weight: 700; line-height: 1.07; letter-spacing: -0.03em; margin: 0 auto 18px; max-width: 720px; }
    .food-hero__intro { font-size: 17px; line-height: 1.6; max-width: 640px; margin: 0 auto; text-align: left; }
    .food-hero__intro p { margin-bottom: 12px; }
    .food-hero__intro p:last-child { margin-bottom: 0; }
    .food-section { padding: 0 0 64px; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 28px; }
    .filter-bar .chip { cursor: pointer; }
    .food-card[hidden] { display: none; }
    .group-title { font-size: clamp(20px, 2.4vw, 24px); font-weight: 700; letter-spacing: -0.025em; margin: 0 0 14px; display: flex; align-items: baseline; gap: 10px; }
    .group-title small { font-size: 13px; font-weight: 500; color: var(--muted); }
    .group-title a:hover { color: var(--accent); }
    .group { margin-bottom: 44px; }
    .count-note { text-align: center; font-size: 13px; color: var(--muted); margin: -12px 0 24px; }
  </style>`;
}

// ---------- leaf page ----------

function leafSchema(food, url) {
  const aka = (food.aka || []).filter(Boolean);
  const graph = [
    {
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url: url,
      name: 'How Many Calories in ' + food.name + '?',
      description: food.metaDescription,
      inLanguage: 'en',
      datePublished: foodAdded(food),
      dateModified: foodUpdated(food),
      author: AUTHOR,
      publisher: PUBLISHER,
      isPartOf: { '@id': BASE + '/#website' },
      breadcrumb: { '@id': url + '#breadcrumb' }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Food Calories', item: BASE + '/foods.html' },
        { '@type': 'ListItem', position: 3, name: CATEGORIES[food.category] || 'Food Calories', item: BASE + '/foods/' + catUrl(food.category) },
        { '@type': 'ListItem', position: 4, name: food.name, item: url }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: faqList(food).map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@type': 'MenuItem',
      '@id': url + '#item',
      name: food.name,
      ...(aka.length ? { alternateName: aka } : {}),
      nutrition: {
        '@type': 'NutritionInformation',
        servingSize: food.serving + ' (' + food.servingGrams + 'g)',
        calories: food.calories + ' calories',
        proteinContent: food.protein + ' g',
        carbohydrateContent: food.carbs + ' g',
        fatContent: food.fat + ' g'
      }
    }
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

// Keep the parenthetical alias in the title when it fits inside the 60 char
// limit. People search "tosai calories" and "ngiu chap calories" far more than
// the spelling we picked as the primary name.
function leafTitle(food) {
  const full = food.name + ' Calories | Rice and Protein';
  if (full.length <= 60) return full;
  return food.name.replace(/\s*\([^)]*\)/g, '') + ' Calories | Rice and Protein';
}

function akaList(food) {
  return (food.aka || []).filter(Boolean);
}

// People search "2 poori calories" and "4 samosa calories" constantly. Only
// worth a table when the serving is actually countable.
const COUNTABLE = /^(\d+)\s*(piece|pieces|roll|rolls|bun|buns|tart|tarts|slice|slices|stick|sticks|wedge|wedges|ball|balls|skewer|skewers)\b/i;

function countUnit(food) {
  const m = COUNTABLE.exec(food.serving || '');
  if (!m) return null;
  const per = Number(m[1]);
  if (!per || per > 3) return null;
  const unit = m[2].toLowerCase().replace(/s$/, '');
  return { per: per, unit: unit, each: Math.round(food.calories / per) };
}

function quantityRows(food) {
  const c = countUnit(food);
  if (!c) return '';
  return [1, 2, 3, 4, 5, 6].map(n => {
    const label = n + ' ' + c.unit + (n > 1 ? 's' : '');
    return `            <tr><td>${esc(label)}</td><td class="num">${c.each * n} kcal</td><td class="num">${Math.round(food.protein / c.per * n * 10) / 10} g</td></tr>`;
  }).join('\n');
}

// Single source of truth for a page's FAQ, so the visible list and the
// FAQPage schema never drift apart. Adds one local language question where
// the site can write it honestly (Malay for MY/SG, Indonesian for ID).
function faqList(food) {
  const regs = foodRegions(food);
  const extra = [];
  if (regs.includes('my') || regs.includes('sg')) extra.push(malayFaq(food));
  if (regs.includes('id')) extra.push(indoFaq(food));
  return food.faq.concat(extra);
}

const MALAY_UNITS = {
  piece: 'keping', pieces: 'keping', slice: 'keping', slices: 'keping',
  plate: 'pinggan', bowl: 'mangkuk', glass: 'gelas', cup: 'cawan',
  roll: 'gulung', rolls: 'gulung', bun: 'biji', buns: 'biji',
  tart: 'biji', tarts: 'biji', stick: 'cucuk', sticks: 'cucuk',
  ball: 'biji', balls: 'biji', bowls: 'mangkuk', plates: 'pinggan',
  glasses: 'gelas', skewer: 'cucuk', skewers: 'cucuk', wedge: 'potong',
  serving: 'hidangan', servings: 'hidangan', portion: 'bahagian',
  portions: 'bahagian', basket: 'bakul', baskets: 'bakul', burger: 'biji burger'
};
const INDO_UNITS = {
  piece: 'potong', pieces: 'potong', slice: 'potong', slices: 'potong',
  plate: 'piring', plates: 'piring', bowl: 'mangkuk', bowls: 'mangkuk',
  glass: 'gelas', glasses: 'gelas', cup: 'cangkir', roll: 'gulung', rolls: 'gulung',
  bun: 'buah', buns: 'buah', stick: 'tusuk', sticks: 'tusuk', skewer: 'tusuk', skewers: 'tusuk',
  ball: 'butir', balls: 'butir', serving: 'porsi', servings: 'porsi', portion: 'porsi', portions: 'porsi',
  cone: 'buah', wrap: 'bungkus', packet: 'bungkus'
};

function localServing(food, units, fallback) {
  const bare = String(food.serving || '').replace(/\s*\([^)]*\)/g, '').trim();
  const m = /^(\d+)\s+([a-z]+)\s*$/i.exec(bare);
  if (m && units[m[2].toLowerCase()]) {
    return m[1] + ' ' + units[m[2].toLowerCase()] + ' (' + food.servingGrams + 'g)';
  }
  return fallback + ' (' + food.servingGrams + 'g)';
}

function plainName(food) {
  return food.name.replace(/\s*\([^)]*\)/g, '');
}

function malayFaq(food) {
  const plain = plainName(food);
  return {
    q: 'Berapa kalori dalam ' + plain + '?',
    a: plain + ' ada kira-kira ' + food.calories + ' kalori untuk ' + localServing(food, MALAY_UNITS, 'satu hidangan biasa') +
       ', dengan ' + food.protein + 'g protein, ' + food.carbs + 'g karbohidrat dan ' +
       food.fat + 'g lemak. Angka ini anggaran untuk hidangan gerai biasa, jadi ia berbeza ikut kedai dan saiz hidangan.'
  };
}

function indoFaq(food) {
  const plain = plainName(food);
  return {
    q: 'Berapa kalori ' + plain + '?',
    a: plain + ' mengandung sekitar ' + food.calories + ' kalori per ' + localServing(food, INDO_UNITS, 'satu porsi biasa') +
       ', dengan ' + food.protein + 'g protein, ' + food.carbs + 'g karbohidrat dan ' +
       food.fat + 'g lemak. Angka ini perkiraan untuk porsi warung biasa, jadi bisa berbeda tergantung tempat dan ukuran porsi.'
  };
}

function regionEyebrow(food) {
  return foodRegions(food)
    .filter(r => REGION_PAGES[r])
    .map(r => ` <span class="food-hero__region">&middot; <a href="${regionUrl(r)}">${esc(REGION_PAGES[r].short)}</a></span>`)
    .join('');
}

function disclaimerFor(food) {
  const r = primaryRegion(food);
  const ctx = (REGION_PAGES[r] && REGION_PAGES[r].ctx) || 'street stall or restaurant';
  return 'Calorie and macro figures are estimates for a typical ' + ctx + ' serving. Actual numbers vary by stall, recipe and portion size. Use them as a guide, not gospel.';
}

function buildLeaf(food) {
  const url = BASE + '/foods/' + food.slug + '.html';
  const title = leafTitle(food);
  const aka = akaList(food);
  const akaLine = aka.length
    ? `\n      <p class="food-hero__aka">Also known as ${esc(aka.join(', '))}.</p>`
    : '';

  const breakdown = (food.components || []).map(c =>
    `        <div class="row"><div class="row__name">${esc(c.name)}<small>${esc(String(c.grams))}g</small></div><div class="row__val">${c.calories} kcal</div></div>`
  ).join('\n');

  const portions = (food.portions || []).map(p =>
    `        <div class="portion-card"><div class="portion-card__cal">${p.calories}<small> kcal</small></div><div class="portion-card__label">${esc(p.label)}</div></div>`
  ).join('\n');

  const variants = (food.variants || []).slice().sort((a, b) => a.calories - b.calories).map(v =>
    `            <tr><td>${esc(v.name)}</td><td class="num">${v.calories} kcal</td><td>${esc(v.note || '')}</td></tr>`
  ).join('\n');

  const realTalk = food.realTalk.map(p => `        <p>${esc(p)}</p>`).join('\n');
  const lighter = food.lighter.map(t => `        <li>${esc(t)}</li>`).join('\n');
  const faqs = faqList(food).map(f =>
    `      <div class="faq-item"><div class="faq-item__q">${esc(f.q)}</div><div class="faq-item__a">${esc(f.a)}</div></div>`
  ).join('\n');

  const qtyRows = quantityRows(food);
  const qtyUnit = countUnit(food);

  // Related foods: curated list first, then same-region siblings in the same
  // category, then any same-category food. Every food links to and is linked
  // from its neighbours so nothing is left with only the hub link.
  const catFoods = (byCategory()[food.category] || []);
  const sameRegion = catFoods.filter(f => f.slug !== food.slug && foodRegions(f).includes(primaryRegion(food)));
  const pool = sameRegion.length >= 4 ? sameRegion : catFoods.filter(f => f.slug !== food.slug);
  const selfIdx = Math.max(0, pool.findIndex(f => f.slug === food.slug));
  const ringSlugs = [];
  for (let i = 1; i <= 4 && pool.length; i++) {
    ringSlugs.push(pool[(selfIdx + i) % pool.length].slug);
  }
  const relSlugs = [];
  for (const s of [...(food.related || []), ...ringSlugs]) {
    if (s !== food.slug && bySlug[s] && !relSlugs.includes(s)) relSlugs.push(s);
  }
  const related = relSlugs.slice(0, 6).map(s => bySlug[s]).map(r =>
    `        <a class="card link-card" href="${r.slug}.html"><div class="link-card__title">${esc(r.name)}</div><div class="link-card__sub"><b>${r.calories}</b> kcal per ${esc(r.serving)}</div></a>`
  ).join('\n');

  const source = food.source && !/^estimate/i.test(food.source)
    ? `    <p class="source-line">Calorie figure based on ${esc(food.source)}. Macros estimated from the ingredients.</p>\n`
    : '';

  const schema = leafSchema(food, url);
  const catName = CATEGORIES[food.category] || 'Food Calories';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(food.metaDescription)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(food.metaDescription)}">
  <meta property="og:image" content="${BASE}/images/og-image.jpg">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Rice and Protein">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(food.metaDescription)}">
  <meta name="twitter:image" content="${BASE}/images/og-image.jpg">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
${schema}
  </script>
${headLinks('../')}
${leafStyles()}
</head>
<body>

${header('../')}

  <div class="page">

    <nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="../foods.html">Food Calories</a><span>/</span><a href="${catUrl(food.category)}">${esc(catName)}</a><span>/</span>${esc(food.name)}</nav>

    <div class="food-hero">
      <p class="food-hero__eyebrow"><a href="${catUrl(food.category)}">${esc(catName)}</a>${regionEyebrow(food)}</p>
      <h1 class="food-hero__title">How Many Calories in ${esc(food.name)}?</h1>${akaLine}
      <p class="food-hero__summary">${esc(food.summary)}</p>
    </div>

    <div class="answer-box">
      <div class="answer-box__num">${food.calories}<small>kcal / ${esc(food.serving)}</small></div>
      <div class="answer-box__text">${esc(food.answer)}</div>
    </div>

    <div class="food-section">
      <h2 class="section-title">Nutrition facts</h2>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr><th>Per ${esc(food.serving)} (${food.servingGrams}g)</th><th class="num">Amount</th><th class="num">Per 100g</th></tr>
          </thead>
          <tbody>
            <tr><td>Calories</td><td class="num">${food.calories} kcal</td><td class="num">${per100(food, 'calories')} kcal</td></tr>
            <tr><td>Protein</td><td class="num">${food.protein} g</td><td class="num">${per100(food, 'protein')} g</td></tr>
            <tr><td>Carbs</td><td class="num">${food.carbs} g</td><td class="num">${per100(food, 'carbs')} g</td></tr>
            <tr><td>Fat</td><td class="num">${food.fat} g</td><td class="num">${per100(food, 'fat')} g</td></tr>
          </tbody>
        </table>
      </div>
    </div>
${breakdown ? `
    <div class="food-section">
      <h2 class="section-title">Where the calories come from</h2>
      <div class="rows">
${breakdown}
      </div>
    </div>
` : ''}
    <div class="food-section">
      <h2 class="section-title">The real talk</h2>
      <div class="body-text">
${realTalk}
      </div>
    </div>
${qtyRows ? `
    <div class="food-section">
      <h2 class="section-title">How many calories in 2, 3 or 4 ${esc(qtyUnit.unit)}s?</h2>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>How many</th><th class="num">Calories</th><th class="num">Protein</th></tr></thead>
          <tbody>
${qtyRows}
          </tbody>
        </table>
      </div>
    </div>
` : ''}${portions ? `
    <div class="food-section">
      <h2 class="section-title">How the portions compare</h2>
      <div class="portion-grid">
${portions}
      </div>
    </div>
` : ''}
${variants ? `
    <div class="food-section">
      <h2 class="section-title">${esc(food.name)} variants, ranked by calories</h2>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Variant</th><th class="num">Calories</th><th>Notes</th></tr></thead>
          <tbody>
${variants}
          </tbody>
        </table>
      </div>
    </div>
` : ''}
    <div class="food-section">
      <h2 class="section-title">How to eat it lighter</h2>
      <ul class="tips-list">
${lighter}
      </ul>
    </div>

    <div class="food-section">
      <h2 class="section-title">Common questions</h2>
${faqs}
    </div>
${related ? `
    <div class="food-section">
      <h2 class="section-title">Related foods</h2>
      <div class="card-grid">
${related}
      </div>
      <p style="margin-top:20px;"><a class="text-link" href="${catUrl(food.category)}">See all ${esc(catName)} calories, ranked &rsaquo;</a></p>
    </div>
` : ''}
    <p class="disclaimer">${esc(disclaimerFor(food))}</p>
${source}
    <p class="about-link">New here? <a class="text-link" href="../about.html">Read how I went from 128kg to 86kg without cutting rice &rsaquo;</a></p>

  </div>

${ctaBand('../')}

${footer('../')}

${NAV_SCRIPT}
${ANALYTICS}
</body>
</html>
`;
}

// ---------- listing pages (category hubs and country hubs) ----------

function foodCard(f, prefix, withTag) {
  return `        <a class="food-card" href="${prefix}${f.slug}.html" data-region="${esc(foodRegions(f).join(' '))}">
          <div class="food-card__cal">${f.calories}<small> kcal</small></div>
          <div class="food-card__name">${esc(f.name)}</div>
          <div class="food-card__serving">per ${esc(f.serving)}</div>${withTag ? `
          <div class="food-card__tag">${esc(regionTag(f))}</div>` : ''}
        </a>`;
}

function statsBlock(label, items) {
  const lightest = items[0];
  const heaviest = items[items.length - 1];
  const avg = Math.round(items.reduce((s, f) => s + f.calories, 0) / items.length);
  const under300 = items.filter(f => f.calories < 300);
  const over600 = items.filter(f => f.calories >= 600);
  const lowLabel = f => esc(f.name) + ' at ' + f.calories + ' kcal per ' + esc(f.serving);
  return `    <div class="food-section">
      <h2 class="section-title">${esc(label)} at a glance</h2>
      <div class="body-text">
        <p>There are ${items.length} dishes ranked on this page. The lightest is ${lowLabel(lightest)}, the heaviest is ${lowLabel(heaviest)}, and the average lands around ${avg} calories a serving. ${!under300.length ? 'Nothing here comes in under 300 calories' : under300.length === items.length ? 'Every one of them comes in under 300 calories' : under300.length + ' of them come in under 300 calories'}${!over600.length ? '' : over600.length === 1 ? ', and one is 600 or more' : ', and ' + over600.length + ' are 600 or more'}.</p>
        <p>${heaviest.calories - lightest.calories >= 400
          ? 'That spread is the whole point. Two dishes off the same menu can be ' + (heaviest.calories - lightest.calories) + ' calories apart, which is more than most people\'s entire daily deficit. Knowing which is which costs you nothing and changes the outcome.'
          : 'The spread here is narrower than most categories, about ' + (heaviest.calories - lightest.calories) + ' calories between the lightest and the heaviest. That means portion size and what you order alongside it matter more than which dish you pick.'}</p>
      </div>
    </div>`;
}

function listingFaq(label, items, lang) {
  const lightest = items[0];
  const heaviest = items[items.length - 1];
  const median = items[Math.floor(items.length / 2)];
  const avg = Math.round(items.reduce((s, f) => s + f.calories, 0) / items.length);
  const under300 = items.filter(f => f.calories < 300);
  const over600 = items.filter(f => f.calories >= 600);
  const noun = label.toLowerCase().replace(/s$/, '');
  const faq = [
    {
      q: 'What is the lowest calorie ' + noun + ' option?',
      a: lightest.name + ' is the lightest on this page at ' + lightest.calories +
         ' calories per ' + lightest.serving + '. ' +
         (under300.length > 1
           ? 'There are ' + under300.length + ' options here under 300 calories, so you have room to pick something you actually like.'
           : 'Most of this page sits well above that, so it is the standout.')
    },
    {
      q: 'What is the highest calorie ' + noun + ' here?',
      a: heaviest.name + ' tops the list at ' + heaviest.calories + ' calories per ' +
         heaviest.serving + '. ' + (!over600.length
           ? 'Nothing else here comes close.'
           : over600.length === items.length
             ? 'Every dish on this page is 600 calories or more, so this is a page to order carefully from.'
             : over600.length + ' of the ' + items.length + ' dishes here are 600 calories or more, so it is worth checking before you order.')
    },
    {
      q: 'How many calories are in a typical ' + label.toLowerCase() + ' serving?',
      a: 'Across the ' + items.length + ' dishes on this page the average is about ' + avg +
         ' calories per serving, with the middle of the pack around ' + median.calories +
         ' (' + median.name + '). Figures are estimates for a normal portion.'
    }
  ];
  if (lang === 'ms') {
    faq.push({
      q: 'Berapa kalori dalam ' + label.toLowerCase() + '?',
      a: 'Purata untuk ' + items.length + ' hidangan di halaman ini ialah kira-kira ' + avg +
         ' kalori satu hidangan. Yang paling rendah ialah ' + lightest.name + ' (' +
         lightest.calories + ' kalori) dan yang paling tinggi ialah ' + heaviest.name + ' (' +
         heaviest.calories + ' kalori). Semua angka ini anggaran untuk hidangan gerai biasa.'
    });
  }
  if (lang === 'id') {
    faq.push({
      q: 'Berapa kalori ' + label.toLowerCase() + '?',
      a: 'Rata-rata untuk ' + items.length + ' hidangan di halaman ini sekitar ' + avg +
         ' kalori per porsi. Yang paling rendah adalah ' + lightest.name + ' (' +
         lightest.calories + ' kalori) dan yang paling tinggi adalah ' + heaviest.name + ' (' +
         heaviest.calories + ' kalori). Semua angka ini perkiraan untuk porsi warung biasa.'
    });
  }
  return faq;
}

function faqHtml(faq) {
  return faq.map(f =>
    `      <div class="faq-item"><div class="faq-item__q">${esc(f.q)}</div><div class="faq-item__a">${esc(f.a)}</div></div>`
  ).join('\n');
}

function listingSchema(url, title, metaDesc, label, items, faq, added) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'CollectionPage',
      '@id': url + '#webpage',
      url: url,
      name: title,
      description: metaDesc,
      inLanguage: 'en',
      datePublished: added,
      dateModified: [latestDate(items), added].sort().pop(),
      author: AUTHOR,
      publisher: PUBLISHER,
      isPartOf: { '@id': BASE + '/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Food Calories', item: BASE + '/foods.html' },
          { '@type': 'ListItem', position: 3, name: label, item: url }
        ]
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((f, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: f.name,
          url: BASE + '/foods/' + f.slug + '.html'
        }))
      }
    }, {
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }]
  }, null, 2);
}

function listingShell(opts) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.metaDesc)}">
  <link rel="canonical" href="${opts.url}">
  <meta property="og:title" content="${esc(opts.title)}">
  <meta property="og:description" content="${esc(opts.metaDesc)}">
  <meta property="og:image" content="${BASE}/images/og-image.jpg">
  <meta property="og:url" content="${opts.url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Rice and Protein">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(opts.title)}">
  <meta name="twitter:description" content="${esc(opts.metaDesc)}">
  <meta name="twitter:image" content="${BASE}/images/og-image.jpg">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
${opts.schema}
  </script>
${headLinks(opts.prefix)}
${listingStyles()}
</head>
<body>

${header(opts.prefix)}

  <div class="page page--wide">

    <nav class="crumbs"><a href="${opts.prefix}index.html">Home</a><span>/</span><a href="${opts.prefix}foods.html">Food Calories</a><span>/</span>${esc(opts.label)}</nav>

    <div class="food-hero">
      <p class="food-hero__eyebrow">${esc(opts.eyebrow)}</p>
      <h1 class="food-hero__title">${opts.h1}</h1>
      <div class="food-hero__intro">
${opts.intro}
      </div>
    </div>

${opts.body}

    <p class="disclaimer">${esc(opts.disclaimer)}</p>

  </div>

${ctaBand(opts.prefix)}

${footer(opts.prefix)}

${NAV_SCRIPT}
${opts.script || ''}
${ANALYTICS}
</body>
</html>
`;
}

const FILTER_SCRIPT = `  <script>
  (function () {
    var bar = document.getElementById('region-filter');
    if (!bar) return;
    var cards = document.querySelectorAll('.food-card[data-region]');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      var key = b.getAttribute('data-filter');
      bar.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('chip--active', c === b); });
      cards.forEach(function (c) {
        c.hidden = key !== 'all' && c.getAttribute('data-region').split(' ').indexOf(key) === -1;
      });
    });
  })();
  </script>`;

// Category hub: every dish in the category, all countries, ranked, with a
// client side country filter and a country tag on each card.
function buildCategory(cat) {
  const meta = CAT_PAGES[cat];
  const label = CATEGORIES[cat];
  const items = (byCategory()[cat] || []).slice().sort((a, b) => a.calories - b.calories);
  const url = BASE + '/foods/' + meta.slug + '.html';
  const regionsHere = liveRegions().filter(r => items.some(f => foodRegions(f).includes(r)));
  const metaDesc = label + ' calories for ' + items.length + ' dishes across ' + regionsHere.length + ' Asian countries, ranked lightest to heaviest, with macros and how to eat each one lighter.';
  const faq = listingFaq(label, items, 'ms');

  const filter = regionsHere.length > 1 ? `    <div class="filter-bar" id="region-filter">
      <button class="chip chip--active" type="button" data-filter="all">All countries</button>
${regionsHere.map(r => `      <button class="chip" type="button" data-filter="${r}">${esc(REGION_PAGES[r].short)}</button>`).join('\n')}
    </div>` : '';

  const chips = Object.keys(CATEGORIES)
    .filter(c => c !== cat && CAT_PAGES[c] && (byCategory()[c] || []).length)
    .map(c => `        <a class="chip" href="${CAT_PAGES[c].slug}.html">${esc(CATEGORIES[c])}</a>`)
    .join('\n');
  const countryChips = liveRegions()
    .map(r => `        <a class="chip" href="${regionUrl(r)}">${esc(REGION_PAGES[r].short)}</a>`)
    .join('\n');

  const body = `${filter}
    <div class="food-section">
      <div class="food-grid">
${items.map(f => foodCard(f, '', true)).join('\n')}
      </div>
    </div>

${statsBlock(label, items)}

    <div class="food-section">
      <h2 class="section-title">Common questions</h2>
${faqHtml(faq)}
    </div>

    <div class="food-section">
      <h2 class="section-title">Browse by country</h2>
      <div class="chips">
${countryChips}
      </div>
    </div>

    <div class="food-section">
      <h2 class="section-title">Browse other categories</h2>
      <div class="chips">
${chips}
        <a class="chip" href="../foods.html">All foods &rsaquo;</a>
      </div>
    </div>`;

  return listingShell({
    prefix: '../',
    url: url,
    title: meta.title,
    metaDesc: metaDesc,
    label: label,
    eyebrow: 'Food Calories',
    h1: esc(label) + ' <span style="color:var(--accent)">Calories</span>',
    intro: meta.intro.map(p => `      <p>${esc(p)}</p>`).join('\n'),
    body: body,
    disclaimer: 'Calorie and macro figures are estimates for a typical street stall, hawker or restaurant serving. Actual numbers vary by stall, recipe and portion size. Use them as a guide, not gospel.',
    schema: listingSchema(url, meta.title, metaDesc, label, items, faq, '2026-07-21'),
    script: FILTER_SCRIPT
  });
}

// Country hub: every dish tagged with the region, grouped by category and
// ranked inside each group.
function buildRegion(key) {
  const meta = REGION_PAGES[key];
  const label = meta.label;
  const all = byRegion(key).slice().sort((a, b) => a.calories - b.calories);
  const url = BASE + '/foods/' + meta.slug + '.html';
  const metaDesc = label.replace(/ Food$/, '') + ' food calories: ' + all.length + ' dishes ranked lightest to heaviest by category, with macros, where the calories hide and how to eat each one lighter.';
  const faq = listingFaq(label, all, meta.lang);

  const groups = Object.keys(CATEGORIES).map(cat => {
    const items = all.filter(f => f.category === cat);
    if (!items.length) return '';
    return `    <div class="group" id="${cat}">
      <h2 class="group-title"><a href="${CAT_PAGES[cat].slug}.html">${esc(CATEGORIES[cat])}</a> <small>${items.length} ${items.length === 1 ? 'dish' : 'dishes'}, lightest first</small></h2>
      <div class="food-grid">
${items.map(f => foodCard(f, '', false)).join('\n')}
      </div>
    </div>`;
  }).filter(Boolean).join('\n\n');

  const jump = Object.keys(CATEGORIES)
    .filter(cat => all.some(f => f.category === cat))
    .map(cat => `      <a class="chip" href="#${cat}">${esc(CATEGORIES[cat])}</a>`)
    .join('\n');

  const otherCountries = liveRegions()
    .filter(r => r !== key)
    .map(r => `        <a class="chip" href="${regionUrl(r)}">${esc(REGION_PAGES[r].short)}</a>`)
    .join('\n');

  const body = `    <div class="filter-bar">
${jump}
    </div>

    <div class="food-section">
${groups}
    </div>

${statsBlock(label, all)}

    <div class="food-section">
      <h2 class="section-title">Common questions</h2>
${faqHtml(faq)}
    </div>

    <div class="food-section">
      <h2 class="section-title">Other countries</h2>
      <div class="chips">
${otherCountries}
        <a class="chip" href="../foods.html">All foods by category &rsaquo;</a>
      </div>
    </div>`;

  return listingShell({
    prefix: '../',
    url: url,
    title: meta.title,
    metaDesc: metaDesc,
    label: label,
    eyebrow: 'Food Calories by Country',
    h1: esc(label) + ' <span style="color:var(--accent)">Calories</span>',
    intro: meta.intro.map(p => `      <p>${esc(p)}</p>`).join('\n'),
    body: body,
    disclaimer: 'Calorie and macro figures are estimates for a typical ' + meta.ctx + ' serving, based on ' + meta.sources + '. Actual numbers vary by stall, recipe and portion size. Use them as a guide, not gospel.',
    schema: listingSchema(url, meta.title, metaDesc, label, all, faq, meta.added)
  });
}

// ---------- master hub (foods.html) ----------

function buildHub() {
  const NL = String.fromCharCode(10);
  const regions = liveRegions();
  const ranked = FOODS.slice().sort((a, b) => a.calories - b.calories);
  const top10 = ranked.slice(-10).reverse();
  const everyday = ranked.filter(f => (f.category === 'soup' || f.category === 'veg') && f.servingGrams >= 100).slice(0, 10);
  const avgAll = Math.round(FOODS.reduce((s, f) => s + f.calories, 0) / FOODS.length);
  const myFoods = byRegion('my').slice().sort((a, b) => a.calories - b.calories);
  const myTop = myFoods[myFoods.length - 1];
  const myEveryday = myFoods.filter(f => (f.category === 'soup' || f.category === 'veg') && f.servingGrams >= 100);

  const countryCards = regions.map(r => {
    const items = byRegion(r).slice().sort((a, b) => b.calories - a.calories);
    const sample = items.slice(0, 3).map(f => f.name).join(', ');
    return `        <a class="card link-card" href="foods/${regionUrl(r)}">
          <div class="food-card__cal">${items.length}<small> dishes</small></div>
          <div class="link-card__title" style="margin-top:8px;">${esc(REGION_PAGES[r].short)}</div>
          <div class="link-card__sub">${esc(sample)}</div>
        </a>`;
  }).join(NL);

  const catCards = Object.keys(CATEGORIES).filter(c => CAT_PAGES[c] && (byCategory()[c] || []).length).map(c => {
    const items = byCategory()[c];
    const lightest = items.slice().sort((a, b) => a.calories - b.calories)[0];
    return `        <a class="card link-card" href="foods/${CAT_PAGES[c].slug}.html">
          <div class="link-card__title">${esc(CATEGORIES[c])}</div>
          <div class="link-card__sub">${items.length} dishes. Lightest: <b>${esc(lightest.name)}</b>, ${lightest.calories} kcal</div>
        </a>`;
  }).join(NL);

  const row = f => foodCard(f, 'foods/', true);

  // The full directory. Compact rows so 600 dishes stay scannable.
  const directory = Object.keys(CATEGORIES).map(cat => {
    const items = (byCategory()[cat] || []).slice().sort((a, b) => a.name.localeCompare(b.name));
    if (!items.length) return '';
    return `      <div class="dir-group">
        <h3 class="dir-title"><a href="foods/${CAT_PAGES[cat].slug}.html">${esc(CATEGORIES[cat])} &rsaquo;</a></h3>
        <ul class="dir-list">
${items.map(f => `          <li><a href="foods/${f.slug}.html"><span>${esc(f.name)}</span><small>${esc(regionTag(f))}</small><b>${f.calories}</b></a></li>`).join(NL)}
        </ul>
      </div>`;
  }).filter(Boolean).join(NL);

  const hubFaq = [
    {
      q: 'What is the highest calorie Malaysian food?',
      a: 'Of the ' + myFoods.length + ' Malaysian dishes on this site, ' + myTop.name + ' tops the list at ' +
         myTop.calories + ' calories per ' + myTop.serving + '. Anything deep fried, built on coconut milk, or served as a full communal plate tends to land up there.'
    },
    {
      q: 'What is the highest calorie dish on the whole site?',
      a: top10[0].name + ' at ' + top10[0].calories + ' calories per ' + top10[0].serving + ', with ' +
         top10[1].name + ' (' + top10[1].calories + ') and ' + top10[2].name + ' (' + top10[2].calories + ') close behind. Across ' +
         regions.length + ' countries the pattern is the same: fried, coconut based, or a sharing plate eaten alone.'
    },
    {
      q: 'What is the lowest calorie Malaysian food?',
      a: 'Clear soups and plain vegetable sides are where the genuinely cheap calories are. ' +
         myEveryday.slice(0, 3).map(f => f.name + ' at ' + f.calories + ' calories per ' + f.serving).join(', ') +
         ' are the kind of thing you can pile on a plate without thinking about it.'
    },
    {
      q: 'How many calories is a typical Asian meal?',
      a: 'Across the ' + FOODS.length + ' dishes on this site the average is about ' + avgAll +
         ' calories a serving, but that mixes snacks with full rice plates. A realistic street food lunch, one rice or noodle dish plus a drink, usually lands between 600 and 900 calories in every country here. A nasi kandar, a katsu curry or a plate of lechon kawali with rice can pass 1,000 on its own.'
    },
    {
      q: 'Where do these calorie numbers come from?',
      a: 'National food composition tables where they exist (Malaysia MyNutri, HPB Singapore, TKPI Indonesia, Thai Bureau of Nutrition, Vietnam NIN, FNRI Philippines, Hong Kong CFS, MEXT Japan, Korea MFDS), published hospital dietitian figures, and chain restaurant nutrition data, weighed against typical street and restaurant portion sizes. Street food has no nutrition labelling, so every figure here is a considered estimate, not a lab result. The same dish can swing 20 percent either way depending on the cook.'
    },
    {
      q: 'Berapa kalori dalam makanan Malaysia?',
      a: 'Purata untuk ' + myFoods.length + ' hidangan Malaysia di laman ini ialah kira-kira ' +
         Math.round(myFoods.reduce((s, f) => s + f.calories, 0) / myFoods.length) +
         ' kalori satu hidangan. Yang paling tinggi ialah ' + myTop.name + ' (' + myTop.calories +
         ' kalori) dan antara yang paling rendah ialah ' + myEveryday[0].name + ' (' + myEveryday[0].calories +
         ' kalori). Semua angka ini anggaran untuk hidangan gerai biasa dan berbeza ikut kedai.'
    }
  ];

  const title = 'Asian Food Calories: Malaysia, Singapore & More | Rice and Protein';
  const shortTitle = 'Asian Food Calories | Rice and Protein';
  const metaDesc = 'Calorie counts for ' + FOODS.length + ' dishes across ' + regions.length + ' Asian countries. Nasi lemak, pho, pad thai, ramen, bibimbap and more, with macros and how to eat them lighter.';

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'CollectionPage',
      '@id': BASE + '/foods.html#webpage',
      url: BASE + '/foods.html',
      name: shortTitle,
      description: metaDesc,
      inLanguage: 'en',
      datePublished: '2026-06-11',
      dateModified: latestDate(FOODS),
      author: AUTHOR,
      publisher: PUBLISHER,
      isPartOf: { '@id': BASE + '/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Food Calories', item: BASE + '/foods.html' }
        ]
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: regions.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: REGION_PAGES[r].label + ' Calories',
          url: BASE + '/foods/' + regionUrl(r)
        }))
      }
    }, {
      '@type': 'FAQPage',
      '@id': BASE + '/foods.html#faq',
      mainEntity: hubFaq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }]
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(shortTitle)}</title>
  <meta name="description" content="${esc(metaDesc)}">
  <link rel="canonical" href="${BASE}/foods.html">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(metaDesc)}">
  <meta property="og:image" content="${BASE}/images/og-image.jpg">
  <meta property="og:url" content="${BASE}/foods.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Rice and Protein">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(shortTitle)}">
  <meta name="twitter:description" content="${esc(metaDesc)}">
  <meta name="twitter:image" content="${BASE}/images/og-image.jpg">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
${schema}
  </script>
${headLinks('')}
  <style>
    .hub-hero { padding: calc(var(--header-h) + 64px) 0 56px; text-align: center; }
    .hub-hero .display { max-width: 760px; margin: 0 auto 16px; }
    .hub-hero .lede { max-width: 620px; margin: 0 auto; }
    .hub-section { padding: 0 0 72px; }
    .hub-intro { max-width: 680px; margin: 0 auto; }
    .dir-grid { columns: 3; column-gap: 32px; }
    .dir-group { break-inside: avoid; margin-bottom: 32px; }
    .dir-title { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
    .dir-title a:hover { color: var(--accent); }
    .dir-list { list-style: none; }
    .dir-list li a { display: flex; align-items: baseline; gap: 8px; padding: 7px 0; border-bottom: 1px solid var(--hair); font-size: 14px; }
    .dir-list li a span { flex: 1; min-width: 0; }
    .dir-list li a small { font-size: 11px; color: var(--muted); }
    .dir-list li a b { font-variant-numeric: tabular-nums; font-weight: 600; }
    .dir-list li a:hover span { color: var(--accent); }
    @media (max-width: 900px) { .dir-grid { columns: 2; } }
    @media (max-width: 640px) { .dir-grid { columns: 1; } .hub-hero { padding-top: calc(var(--header-h) + 44px); } .hub-section { padding-bottom: 52px; } }
  </style>
</head>
<body>

${header('')}

  <div class="page page--wide">
    <div class="hub-hero">
      <p class="eyebrow">Food Calories</p>
      <h1 class="display">Asian Food <span style="color:var(--accent)">Calories</span></h1>
      <p class="lede">${FOODS.length} dishes across ${regions.length} ${regions.length === 1 ? 'country' : 'countries'}. Real portions, honest numbers, and how to eat each one lighter without giving it up.</p>
    </div>

    <section class="hub-section">
      <h2 class="section-title">Browse by country</h2>
      <div class="card-grid">
${countryCards}
      </div>
    </section>

    <section class="hub-section">
      <h2 class="section-title">Browse by category</h2>
      <div class="card-grid">
${catCards}
      </div>
    </section>

    <section class="hub-section">
      <div class="body-text hub-intro">
        <p>This is every dish I could get honest numbers for, ${FOODS.length} of them across ${regions.length} countries and ${Object.keys(CATEGORIES).length} categories. It started with Malaysian hawker food, because that is what I ate on the way from 128kg to 86kg, and grew across the region because the question is the same everywhere: how many calories is the thing I am about to order.</p>
        <p>Nothing here is banned. The only thing that changed for me was knowing what each plate cost before I ordered it, which is the entire point of this page. Click any dish for the macro breakdown, where the calories actually hide, and how to order it lighter.</p>
        <p>Street food has no nutrition labelling, so these are careful estimates built on national food composition tables and dietitian data, sized to real portions. Treat them as a guide that is right often enough to be useful.</p>
      </div>
    </section>

    <section class="hub-section">
      <h2 class="section-title">Highest calorie dishes on the site</h2>
      <div class="food-grid food-grid--4">
${top10.map(row).join(NL)}
      </div>
    </section>

    <section class="hub-section">
      <h2 class="section-title">Lowest calorie dishes you would actually order</h2>
      <div class="food-grid food-grid--4">
${everyday.map(row).join(NL)}
      </div>
    </section>

    <section class="hub-section">
      <h2 class="section-title">Every dish, A to Z by category</h2>
      <div class="dir-grid">
${directory}
      </div>
    </section>

    <section class="hub-section">
      <h2 class="section-title">Common questions</h2>
${faqHtml(hubFaq)}
    </section>

    <section class="hub-section">
      <h2 class="section-title">Keep going</h2>
      <div class="card-grid">
        <a class="card link-card" href="index.html">
          <div class="food-card__tag">Tool</div>
          <div class="link-card__title">Free TDEE calculator</div>
          <div class="link-card__sub">How many calories you actually need, in thirty seconds</div>
        </a>
        <a class="card link-card" href="about.html">
          <div class="food-card__tag">Story</div>
          <div class="link-card__title">128kg to 86kg</div>
          <div class="link-card__sub">How I lost the weight without cutting the food I love</div>
        </a>
        <a class="card link-card" href="diets.html">
          <div class="food-card__tag">Diets</div>
          <div class="link-card__title">Which diet actually works?</div>
          <div class="link-card__sub">Keto, IF, CICO, volume eating, compared honestly</div>
        </a>
      </div>
    </section>
  </div>

${footer('')}

${NAV_SCRIPT}
${ANALYTICS}
</body>
</html>
`;
}

// ---------- sitemap ----------

function updateSitemap() {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  xml = xml.replace(/\n*  <!-- foods:start -->[\s\S]*?<!-- foods:end -->\n*/g, '\n');

  const urls = [];
  urls.push(`  <url>\n    <loc>${BASE}/foods.html</loc>\n    <lastmod>${latestDate(FOODS)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  for (const r of liveRegions()) {
    urls.push(`  <url>\n    <loc>${BASE}/foods/${regionUrl(r)}</loc>\n    <lastmod>${latestDate(byRegion(r))}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  }
  for (const cat of Object.keys(CATEGORIES)) {
    if (!CAT_PAGES[cat] || !(byCategory()[cat] || []).length) continue;
    urls.push(`  <url>\n    <loc>${BASE}/foods/${CAT_PAGES[cat].slug}.html</loc>\n    <lastmod>${latestDate(byCategory()[cat])}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`);
  }
  for (const f of FOODS) {
    urls.push(`  <url>\n    <loc>${BASE}/foods/${f.slug}.html</loc>\n    <lastmod>${foodUpdated(f)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  const block = `\n  <!-- foods:start -->\n${urls.join('\n')}\n  <!-- foods:end -->\n`;
  xml = xml.replace(/\n*<\/urlset>\s*$/, block + '</urlset>\n');
  fs.writeFileSync(SITEMAP, xml);
}

// ---------- llms.txt ----------
// Plain text summary for AI crawlers. Regenerated with the site so the counts
// and the citeable numbers never go stale.

function buildLlms() {
  const regions = liveRegions();
  const pick = slugs => slugs.map(s => bySlug[s]).filter(Boolean);
  const cite = f => '- ' + f.name + ': ' + f.calories + ' kcal per ' + f.serving;
  const perCountry = regions.map(r => {
    const items = byRegion(r).slice().sort((a, b) => b.calories - a.calories);
    const heavy = items.slice(0, 2).map(cite).join('\n');
    const light = items.filter(f => f.category !== 'drinks').slice(-2).map(cite).join('\n');
    return '### ' + REGION_PAGES[r].label + ' (' + items.length + ' dishes)\n' +
      'Hub: ' + BASE + '/foods/' + regionUrl(r) + '\n' +
      'Sources: ' + REGION_PAGES[r].sources + '.\n' + heavy + '\n' + light;
  }).join('\n\n');

  return `# Rice and Protein

> Calorie counts for Asian food, sized to real street and restaurant portions, plus a free TDEE calculator. Written by a Malaysian who lost 42kg (128kg to 86kg) eating normal food. No keto, no supplements, no starving.

## Who writes this

Rice and Protein is written by a Malaysian who went from 128kg to 86kg (now maintaining around 92kg) using calorie counting and volume eating. The story is at ${BASE}/about.html. Calorie data comes from national food composition tables and published dietitian figures for each country, sized to typical portions, with macros estimated from the ingredients. Street food has no nutrition labels, so every figure is a considered estimate rather than a lab result.

## Core philosophy

Weight loss requires a calorie deficit. The only diet that works long term is one you can sustain. In Asia that means eating rice, noodles, hawker food and kopi, just with awareness of what is in them. Volume eating (high volume, low calorie density meals) makes a deficit sustainable without hunger.

## Food calories database

${FOODS.length} dishes across ${regions.length} ${regions.length === 1 ? 'country' : 'countries'}, one page per dish at ${BASE}/foods/[slug].html. Master hub: ${BASE}/foods.html (country cards, category cards, full A to Z directory). Each dish page has the calorie count for a standard serving, a per serving and per 100g macro table, a breakdown of where the calories come from, portion comparisons, variants ranked by calories, lighter eating tips, and a FAQ (with a Malay question on Malaysian and Singapore dishes and an Indonesian question on Indonesian dishes).

Category hubs (all countries, ranked lightest to heaviest):
${Object.keys(CATEGORIES).filter(c => CAT_PAGES[c] && (byCategory()[c] || []).length).map(c => '- ' + CATEGORIES[c] + ': ' + BASE + '/foods/' + CAT_PAGES[c].slug + '.html').join('\n')}

## Countries and sample citeable numbers

${perCountry}

## Frequently cited Malaysian numbers

${pick(['teh-tarik', 'nasi-lemak', 'roti-canai', 'char-kuey-teow', 'milo-dinosaur', 'cendol']).map(cite).join('\n')}

## Tools

- TDEE Calculator (homepage, ${BASE}/): maintenance calories from the Mifflin-St Jeor, Harris-Benedict and Schofield formulas averaged, then a user selected deficit or surplus, plus a protein target of goal weight x 1.6g to 2.2g per kg.

## Pages

- [Home / TDEE Calculator](${BASE}/)
- [Food Calories (${FOODS.length} dishes, ${regions.length} ${regions.length === 1 ? 'country' : 'countries'})](${BASE}/foods.html)
${regions.map(r => '- [' + REGION_PAGES[r].label + ' Calories](' + BASE + '/foods/' + regionUrl(r) + ')').join('\n')}
- [About](${BASE}/about.html)
- [Diet Guides](${BASE}/diets.html)
- [Keto Diet](${BASE}/diets/keto.html)
- [Intermittent Fasting](${BASE}/diets/if.html)
- [Paleo Diet](${BASE}/diets/paleo.html)
- [Calorie Counting (CICO)](${BASE}/diets/cico.html)
- [Volume Eating](${BASE}/diets/volume-eating.html)
- [OMAD](${BASE}/diets/omad.html)
- [Contact](${BASE}/contact.html)
`;
}

// ---------- run ----------

function main() {
  if (!fs.existsSync(FOODS_DIR)) fs.mkdirSync(FOODS_DIR, { recursive: true });

  // Guard: a category or region slug must never collide with a food slug.
  const reserved = new Set([...Object.values(CAT_PAGES).map(c => c.slug), ...Object.values(REGION_PAGES).map(r => r.slug)]);
  for (const f of FOODS) {
    if (reserved.has(f.slug)) throw new Error('food slug collides with a hub slug: ' + f.slug);
  }

  let count = 0;
  for (const food of FOODS) {
    fs.writeFileSync(path.join(FOODS_DIR, food.slug + '.html'), buildLeaf(food));
    count++;
  }
  console.log('  wrote ' + count + ' leaf pages');

  let catCount = 0;
  for (const cat of Object.keys(CATEGORIES)) {
    if (!CAT_PAGES[cat] || !(byCategory()[cat] || []).length) continue;
    fs.writeFileSync(path.join(FOODS_DIR, CAT_PAGES[cat].slug + '.html'), buildCategory(cat));
    catCount++;
  }
  console.log('  wrote ' + catCount + ' category hubs');

  for (const r of liveRegions()) {
    fs.writeFileSync(path.join(FOODS_DIR, regionUrl(r)), buildRegion(r));
    console.log('  wrote foods/' + regionUrl(r) + ' (' + byRegion(r).length + ' foods)');
  }

  fs.writeFileSync(HUB, buildHub());
  console.log('  wrote foods.html (hub, ' + count + ' foods, ' + liveRegions().length + ' countries)');

  updateSitemap();
  console.log('  updated sitemap.xml');

  fs.writeFileSync(path.join(ROOT, 'llms.txt'), buildLlms());
  console.log('  wrote llms.txt');
  console.log('\nDone. ' + count + ' food pages generated.');
}

// scripts/sync-chrome.js reuses header()/footer() so the hand written pages
// carry the same nav (same country list) as the generated ones.
module.exports = { header, footer, headLinks, liveRegions, REGION_PAGES };

if (require.main === module) main();
