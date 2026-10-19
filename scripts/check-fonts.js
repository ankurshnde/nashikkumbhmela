const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function checkFonts() {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  let executablePath = chromePaths.find(p => fs.existsSync(p));
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Initial (Marathi)
  const fontMr = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
  console.log('Marathi body font-family:', fontMr);

  // 2. Hindi
  await page.evaluate(() => {
    const btn = document.querySelector('[data-lang-choice="hi"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const fontHi = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
  console.log('Hindi body font-family:', fontHi);

  // 3. English
  await page.evaluate(() => {
    const btn = document.querySelector('[data-lang-choice="en"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const fontEn = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
  console.log('English body font-family:', fontEn);

  await browser.close();
}

checkFonts().catch(console.error);
