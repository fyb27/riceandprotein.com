#!/usr/bin/env node
/*
 * indexnow.js
 * Pings IndexNow (Bing, Yandex, Naver, Seznam share the endpoint) with the
 * URLs that changed, so Bing does not have to be told by hand after a deploy.
 * The key file lives at the repo root and is public by design.
 *
 *   node scripts/indexnow.js                 html files changed in HEAD
 *   node scripts/indexnow.js --since <sha>   html files changed since <sha>
 *   node scripts/indexnow.js --all           every URL in sitemap.xml
 *   node scripts/indexnow.js foods/pho-bo.html foods.html   explicit paths
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'riceandprotein.com';
const KEY = fs.readdirSync(ROOT).find(f => /^[0-9a-f]{32}\.txt$/.test(f));
if (!KEY) { console.error('no IndexNow key file at repo root'); process.exit(1); }
const key = KEY.replace('.txt', '');

const args = process.argv.slice(2);
let files = [];
if (args[0] === '--all') {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  files = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
} else if (args[0] === '--since') {
  files = execSync(`git diff --name-only ${args[1]} HEAD`, { cwd: ROOT }).toString().split(/\r?\n/);
} else if (args.length) {
  files = args;
} else {
  files = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { cwd: ROOT }).toString().split(/\r?\n/);
}

const urls = [...new Set(files
  .map(f => f.trim())
  .filter(f => f && (f.startsWith('http') || (f.endsWith('.html') && !f.startsWith('posts/'))))
  .map(f => f.startsWith('http') ? f : `https://${HOST}/${f.split('\\').join('/').replace(/^index\.html$/, '')}`)
)];

if (!urls.length) { console.log('IndexNow: nothing to submit'); process.exit(0); }

(async () => {
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${KEY}`, urlList: batch })
    });
    console.log(`IndexNow: ${batch.length} URLs -> HTTP ${res.status}`);
    if (res.status >= 400) { console.error(await res.text()); process.exit(1); }
  }
})();
