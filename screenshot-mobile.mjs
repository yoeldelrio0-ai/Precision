import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/yoeld/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await page.screenshot({ path: './temporary screenshots/mobile-header-diag.png', clip: { x: 0, y: 0, width: 390, height: 200 } });
await browser.close();
console.log('Done: mobile-header-diag.png');
