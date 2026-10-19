const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

async function capture() {
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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Header & Hero (showing prototype notice, tightened header, refined headline, recognizable crowd photo)
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'refined-01-header-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 620 }
  });
  console.log('Saved: refined-01-header-hero.png');

  // 2. Metrics Ribbon & Leadership Section
  const leadershipEl = await page.$('#leadership-section');
  if (leadershipEl) {
    const box = await leadershipEl.boundingBox();
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'refined-02-leadership-section.png'),
      clip: { x: 0, y: Math.max(0, box.y - 60), width: 1440, height: box.height + 70 }
    });
    console.log('Saved: refined-02-leadership-section.png');
  }

  // 3. Citizen Services Tiles
  const servicesEl = await page.$('#quick-services-heading');
  if (servicesEl) {
    const box = await servicesEl.boundingBox();
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'refined-03-citizen-services.png'),
      clip: { x: 0, y: Math.max(0, box.y - 40), width: 1440, height: 380 }
    });
    console.log('Saved: refined-03-citizen-services.png');
  }

  // 4. Schedule View (Provisional Labels)
  await page.goto('http://localhost:3000/#schedule', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'refined-04-schedule-provisional.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 }
  });
  console.log('Saved: refined-04-schedule-provisional.png');

  // 5. English View of Header & Hero
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    document.querySelector('[data-lang-choice="en"]')?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'refined-05-hero-english.png'),
    clip: { x: 0, y: 0, width: 1440, height: 620 }
  });
  console.log('Saved: refined-05-hero-english.png');

  // 6. Footer with Disclaimer
  const footerEl = await page.$('footer');
  if (footerEl) {
    const box = await footerEl.boundingBox();
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'refined-06-footer-disclaimer.png'),
      clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: box.height }
    });
    console.log('Saved: refined-06-footer-disclaimer.png');
  }

  await browser.close();
  console.log('All refinement screenshots captured successfully!');
}

capture().catch(console.error);
