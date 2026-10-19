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

  // 1. Header with Digital India Logo
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'header-digital-india.png'),
    clip: { x: 0, y: 0, width: 1440, height: 160 }
  });
  console.log('Saved: header-digital-india.png');

  // 2. Footer with Digital India & National Portals Strip
  const footerEl = await page.$('footer');
  if (footerEl) {
    const box = await footerEl.boundingBox();
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'footer-digital-india.png'),
      clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: box.height }
    });
    console.log('Saved: footer-digital-india.png');
  }

  // 3. About page view
  await page.goto('http://localhost:3000/#about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'about-digital-india.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Saved: about-digital-india.png');

  await browser.close();
  console.log('Digital India verification screenshots captured!');
}

capture().catch(console.error);
