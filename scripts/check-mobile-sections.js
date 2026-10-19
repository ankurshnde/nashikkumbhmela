const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const p = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({ executablePath: p, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Citizen services
  const quick = await page.$('#quick-services-heading');
  if (quick) {
    const parent = await quick.evaluateHandle(el => el.closest('section'));
    await parent.screenshot({ path: 'screenshots/mobile-check-quick-services.png' });
  }

  // 2. Schedule preview
  const sched = await page.$('#home-schedule-preview');
  if (sched) {
    const parent = await sched.evaluateHandle(el => el.closest('section'));
    await parent.screenshot({ path: 'screenshots/mobile-check-schedule.png' });
  }

  // 3. Heritage cards
  const heritage = await page.$('#heritage-heading');
  if (heritage) {
    const parent = await heritage.evaluateHandle(el => el.closest('section'));
    await parent.screenshot({ path: 'screenshots/mobile-check-heritage.png' });
  }

  // 4. Open search modal and capture
  await page.click('#header-search-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'screenshots/mobile-check-search-modal.png' });
  await page.click('#close-search-modal');
  await new Promise(r => setTimeout(r, 400));

  // 5. Open KumbhDoot AI modal and capture
  await page.click('#header-kumbhdoot-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'screenshots/mobile-check-ai-modal.png' });

  await browser.close();
  console.log('Mobile section checks captured');
})();
