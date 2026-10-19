const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function findChrome() {
  const p = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(p)) return p;
  const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  if (fs.existsSync(edge)) return edge;
  return null;
}

(async () => {
  const exe = await findChrome();
  const browser = await puppeteer.launch({ executablePath: exe, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const overflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Overflow check:', overflow);

  const sections = ['#leadership-section', '#quick-services', '#schedule', '#safety', 'footer'];
  for (const s of sections) {
    const el = await page.$(s);
    if (el) {
      await el.screenshot({ path: `screenshots/mobile-${s.replace(/[^a-z0-9]/gi, '_')}.png` });
      console.log('Captured', s);
    }
  }

  await browser.close();
})();
