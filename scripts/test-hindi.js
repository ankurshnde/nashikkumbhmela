const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

async function testHindi() {
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
  await page.setViewport({ width: 1440, height: 900 });

  // Listen for any console errors or page exceptions
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Switch to Hindi
  console.log('--- Switching to Hindi (hi) ---');
  await page.evaluate(() => {
    const btn = document.querySelector('[data-lang-choice="hi"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Check key headings and dynamic components
  const pageData = await page.evaluate(() => {
    return {
      title: document.title,
      heroHeading: document.querySelector('#hero-main-title')?.textContent.trim(),
      heroDates: document.querySelector('[data-i18n="hero.dates"]')?.textContent.trim(),
      scheduleHeading: document.querySelector('#home-schedule-heading')?.textContent.trim(),
      firstLeaderName: document.querySelector('[data-i18n="leadership.modiName"]')?.textContent.trim(),
      firstLeaderTitle: document.querySelector('[data-i18n="leadership.modiTitle"]')?.textContent.trim(),
      thirdLeaderName: document.querySelector('[data-i18n="leadership.shindeName"]')?.textContent.trim(),
      thirdLeaderTitle: document.querySelector('[data-i18n="leadership.shindeTitle"]')?.textContent.trim(),
      firstSnanTip: document.querySelector('.pro-tip-text')?.textContent.trim() || 'none'
    };
  });

  console.log('Hindi Page Verification:');
  console.log(JSON.stringify(pageData, null, 2));

  if (pageErrors.length > 0) {
    console.error('Page errors encountered in Hindi mode:', pageErrors);
  } else {
    console.log('SUCCESS: Zero console or runtime errors in Hindi mode!');
  }

  await browser.close();
}

testHindi().catch(console.error);
