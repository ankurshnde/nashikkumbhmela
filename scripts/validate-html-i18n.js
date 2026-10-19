const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'locales', 'en.json'), 'utf8'));
const mr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'locales', 'mr.json'), 'utf8'));
const hi = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'locales', 'hi.json'), 'utf8'));

const getNested = (obj, p) => p.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);

const regex = /data-i18n=["']([^"']+)["']/g;
let match;
const missingInEn = new Set();
const missingInMr = new Set();
const missingInHi = new Set();
const found = new Set();

while ((match = regex.exec(html)) !== null) {
  const key = match[1];
  found.add(key);
  if (getNested(en, key) === undefined) missingInEn.add(key);
  if (getNested(mr, key) === undefined) missingInMr.add(key);
  if (getNested(hi, key) === undefined) missingInHi.add(key);
}

console.log('Total unique data-i18n keys in index.html:', found.size);
console.log('Missing in en.json (' + missingInEn.size + '):', Array.from(missingInEn));
console.log('Missing in mr.json (' + missingInMr.size + '):', Array.from(missingInMr));
console.log('Missing in hi.json (' + missingInHi.size + '):', Array.from(missingInHi));
