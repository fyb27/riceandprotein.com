#!/usr/bin/env node
/* One-off: add the Dim Sum category + 12 dim sum foods to data/foods.json.
   Run once: node scripts/add-dimsum.js   then: node scripts/generate-foods.js */
const fs = require('fs');
const path = require('path');
const DATA = path.resolve(__dirname, '..', 'data', 'foods.json');
const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));

// New category, slotted right after noodles so it sits near the top of the hub.
const cats = {};
for (const [k, v] of Object.entries(db.categories)) {
  cats[k] = v;
  if (k === 'noodles') cats['dimsum'] = 'Dim Sum';
}
db.categories = cats;

const NEW = [
  {
    slug: 'har-gao',
    name: 'Har Gao',
    category: 'dimsum',
    serving: '1 basket (4 pieces)',
    servingGrams: 140,
    calories: 220,
    protein: 12,
    carbs: 26,
    fat: 8,
    metaDescription: 'A basket of 4 har gao is about 220 calories. The lightest thing on the dim sum trolley. Full breakdown, macros, and how to order smart.',
    summary: 'Translucent prawn dumplings, steamed not fried. The lightest, highest-protein pick on the whole dim sum trolley.',
    answer: 'A standard basket of 4 har gao (the see-through prawn dumplings) is about 220 calories, or roughly 55 each. It is steamed with a thin wheat-starch skin and almost pure prawn inside, so for the size it is one of the best protein-to-calorie picks you can order at dim sum.',
    realTalk: [
      'Bro if you only learn one thing about eating dim sum without blowing your day, it is this: har gao is your friend. Pure prawn, thin skin, steamed. No oil added. A basket of 4 is around 220 calories and gives you a proper 12g of protein. Compare that to one fried wu kok which is basically the same calories for one piece of deep-fried taro.',
      'The skin looks light because it is. It is wheat starch and tapioca, so the carbs are modest and there is barely any fat unless the kitchen is heavy-handed. The prawns are the whole point. This is the dish you load up on first so you are already half full before the fried trolley comes around.'
    ],
    lighter: [
      'Order har gao first, before you are tempted by the fried stuff. Two baskets of prawn dumplings is still under 450 calories.',
      'Go easy on the chilli oil and the sweet sauce. A heavy spoon of chilli oil can quietly add 50 to 80 calories per basket.',
      'Pair it with Chinese tea, not a sweet drink. The tea is free calories saved and it cuts the grease.'
    ],
    components: [
      { name: 'Prawn filling', grams: 80, calories: 110 },
      { name: 'Wheat-starch skin (4)', grams: 50, calories: 95 },
      { name: 'Oil and seasoning', grams: 10, calories: 15 }
    ],
    portions: [
      { label: '2 pieces', calories: 110 },
      { label: '1 basket (4)', calories: 220 },
      { label: '2 baskets (8)', calories: 440 }
    ],
    faq: [
      { q: 'Is har gao good for weight loss?', a: 'Yes, it is one of the better dim sum picks. At about 55 calories a piece with real prawn protein and no deep frying, har gao gives you a lot of satisfaction for the calories. Just watch how many baskets stack up.' },
      { q: 'How much protein is in har gao?', a: 'A basket of 4 has about 12g of protein, almost all of it from the prawns. That is a solid amount for something this light, which is why it is a smart first order at dim sum.' },
      { q: 'Is har gao healthier than siew mai?', a: 'Slightly, yes. Har gao is pure prawn and steamed, so it is a bit lower in fat than siew mai, which uses fattier pork. Both are fine, but if you are counting, har gao edges it.' }
    ],
    related: ['siew-mai', 'xiao-long-bao', 'steamed-pork-ribs'],
  },
  {
    slug: 'siew-mai',
    name: 'Siew Mai',
    category: 'dimsum',
    serving: '1 basket (4 pieces)',
    servingGrams: 150,
    calories: 260,
    protein: 16,
    carbs: 18,
    fat: 13,
    metaDescription: 'A basket of 4 siew mai is about 260 calories. The open-topped pork and prawn dumpling, broken down with macros and smarter ordering tips.',
    summary: 'The open-faced pork and prawn dumplings with the orange dot on top. Higher protein, a bit more fat than har gao.',
    answer: 'A basket of 4 siew mai (the open-topped pork-and-prawn dumplings, usually with a little crab roe or carrot on top) is about 260 calories, roughly 65 each. The filling is mostly minced pork and prawn, so it is high in protein but carries more fat than har gao because pork is fattier.',
    realTalk: [
      'Siew mai is the other smart order at dim sum bro. Mostly meat, steamed, no batter, no deep frying. A basket of 4 is around 260 calories and packs 16g of protein. That is genuinely good. The only reason it is not as light as har gao is the pork. Pork mince has fat in it and that is where the extra calories live.',
      'The thing people get wrong is treating the whole trolley the same. Siew mai and har gao are the protein. The buns, the fried taro, the radish cake, those are the carb-and-oil bombs. If half your table order is steamed dumplings, you can eat a proper amount of food and still walk out under control.'
    ],
    lighter: [
      'Stick to steamed siew mai. Avoid the deep-fried variants some places do.',
      'Two baskets of siew mai plus a pot of tea is a legit high-protein meal for around 520 calories.',
      'Skip the extra soy sauce drowning. The dumplings are already seasoned, and you do not need the sodium load.'
    ],
    components: [
      { name: 'Pork and prawn filling', grams: 110, calories: 210 },
      { name: 'Thin wonton skin (4)', grams: 30, calories: 40 },
      { name: 'Topping and oil', grams: 10, calories: 10 }
    ],
    portions: [
      { label: '2 pieces', calories: 130 },
      { label: '1 basket (4)', calories: 260 },
      { label: '2 baskets (8)', calories: 520 }
    ],
    faq: [
      { q: 'Is siew mai high in protein?', a: 'Yes. A basket of 4 has about 16g of protein from the pork and prawn filling. For a dim sum item it is one of the most protein-dense things you can order, which makes it a good pick if you are trying to stay full.' },
      { q: 'Why is siew mai higher in calories than har gao?', a: 'Because of the pork. Siew mai uses minced pork which carries more fat than the pure prawn in har gao. The extra fat is what pushes it from about 55 to about 65 calories per piece.' },
      { q: 'Can I eat siew mai on a diet?', a: 'Yes, in sensible amounts. Steamed siew mai is meat-heavy and filling. The trap is not the dumplings, it is everything fried that comes with them. Keep the order steamed and you are fine.' }
    ],
    related: ['har-gao', 'xiao-long-bao', 'char-siew-bao'],
  },
  {
    slug: 'lo-mai-kai',
    name: 'Lo Mai Kai',
    category: 'dimsum',
    serving: '1 bowl',
    servingGrams: 250,
    calories: 380,
    protein: 14,
    carbs: 56,
    fat: 11,
    metaDescription: 'One bowl of lo mai kai is about 380 calories. Steamed glutinous rice with chicken, broken down with macros and where the calories really hide.',
    summary: 'Steamed glutinous rice with chicken, mushroom and a little sausage. Looks innocent, eats heavy.',
    answer: 'One bowl of lo mai kai (the steamed glutinous rice with chicken, mushroom and a bit of lap cheong) is about 380 calories. The rice is the story here. Glutinous rice is dense and it is usually mixed with oil and the fatty juices from the chicken and sausage, so a small bowl carries more calories than it looks.',
    realTalk: [
      'Lo mai kai is the sneaky one bro. It looks like a small bowl of rice with a few bits of chicken. Harmless. But glutinous rice is heavy, and the whole thing is steamed in oil, soy and the fat that renders out of the chicken and lap cheong. One bowl is around 380 calories, and it is mostly carbs and fat with only a little protein.',
      'It is not a bad food. It is just calorie-dense for the volume, which is the opposite of what you want when you are trying to stay full on fewer calories. If you love it, have it, but treat one bowl as a proper portion of your meal, not a side dish you add on top of three baskets of dumplings.'
    ],
    lighter: [
      'Treat lo mai kai as your carb for the meal, not an extra. One bowl already covers your rice.',
      'Share it. Half a bowl with a basket of har gao is a far more balanced order than a full bowl on its own.',
      'Pick off the visible lap cheong if you are counting. The Chinese sausage is one of the fattiest parts of the bowl.'
    ],
    components: [
      { name: 'Glutinous rice', grams: 170, calories: 270 },
      { name: 'Chicken pieces', grams: 45, calories: 70 },
      { name: 'Lap cheong and mushroom', grams: 20, calories: 30 },
      { name: 'Oil and soy', grams: 15, calories: 10 }
    ],
    portions: [
      { label: 'Half bowl', calories: 190 },
      { label: '1 bowl', calories: 380 },
      { label: 'Large bowl', calories: 480 }
    ],
    faq: [
      { q: 'Why is lo mai kai so high in calories?', a: 'Glutinous rice is dense and calorie-heavy, and lo mai kai is steamed with oil, soy sauce and the fat from the chicken and lap cheong. A small bowl ends up around 380 calories, mostly carbs and fat.' },
      { q: 'Is lo mai kai healthy?', a: 'It is fine in moderation but it is not a light food. The protein from the chicken is modest while the carbs and fat are high. Treat one bowl as your rice for the meal rather than a small side.' },
      { q: 'How much protein is in lo mai kai?', a: 'About 14g per bowl, mostly from the chicken. For the calories involved that is not a lot of protein, which is why it is better thought of as a carb dish than a protein one.' }
    ],
    related: ['char-siew-bao', 'char-siew-rice', 'siew-mai'],
  },
  {
    slug: 'char-siew-bao',
    name: 'Char Siew Bao',
    category: 'dimsum',
    serving: '1 bun',
    servingGrams: 110,
    calories: 240,
    protein: 9,
    carbs: 38,
    fat: 6,
    metaDescription: 'One steamed char siew bao is about 240 calories. The fluffy BBQ pork bun broken down, with the baked version compared and lighter tips.',
    summary: 'The fluffy white steamed bun stuffed with sweet BBQ pork. Soft, sweet, and more carbs than you think.',
    answer: 'One steamed char siew bao (the soft white BBQ pork bun) is about 240 calories. Most of that is the fluffy bun itself, which is enriched flour and sugar. The char siew filling adds the protein and a hit of sweetness from the sauce. The baked version with the glazed top runs higher, closer to 280 to 320.',
    realTalk: [
      'Everyone underestimates the bao bro. It looks light and fluffy so your brain files it as a small snack. But that soft white dough is enriched flour plus sugar, and the char siew inside is glazed in a sweet, slightly oily sauce. One steamed bun is around 240 calories, and almost no one stops at one.',
      'The baked char siew bao, the golden glazed kind, is even heavier because the top is brushed with sugar and egg wash and sometimes butter. If you are choosing, the plain steamed white bao is the lighter call. Either way, one bao is a snack with the calories of a small meal, so count it properly.'
    ],
    lighter: [
      'Pick the steamed white bao over the baked glazed one. The bake adds sugar, egg wash and sometimes butter on top.',
      'One bao plus a couple of baskets of steamed dumplings is plenty. You do not need two buns.',
      'Drink unsweetened Chinese tea with it. The bun is already sweet, so a sweet drink on top is double the sugar.'
    ],
    components: [
      { name: 'Steamed bun dough', grams: 75, calories: 165 },
      { name: 'Char siew filling', grams: 30, calories: 65 },
      { name: 'Sweet sauce', grams: 5, calories: 10 }
    ],
    portions: [
      { label: '1 steamed bao', calories: 240 },
      { label: '1 baked bao', calories: 300 },
      { label: '2 steamed bao', calories: 480 }
    ],
    faq: [
      { q: 'How many calories in a char siew bao?', a: 'A steamed char siew bao is about 240 calories. The baked, glazed version is higher, around 280 to 320, because of the sugar and egg wash brushed on top.' },
      { q: 'Is char siew bao fattening?', a: 'It is more carb-heavy than fatty. The fluffy bun is enriched flour and sugar, so the calories come mainly from refined carbs. It is fine occasionally, but two or three buns adds up fast.' },
      { q: 'Steamed or baked char siew bao, which is lighter?', a: 'The steamed white bun is lighter. The baked version gets a sugar and egg-wash glaze and sometimes butter, which pushes it 60 to 80 calories higher per bun.' }
    ],
    related: ['lo-mai-kai', 'char-siew-rice', 'liu-sha-bao'],
  },
  {
    slug: 'fried-wonton',
    name: 'Fried Wonton',
    category: 'dimsum',
    serving: '1 plate (6 pieces)',
    servingGrams: 130,
    calories: 360,
    protein: 11,
    carbs: 30,
    fat: 22,
    metaDescription: 'A plate of 6 fried wonton is about 360 calories. The crispy deep-fried pork and prawn parcels broken down, with macros and lighter swaps.',
    summary: 'Crispy deep-fried wonton parcels with a pork and prawn filling. The crunch is pure fryer, so they punch hard for the size.',
    answer: 'A plate of 6 fried wonton (the crispy deep-fried parcels of pork and prawn, often served with mayo or sweet chilli) is about 360 calories, roughly 60 each. The filling is small and the wrapper is thin, but deep-frying a thin wrapper means it soaks up oil, so these are one of the heavier-per-bite items at yum cha.',
    realTalk: [
      'Fried wonton is the snack that vanishes off the table bro. They are small, crispy and moreish, so a plate of 6 is gone before you have clocked it. But each one is a thin wrapper deep-fried until crunchy, and that crunch is oil. A plate lands around 360 calories, and the dipping sauce, especially if it is mayo, only adds to it.',
      'The actual filling, a little pork and prawn, is tiny. You are mostly eating fried dough. If you want the same flavour lighter, steamed wonton in soup is a fraction of the calories because there is no fryer involved. Fried ones are fine as a shared starter, just do not treat a whole plate as nothing.'
    ],
    lighter: [
      'Order wonton in soup instead of fried if you want the same filling for far fewer calories.',
      'Skip the mayo dip. A spoon of mayo can add 90 to 100 calories to the plate on its own.',
      'Share a plate as a starter rather than having six to yourself on top of everything else.'
    ],
    components: [
      { name: 'Deep-fried wrappers (6)', grams: 90, calories: 270 },
      { name: 'Pork and prawn filling', grams: 40, calories: 90 }
    ],
    portions: [
      { label: '3 pieces', calories: 180 },
      { label: 'Plate of 6 (fried)', calories: 360 },
      { label: 'Same in soup (6)', calories: 180 }
    ],
    faq: [
      { q: 'How many calories in fried wonton?', a: 'About 60 calories per piece, so a plate of 6 is around 360. The filling is small, so most of the calories come from the thin wrapper soaking up oil in the deep fryer.' },
      { q: 'Are fried or steamed wonton healthier?', a: 'Steamed or soup wonton is much lighter because there is no frying. The same parcels in soup are roughly half the calories of a fried plate, so choose soup if you are watching it.' },
      { q: 'Why are fried wonton so calorie-dense?', a: 'A thin wrapper has a lot of surface area, and deep-frying it means it absorbs oil all over. That is why a light-feeling, crunchy snack still adds up to around 360 calories for a plate of 6.' }
    ],
    related: ['spring-rolls', 'wu-kok', 'siew-mai'],
  },
  {
    slug: 'lo-bak-go',
    name: 'Lo Bak Go',
    category: 'dimsum',
    serving: '1 plate (3 pieces)',
    servingGrams: 210,
    calories: 300,
    protein: 6,
    carbs: 40,
    fat: 13,
    metaDescription: 'A plate of 3 pan-fried lo bak go is about 300 calories. The radish cake broken down, steamed vs pan-fried, with macros and lighter tips.',
    summary: 'Pan-fried radish cake with a crispy edge and soft middle. More rice flour and oil than actual radish.',
    answer: 'A plate of 3 pan-fried lo bak go (radish or turnip cake) is about 300 calories. Despite the name, it is mostly rice flour with shredded radish, bits of dried shrimp and lap cheong, then pan-fried in oil to crisp the edges. The pan-frying is where a chunk of the calories comes from. Steamed and uncrisped, the same cake is lighter.',
    realTalk: [
      'Lo bak go sounds healthy because it has radish in the name bro, but do not be fooled. The base is rice flour, not vegetable. The radish is shredded in for flavour and texture, but the bulk is starch. Then they pan-fry it in oil so the outside goes golden and crispy, and that oil is calories you cannot see.',
      'A plate of 3 is around 300 calories, and most people order it crispy because that is the good version. If you want it lighter you can ask for it steamed rather than pan-fried, but honestly the crispy edge is half the reason to eat it. Just know what you are getting and count it as a carb-and-oil dish, not a veg.'
    ],
    lighter: [
      'Ask for it steamed instead of pan-fried if you want to cut the oil. You lose the crispy edge but save 60 to 90 calories a plate.',
      'Go light on the sweet chilli or XO sauce on the side. It adds up quickly across a plate.',
      'Treat it as your carb, not a side. A plate of radish cake plus dumplings means you do not need rice or noodles too.'
    ],
    components: [
      { name: 'Radish and rice-flour cake (3)', grams: 180, calories: 230 },
      { name: 'Dried shrimp and lap cheong', grams: 15, calories: 40 },
      { name: 'Pan-frying oil', grams: 15, calories: 30 }
    ],
    portions: [
      { label: '1 piece', calories: 100 },
      { label: 'Plate of 3 (pan-fried)', calories: 300 },
      { label: 'Plate of 3 (steamed)', calories: 220 }
    ],
    faq: [
      { q: 'Is lo bak go healthy?', a: 'It is mostly rice flour rather than radish, so it is more of a carb dish than a vegetable. Steamed it is reasonable, but the popular pan-fried version adds oil that pushes a plate of 3 to around 300 calories.' },
      { q: 'How many calories in radish cake?', a: 'About 100 calories per piece pan-fried, so a typical plate of 3 is around 300. Steamed and uncrisped, each piece is closer to 70, making a plate about 220.' },
      { q: 'Is turnip cake the same as radish cake?', a: 'Yes. Lo bak go is translated as both turnip cake and radish cake, but it is made with Chinese white radish (daikon), not turnip. The nutrition is the same whichever name the menu uses.' }
    ],
    related: ['wu-kok', 'har-gao', 'spring-rolls'],
  },
  {
    slug: 'wu-kok',
    name: 'Wu Kok',
    category: 'dimsum',
    serving: '2 pieces',
    servingGrams: 120,
    calories: 300,
    protein: 4,
    carbs: 30,
    fat: 18,
    metaDescription: 'Two wu kok (fried taro puffs) are about 300 calories. The deep-fried yam dumpling broken down, with macros and why it is the heaviest item on the trolley.',
    summary: 'Deep-fried taro puffs with a lacy, crispy shell and savoury pork mince inside. Delicious, and the heaviest thing on the trolley.',
    answer: 'Two wu kok (the deep-fried taro or yam puffs with the lacy crispy outside) are about 300 calories, roughly 150 each. The crispy honeycomb shell is mashed taro mixed with fat then deep-fried, so it soaks up oil. It is one of the most calorie-dense things on the dim sum trolley, and the filling of seasoned pork only adds to it.',
    realTalk: [
      'Wu kok is the one to be careful with bro. That gorgeous lacy crispy shell does not happen for free. It is mashed taro bound with fat, then deep-fried, and deep-fried mashed starch drinks oil like nothing else. One single puff is around 150 calories. Two and you are at 300, for what feels like a light, airy snack.',
      'I am not saying never eat it. It is genuinely one of the best-tasting things on the trolley. I am saying respect it. This is the opposite of har gao. Same 300 calories gets you nearly six prawn dumplings full of protein, or two taro puffs that are mostly oil and starch. Pick your spots.'
    ],
    lighter: [
      'Limit it to one piece if the table has ordered it. One wu kok as a treat is fine, the whole basket is not.',
      'Balance it. If you are having fried wu kok, make the rest of your order steamed dumplings to keep the meal in check.',
      'Let it drain on the paper for a minute before eating. It will not save much, but the looser oil does come off.'
    ],
    components: [
      { name: 'Deep-fried taro shell (2)', grams: 90, calories: 230 },
      { name: 'Pork mince filling', grams: 30, calories: 70 }
    ],
    portions: [
      { label: '1 piece', calories: 150 },
      { label: '2 pieces', calories: 300 },
      { label: '3 pieces', calories: 450 }
    ],
    faq: [
      { q: 'Why is wu kok so high in calories?', a: 'The crispy lacy shell is mashed taro bound with fat and then deep-fried, so it absorbs a lot of oil. That is why a single taro puff is around 150 calories despite feeling light and airy.' },
      { q: 'Is wu kok the unhealthiest dim sum?', a: 'It is one of the heaviest. Deep-fried items like wu kok and fried wonton carry the most calories per bite. If you are watching it, balance one puff against mostly steamed orders.' },
      { q: 'What is wu kok made of?', a: 'Mashed taro (yam) formed into a shell around a savoury pork mince filling, then deep-fried until the outside turns into a crispy honeycomb lace. The taro shell is where most of the calories sit.' }
    ],
    related: ['lo-bak-go', 'spring-rolls', 'fried-wonton'],
  },
  {
    slug: 'liu-sha-bao',
    name: 'Liu Sha Bao',
    category: 'dimsum',
    serving: '1 bun',
    servingGrams: 70,
    calories: 190,
    protein: 5,
    carbs: 24,
    fat: 9,
    metaDescription: 'One liu sha bao (salted egg custard bun) is about 190 calories. The molten salted-yolk lava bun broken down, with macros and honest ordering tips.',
    summary: 'The molten salted egg custard bun. That golden lava centre is sugar, butter and salted yolk, so it punches above its size.',
    answer: 'One liu sha bao (the steamed bun with the molten salted egg yolk custard) is about 190 calories. The bun is light, but the lava filling is made with salted egg yolk, butter, sugar and custard powder, which is rich and calorie-dense. For a small bun it carries more fat and sugar than you would guess from the size.',
    realTalk: [
      'Liu sha bao is the influencer darling of dim sum now bro, that money shot of the golden lava pouring out. And yeah it is incredible. But understand what that lava is: salted egg yolk, butter, sugar and custard powder. That is basically a dessert filling. One small bun is around 190 calories, and the fat-and-sugar density is high for the size.',
      'It is a treat, full stop. Do not file it next to har gao in your head as just another steamed thing. The bun being steamed does not make the molten butter-and-yolk centre light. One is a nice end to the meal. Three of them is a dessert course you did not account for.'
    ],
    lighter: [
      'Treat it as dessert and have one. The filling is rich enough that one usually satisfies.',
      'If you are also eating egg tarts, pick one or the other. Both are sweet, fatty finishers and they double up fast.',
      'Eat it fresh and slow. It is rich, so giving it a moment helps you stop at one rather than reaching for the next.'
    ],
    components: [
      { name: 'Steamed bun dough', grams: 40, calories: 90 },
      { name: 'Salted yolk custard lava', grams: 30, calories: 100 }
    ],
    portions: [
      { label: '1 bun', calories: 190 },
      { label: '2 buns', calories: 380 },
      { label: '3 buns', calories: 570 }
    ],
    faq: [
      { q: 'How many calories in liu sha bao?', a: 'About 190 calories for one salted egg custard bun. The bun is light but the molten centre is made with salted yolk, butter and sugar, so it is richer than its size suggests.' },
      { q: 'Is liu sha bao unhealthy?', a: 'It is a treat rather than an everyday food. The lava filling is high in fat and sugar, so it behaves more like a dessert. One is fine, but it is easy to eat several without noticing the calories.' },
      { q: 'What is inside a salted egg custard bun?', a: 'A molten custard made from salted duck egg yolk, butter, sugar and custard powder, wrapped in a soft steamed bun. That rich filling is where most of the calories come from.' }
    ],
    related: ['char-siew-bao', 'lo-mai-kai', 'siew-mai'],
  },
  {
    slug: 'xiao-long-bao',
    name: 'Xiao Long Bao',
    category: 'dimsum',
    serving: '1 basket (5 pieces)',
    servingGrams: 150,
    calories: 320,
    protein: 15,
    carbs: 30,
    fat: 15,
    metaDescription: 'A basket of 5 xiao long bao is about 320 calories. The Shanghai soup dumpling broken down, with macros and why the broth inside counts too.',
    summary: 'Shanghai soup dumplings with hot broth sealed inside. Thin skin, pork filling, and a mouthful of rich soup each.',
    answer: 'A basket of 5 xiao long bao (the Shanghai soup dumplings) is about 320 calories, roughly 65 each. Each one is a thin wheat skin around minced pork and a pocket of rich, gelatin-set broth that melts into soup when steamed. The pork and the broth are both fatty, so they are heavier than they look for such delicate little dumplings.',
    realTalk: [
      'Xiao long bao feels light because the skin is so thin and the whole thing is one elegant bite bro. But that soup inside is not water, it is rich pork broth set with gelatin and fat, and the filling is fatty pork mince. A basket of 5 is around 320 calories. Not crazy, but more than the delicate look suggests.',
      'It is still a decent order. You get 15g of protein from the pork, it is steamed, and it is genuinely satisfying because the hot broth makes each one feel substantial. Just do not treat a couple of baskets as a light snack. Two baskets is 640 calories, which is a full meal, soup dumplings or not.'
    ],
    lighter: [
      'One basket plus a side of greens is a tidy, protein-led meal. You do not need three baskets.',
      'Go easy on the black vinegar and ginger only if sodium is your concern. Calorie-wise the dip is nearly free, so that part is fine.',
      'Skip the fried sides that often come with it. The dumplings themselves are the sensible part of the order.'
    ],
    components: [
      { name: 'Pork filling (5)', grams: 75, calories: 170 },
      { name: 'Broth jelly', grams: 30, calories: 70 },
      { name: 'Thin wheat skin (5)', grams: 45, calories: 80 }
    ],
    portions: [
      { label: '3 pieces', calories: 190 },
      { label: '1 basket (5)', calories: 320 },
      { label: '2 baskets (10)', calories: 640 }
    ],
    faq: [
      { q: 'Are xiao long bao healthy?', a: 'They are a reasonable steamed option with about 15g of protein per basket of 5. They are not as light as they look though, because the filling and the soup inside are both fatty pork, putting a basket around 320 calories.' },
      { q: 'How many calories in one xiao long bao?', a: 'About 65 calories each, so a typical basket of 5 is around 320. The hidden part is the broth, which is rich pork stock set with gelatin, not plain water.' },
      { q: 'Is the soup inside xiao long bao high in calories?', a: 'It adds up. The soup is concentrated pork broth set into jelly with natural fat, so it is more calorie-dense than it seems. It is part of why these are heavier than their delicate size suggests.' }
    ],
    related: ['har-gao', 'siew-mai', 'steamed-pork-ribs'],
  },
  {
    slug: 'chicken-feet',
    name: 'Chicken Feet (Phoenix Claws)',
    category: 'dimsum',
    serving: '1 plate (about 6)',
    servingGrams: 150,
    calories: 280,
    protein: 18,
    carbs: 8,
    fat: 20,
    metaDescription: 'A plate of dim sum chicken feet is about 280 calories. The braised phoenix claws broken down, with macros and why the skin makes them fattier than they look.',
    summary: 'Braised, deep-fried then steamed chicken feet in a sweet-savoury black bean sauce. More fat and skin than meat.',
    answer: 'A plate of dim sum chicken feet (phoenix claws) is about 280 calories. They are usually deep-fried first to puff the skin, then braised and steamed in a sweet black bean and soy sauce. There is not much actual meat on a chicken foot. It is mostly skin, cartilage and collagen, so despite the small size they carry a fair bit of fat.',
    realTalk: [
      'Chicken feet are a funny one bro. People assume they are light because there is barely any meat on them, but that is exactly the problem. What is there is mostly skin and cartilage, and the skin is fat. On top of that the classic prep deep-fries them first to get the puffy texture, then braises them in a sweet, slightly oily sauce.',
      'So a plate ends up around 280 calories, and a big chunk of that is fat from the skin plus sugar from the sauce. You do get decent protein from the collagen, around 18g, so it is not empty. Just do not assume that because you are gnawing tiny bones you are eating light. The sauce and the skin tell a different story.'
    ],
    lighter: [
      'Enjoy them, but count them honestly as a fattier item, not a free protein nibble.',
      'Scrape off some of the thick sweet sauce if you want to trim a little sugar and oil.',
      'Pair them with steamed greens or har gao so the meal is not all rich, fatty plates.'
    ],
    components: [
      { name: 'Chicken feet, skin and cartilage', grams: 120, calories: 230 },
      { name: 'Black bean and soy sauce', grams: 30, calories: 50 }
    ],
    portions: [
      { label: '3 pieces', calories: 140 },
      { label: 'Plate (about 6)', calories: 280 },
      { label: 'Large plate', calories: 380 }
    ],
    faq: [
      { q: 'Are chicken feet high in calories?', a: 'For their size, yes. A dim sum plate is around 280 calories. There is little meat, so most of what you eat is skin and cartilage, and the skin plus the sweet braising sauce make them fattier than they look.' },
      { q: 'Do chicken feet have protein?', a: 'About 18g per plate, mostly from collagen and connective tissue. It is real protein, but it comes packaged with a lot of fat from the skin, so the calories ride along with it.' },
      { q: 'Are dim sum chicken feet deep-fried?', a: 'Usually yes. The classic method deep-fries them to puff the skin, then braises and steams them in black bean sauce. That first frying step is part of why they are more calorie-dense than expected.' }
    ],
    related: ['steamed-pork-ribs', 'siew-mai', 'har-gao'],
  },
  {
    slug: 'spring-rolls',
    name: 'Spring Rolls (Chun Guen)',
    category: 'dimsum',
    serving: '2 rolls',
    servingGrams: 100,
    calories: 260,
    protein: 6,
    carbs: 26,
    fat: 14,
    metaDescription: 'Two fried spring rolls are about 260 calories. The crispy chun guen broken down, with macros and how it compares to fresh popiah.',
    summary: 'Crispy deep-fried spring rolls with a veg and sometimes prawn filling. The crunch comes straight from the fryer.',
    answer: 'Two fried spring rolls (chun guen) are about 260 calories, roughly 130 each. The filling is usually shredded vegetables with a little prawn or pork, which is light enough on its own. The calories come from the wrapper soaking up oil in the deep fryer. The crispier the roll, the more oil it has taken on.',
    realTalk: [
      'Spring rolls are the classic everyone forgets to count bro. The filling is just veg and a bit of prawn, so people think light. But the whole point of a spring roll is the deep-fried crispy wrapper, and a thin wrapper deep-fried is basically an oil sponge. Two rolls land around 260 calories, mostly from that.',
      'If you want the same idea without the fryer, fresh popiah is the move, soft skin, same kind of filling, no deep frying. That said, a couple of fried spring rolls as part of a bigger order is not the end of the world. Just remember it is a fried item and budget it like one, not like a plate of vegetables.'
    ],
    lighter: [
      'Go for fresh popiah instead if you want the filling without the deep-fried wrapper. Big calorie saving.',
      'Stick to two rolls and make them the only fried thing on the table.',
      'Let them drain on the paper and skip dunking them in extra sweet chilli sauce.'
    ],
    components: [
      { name: 'Vegetable and prawn filling', grams: 55, calories: 70 },
      { name: 'Deep-fried wrapper (2)', grams: 45, calories: 190 }
    ],
    portions: [
      { label: '1 roll', calories: 130 },
      { label: '2 rolls', calories: 260 },
      { label: '4 rolls', calories: 520 }
    ],
    faq: [
      { q: 'How many calories in a fried spring roll?', a: 'About 130 calories each, so two rolls is around 260. The filling is light, but the deep-fried wrapper absorbs a lot of oil, which is where most of the calories come from.' },
      { q: 'Are spring rolls or popiah lighter?', a: 'Fresh popiah is much lighter because the skin is soft and not fried. A fried spring roll has a similar filling but the deep-fried wrapper can double the calories. Choose popiah if you are watching it.' },
      { q: 'Are spring rolls bad for weight loss?', a: 'They are not ideal because they are deep-fried, but two as part of a balanced order are fine. The trap is treating them as a vegetable dish. Count them as the fried item they are.' }
    ],
    related: ['wu-kok', 'popiah', 'lo-bak-go'],
  },
  {
    slug: 'steamed-pork-ribs',
    name: 'Steamed Pork Ribs',
    category: 'dimsum',
    serving: '1 small plate',
    servingGrams: 120,
    calories: 200,
    protein: 16,
    carbs: 6,
    fat: 12,
    metaDescription: 'A plate of dim sum steamed pork ribs is about 200 calories. The black bean spare ribs broken down, with macros and why they are a smart order.',
    summary: 'Bite-sized pork ribs steamed in garlic and black bean sauce. High protein, no deep frying, one of the smarter picks.',
    answer: 'A small plate of dim sum steamed pork ribs (the bite-sized spare ribs in black bean and garlic sauce) is about 200 calories. They are steamed, not fried, and they are genuinely meat, so for the calories you get a solid hit of protein. The main thing to watch is the fattier cuts and the oil in the sauce, but overall this is one of the better-value orders.',
    realTalk: [
      'Steamed pork ribs are an underrated smart order bro. No batter, no deep frying, just bite-sized pork steamed in garlic and black bean sauce. A small plate is around 200 calories and gives you a proper 16g of protein. That ratio is good, the kind of thing you want more of when you are trying to stay full on fewer calories.',
      'The only catch is the cut. These are usually fatty rib pieces, so there is fat marbled in, and the sauce has a bit of oil. But compared to a fried taro puff or a sweet bun, this is the kind of plate you can lean on. Order this and the steamed dumplings, go easy on the fried trolley, and you have eaten well.'
    ],
    lighter: [
      'Make this one of your protein anchors alongside har gao and siew mai.',
      'Pick the meatier pieces over the pure fat-and-bone ones if you are choosing off the plate.',
      'Spoon the ribs out and leave most of the pooled oil behind in the dish.'
    ],
    components: [
      { name: 'Pork rib pieces', grams: 100, calories: 170 },
      { name: 'Black bean and garlic sauce', grams: 20, calories: 30 }
    ],
    portions: [
      { label: 'Half plate', calories: 100 },
      { label: '1 small plate', calories: 200 },
      { label: 'Large plate', calories: 300 }
    ],
    faq: [
      { q: 'Are steamed pork ribs a good dim sum choice?', a: 'Yes, one of the better ones. They are steamed rather than fried and they are real meat, giving about 16g of protein for roughly 200 calories a plate. That is a strong ratio for dim sum.' },
      { q: 'Why are dim sum pork ribs fatty?', a: 'They use small, fattier rib cuts so the meat stays tender when steamed. The fat marbling plus a little oil in the black bean sauce is where most of the calories sit, but it is still a lean order by dim sum standards.' },
      { q: 'How much protein is in dim sum pork ribs?', a: 'About 16g per small plate, almost all from the pork. Combined with the low carbs, that makes steamed ribs one of the more protein-dense things on the trolley.' }
    ],
    related: ['siew-mai', 'chicken-feet', 'xiao-long-bao'],
  },
];

db.foods = db.foods.concat(NEW);
fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log('Added ' + NEW.length + ' dim sum foods. Total now ' + db.foods.length + '.');
