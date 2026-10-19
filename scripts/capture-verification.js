const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
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

  // 1. Desktop Header & Hero in Marathi (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '01-header-hero-marathi.png'),
    clip: { x: 0, y: 0, width: 1440, height: 600 }
  });
  console.log('Saved: 01-header-hero-marathi.png');

  // 2. Schedule in Marathi with Devanagari Dates
  await page.goto('http://localhost:3000/#schedule', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '02-schedule-devanagari-dates.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved: 02-schedule-devanagari-dates.png');

  // 3. Switch to English - Schedule in English with Latin Dates
  await page.evaluate(() => {
    document.querySelector('[data-lang-choice="en"]')?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '03-schedule-english-dates.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved: 03-schedule-english-dates.png');

  // 4. Header & Hero in English
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '04-header-hero-english.png'),
    clip: { x: 0, y: 0, width: 1440, height: 600 }
  });
  console.log('Saved: 04-header-hero-english.png');

  // 5. Mobile View (390 x 844 iPhone 14 style) - Confirms NO HAMBURGER and unified buttons
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '05-mobile-header-no-hamburger.png'),
    clip: { x: 0, y: 0, width: 390, height: 500 }
  });
  console.log('Saved: 05-mobile-header-no-hamburger.png');

  // 6. Search Modal Opened
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    window.openSearchModal();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '06-search-modal-unified.png')
  });
  console.log('Saved: 06-search-modal-unified.png');

  // 7. High Contrast Mode (Accessibility)
  await page.evaluate(() => {
    window.closeSearchModal();
    document.getElementById('contrast-toggle')?.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '07-high-contrast-accessibility.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved: 07-high-contrast-accessibility.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(console.error);
