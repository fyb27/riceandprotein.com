#!/usr/bin/env node
/*
 * enrich-top-foods.js
 * One-off content enrichment for the highest-search-volume food pages.
 * Appends extra realTalk paragraphs, FAQ entries and lighter tips to
 * 11 foods in data/foods.json, then you re-run generate-foods.js.
 *
 * Safe to run once only. Running twice would duplicate the content,
 * so the script refuses if it finds its own marker text already present.
 */

const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data', 'foods.json');
const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));

const ADD = {
  'nasi-lemak': {
    realTalk: [
      'Zoom out and look at the weekly math. A bungkus every morning is 556 x 7, nearly 3,900 calories a week from breakfast alone. Half a kilo of body fat is roughly 3,850 calories. So the daily nasi lemak habit, on its own, is a potential half kilo a week if the rest of your eating does not make room for it. It is not one bungkus that gets people. It is the habit.',
      'Also be honest about what you are buying with those calories. 22g of protein for 556 calories is a mediocre trade. For comparison, 300g of chicken breast is around 330 calories and gives you 69g of protein. Nasi lemak is a flavour purchase, not a protein purchase, and that is fine, as long as you know which one you are paying for.',
      'One more thing: the bungkus at the roadside stall and the nasi lemak at a cafe are not the same food. The classic small bungkus is around 550. A restaurant plate with a mountain of rice, extra sambal and a big piece of fried chicken can pass 900 without trying. If you only remember one rule, remember that the wrapped banana leaf version is the safest version.'
    ],
    faq: [
      {
        q: 'How many calories in nasi lemak with fried chicken?',
        a: 'Around 850 calories. The fried chicken thigh alone adds roughly 300 calories to the plain bungkus, mostly from the skin and the frying oil.'
      },
      {
        q: 'Can I eat nasi lemak every day and still lose weight?',
        a: 'Technically yes if you stay in a calorie deficit, but it is hard. A 556 calorie breakfast leaves most people only 1,100 to 1,400 calories for lunch, dinner and drinks. Twice a week is a much easier way to keep it in your life.'
      },
      {
        q: 'How many calories in homemade nasi lemak?',
        a: 'You can get a home version down to around 420 calories by using light santan or half the usual amount, measuring the rice, baking or air frying instead of deep frying the extras, and going easy on the oil in the sambal.'
      }
    ],
    lighter: [
      'Make it at home sometimes. Light santan, measured rice and a boiled egg gets you the same taste profile for 100 plus fewer calories.',
      'If the stall piles the rice high, leave a third of it behind. Nobody is giving you a medal for finishing.'
    ]
  },

  'roti-canai': {
    realTalk: [
      'To put one roti canai in perspective: 301 calories is about four and a half slices of white bread. Nobody sits down and eats four slices of bread with margarine as a light snack, but that is effectively what one roti is, thanks to all the fat laminated into the dough.',
      'The 2am factor matters too. Calories at night are not magically worse, but a supper roti comes on top of everything you already ate that day. If dinner was done and you were fine, the mamak trip is pure bonus calories. Two rotis and a teh tarik as a "snack" is 750 calories your day did not need.',
      'If you want the mamak experience with better numbers, look one line down the menu. Tosai kosong is around 200 calories, chapati around 240, both with far less fat than roti. Same table, same dhal, same late night talk with your friends, 100 plus calories saved per piece.'
    ],
    faq: [
      {
        q: 'Roti canai or tosai, which is better for weight loss?',
        a: 'Tosai, easily. A plain tosai is around 200 calories versus 301 for roti canai with dhal, and it carries much less fat because the batter is not laminated with margarine.'
      },
      {
        q: 'How many calories does the curry or dhal add?',
        a: 'A normal ladle of dhal or curry adds around 30 to 50 calories. Roti banjir, flooded with curry, sits around 340. The gravy is not the problem, the second and third roti is.'
      },
      {
        q: 'Is roti canai worse than white rice?',
        a: 'Calorie for calorie, yes. A plate of plain white rice is around 200 to 260 calories with almost no fat. One roti is 300 with 14g of fat. The rice fills you up more for less.'
      }
    ],
    lighter: [
      'Order tosai or chapati instead when the craving is really just "hot bread plus dhal".',
      'Eat dinner before the mamak session so the roti is a treat, not a second dinner.'
    ]
  },

  'char-kuey-teow': {
    realTalk: [
      'Some context on what 742 calories means. For most men cutting on around 1,800 to 2,000 calories a day, one plate of CKT is 40 percent of the entire day. To burn it off you are looking at roughly 90 minutes of brisk walking. That is the honest exchange rate on that smoky wok flavour.',
      'The noodle itself is part of the problem. Flat rice noodles are basically sponges. They drink up whatever oil or lard is in the wok, which is exactly why they taste so good and exactly why 76g of carbs arrive coated in 38g of fat. The prawns and cockles you can see are honestly the healthiest thing on the plate.',
      'Penang style with duck egg, extra lard bits and bigger portions runs even higher, push it to 800 plus. And if the uncle asks whether you want it "special", understand that special means more of everything, including the number on this page.'
    ],
    faq: [
      {
        q: 'How many calories in char kuey teow without prawns or cockles?',
        a: 'Barely any different, maybe 30 to 50 calories less. The seafood was never the problem. The oil, lard and noodles carry almost all of the 742 calories.'
      },
      {
        q: 'Is char kuey teow worse than nasi lemak?',
        a: 'Per serving, yes. A standard CKT at 742 calories beats a plain nasi lemak bungkus at 556 by almost 200 calories, and with more than double the fat.'
      },
      {
        q: 'How often can I eat CKT while losing weight?',
        a: 'Once a week works fine if you plan for it. Keep the other two meals that day light and high protein, think soup and grilled lauk, and the week still balances out.'
      }
    ],
    lighter: [
      'Share the plate. Half a CKT plus a bowl of clear soup is a genuinely decent lunch.',
      'If it is CKT for lunch, make dinner protein and vegetables only. Plan the day around the plate.'
    ]
  },

  'teh-tarik': {
    realTalk: [
      'Here is the yearly math that changed my behaviour. Two teh tarik a day is 260 calories, times 365 days is about 95,000 calories a year. That is roughly 12kg of body fat, from tea. Nobody gets fat from one glass. People get fat from the automatic twice a day habit that runs for years.',
      'Know your kopitiam menu codes and you can save calories without giving anything up. Teh c uses evaporated milk instead of condensed, around 100 calories. Teh c kosong is evaporated milk with no sugar, around 40. Teh o is tea with sugar only, around 60. Teh o kosong is the champion at basically 5. Same tea, five different prices for your waistline.',
      'The reason drink calories are so dangerous is that they do not register. Liquid sugar does not trip your fullness switch the way food does. Your body simply does not count the teh tarik, so you eat the same amount of food anyway, plus the 130.'
    ],
    faq: [
      {
        q: 'How many calories in teh tarik kurang manis?',
        a: 'Around 95 calories. Kurang manis usually means the same condensed milk but less added sugar, so it helps, but teh c kosong at around 40 calories is the bigger saving.'
      },
      {
        q: 'What is the difference between teh tarik and teh c?',
        a: 'Teh tarik uses condensed milk, which is milk plus a lot of sugar, around 130 calories a glass. Teh c uses evaporated milk, which is unsweetened, so around 100 calories with the standard sugar, or 40 if you order it kosong.'
      },
      {
        q: 'How much weight can I lose by switching to teh o kosong?',
        a: 'If you currently drink two teh tarik a day, switching saves about 250 calories daily. That is roughly 1kg of fat every five to six weeks, from changing nothing except your drink order.'
      }
    ],
    lighter: [
      'Give yourself one sweet drink slot a day, with your favourite meal. Every other drink is kosong.'
    ]
  },

  'mee-goreng-mamak': {
    realTalk: [
      'The yellow mee arrives at the stall already oiled. Fresh yellow noodles are parboiled and coated in oil so they do not stick, before the wok even starts. Then comes the frying oil, then the sweet sauce, which is genuinely two to three teaspoons of sugar hiding in your dinner. Sweet plus oily is the whole flavour, and the whole 660.',
      'If you like mamak fried noodles but want a lighter plate, bihun goreng is the quiet winner at around 540. Rice vermicelli is lighter than yellow mee and absorbs less oil. Kuey teow goreng sits in between. Same wok, same taste direction, real difference in calories.',
      'And check the protein column: 20g for 660 calories is a bad deal. That is why you are hungry again two hours after mee goreng. The plate is nearly all carbs and fat. One extra egg or a side of ayam goreng fixes the hunger problem better than a second plate of noodles ever will.'
    ],
    faq: [
      {
        q: 'Mee goreng or bihun goreng, which is lower calorie?',
        a: 'Bihun goreng, at around 540 calories versus 660 for mee goreng. Vermicelli holds less oil than yellow noodles and the plate usually carries less sweet sauce.'
      },
      {
        q: 'How many calories in mee goreng special?',
        a: 'Around 780 calories. The special usually adds egg, chicken or extra everything on top of the standard plate.'
      },
      {
        q: 'Why does mee goreng make me hungry again so fast?',
        a: 'Low protein. Only about 20g in a 660 calorie plate, so your body burns through the carbs, the sugar dip hits, and you are eyeing the menu again. Adding an egg or chicken makes it last much longer.'
      }
    ],
    lighter: [
      'Bihun goreng instead of mee goreng saves you around 120 calories with the same satisfaction.'
    ]
  },

  'bak-kut-teh': {
    realTalk: [
      'A warning about the dry version. Dry bak kut teh, the claypot one with dark sauce, dried chilli and you tiao mixed in, plays by different rules. The sauce reduction is oil and sugar heavy and the whole thing runs closer to 580 per portion. Soup version for the diet, dry version for the cheat day.',
      'The soup itself is nearly free. Clear herbal broth is maybe 50 calories a bowl, and most shops refill it without charging. That is a dream for volume eaters: keep refilling soup, keep feeling full, spend almost nothing. Just skip the oily layer floating on top of the communal pot.',
      'Among all the famous hawker meals, BKT with lean cuts is honestly one of the best cutting choices. 35g of protein in a 405 calorie bowl beats chicken rice, beats nasi lemak, beats basically every noodle dish. Order pai kut, ask for less fatty pieces, watch the rice, and you can eat this weekly while losing weight.'
    ],
    faq: [
      {
        q: 'How many calories in dry bak kut teh?',
        a: 'Around 580 per portion. The dark sauce reduction is heavy on oil and sugar, and the you tiao mixed in soaks it all up. The soup version is the lighter choice by a wide margin.'
      },
      {
        q: 'Can I drink the bak kut teh soup freely?',
        a: 'Mostly yes. The clear herbal broth is around 50 calories a bowl and refills are usually free. Just avoid ladling from the oily layer on top, that is where the pork fat collects.'
      },
      {
        q: 'Bak kut teh or chicken rice, which is better for a diet?',
        a: 'Bak kut teh with lean cuts and no rice, at around 405 calories with 35g protein, beats a standard chicken rice plate at around 600. The catch is discipline: no fatty cuts, easy on the rice.'
      }
    ],
    lighter: [
      'Ask for pai kut (lean ribs) specifically when ordering. The uncle will not choose lean for you.'
    ]
  },

  'satay': {
    realTalk: [
      'The Kajang problem: satay is eaten by the tray, not by the stick. A normal session is 15, 20, even 30 sticks between stories. Twenty chicken sticks is about 1,000 calories on its own. Add the sauce bowl and a plate of nasi impit and a fun evening quietly becomes a 1,400 calorie sitting.',
      'Do the sauce math once and you will never dunk the same way. Peanut sauce is roughly 50 calories a tablespoon, and a generous dipper goes through four to six tablespoons in a session. That is 200 to 300 calories of sauce, sometimes more than half the calories of the meat itself. Dip the tip, do not bathe the stick.',
      'Now the good news. Skewered grilled meat is one of the most gym-friendly foods at any Malaysian gathering. Ten chicken sticks with light sauce is about 500 to 550 calories and 50g of protein. That is a legitimate high protein dinner that happens to taste like a celebration. Satay is only a trap if the ketupat and the sauce bowl come along for the ride.'
    ],
    faq: [
      {
        q: 'How many satay sticks can I eat on a diet?',
        a: 'Ten chicken sticks with light sauce is around 500 to 550 calories with about 50g of protein, which works as a full meal on most cutting days. The count to avoid is 20 plus sticks with heavy sauce and ketupat.'
      },
      {
        q: 'How many calories in ketupat or nasi impit?',
        a: 'The serving that comes with a satay order adds roughly 110 calories. It is plain compressed rice, so it is not evil, it is just extra carbs next to a meal that did not need them.'
      },
      {
        q: 'Is satay a good protein source for gym?',
        a: 'Genuinely yes. Chicken satay is grilled lean meat at about 5g protein per 50 calorie stick. Ten sticks rivals a chicken breast. Go easy on the sauce and it is one of the best "party foods" for anyone training.'
      }
    ],
    lighter: [
      'Decide your stick count before the tray lands. Ten is a meal. Thirty is an accident.'
    ]
  },

  'cendol': {
    realTalk: [
      'Break the bowl down and the villain is obvious. The shaved ice is zero. The green pandan jelly is nearly nothing. The gula melaka syrup is around 55 calories per tablespoon and a standard bowl gets two to three tablespoons, plus the santan pour on top. You are basically drinking sweetened coconut cream through ice.',
      'Cendol versus ais kacang is a common question and the answer is: same neighbourhood. A standard ABC runs around 280 to 300 with its syrups and evaporated milk, cendol around 330 with santan and gula melaka. Neither is a light option. Pick whichever one you actually love and count it properly.',
      'My personal rule from the losing weight days: dessert replaces a drink, it does not join one. If cendol is happening, the drink is plain water. Cendol plus teh tarik in one sitting is 460 calories of pure sugar, which is more than a full bowl of bak kut teh, for zero fullness.'
    ],
    faq: [
      {
        q: 'Cendol or ais kacang, which is lighter?',
        a: 'They are close. Ais kacang is usually around 280 to 300 calories, cendol around 330 because of the santan and gula melaka. Toppings decide the winner: add pulut or durian to either and it jumps past 400.'
      },
      {
        q: 'How many calories in the gula melaka syrup alone?',
        a: 'Around 55 calories per tablespoon, and a standard bowl carries two to three tablespoons. Asking for less syrup is the single biggest cut you can make to a cendol.'
      },
      {
        q: 'Is cendol okay as a post-workout treat?',
        a: 'Occasionally, sure, the sugar will not hurt you more just because it is in dessert form. But there is no post-workout magic either. It is 330 calories of enjoyment. Budget it like one.'
      }
    ],
    lighter: [
      'Dessert replaces the sweet drink, never joins it. Cendol day means water with the meal.'
    ]
  },

  'maggi-goreng': {
    realTalk: [
      'There is also the morning-after effect nobody connects to the maggi. One plate carries a huge sodium load, the noodle seasoning alone covers most of a full day of salt. That is why the scale jumps half a kilo the next morning. It is water retention, not fat, but it is also why you were so thirsty at 3am.',
      'The home version is a completely different food if you build it right. One packet cooked as soup, seasoning halved, an egg cracked in, a handful of frozen vegetables: around 420 calories with decent protein, and you control every gram of it. The extra 50 to 150 calories in the mamak version is all wok oil and ghee.',
      'Watch the "it is just maggi" mindset. Because instant noodles feel like a snack food, a plate of maggi goreng gets mentally filed as nothing. It is not nothing. At 470 to 550 calories it is a full meal, eaten on top of whatever you already called dinner.'
    ],
    faq: [
      {
        q: 'Why do I weigh more the day after mamak maggi?',
        a: 'Sodium. The seasoning packet plus mamak cooking carries far more salt than a normal meal, so your body holds extra water for a day or two. It is not fat gain, but it is a sign of how heavily seasoned the plate is.'
      },
      {
        q: 'Is homemade maggi lighter than mamak maggi goreng?',
        a: 'Yes, by 50 to 150 calories, because you skip the wok oil and ghee. A soup version at home with an egg and vegetables lands around 420 calories and keeps you full longer.'
      },
      {
        q: 'Is maggi goreng a snack or a meal?',
        a: 'A meal. At 470 calories standard and 550 plus for the special, it is dinner sized. The mistake is eating it as a "supper snack" on top of a full day of food.'
      }
    ],
    lighter: [
      'Drink plain water with it. The salt makes you thirsty and the default answer at the mamak is another sweet drink.'
    ]
  },

  'nasi-goreng-kampung': {
    realTalk: [
      'The home wok is where this dish becomes diet food. Day-old rice, one measured tablespoon of oil, two eggs, ikan bilis and as much chilli as you dare: around 450 to 500 calories with real protein. The hawker plate hits 630 because the stall uses three to four tablespoons of oil and a bigger mountain of rice. Same dish, 150 calorie gap, purely technique.',
      'Across the nasi goreng menu the spread is wider than people think. Kampung and cina both sit around 630, mamak style around 660, and pattaya jumps to 700 because it wraps the whole thing in an egg omelette with extra sauce. If the menu has ten fried rice options, they are not all the same number.',
      'Also compare it against the obvious alternative: nasi putih with grilled lauk. Plain rice, ikan bakar and some vegetables lands around 500 to 550 with far more protein than any fried rice. Nasi goreng is the convenience choice, not the smart choice, and knowing that is half the battle.'
    ],
    faq: [
      {
        q: 'Which nasi goreng has the lowest calories?',
        a: 'Kampung and cina styles are the lightest at around 630 a plate. Pattaya is the heaviest common option at around 700, because of the egg wrap and sauce. USA and special versions with extra meat go higher still.'
      },
      {
        q: 'How many calories in homemade nasi goreng?',
        a: 'Around 450 to 500 if you use one tablespoon of oil and a normal bowl of day-old rice. The hawker version is 630 mostly because of extra oil and extra rice, not secret ingredients.'
      },
      {
        q: 'Nasi goreng or white rice with lauk, which is better?',
        a: 'White rice with grilled lauk and vegetables, around 500 to 550 calories with much more protein. Fried rice bundles the oil into every grain, so you cannot opt out of it.'
      }
    ],
    lighter: [
      'Cook it at home with one measured tablespoon of oil and double eggs. Restaurant taste, 150 fewer calories.'
    ]
  },

  'curry-laksa': {
    realTalk: [
      'Respect the taufu pok. Those tofu puffs are sponges by design, each one soaks up curry gravy and comes out at 50 to 70 calories a piece. Four puffs is quietly another 250 calories of absorbed santan sitting on top of the bowl you already ordered.',
      'The santan math explains the whole dish. A bowl of curry laksa carries roughly 100 to 150ml of coconut milk at around 230 calories per 100ml. That is 230 to 345 calories in the gravy before a single noodle enters the picture. Whether you drink the gravy or leave it is genuinely a 150 to 200 calorie decision.',
      'The laksa family tree, ranked for your convenience: asam laksa around 330, laksa kedah 400, sarawak laksa 550, laksa johor 570, curry laksa 600. The pattern is simple. The more coconut milk in the recipe, the higher it climbs. Penang people have been winning this particular game the whole time.'
    ],
    faq: [
      {
        q: 'Which laksa has the lowest calories?',
        a: 'Asam laksa, at around 330 a bowl. The tamarind fish broth has no coconut milk, which is what pushes curry laksa to 600 and the santan-based versions in between.'
      },
      {
        q: 'How many calories do I save by not drinking the gravy?',
        a: 'Roughly 150 to 200 calories. Most of the coconut milk fat stays in the liquid, so eating the noodles and toppings and leaving the gravy behind meaningfully changes the number.'
      },
      {
        q: 'How many calories in a tofu puff (taufu pok) in laksa?',
        a: 'About 50 to 70 calories each once it has soaked up the curry gravy. They act like sponges, so a bowl with four puffs carries an extra 200 plus calories in the puffs alone.'
      }
    ],
    lighter: [
      'Limit the taufu pok to one or two. They are gravy sponges, not health food.'
    ]
  }
};

// Refuse to run twice: check a marker phrase from the first addition.
const nl = db.foods.find(f => f.slug === 'nasi-lemak');
if (nl.realTalk.some(p => p.includes('weekly math'))) {
  console.error('Enrichment already applied. Aborting to avoid duplicates.');
  process.exit(1);
}

let count = 0;
for (const [slug, add] of Object.entries(ADD)) {
  const f = db.foods.find(x => x.slug === slug);
  if (!f) {
    console.error('MISSING SLUG: ' + slug);
    process.exitCode = 1;
    continue;
  }
  f.realTalk.push(...add.realTalk);
  f.faq.push(...add.faq);
  if (add.lighter) f.lighter.push(...add.lighter);
  count++;
  console.log('  enriched ' + slug + ' (+' + add.realTalk.length + ' paras, +' + add.faq.length + ' faqs)');
}

fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n');
console.log('\nDone. ' + count + ' foods enriched. Now run: node scripts/generate-foods.js');
