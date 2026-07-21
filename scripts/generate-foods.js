#!/usr/bin/env node
/*
 * generate-foods.js
 * Programmatic SEO generator for the /foods/ calorie database.
 *
 * Reads data/foods.json and produces:
 *   - foods/<slug>.html        one leaf page per food
 *   - foods.html               the hub page (grouped by category)
 *   - sitemap.xml              refreshes the /foods/ url block in place
 *
 * Output is plain static HTML. GitHub Pages never runs this script.
 * Run locally after editing foods.json, then commit the output:
 *   node scripts/generate-foods.js
 *
 * House rules honoured: no em dashes anywhere, brand colours via the same
 * inline :root variables the rest of the site uses, mamak voice preserved
 * from the data file.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'foods.json');
const FOODS_DIR = path.join(ROOT, 'foods');
const HUB = path.join(ROOT, 'foods.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const BASE = 'https://riceandprotein.com';
const TODAY = '2026-07-21';

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

// JSON-LD string values: escape quotes and strip line breaks.
function jl(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();
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

// Category hub pages. One per category, lives at foods/<slug>.html.
// Each intro is unique copy so the pages are not thin duplicates of the hub.
const CAT_PAGES = {
  rice: {
    slug: 'rice-meals',
    title: 'Malaysian Rice Dishes: Calories Ranked | Rice and Protein',
    intro: [
      'Rice is not the enemy. I lost 42kg eating rice almost every day, so this page is never going to tell you to quit nasi. What matters is which rice dish and what goes on top of it. A plate of steamed chicken rice and a nasi kandar with three lauk can be 700 calories apart, and both look like "just rice with stuff".',
      'Every rice meal below is ranked from lightest to heaviest. Click any dish for the full macro breakdown, where the calories actually hide, and how to order it lighter without eating sad food.'
    ]
  },
  noodles: {
    slug: 'noodles',
    title: 'Malaysian Noodles: Calories Ranked | Rice and Protein',
    intro: [
      'Malaysian noodles run from surprisingly safe to full calorie bombs, and you cannot tell by looking. Most soup noodles sit around 300 to 450 calories a bowl. The moment a wok and a ladle of oil get involved, char kuey teow and mee goreng territory, you are flirting with 700 plus.',
      'Simple rule: soup beats dry, dry beats fried. The full ranking is below, lightest first, with macros and lighter swaps one click away for every bowl.'
    ]
  },
  dimsum: {
    slug: 'dim-sum',
    title: 'Dim Sum Calories, Ranked Per Piece | Rice and Protein',
    intro: [
      'Dim sum is dangerous precisely because everything is small. One siew mai is nothing. But one basket here, one plate there, some fried wu kok because it looked nice, and suddenly you have eaten 1,200 calories before 11am.',
      'The steamed baskets are mostly fine. The fried items and anything drowning in sweet sauce are where it stacks up. Everything below is ranked so you know what each basket costs before the trolley auntie reaches your table.'
    ]
  },
  mamak: {
    slug: 'mamak-and-bread',
    title: 'Mamak Food Calories, Ranked | Rice and Protein',
    intro: [
      'The mamak at 1am is where diets go to die. Here is the honest math: one roti kosong is about 300 calories, which is fine. The problem is nobody stops at one, nobody eats it without dhal and sambal, and the teh tarik next to it is another 160.',
      'This page ranks every roti, murtabak and mamak staple from lightest to heaviest so you can still hang out with your friends at 1am and know exactly what the damage is.'
    ]
  },
  soup: {
    slug: 'soups',
    title: 'Malaysian Soup Calories, Ranked | Rice and Protein',
    intro: [
      'Soup is your best friend when you are cutting. Water has zero calories, it takes up space in your stomach, and a big bowl of sup ayam keeps you full for hours at a very low cost. I ate soup constantly on my way from 128kg to 86kg.',
      'The catch: some Malaysian soups are soups in name only. Anything built on coconut milk plays by different rules. The ranking below sorts the genuinely light bowls from the ones wearing a disguise.'
    ]
  },
  lauk: {
    slug: 'meat-grills-and-lauk',
    title: 'Lauk & Grilled Meat Calories, Ranked | Rice and Protein',
    intro: [
      'This is the biggest category on the site because Malaysian meals are built around lauk. It is also where your diet is quietly decided. Grilled, steamed and sambal lauk is how I stayed full while losing 42kg. Fried and rendang style is where the calories hide, sometimes double for the same piece of chicken.',
      'Every lauk below is ranked lightest to heaviest. Learn the difference between ikan bakar and ikan goreng once and it pays you back at every economy rice stall forever.'
    ]
  },
  veg: {
    slug: 'vegetables-and-sides',
    title: 'Vegetable Dish Calories, Ranked | Rice and Protein',
    intro: [
      'Vegetables should be the safest thing on your plate, and steamed or lightly stir fried, they are. This is the category you pile on when you want a mountain of food for almost nothing. Volume eating starts here.',
      'But be honest with yourself about the oil. Kangkung belacan glistening under the lamp at the tai chow is not a health food anymore. The ranking below shows which veg dishes are basically free and which ones are secretly a lauk.'
    ]
  },
  snacks: {
    slug: 'snacks-and-kuih',
    title: 'Kuih & Snack Calories, Ranked | Rice and Protein',
    intro: [
      'Kuih is sneaky. Each piece looks tiny and innocent, but most sit between 150 and 300 calories, and nobody in history has eaten one piece of kuih. Three pieces from the pasar and you have eaten a full meal without noticing.',
      'This page exists so you know exactly what that box from the pasar malam costs. Everything ranked lightest to heaviest, per piece, so you can pick your favourites on purpose instead of by accident.'
    ]
  },
  western: {
    slug: 'western-and-burgers',
    title: 'Western Stall Food Calories, Ranked | Rice and Protein',
    intro: [
      'Ramly burger, chicken chop, the whole western stall menu. Big portions, lots of oil, white sauce on everything, usually 600 plus calories a plate before you touch the fries.',
      'You do not have to give it up. You just need to know which plates are 500 calories and which are 900, because they look identical under the fluorescent light. Full ranking below.'
    ]
  },
  drinks: {
    slug: 'drinks',
    title: 'Malaysian Drink Calories, Ranked | Rice and Protein',
    intro: [
      'Drinks are the easiest 300 calories you will never notice. Teh tarik, Milo ais, sirap bandung: all of them are sugar delivery systems that do nothing for your hunger. You drink them, you are still hungry, you just spent a roti canai worth of calories.',
      'Switching to kosong drinks was genuinely the single easiest change I made in my whole 42kg loss. Every drink below is ranked so you can see exactly what your daily order costs you per month.'
    ]
  },
  dessert: {
    slug: 'desserts',
    title: 'Malaysian Dessert Calories, Ranked | Rice and Protein',
    intro: [
      'Cendol, ABC, tong sui, pisang goreng after lunch. Desserts are pure enjoyment calories, zero nutrition, and that is completely fine as long as you spend them on purpose.',
      'My rule while losing weight: dessert is a decision, not a habit. The ranking below tells you what each bowl costs so you can budget for the ones you actually love and skip the ones you eat out of politeness.'
    ]
  }
};

function catUrl(cat) {
  return CAT_PAGES[cat] ? CAT_PAGES[cat].slug + '.html' : '../foods.html';
}

// Shared header markup. `prefix` is '' for the hub (root level) or '../' for leaf pages in /foods/.
function header(prefix) {
  return `  <header class="site-header">
    <div class="header-inner">
      <a href="${prefix}index.html" class="site-logo">Rice and <span>Protein</span></a>
      <nav class="site-nav" id="site-nav">
        <ul class="nav-list">
          <li><a href="${prefix}about.html">About</a></li>
          <li><a href="${prefix}foods.html">Food Calories</a></li>
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
          <li><a href="${prefix}blog.html">Blog</a></li>
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
    <p class="footer-tag">Simple tools for people who want real results.</p>
    <ul class="footer-links">
      <li><a href="${prefix}foods.html">Food Calories</a></li>
      <li><a href="${prefix}blog.html">Blog</a></li>
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

// Shared inline CSS. The header/footer/nav rules match diets/*.html exactly;
// the rest is food-page specific.
function leafStyles() {
  return `  <style>
    :root { --bg:#FAF8F4; --bg2:#F2F0EB; --accent:#C8622A; --accent2:#A84E22; --text:#1C1C1A; --muted:#6B6B67; --border:#E8E2D9; --white:#ffffff; --good:#388E3C; --max:800px; --header-h:56px; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); font-size: 16px; line-height: 1.65; -webkit-font-smoothing: antialiased; display: flex; flex-direction: column; min-height: 100vh; }
    a { text-decoration: none; color: inherit; }
    button { font-family: 'DM Sans', sans-serif; cursor: pointer; }

    .site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: var(--header-h); background: var(--text); display: flex; align-items: center; }
    .header-inner { width: 100%; max-width: 1000px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
    .site-logo { font-family: 'DM Serif Display', serif; font-size: 18px; font-weight: 400; color: var(--white); }
    .site-logo span { color: var(--accent); }
    .site-nav { display: flex; align-items: center; }
    .nav-list { display: flex; align-items: center; gap: 28px; list-style: none; }
    .nav-list > li > a { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.7); transition: color 0.2s; }
    .nav-list > li > a:hover { color: var(--white); }
    .has-dropdown { position: relative; }
    .has-dropdown::after { content: ''; position: absolute; top: 100%; left: 0; right: 0; height: 10px; }
    .nav-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: var(--text); border: 1px solid rgba(255,255,255,0.12); min-width: 210px; padding: 8px 0; list-style: none; opacity: 0; pointer-events: none; transition: opacity 0.18s ease; z-index: 200; }
    .has-dropdown:hover .nav-dropdown, .has-dropdown:focus-within .nav-dropdown { opacity: 1; pointer-events: all; }
    .nav-dropdown li a { display: block; padding: 10px 20px; font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 400; transition: color 0.15s, background 0.15s; }
    .nav-dropdown li a:hover { color: var(--white); background: rgba(255,255,255,0.07); }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; cursor: pointer; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: var(--white); }

    .page { max-width: var(--max); margin: 0 auto; padding: 0 24px; flex: 1; width: 100%; }

    .crumbs { padding: calc(var(--header-h) + 28px) 0 0; font-size: 12px; color: var(--muted); letter-spacing: 0.3px; }
    .crumbs a { color: var(--muted); border-bottom: 1px solid transparent; }
    .crumbs a:hover { color: var(--accent); }
    .crumbs span { color: var(--border); margin: 0 7px; }

    .food-hero { padding: 20px 0 36px; border-bottom: 1.5px solid var(--border); }
    .food-hero__eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
    .food-hero__title { font-family: 'DM Serif Display', serif; font-size: clamp(30px, 5vw, 48px); font-weight: 400; line-height: 1.06; color: var(--text); margin-bottom: 14px; letter-spacing: -0.5px; }
    .food-hero__summary { font-size: 17px; color: var(--muted); line-height: 1.65; max-width: 540px; }

    .answer-box { display: flex; align-items: center; gap: 28px; margin: 32px 0 40px; flex-wrap: wrap; }
    .answer-box__num { font-family: 'DM Serif Display', serif; font-size: 76px; line-height: 1; color: var(--text); flex-shrink: 0; }
    .answer-box__num small { display: block; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 10px; }
    .answer-box__text { font-size: 16px; line-height: 1.7; color: var(--text); flex: 1; min-width: 220px; }
    .answer-box__text strong { color: var(--text); }

    .food-section { padding: 40px 0; border-bottom: 1.5px solid var(--border); }
    .section-title { font-family: 'DM Serif Display', serif; font-size: clamp(20px, 2.5vw, 26px); font-weight: 400; color: var(--text); margin-bottom: 20px; letter-spacing: -0.3px; }
    .body-text { font-size: 16px; color: var(--text); line-height: 1.8; }
    .body-text p { margin-bottom: 14px; }
    .body-text p:last-child { margin-bottom: 0; }

    .macro-wrap { overflow-x: auto; }
    .macro-table { width: 100%; border-collapse: collapse; border: 1.5px solid var(--border); }
    .macro-table th { padding: 12px 16px; text-align: left; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); background: var(--bg2); border-bottom: 1.5px solid var(--border); }
    .macro-table td { padding: 12px 16px; font-size: 15px; color: var(--text); border-bottom: 1px solid var(--border); }
    .macro-table td:first-child { font-weight: 600; }
    .macro-table tr:last-child td { border-bottom: none; }
    .macro-table td.num { text-align: right; font-variant-numeric: tabular-nums; }
    .macro-table th.num { text-align: right; }

    .bd-list { display: flex; flex-direction: column; gap: 0; border: 1.5px solid var(--border); }
    .bd-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 18px; border-bottom: 1px solid var(--border); background: var(--white); }
    .bd-row:last-child { border-bottom: none; }
    .bd-row__name { font-size: 15px; color: var(--text); }
    .bd-row__name small { display: block; color: var(--muted); font-size: 12px; }
    .bd-row__cal { font-size: 15px; font-weight: 600; color: var(--text); font-variant-numeric: tabular-nums; flex-shrink: 0; }

    .portion-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .portion-card { background: var(--white); border: 1.5px solid var(--border); padding: 18px 16px; text-align: center; }
    .portion-card__cal { font-family: 'DM Serif Display', serif; font-size: 30px; color: var(--accent); line-height: 1; margin-bottom: 8px; }
    .portion-card__cal small { font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }
    .portion-card__label { font-size: 13px; color: var(--muted); line-height: 1.4; }

    .tips-list { list-style: none; }
    .tips-list li { font-size: 15px; color: var(--text); line-height: 1.6; padding: 11px 0 11px 28px; border-bottom: 1px solid var(--border); position: relative; }
    .tips-list li:last-child { border-bottom: none; }
    .tips-list li::before { content: '+'; position: absolute; left: 0; top: 11px; color: var(--good); font-weight: 700; }

    .faq-item { border-bottom: 1.5px solid var(--border); padding: 20px 0; }
    .faq-item:last-child { border-bottom: none; }
    .faq-item__q { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
    .faq-item__a { font-size: 15px; color: var(--muted); line-height: 1.7; }

    .deep-link { display: block; background: var(--bg2); border: 1.5px solid var(--border); border-left: 4px solid var(--accent); padding: 18px 22px; margin-top: 8px; }
    .deep-link__label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
    .deep-link__text { font-size: 15px; color: var(--text); font-weight: 600; }
    .deep-link:hover .deep-link__text { color: var(--accent); }

    .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .related-card { background: var(--white); border: 1.5px solid var(--border); padding: 18px 16px; transition: box-shadow 0.2s; }
    .related-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
    .related-card__name { font-family: 'DM Serif Display', serif; font-size: 17px; color: var(--text); margin-bottom: 6px; }
    .related-card__cal { font-size: 13px; color: var(--muted); }
    .related-card__cal b { color: var(--accent); }

    .cta-bar { background: var(--text); padding: 56px 24px; text-align: center; margin-top: 64px; }
    .cta-bar__title { font-family: 'DM Serif Display', serif; font-size: clamp(20px, 3vw, 30px); color: var(--white); margin-bottom: 22px; font-weight: 400; }
    .cta-bar__btn { display: inline-block; background: var(--accent); color: var(--white); font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 36px; transition: background 0.2s; }
    .cta-bar__btn:hover { background: var(--accent2); }

    .disclaimer { font-size: 12px; color: var(--muted); line-height: 1.6; padding: 28px 0 0; }

    .site-footer { background: var(--text); color: rgba(255,255,255,0.45); padding: 48px 24px; text-align: center; }
    .footer-logo { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--white); margin-bottom: 10px; }
    .footer-logo span { color: var(--accent); }
    .footer-tag { font-size: 13px; margin-bottom: 20px; }
    .footer-links { display: flex; gap: 28px; justify-content: center; list-style: none; flex-wrap: wrap; }
    .footer-links a { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); transition: color 0.2s; }
    .footer-links a:hover { color: var(--white); }
    .footer-backlink { font-size: 12px; color: rgba(255,255,255,0.22); margin-top: 18px; }
    .footer-backlink a { color: rgba(255,255,255,0.22); transition: color 0.2s; }
    .footer-backlink a:hover { color: rgba(255,255,255,0.5); }

    @media (max-width: 640px) {
      .site-nav { display: none; } .nav-toggle { display: flex; }
      .site-nav.is-open { display: block; position: fixed; top: var(--header-h); left: 0; right: 0; background: var(--text); padding: 20px 24px; z-index: 99; border-top: 1px solid rgba(255,255,255,0.1); }
      .site-nav.is-open .nav-list { flex-direction: column; align-items: flex-start; gap: 14px; }
      .site-nav.is-open .nav-dropdown { position: static; opacity: 1; pointer-events: all; background: transparent; border: none; padding: 6px 0 0 16px; }
      .site-nav.is-open .has-dropdown::after { display: none; }
      .portion-grid, .related-grid { grid-template-columns: 1fr; }
      .answer-box { gap: 18px; margin: 24px 0 32px; }
      .answer-box__num { font-size: 58px; }
      .food-section { padding: 32px 0; }
      .page { padding: 0 16px; }
    }
    @media (min-width: 641px) and (max-width: 760px) {
      .related-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>`;
}

// ---------- leaf page ----------

function leafSchema(food, url) {
  const graph = [
    {
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url: url,
      name: 'How Many Calories in ' + food.name + '?',
      description: food.metaDescription,
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
      mainEntity: food.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@type': 'MenuItem',
      '@id': url + '#item',
      name: food.name,
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

function buildLeaf(food) {
  const url = BASE + '/foods/' + food.slug + '.html';
  const title = food.name.replace(/\s*\([^)]*\)/g, '') + ' Calories | Rice and Protein';

  const breakdown = (food.components || []).map(c =>
    `        <div class="bd-row"><div class="bd-row__name">${esc(c.name)}<small>${esc(String(c.grams))}g</small></div><div class="bd-row__cal">${c.calories} kcal</div></div>`
  ).join('\n');

  const portions = (food.portions || []).map(p =>
    `        <div class="portion-card"><div class="portion-card__cal">${p.calories}<small> kcal</small></div><div class="portion-card__label">${esc(p.label)}</div></div>`
  ).join('\n');

  const variants = (food.variants || []).map(v =>
    `            <tr><td>${esc(v.name)}</td><td class="num">${v.calories} kcal</td><td>${esc(v.note || '')}</td></tr>`
  ).join('\n');

  const realTalk = food.realTalk.map(p => `        <p>${esc(p)}</p>`).join('\n');
  const lighter = food.lighter.map(t => `        <li>${esc(t)}</li>`).join('\n');
  const faqs = food.faq.map(f =>
    `      <div class="faq-item"><div class="faq-item__q">${esc(f.q)}</div><div class="faq-item__a">${esc(f.a)}</div></div>`
  ).join('\n');

  // Related foods: curated list first, then auto-fill from same-category
  // siblings (the next few, wrapping around) so every food links to and is
  // linked from its neighbours. Guarantees no food is left with only the hub
  // link as an internal inbound link.
  const catFoods = (byCategory()[food.category] || []);
  const selfIdx = catFoods.findIndex(f => f.slug === food.slug);
  const ringSlugs = [];
  for (let i = 1; i <= 4 && catFoods.length > 1; i++) {
    ringSlugs.push(catFoods[(selfIdx + i) % catFoods.length].slug);
  }
  const relSlugs = [];
  for (const s of [...(food.related || []), ...ringSlugs]) {
    if (s !== food.slug && bySlug[s] && !relSlugs.includes(s)) relSlugs.push(s);
  }
  const related = relSlugs.slice(0, 6).map(s => bySlug[s]).map(r =>
    `        <a class="related-card" href="${r.slug}.html"><div class="related-card__name">${esc(r.name)}</div><div class="related-card__cal"><b>${r.calories}</b> kcal per ${esc(r.serving)}</div></a>`
  ).join('\n');

  const deep = food.deepPost
    ? `    <div class="food-section">
      <a class="deep-link" href="../${food.deepPost}">
        <div class="deep-link__label">Go Deeper</div>
        <div class="deep-link__text">${esc(food.deepPostLabel || ('Read the full breakdown: How Many Calories is ' + food.name + '?'))} &rarr;</div>
      </a>
    </div>\n`
    : '';

  const schema = leafSchema(food, url);

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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
${leafStyles()}
</head>
<body>

${header('../')}

  <div class="page">

    <nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="../foods.html">Food Calories</a><span>/</span><a href="${catUrl(food.category)}">${esc(CATEGORIES[food.category] || 'Food Calories')}</a><span>/</span>${esc(food.name)}</nav>

    <div class="food-hero">
      <p class="food-hero__eyebrow"><a href="${catUrl(food.category)}">${esc(CATEGORIES[food.category] || 'Food Calories')}</a></p>
      <h1 class="food-hero__title">How Many Calories in ${esc(food.name)}?</h1>
      <p class="food-hero__summary">${esc(food.summary)}</p>
    </div>

    <div class="answer-box">
      <div class="answer-box__num">${food.calories}<small>kcal / ${esc(food.serving)}</small></div>
      <div class="answer-box__text">${esc(food.answer)}</div>
    </div>

    <div class="food-section">
      <h2 class="section-title">Nutrition facts</h2>
      <div class="macro-wrap">
        <table class="macro-table">
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
      <div class="bd-list">
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
${portions ? `
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
      <div class="macro-wrap">
        <table class="macro-table">
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
${deep}${related ? `
    <div class="food-section">
      <h2 class="section-title">Related foods</h2>
      <div class="related-grid">
${related}
      </div>
      <p style="margin-top:18px; font-size:14px;"><a href="${catUrl(food.category)}" style="color:var(--accent); font-weight:600;">See all ${esc(CATEGORIES[food.category] || 'food')} calories, ranked &rarr;</a></p>
    </div>
` : ''}
    <p class="disclaimer">Calorie and macro figures are estimates for a typical hawker or kopitiam serving. Actual numbers vary by stall, recipe and portion size. Use them as a guide, not gospel.</p>

    <p style="text-align:center; font-size:14px; margin-top:28px; color:var(--muted);">New to all this? <a href="../posts/128kg-to-86kg-my-journey.html" style="color:var(--accent); font-weight:600;">Read how I went from 128kg to 86kg without cutting rice &rarr;</a></p>

  </div>

  <div class="cta-bar">
    <div class="cta-bar__title">Want to know how many calories you actually need?</div>
    <a href="../index.html" class="cta-bar__btn">Use The Calculator</a>
  </div>

${footer('../')}

${NAV_SCRIPT}
<script data-goatcounter="https://riceandprotein.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
<script>(function(){if(!new URLSearchParams(location.search).has('me'))return;fetch('https://riceandprotein.goatcounter.com/counter/TOTAL.json').then(function(r){return r.json()}).then(function(d){var e=document.createElement('p');e.textContent='Total views: '+d.count;e.style.cssText='text-align:center;font-size:12px;color:var(--muted,#767676);margin-top:14px;';(document.querySelector('.site-footer')||document.body).appendChild(e)}).catch(function(){})})();</script>
</body>
</html>
`;
}

// ---------- category pages ----------

function buildCategory(cat) {
  const meta = CAT_PAGES[cat];
  const label = CATEGORIES[cat];
  const items = (byCategory()[cat] || []).slice().sort((a, b) => a.calories - b.calories);
  const url = BASE + '/foods/' + meta.slug + '.html';
  const metaDesc = label + ': calorie counts for all ' + items.length + ' items, ranked lightest to heaviest, with macros and how to eat each one lighter.';

  const cards = items.map(f =>
    `        <a class="food-card" href="${f.slug}.html">
          <div class="food-card__cal">${f.calories}<small> kcal</small></div>
          <div class="food-card__name">${esc(f.name)}</div>
          <div class="food-card__serving">per ${esc(f.serving)}</div>
        </a>`
  ).join('\n');

  const chips = Object.keys(CATEGORIES)
    .filter(c => c !== cat && (byCategory()[c] || []).length)
    .map(c => `        <a class="cat-chip" href="${CAT_PAGES[c].slug}.html">${esc(CATEGORIES[c])}</a>`)
    .join('\n');

  const intro = meta.intro.map(p => `      <p>${esc(p)}</p>`).join('\n');

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url + '#webpage',
    url: url,
    name: meta.title,
    description: metaDesc,
    inLanguage: 'en',
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
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(metaDesc)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(metaDesc)}">
  <meta property="og:image" content="${BASE}/images/og-image.jpg">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Rice and Protein">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.title)}">
  <meta name="twitter:description" content="${esc(metaDesc)}">
  <meta name="twitter:image" content="${BASE}/images/og-image.jpg">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
${schema}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
${leafStyles()}
  <style>
    .food-hero__title span { color: var(--accent); }
    .food-hero__intro { font-size: 16px; color: var(--text); line-height: 1.8; max-width: 640px; margin-top: 18px; }
    .food-hero__intro p { margin-bottom: 12px; }
    .food-hero__intro p:last-child { margin-bottom: 0; }
    .food-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 36px 0; }
    .food-card { background: var(--white); border: 1.5px solid var(--border); padding: 22px 20px; display: flex; flex-direction: column; gap: 6px; transition: box-shadow 0.2s, transform 0.2s; }
    .food-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
    .food-card__cal { font-family: 'DM Serif Display', serif; font-size: 32px; color: var(--accent); line-height: 1; }
    .food-card__cal small { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
    .food-card__name { font-size: 16px; font-weight: 600; color: var(--text); margin-top: 4px; }
    .food-card__serving { font-size: 12px; color: var(--muted); }
    .cat-chips { display: flex; flex-wrap: wrap; gap: 10px; }
    .cat-chip { font-size: 13px; font-weight: 600; color: var(--text); background: var(--white); border: 1.5px solid var(--border); padding: 9px 16px; transition: border-color 0.2s, color 0.2s; }
    .cat-chip:hover { border-color: var(--accent); color: var(--accent); }
    @media (max-width: 640px) { .food-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
</head>
<body>

${header('../')}

  <div class="page">

    <nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="../foods.html">Food Calories</a><span>/</span>${esc(label)}</nav>

    <div class="food-hero">
      <p class="food-hero__eyebrow">Food Calories</p>
      <h1 class="food-hero__title">${esc(label)} <span>Calories</span></h1>
      <div class="food-hero__intro">
${intro}
      </div>
    </div>

    <div class="food-grid">
${cards}
    </div>

    <div class="food-section">
      <h2 class="section-title">Browse other categories</h2>
      <div class="cat-chips">
${chips}
        <a class="cat-chip" href="../foods.html">All foods &rarr;</a>
      </div>
    </div>

    <p class="disclaimer">Calorie and macro figures are estimates for a typical hawker or kopitiam serving. Actual numbers vary by stall, recipe and portion size. Use them as a guide, not gospel.</p>

  </div>

  <div class="cta-bar">
    <div class="cta-bar__title">Want to know how many calories you actually need?</div>
    <a href="../index.html" class="cta-bar__btn">Use The Calculator</a>
  </div>

${footer('../')}

${NAV_SCRIPT}
<script data-goatcounter="https://riceandprotein.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
`;
}

// ---------- hub page ----------

function buildHub() {
  const groups = byCategory();
  const sections = Object.keys(CATEGORIES).map(cat => {
    const items = groups[cat];
    if (!items || !items.length) return '';
    const cards = items.map(f =>
      `        <a class="food-card" href="foods/${f.slug}.html">
          <div class="food-card__cal">${f.calories}<small> kcal</small></div>
          <div class="food-card__name">${esc(f.name)}</div>
          <div class="food-card__serving">per ${esc(f.serving)}</div>
        </a>`
    ).join('\n');
    return `      <h2 class="cat-title"><a href="foods/${CAT_PAGES[cat].slug}.html">${esc(CATEGORIES[cat])} &rarr;</a></h2>
      <div class="food-grid">
${cards}
      </div>`;
  }).filter(Boolean).join('\n\n');

  const itemListSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': BASE + '/foods.html#webpage',
    url: BASE + '/foods.html',
    name: 'Malaysian Food Calories | Rice and Protein',
    description: 'Calorie counts for popular Malaysian hawker and kopitiam food. Nasi lemak, char kuey teow, roti canai, teh tarik and more.',
    inLanguage: 'en',
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
      itemListElement: FOODS.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: f.name,
        url: BASE + '/foods/' + f.slug + '.html'
      }))
    }
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Malaysian Food Calories | Rice and Protein</title>
  <meta name="description" content="Calorie counts for popular Malaysian food. Nasi lemak, char kuey teow, roti canai, teh tarik and more, with macros and how to eat them lighter.">
  <link rel="canonical" href="${BASE}/foods.html">
  <meta property="og:title" content="Malaysian Food Calories | Rice and Protein">
  <meta property="og:description" content="Calorie counts for popular Malaysian hawker and kopitiam food, with macros and lighter swaps.">
  <meta property="og:image" content="${BASE}/images/og-image.jpg">
  <meta property="og:url" content="${BASE}/foods.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Rice and Protein">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Malaysian Food Calories | Rice and Protein">
  <meta name="twitter:description" content="Calorie counts for popular Malaysian food, with macros and lighter swaps.">
  <meta name="twitter:image" content="${BASE}/images/og-image.jpg">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
${itemListSchema}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
  <style>
    :root { --bg:#FAF8F4; --bg2:#F2F0EB; --accent:#C8622A; --accent2:#A84E22; --text:#1C1C1A; --muted:#6B6B67; --border:#E8E2D9; --white:#ffffff; --max:1000px; --header-h:56px; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); font-size: 16px; line-height: 1.65; -webkit-font-smoothing: antialiased; display: flex; flex-direction: column; min-height: 100vh; }
    a { text-decoration: none; color: inherit; }
    button { font-family: 'DM Sans', sans-serif; cursor: pointer; }

    .site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: var(--header-h); background: var(--text); display: flex; align-items: center; }
    .header-inner { width: 100%; max-width: var(--max); margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
    .site-logo { font-family: 'DM Serif Display', serif; font-size: 18px; font-weight: 400; color: var(--white); letter-spacing: -0.2px; }
    .site-logo span { color: var(--accent); }
    .site-nav { display: flex; align-items: center; }
    .nav-list { display: flex; align-items: center; gap: 28px; list-style: none; }
    .nav-list > li > a { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.7); transition: color 0.2s; }
    .nav-list > li > a:hover { color: var(--white); }
    .has-dropdown { position: relative; }
    .has-dropdown::after { content: ''; position: absolute; top: 100%; left: 0; right: 0; height: 10px; }
    .nav-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: var(--text); border: 1px solid rgba(255,255,255,0.12); min-width: 210px; padding: 8px 0; list-style: none; opacity: 0; pointer-events: none; transition: opacity 0.18s ease; z-index: 200; }
    .has-dropdown:hover .nav-dropdown, .has-dropdown:focus-within .nav-dropdown { opacity: 1; pointer-events: all; }
    .nav-dropdown li a { display: block; padding: 10px 20px; font-size: 13px; color: rgba(255,255,255,0.65); transition: color 0.15s, background 0.15s; font-weight: 400; }
    .nav-dropdown li a:hover { color: var(--white); background: rgba(255,255,255,0.07); }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; cursor: pointer; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: var(--white); }

    .page { max-width: var(--max); margin: 0 auto; padding: calc(var(--header-h) + 72px) 24px 80px; flex: 1; width: 100%; }
    .page-hero { margin-bottom: 48px; }
    .page-title { font-family: 'DM Serif Display', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.05; color: var(--text); margin-bottom: 12px; letter-spacing: -0.5px; }
    .page-title span { color: var(--accent); }
    .page-sub { font-size: 17px; color: var(--muted); line-height: 1.65; max-width: 560px; }

    .cat-title { font-family: 'DM Serif Display', serif; font-size: 24px; font-weight: 400; color: var(--text); margin: 0 0 18px; padding-bottom: 10px; border-bottom: 1.5px solid var(--border); }
    .cat-title a { transition: color 0.2s; }
    .cat-title a:hover { color: var(--accent); }
    .food-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 44px; }
    .food-card { background: var(--white); border: 1.5px solid var(--border); padding: 22px 20px; display: flex; flex-direction: column; gap: 6px; transition: box-shadow 0.2s, transform 0.2s; }
    .food-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
    .food-card__cal { font-family: 'DM Serif Display', serif; font-size: 34px; color: var(--accent); line-height: 1; }
    .food-card__cal small { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
    .food-card__name { font-size: 16px; font-weight: 600; color: var(--text); margin-top: 4px; }
    .food-card__serving { font-size: 12px; color: var(--muted); }

    .site-footer { background: var(--text); color: rgba(255,255,255,0.45); padding: 48px 24px; text-align: center; }
    .footer-logo { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--white); margin-bottom: 10px; }
    .footer-logo span { color: var(--accent); }
    .footer-tag { font-size: 13px; margin-bottom: 20px; }
    .footer-links { display: flex; gap: 28px; justify-content: center; list-style: none; flex-wrap: wrap; }
    .footer-links a { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); transition: color 0.2s; }
    .footer-links a:hover { color: var(--white); }
    .footer-backlink { font-size: 12px; color: rgba(255,255,255,0.22); margin-top: 18px; }
    .footer-backlink a { color: rgba(255,255,255,0.22); transition: color 0.2s; }
    .footer-backlink a:hover { color: rgba(255,255,255,0.5); }

    @media (max-width: 900px) { .food-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 640px) {
      .site-nav { display: none; } .nav-toggle { display: flex; }
      .site-nav.is-open { display: block; position: fixed; top: var(--header-h); left: 0; right: 0; background: var(--text); padding: 20px 24px; z-index: 99; border-top: 1px solid rgba(255,255,255,0.1); }
      .site-nav.is-open .nav-list { flex-direction: column; align-items: flex-start; gap: 14px; }
      .site-nav.is-open .nav-dropdown { position: static; opacity: 1; pointer-events: all; background: transparent; border: none; padding: 6px 0 0 16px; }
      .site-nav.is-open .has-dropdown::after { display: none; }
      .food-grid { grid-template-columns: repeat(2, 1fr); }
      .page { padding: calc(var(--header-h) + 40px) 16px 60px; }
    }
  </style>
</head>
<body>

${header('')}

  <div class="page">
    <div class="page-hero">
      <h1 class="page-title">Malaysian Food <span>Calories</span></h1>
      <p class="page-sub">How many calories are really in your favourite hawker and kopitiam food. Honest numbers, the macros, and how to eat it lighter without giving it up.</p>
    </div>

${sections}

      <section style="margin-top:24px; padding-top:36px; border-top:1.5px solid var(--border);">
        <h2 class="cat-title">Keep reading</h2>
        <div class="food-grid">
          <a class="food-card" href="posts/dim-sum-calories.html">
            <div class="food-card__cal" style="font-size:13px; letter-spacing:1px; text-transform:uppercase; color:var(--accent);">Guide</div>
            <div class="food-card__name">How many calories in dim sum?</div>
            <div class="food-card__serving">What to order and what to skip at yum cha</div>
          </a>
          <a class="food-card" href="posts/economy-rice-calories.html">
            <div class="food-card__cal" style="font-size:13px; letter-spacing:1px; text-transform:uppercase; color:var(--accent);">Guide</div>
            <div class="food-card__name">Nasi campur: 500 vs 900 kcal plate</div>
            <div class="food-card__serving">Build a lean economy rice plate from the same stall</div>
          </a>
          <a class="food-card" href="posts/128kg-to-86kg-my-journey.html">
            <div class="food-card__cal" style="font-size:13px; letter-spacing:1px; text-transform:uppercase; color:var(--accent);">Story</div>
            <div class="food-card__name">128kg to 86kg: my journey</div>
            <div class="food-card__serving">How I lost the weight without cutting the food I love</div>
          </a>
          <a class="food-card" href="diets.html">
            <div class="food-card__cal" style="font-size:13px; letter-spacing:1px; text-transform:uppercase; color:var(--accent);">Diets</div>
            <div class="food-card__name">Which diet actually works?</div>
            <div class="food-card__serving">Keto, IF, CICO, volume eating, compared honestly</div>
          </a>
        </div>
      </section>
  </div>

${footer('')}

${NAV_SCRIPT}
<script data-goatcounter="https://riceandprotein.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
<script>(function(){if(!new URLSearchParams(location.search).has('me'))return;fetch('https://riceandprotein.goatcounter.com/counter/TOTAL.json').then(function(r){return r.json()}).then(function(d){var e=document.createElement('p');e.textContent='Total views: '+d.count;e.style.cssText='text-align:center;font-size:12px;color:var(--muted,#767676);margin-top:14px;';(document.querySelector('.site-footer')||document.body).appendChild(e)}).catch(function(){})})();</script>
</body>
</html>
`;
}

// ---------- sitemap ----------

function updateSitemap() {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  // Remove any previously generated /foods block (between markers) and stray /foods urls.
  xml = xml.replace(/\n*  <!-- foods:start -->[\s\S]*?<!-- foods:end -->\n*/g, '\n');

  const urls = [];
  urls.push(`  <url>\n    <loc>${BASE}/foods.html</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  for (const cat of Object.keys(CATEGORIES)) {
    if (!CAT_PAGES[cat] || !(byCategory()[cat] || []).length) continue;
    urls.push(`  <url>\n    <loc>${BASE}/foods/${CAT_PAGES[cat].slug}.html</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`);
  }
  for (const f of FOODS) {
    urls.push(`  <url>\n    <loc>${BASE}/foods/${f.slug}.html</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  const block = `\n  <!-- foods:start -->\n${urls.join('\n')}\n  <!-- foods:end -->\n`;
  xml = xml.replace(/\n*<\/urlset>\s*$/, block + '</urlset>\n');
  fs.writeFileSync(SITEMAP, xml);
}

// ---------- run ----------

function main() {
  if (!fs.existsSync(FOODS_DIR)) fs.mkdirSync(FOODS_DIR, { recursive: true });

  let count = 0;
  for (const food of FOODS) {
    const out = path.join(FOODS_DIR, food.slug + '.html');
    fs.writeFileSync(out, buildLeaf(food));
    count++;
    console.log('  wrote foods/' + food.slug + '.html');
  }

  let catCount = 0;
  for (const cat of Object.keys(CATEGORIES)) {
    if (!CAT_PAGES[cat] || !(byCategory()[cat] || []).length) continue;
    fs.writeFileSync(path.join(FOODS_DIR, CAT_PAGES[cat].slug + '.html'), buildCategory(cat));
    catCount++;
    console.log('  wrote foods/' + CAT_PAGES[cat].slug + '.html (category)');
  }

  fs.writeFileSync(HUB, buildHub());
  console.log('  wrote foods.html (hub, ' + count + ' foods, ' + catCount + ' categories)');

  updateSitemap();
  console.log('  updated sitemap.xml');

  console.log('\nDone. ' + count + ' food pages generated.');
}

main();
