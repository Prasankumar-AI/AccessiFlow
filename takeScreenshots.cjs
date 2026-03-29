const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const assetsDir = path.join(__dirname, 'doc_assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  const url = 'https://accessiflow-landing-643526693397.us-central1.run.app';
  
  console.log('Navigating to ' + url);
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  console.log('Capturing Home...');
  await page.screenshot({ path: path.join(assetsDir, 'home.png'), fullPage: true });

  console.log('Capturing Modal...');
  await page.click('button[aria-label="Book a Demo"]');
  await delay(1000); // let animation finish
  await page.screenshot({ path: path.join(assetsDir, 'modal.png') });
  await page.click('button[aria-label="Close modal"]'); // close it
  await delay(500);

  console.log('Capturing Dashboard Scan...');
  await page.click('button[aria-label="Start Free Scan"]');
  await delay(1000); // let animation finish
  await page.type('input[type="url"]', 'https://example.com');
  await page.click('button[type="submit"]');
  await delay(1000); // let scan animation show mid-progress
  await page.screenshot({ path: path.join(assetsDir, 'dashboard.png') });

  await browser.close();
  console.log('Screenshots saved!');
})();
