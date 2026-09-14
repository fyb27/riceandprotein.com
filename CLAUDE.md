# CLAUDE.md , riceandprotein.com

*Read this at the start of every session. No exceptions.*

\---

## What this site is

riceandprotein.com is an Asian food calorie database plus a free TDEE calculator, run by a 36-year-old Malaysian guy who went from 128kg to 86kg (and now maintains around 92kg). No gimmicks, no supplements, no keto. Just calories in vs calories out , made sustainable through volume eating.

The whole point: you don't have to starve. You just have to be smart about what you eat.

**Audience:** Someone in Malaysia, Singapore, Indonesia, Thailand, Vietnam, the Philippines, Hong Kong, Japan or Korea who just typed "[dish] calories" into Google. Give them the number first, then the honest context.

**2026-09-14 pivot:** the blog was deleted (17 posts made 7 impressions in 3 months; the food pages carry the whole site). The site is now a food calorie hub for Asia. Do not propose new blog posts. Growth = more countries and dishes in `/foods/`, plus backlinks and indexing.

\---

## Tech stack

* Pure HTML + CSS + vanilla JS. No frameworks. No build tools. No CMS.
* Hosted on GitHub Pages (free, static)
* Repo: github.com/fyb27/riceandprotein.com
* Local folder: Z:/sites/riceandprotein/
* Domain: riceandprotein.com (registered on Hostinger → GitHub Pages)
* Fonts: Inter via Google Fonts (single family, weights 400 to 700)
* Design system: `css/site.css` (Apple style: white ground, #f5f5f7 cards, 18px radius, hairlines, blur header, pill buttons). Every page links it; page specific rules go in a small inline `<style>` after it.
* Generated pages: `scripts/generate-foods.js` builds `/foods/` from `data/foods.json`. Never hand edit a file in `foods/` or `foods.html`, `sitemap.xml` foods block, or `llms.txt`; edit the data or the generator and rerun.

\---

## File structure

```
riceandprotein.com/
├── index.html            <- TDEE calculator (the homepage IS the calculator page)
├── foods.html            <- GENERATED master hub (countries, categories, A to Z)
├── about.html            <- author story (128kg to 86kg), E-E-A-T anchor
├── contact.html
├── diets.html + diets/   <- 6 diet guides
├── posts/                <- 3 meta-refresh stubs only (old calorie posts -> foods/). Blog is gone.
├── llms.txt              <- GENERATED
├── sitemap.xml           <- core block hand kept; foods block GENERATED
├── css/site.css          <- design system
├── data/foods.json       <- the database (record shape: data/_batch/SPEC.md)
├── data/_batch/          <- country batch JSON + SPEC.md + sources.md files
├── scripts/generate-foods.js     <- builds foods/, foods.html, sitemap foods block, llms.txt
├── scripts/add-region-batch.js   <- QA gate + merge for data/_batch/<cc>-N.json
└── foods/                <- GENERATED: <slug>.html leaves, <category>.html hubs, <country>.html hubs
```

\---

## Design system

```css
--bg:      #ffffff
--bg2:     #f5f5f7   /* cards */
--text:    #1d1d1f
--muted:   #6e6e73
--hair:    #d2d2d7   /* hairlines */
--accent:  #d0642a   /* burnt orange, links + primary pill button + eyebrows ONLY */
--accent2: #b8531f
--good:    #1d9a4f
--r:       18px      /* card radius */
--header-h: 48px
```

Never hardcode colours. Always use CSS variables from `css/site.css`. Orange is an accent, not a background. No serif fonts, no dark header.

\---

## Content model

Everything lives in `data/foods.json`. One record = one page `foods/<slug>.html`.
Record shape, required arrays and the voice rules for new records: `data/_batch/SPEC.md`.

**Categories** (record `category`, one per food):

|Key|Hub page|
|-|-|
|rice|foods/rice-meals.html|
|noodles|foods/noodles.html|
|dimsum|foods/dim-sum.html|
|mamak|foods/mamak-and-bread.html|
|soup|foods/soups.html|
|lauk|foods/meat-grills-and-lauk.html|
|veg|foods/vegetables-and-sides.html|
|snacks|foods/snacks-and-kuih.html|
|western|foods/western-and-burgers.html|
|drinks|foods/drinks.html|
|dessert|foods/desserts.html|

**Regions** (record `region`, an array; a record with no region is Malaysian):
my Malaysia, sg Singapore, id Indonesia, th Thailand, vn Vietnam, ph Philippines, hk Hong Kong, jp Japan, kr Korea.
Each region gets `foods/<country>.html` once at least one food carries the code. Shared dishes carry several codes (`["my","sg"]`).
The `REGION_PAGES` map in the generator holds each country's intro, sources and disclaimer context.

**Local language FAQ:** the generator adds a Malay question on my/sg dishes and an Indonesian question on id dishes. Do not add other languages unless the copy can be written honestly.

\---

## Voice

Two registers, and the split matters.

**Malaysian and Singapore dishes:** the owner talking to his friend at the mamak. Blunt but warm, exaggerates for effect, mild swearing, lah/bah/kan/bro at most 2 or 3 per page, self deprecating about the 128kg days, real numbers always.

**Every other country, plus the calculator, About, Contact and the diet guides:** neutral broad audience English. Same directness, same real numbers, same "here is the thing nobody tells you", but no Malaysian slang. Use that country's own food vocabulary (warung, cha chaan teng, konbini, pojangmacha).

**Tone test:** does this sound like a person explaining something to a friend, or like a health blog? If it sounds like a health blog, rewrite it.

**Good example:**

> "A bowl of pho is about 420 calories, and most of that is the rice noodles. The broth itself is nearly free. The problem is the plate of fried dough sticks on the side, which is another 300 before you notice."

**Bad example:**

> "Pho is a nutrient-dense Vietnamese soup that can be part of a balanced diet when consumed mindfully."

Never write like the bad example. Ever.

**Hard rules:**

* NEVER use em dashes or en dashes, anywhere, in content or code. The batch QA gate rejects them.
* No fitness influencer language ("fuel your body", "clean eating", "your wellness journey")
* No generic openers ("X is a popular dish in Y")
* Always specific: actual gram amounts, actual calorie numbers, actual prices
* Every paragraph carries at least one number

\---

## The core philosophy (understand this to write good content)

1. Calories in vs calories out. Biology cannot be cheated.
2. The only diet that works is one you can sustain.
3. Fat people like to feel full. Use that. Eat huge volume, low calorie density.
4. Combine with gym, 3x full body per week minimum. PPL if you have time.
5. It's not miserable if the food is actually tasty and filling.

\---

## SEO rules

* The generator owns titles, metas, canonicals, OG, JSON-LD (WebPage, BreadcrumbList, FAQPage, MenuItem with NutritionInformation), sitemap foods block and llms.txt. Fix the generator, not the output.
* Leaf title: `<Name> Calories | Rice and Protein`, under 60 chars (alias dropped automatically if too long).
* Meta descriptions 70 to 158 chars, state the kcal number, conversational.
* Hand pages: unique `<title>`, one `<h1>`, canonical, OG tags, JSON-LD kept intact when restyling.
* Homepage is THE TDEE calculator page. Never build a separate /tdee-calculator.html.
* `foods.html` earns the most impressions on the site. Keep its full A to Z directory; that anchor text is the point.
* Numbers are health adjacent. Source kcal from national tables where they exist and record the source on the record (`source` field). Keep the disclaimer on every page.
* The ceiling is authority, not on-page: 110 of 289 pages were not indexed in July 2026. Backlinks, GSC indexing requests and Bing IndexNow move that. More templated pages alone do not.

\---

## Adding foods

1. Write `data/_batch/<cc>-N.json` (max 15 records per file) following `data/_batch/SPEC.md`, plus `<cc>-sources.md`.
2. `node scripts/add-region-batch.js <cc>` (QA gate: schema, macro and component sums, meta length, dash scan, related slugs, banned phrases). Fix errors, rerun.
3. `node scripts/generate-foods.js` (rebuilds foods/, foods.html, sitemap foods block, llms.txt).
4. Screenshots of a new leaf and the country hub, show the owner, then commit and push after approval.
5. Owner requests indexing for the new country hub in GSC.

Adding a country: add it to `REGION_PAGES` in the generator (slug, label, title, intro, sources, ctx, lang) and to `VALID` in add-region-batch.js. Hand pages carry a hardcoded country list in their nav; sync it with the generated header after regenerating.

\---

## Images

* Currently one og-image.jpg for the whole site and no images on food pages. Not a priority; a page that answers "how many calories" does not need a photo to rank.
* If images are added: AI generated flat editorial illustrations, always with descriptive alt text.

\---

## Rules for Claude

* Never add unrequested features
* Never use em dashes anywhere
* Match existing code style exactly
* Always use CSS variables from `css/site.css`, never hardcode colours
* Never hand edit generated files (`foods/`, `foods.html`, `llms.txt`, sitemap foods block)
* Do not propose blog posts. The blog is gone on purpose.
* Show a rendered sample (screenshot) before committing or pushing anything
* Commit message format: `add foods: sg batch` / `seo: meta tags` / `fix: mobile nav` / `design: site.css`
* Ask before deleting any file
* When unsure, ask
