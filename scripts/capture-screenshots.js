const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer-core');

const PORT = 3333;
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Simple HTTP static file server
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0].split('#')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(ROOT_DIR, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

async function main() {
  server.listen(PORT, async () => {
    console.log(`Static server running on http://localhost:${PORT}`);

    // Detect Chrome or Edge executable
    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ];

    let executablePath = chromePaths.find(p => fs.existsSync(p));
    if (!executablePath) {
      console.error('No suitable Chrome or Edge browser found');
      server.close();
      process.exit(1);
    }

    console.log(`Launching browser: ${executablePath}`);
    const browser = await puppeteer.launch({
      executablePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();

    const targets = [
      { name: 'home', hash: '#home' },
      { name: 'schedule', hash: '#schedule' },
      { name: 'map', hash: '#map' },
      { name: 'safety', hash: '#safety' }
    ];

    // 1. Desktop captures (1280x900)
    console.log('\n--- Capturing Desktop Screenshots (1280x900) ---');
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1.5 });

    for (const t of targets) {
      const url = `http://localhost:${PORT}/${t.hash}`;
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 800)); // allow i18n & transitions
      const outPath = path.join(SCREENSHOTS_DIR, `${t.name}-desktop.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved: ${outPath}`);
    }

    // 2. Mobile captures (390x844 - iPhone / Modern Android)
    console.log('\n--- Capturing Mobile Screenshots (390x844) ---');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

    for (const t of targets) {
      const url = `http://localhost:${PORT}/${t.hash}`;
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 800));
      const outPath = path.join(SCREENSHOTS_DIR, `${t.name}-mobile.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved: ${outPath}`);
    }

    await browser.close();
    server.close();
    console.log('\nAll 8 screenshots successfully captured!');
  });
}

main().catch(err => {
  console.error('Fatal error during capture:', err);
  if (server) server.close();
  process.exit(1);
});
