import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/yoeld/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

const header = await page.$('#site-header');
const clip = await header.boundingBox();
await page.screenshot({ path: 'temporary screenshots/header-zoom.png', clip: { x: clip.x, y: clip.y, width: clip.width, height: clip.height } });
await browser.close();
console.log('Saved header-zoom.png');
