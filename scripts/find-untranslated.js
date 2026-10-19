const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Use regex to find text content between tags that contain Devanagari
const tagContentRegex = />([^<]+)</g;
let match;
let untranslated = [];

while ((match = tagContentRegex.exec(html)) !== null) {
  const text = match[1].trim();
  // Check if contains Devanagari characters
  if (/[\u0900-\u097F]/.test(text)) {
    // Find the opening tag before this text
    const beforeIndex = match.index;
    const lastOpenTag = html.lastIndexOf('<', beforeIndex);
    const tagSnippet = html.substring(lastOpenTag, beforeIndex + 1);
    
    // Check if the opening tag has data-i18n
    if (!tagSnippet.includes('data-i18n') && !tagSnippet.includes('<!--') && !tagSnippet.includes('<style') && !tagSnippet.includes('<script')) {
      // Find line number
      const lineNum = html.substring(0, beforeIndex).split('\n').length;
      untranslated.push({ line: lineNum, text, tag: tagSnippet });
    }
  }
}

console.log(`Found ${untranslated.length} untranslated text nodes:`);
untranslated.slice(0, 50).forEach(u => console.log(`L${u.line}: "${u.text}" in ${u.tag}`));
