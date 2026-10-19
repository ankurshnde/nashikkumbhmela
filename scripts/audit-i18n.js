const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

async function main() {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  let executablePath = chromePaths.find(p => fs.existsSync(p));
  if (!executablePath) {
    console.error('No Chrome/Edge found');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Test English
  console.log('--- Testing English Language (en) ---');
  await page.evaluate(() => {
    const btn = document.querySelector('[data-lang-choice="en"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const devanagariInEn = await page.evaluate(() => {
    const devanagariRegex = /[\u0900-\u097F]/;
    const results = [];
    
    // Ignore the language switcher buttons themselves ("मराठी", "हिन्दी")
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.hasAttribute('data-lang-choice')) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, noscript')) return NodeFilter.FILTER_REJECT;
        return devanagariRegex.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      // Get CSS path
      let path = parent.tagName.toLowerCase();
      if (parent.id) path += '#' + parent.id;
      if (parent.className) path += '.' + parent.className.split(' ').slice(0, 2).join('.');
      results.push({
        text: node.nodeValue.trim(),
        path,
        dataI18n: parent.getAttribute('data-i18n') || parent.closest('[data-i18n]')?.getAttribute('data-i18n') || null
      });
    }
    return results;
  });

  console.log(`Found ${devanagariInEn.length} Devanagari text nodes in English mode:`);
  fs.writeFileSync(path.join(__dirname, 'audit-results.json'), JSON.stringify(devanagariInEn, null, 2));
  console.log('Written to scripts/audit-results.json');
  await browser.close();
}

main().catch(console.error);
