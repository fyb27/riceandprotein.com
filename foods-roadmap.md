# Foods Database Roadmap

Deduped master plan for the `/foods/` programmatic SEO database.
Source data: `data/foods.json`. Generator: `node scripts/generate-foods.js`.

**Status as of 2026-06-10: 137 parent pages built. BUILD COMPLETE.**
By category: noodles 33, lauk 26, snacks/kuih 23, rice 17, soup 12, drinks 8,
veg 7, mamak 6, dessert 5. Target was ~130 distinct parents.

> The real source of truth for what is built is `data/foods.json`. Every `[x]`
> below corresponds to a real generated page. Only a couple of deliberately
> deferred minor items remain `[ ]` (flagged to fold into existing pages).

## How this works

The rule:
- **Parent dish = its own page** (distinct dish, real search volume).
- **Variant = a row in the parent's variant table**, not a separate page.
- **Numbers are researched** before a dish is marked built. Variant deltas are
  estimated from the parent.

The final 76-dish batch was built in one pass with a multi-agent workflow:
`scripts/build-foods-workflow.js` (research stage triangulates numbers, write
stage produces voice content on locked numbers) then
`scripts/integrate-foods.js` (QA gate: em-dash scan, related-slug resolution,
component-sum sanity) before merging into `data/foods.json`.

To add more dishes later: edit the `NEW` array in `build-foods-workflow.js`,
re-run `Workflow({scriptPath})`, then integrate + generate.

Status key: `[x]` built and live in foods.json, `[ ]` to build.

---

## Rice Meals (17 built)

- [x] Nasi lemak
- [x] Hainanese chicken rice
- [x] Nasi goreng kampung
- [x] Nasi goreng mamak
- [x] Nasi goreng cina
- [x] Nasi kandar
- [x] Nasi briyani
- [x] Nasi kerabu
- [x] Nasi dagang
- [x] Nasi ulam
- [x] Nasi tomato
- [x] Nasi minyak (kenduri)
- [x] Nasi ambeng (Jawa)
- [x] Nasi lemuni
- [x] Nasi ayam penyet
- [x] Claypot chicken rice
- [x] Char siew rice

## Noodles (33 built)

- [x] Char kuey teow
- [x] Mee goreng mamak
- [x] Curry laksa
- [x] Asam laksa (Penang)
- [x] Sarawak laksa
- [x] Laksa Johor
- [x] Laksa Kedah
- [x] Wantan mee
- [x] Wat tan hor
- [x] Mee rebus (Johor)
- [x] Hokkien mee KL (dark fried)
- [x] Hokkien mee Penang (prawn soup)
- [x] Pan mee
- [x] Ipoh hor fun
- [x] Mee kolok / kolo mee (Sarawak)
- [x] Mee siam
- [x] Bee hoon goreng
- [x] Maggi goreng
- [x] Tuaran mee (Sabah)
- [x] Yee mee
- [x] Sabah beef noodles (ngiu chap)
- [x] Mee kari / curry mee
- [x] Mee bandung Muar
- [x] Mee hailam
- [x] Mee jawa
- [x] Mee tomyam
- [x] Mee sup
- [x] Kuey teow soup
- [x] Kuey teow kung fu
- [x] Fish ball noodles
- [x] Hakka mee
- [x] Claypot lou shu fun
- [x] Chee cheong fun

## Mamak & Bread (6 built)

- [x] Roti canai
- [x] French toast (roti bakar)
- [x] Murtabak
- [x] Thosai / tosai
- [x] Vadai
- [x] Idli

## Soups (12 built)

- [x] Bak kut teh
- [x] Sup kambing
- [x] Sup tulang
- [x] Sup ekor
- [x] Sup ayam
- [x] Sup gear box
- [x] Tomyam
- [x] Bubur ayam
- [x] Bubur lambuk
- [x] Yong tau foo (soup)
- [x] Hakka lei cha
- [x] Steamboat / seafood

## Meat, Grills & Lauk (26 built)

- [x] Satay
- [x] Rendang
- [x] Asam pedas
- [x] Masak lemak cili api
- [x] Sambal tumis (base sambal)
- [x] Ayam masak merah
- [x] Daging masak kicap
- [x] Serunding
- [x] Ayam percik
- [x] Ayam bakar
- [x] Daging dendeng
- [x] Daging harimau menangis
- [x] Sambal sotong
- [x] Sambal udang
- [x] Ikan bakar
- [x] Ikan masak lemak
- [x] Ikan patin masak tempoyak
- [x] Gulai
- [x] Kari kepala ikan
- [x] Salted egg crab
- [x] Kam heong crab
- [x] Ketam masak
- [x] Otak-otak
- [x] Keropok lekor
- [x] Nestum chicken
- [x] Tempoyak
- [ ] Sambal telur / ikan bilis (deferred, minor, fold into sambal-tumis)
- [ ] Ikan goreng (kembung, selar, bilis) (deferred, minor)

## Vegetables & Sides (7 built)

- [x] Kangkung belacan
- [x] Sayur lemak
- [x] Kailan ikan masin
- [x] Sawi / broccoli sos tiram
- [x] Taugeh ikan masin
- [x] Tauhu sumbat / tauhu telur
- [x] Ulam-ulaman

## Snacks & Kuih (23 built)

- [x] Pisang goreng
- [x] Karipap
- [x] Popiah
- [x] Apam balik
- [x] Kuih seri muka
- [x] Kuih lapis
- [x] Kuih talam
- [x] Kuih onde-onde
- [x] Kuih koci
- [x] Kuih ketayap
- [x] Kuih cara berlauk
- [x] Kuih bahulu
- [x] Kuih kaswi
- [x] Kuih keria
- [x] Dodol
- [x] Cucur udang
- [x] Cucur badak
- [x] Lok lok
- [x] Yong tau foo (fried)
- [x] Kuih bangkit
- [x] Kuih badak berendam
- [x] Kuih kasturi
- [x] Kuih jala (roti jala)

## Drinks (8 built)

- [x] Teh tarik
- [x] Milo ais
- [x] Kopi tarik
- [x] Sirap bandung
- [x] Soya / soy milk
- [x] Air tebu (sugarcane)
- [x] Air kelapa (coconut)
- [x] Cincau

## Desserts (5 built)

- [x] Cendol
- [x] UFO tart
- [x] Egg tart
- [x] Ais kacang (ABC)
- [x] Bubur cha cha

---

## Notes

- **Kuih kaswi** (steamed coconut cup kuih) and **kuih kasturi** (fried filled
  ball) are different dishes; both are built.
- **Hokkien mee KL vs Penang** are genuinely different dishes that share a name,
  so they have separate pages (not variants).
- The two remaining `[ ]` lauk items are minor sambal/fried-fish sides that read
  better folded into existing pages than as thin standalone pages.

## Future expansion ideas (only if GSC signal justifies it)

- Borneo specialties: manok pansoh, umai, hinava, midin, ambuyat
- Regional kuih: pinjaram, kuih cincin, kuih sapit, wajik, lopes
- Fruit pages: durian types, cempedak goreng, rambutan
- Kopitiam combos: half-boiled eggs + toast set, nasi lemak + drink sets
- More drinks: bandung soda, limau ais, sirap limau, kopi O kosong
