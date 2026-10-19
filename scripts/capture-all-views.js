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

  // 1. Desktop Hero (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'hero-clean-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 620 }
  });
  console.log('Saved: hero-clean-desktop.png');

  // 2. Leadership Section (Desktop)
  const leadershipEl = await page.$('#leadership-section');
  if (leadershipEl) {
    const box = await leadershipEl.boundingBox();
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'leadership-7-cards-desktop.png'),
      clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 10), width: 1440, height: box.height + 40 }
    });
    console.log('Saved: leadership-7-cards-desktop.png');
  }

  // 3. English Mode Desktop Full Page
  await page.evaluate(() => {
    document.querySelector('[data-lang-choice="en"]')?.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'home-english-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });
  console.log('Saved: home-english-desktop.png');

  // 4. Hindi Mode Desktop Full Page
  await page.evaluate(() => {
    document.querySelector('[data-lang-choice="hi"]')?.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'home-hindi-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });
  console.log('Saved: home-hindi-desktop.png');

  // Switch back to Marathi
  await page.evaluate(() => {
    document.querySelector('[data-lang-choice="mr"]')?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 5. Schedule Page
  await page.goto('http://localhost:3000/#schedule', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'schedule-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1000 }
  });
  console.log('Saved: schedule-desktop.png');

  // 6. Map Page
  await page.goto('http://localhost:3000/#map', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'map-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });
  console.log('Saved: map-desktop.png');

  // 7. Safety Page
  await page.goto('http://localhost:3000/#safety', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'safety-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });
  console.log('Saved: safety-desktop.png');

  // 8. Mobile View (390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'home-mobile.png')
  });
  console.log('Saved: home-mobile.png');

  await browser.close();
  console.log('All verification captures completed!');
}

run().catch(console.error);
