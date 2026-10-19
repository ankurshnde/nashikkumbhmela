const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const el = await page.$('section[aria-labelledby="leadership-heading"]');
  if (el) {
    await el.screenshot({ path: path.join(__dirname, '../screenshots/leadership-clean.png') });
    console.log('Saved leadership-clean.png');
  }
  await browser.close();
})();
