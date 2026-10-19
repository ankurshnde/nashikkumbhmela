const fs = require('fs');
const path = require('path');

// 1. CLEAN LOCALES
const locales = ['mr', 'hi', 'en'];
locales.forEach(lang => {
  const file = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
  let content = fs.readFileSync(file, 'utf8');

  // Remove specific emojis and symbols
  content = content
    .replace(/📱\s*/g, '')
    .replace(/🔍\s*/g, '')
    .replace(/✍️?\s*/g, '')
    .replace(/🕉️?\s*/g, '')
    .replace(/🗓️?\s*/g, '')
    .replace(/🅿️?\s*/g, '')
    .replace(/🚑\s*/g, '')
    .replace(/🖨️?\s*/g, '')
    .replace(/💡\s*/g, '')
    .replace(/\s*➔/g, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Cleaned emojis from ${lang}.json`);
});

// 2. CLEAN TRANSPORT DATA
const transFile = path.join(__dirname, '..', 'src', 'data', 'transport.json');
let transContent = fs.readFileSync(transFile, 'utf8');
transContent = transContent.replace(/➔/g, 'ते');
fs.writeFileSync(transFile, transContent, 'utf8');
console.log('Cleaned transport.json');

// 3. CLEAN JS APP.JS
const appFile = path.join(__dirname, '..', 'src', 'js', 'app.js');
let appContent = fs.readFileSync(appFile, 'utf8');
appContent = appContent
  .replace(/<span>☀️<\/span>/g, '<svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>')
  .replace(/<span>🌓<\/span>/g, '<svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0-18a9 9 0 019 9 9 9 0 01-9 9m0-18a9 9 0 00-9 9 9 9 0 009 9z"/></svg>')
  .replace(/pauseBtn\.innerHTML = '▶';/g, "pauseBtn.innerHTML = '<svg class=\"w-3 h-3\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M8 5v14l11-7z\"/></svg>';")
  .replace(/pauseBtn\.innerHTML = '⏸';/g, "pauseBtn.innerHTML = '<svg class=\"w-3 h-3\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M6 19h4V5H6v14zm8-14v14h4V5h-4z\"/></svg>';")
  .replace(/💡\s*/g, '')
  .replace(/🕉️?\s*/g, '');

fs.writeFileSync(appFile, appContent, 'utf8');
console.log('Cleaned emojis from app.js');
