import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/yoeld/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const queries = [
  'https://unsplash.com/s/photos/concrete-patio',
  'https://unsplash.com/s/photos/stone-wall-masonry',
  'https://unsplash.com/s/photos/brick-wall-closeup',
  'https://unsplash.com/s/photos/concrete-flatwork',
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36');

for (const url of queries) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const ids = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="images.unsplash.com"]'));
    return imgs.map(img => {
      const match = img.src.match(/photo-[\w-]+/);
      return match ? match[0] : null;
    }).filter(Boolean).slice(0, 8);
  });

  console.log(`\n=== ${url} ===`);
  ids.forEach(id => console.log(id));
}

await browser.close();
