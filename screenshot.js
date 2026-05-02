const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urls = [
  { name: 'home', url: 'https://cosulagi.id/' },
  { name: 'search', url: 'https://cosulagi.id/search' },
  { name: 'blog', url: 'https://cosulagi.id/blog' },
  { name: 'merchant', url: 'https://merchant.cosulagi.id/' }
];

const outDir = path.join(__dirname, 'caveman');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const { name, url } of urls) {
    try {
      console.log(`Visiting ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: false });
      console.log(`Saved screenshot for ${name}`);
    } catch (err) {
      console.error(`Failed to screenshot ${url}:`, err.message);
    }
  }

  await browser.close();
})();
