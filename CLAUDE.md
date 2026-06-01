# CLAUDE.md — riceandprotein.com

*Read this at the start of every session. No exceptions.*

\---

## What this site is

riceandprotein.com is a weight loss and recipe blog by a 36-year-old Malaysian guy who went from 120kg to 80kg. No gimmicks, no supplements, no keto. Just calories in vs calories out — made sustainable through volume eating.

The whole point: you don't have to starve. You just have to be smart about what you eat.

**Audience:** Clueless about dieting. Probably a 30-something Asian guy (or woman) who has tried keto, gave up, is tired, slightly overweight, searching for recipes and stumbled onto this site. Treat them like your friend at the mamak who just asked you for real advice.

\---

## Tech stack

* Pure HTML + CSS + vanilla JS. No frameworks. No build tools. No CMS.
* Hosted on GitHub Pages (free, static)
* Repo: github.com/fyb27/riceandprotein.com
* Local folder: Z:/sites/riceandprotein/
* Domain: riceandprotein.com (registered on Hostinger → GitHub Pages)
* Fonts: Playfair Display (headings) + DM Sans (body) via Google Fonts
* Same structure as bestsabah.com — forked and reskinned

\---

## File structure

```
riceandprotein.com/
├── index.html
├── blog.html
├── about.html
├── contact.html
├── CLAUDE.md
├── css/
│   ├── style.css       ← site-wide styles
│   └── post.css        ← post page only
├── js/
│   ├── main.js         ← mobile nav toggle
│   └── post.js         ← progress bar, TOC, back to top
└── posts/
    └── (empty for now)
```

\---

## Design system

```css
--bg:      #FAFAF8
--bg2:     #F2F0EB
--dark:    #1C1C1A
--text:    #1C1C1A
--muted:   #6B6860
--border:  #E2DDD6
--accent:  #C4622D    /\* burnt orange — main brand colour \*/
--accent2: #A84E22    /\* darker orange for hover states \*/
--white:   #ffffff
--max:     1160px
--header-h: 64px
```

Use `--accent` and `--accent2` everywhere bestsabah.com uses `--green` and `--green2`. Never hardcode colours. Always use CSS variables.

\---

## Content categories

|Label|slug|
|-|-|
|Recipes|recipes|
|Calorie Counts|calories|
|Diet Talk|diet|
|Gym \& Fitness|gym|
|Mindset|mindset|
|My Journey|journey|

\---

## Post template structure

Same as bestsabah.com:

```
1. <div class="reading-progress"></div>
2. <header class="site-header">
3. <div class="post"> (flex row)
   a. <aside class="post-share"> — X, Facebook, copy link
   b. <main class="post-main"> — date, title, badges, intro, hero image, body
   c. <aside class="post-sidebar"> — TOC sticky at 35vh
4. <section class="post-related"> — 3 related cards
5. <footer class="site-footer">
6. <button id="back-to-top">
```

CSS: `../css/style.css` + `../css/post.css`
JS: `../js/post.js`

Post file naming: `posts/\[slug].html` — lowercase, hyphens only.

\---

## Voice — this is the most important section

Write like the owner talks to his friend at the mamak. Casual, direct, slightly funny, real. Malaysian flavour.

**Personality:**

* Blunt but warm
* Likes to exaggerate for effect ("bro that's MORE than 1kg of food per sitting")
* Swears occasionally — "damn", "wtf", "shiok" — keep it mild, not every sentence
* Uses lah, bah, kan, bro, liao, oso naturally — not forced, max 2-3 per post
* Educational but never preachy
* Self-deprecating about his own fat journey ("yes i was 120kg, don't judge")
* Real numbers always: actual calories, actual weights, actual prices

**Tone test — ask yourself:** does this sound like a guy explaining something to his friend at mamak, or does it sound like a health blog? If it sounds like a health blog, rewrite it.

**Good example:**

> "Bro seriously, it's not that hard. You just have to eat a lot of the RIGHT things. Imagine this: 300g chicken breast, 250g rice, a pile of vegetables. That's more than 1kg of food per sitting. You think you can finish all that? Try lah. I guarantee you'll go to sleep full and happy."

**Bad example:**

> "Volume eating is a sustainable dietary approach that prioritizes high-quantity, nutrient-dense foods to promote satiety while maintaining a caloric deficit."

Never write like the bad example. Ever.

**Hard rules:**

* NEVER use em dashes — anywhere, ever, in content or code
* No fitness influencer language ("fuel your body", "clean eating", "your wellness journey")
* No generic openers ("Losing weight is hard...")
* Always specific — actual gram amounts, actual calorie numbers, actual meal times
* Click-baity headlines are fine and encouraged ("I ate KFC every week and still lost weight")

\---

## The core philosophy (understand this to write good content)

1. Calories in vs calories out. Biology cannot be cheated.
2. The only diet that works is one you can sustain.
3. Fat people like to feel full. Use that. Eat huge volume, low calorie density.
4. Combine with gym — 3x full body per week minimum. PPL if you have time.
5. It's not miserable if the food is actually tasty and filling.

\---

## SEO rules

* Unique `<title>` per page — format: `Post Title | Rice and Protein`
* `<meta name="description">` — max 155 characters, conversational tone, no keyword stuffing
* Open Graph tags on every post:

```html
  <meta property="og:title" content="">
  <meta property="og:description" content="">
  <meta property="og:image" content="">
  <meta property="og:url" content="">
  <meta property="og:type" content="article">
  ```

* One `<h1>` per page only
* Alt text on every image
* Descriptive slugs: `posts/how-many-calories-bah-kut-teh.html`
* Update `sitemap.xml` when new pages are added
* `<link rel="canonical">` on every page

\---

## Planned posts

**Published:** none yet

**In pipeline:**

1. The only diet that actually worked for me (intro/philosophy post)
2. My go-to 1kg meal recipe (chicken breast, rice, vegetables)
3. How to brine chicken — and does it actually make a difference?
4. How many calories is bah kut teh actually?
5. I ate KFC regularly and still lost the weight
6. Motivation vs discipline — motivation is a lie
7. Why keto sucks in Asia
8. 120kg to 80kg — my full journey

\---

## Images

* AI-generated cartoon illustrations (ChatGPT/DALL-E)
* Style: flat, clean cartoon — think simple editorial illustration
* Owner drops image files into the images folder manually
* Always reference them in posts with descriptive alt text

\---

## When adding a new post

1. Create `posts/\[slug].html` using post template
2. Add card to `blog.html` posts grid with correct `data-cat`
3. Add card to `index.html` Latest Stories section
4. Update `sitemap.xml`
5. Commit and push

\---

## Rules for Claude

* Never add unrequested features
* Never use em dashes anywhere
* Match existing code style exactly
* Always use CSS variables, never hardcode colours
* When writing posts, follow the voice profile — mamak friend, not health blogger
* Commit message format: `add post: kfc-weight-loss` / `seo: meta tags` / `fix: mobile nav`
* Ask before deleting any file
* When unsure, ask

