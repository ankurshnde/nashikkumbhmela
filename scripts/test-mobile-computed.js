const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const p = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({ executablePath: p, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const rules = await page.evaluate(() => {
    const el = document.querySelector('header a[href*="digitalindia"]');
    if (!el) return 'Not found';
    
    // Find all matching CSS rules
    const matched = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (el.matches(rule.selectorText)) {
            matched.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }
    return {
      classList: el.className,
      computedDisplay: window.getComputedStyle(el).display,
      matchedRules: matched
    };
  });
  console.log(JSON.stringify(rules, null, 2));
  await browser.close();
})();
