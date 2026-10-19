const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27EF}\u{2300}-\u{23FF}\u{2B50}\u{25B6}\u{23F8}\u{0950}]/gu;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.git', 'screenshots', 'dist'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (/\.(html|js|json)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        const matches = l.match(emojiRegex);
        if (matches) {
          console.log(`${full}:${idx + 1} [${matches.join(' ')}] ${l.trim().slice(0, 90)}`);
        }
      });
    }
  }
}

scanDir('.');
