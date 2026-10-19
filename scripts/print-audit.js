const results = require('./audit-results.json');
const noI18n = results.filter(r => !r.dataI18n);
console.log('Items without dataI18n:', noI18n.length);
noI18n.forEach((item, idx) => {
  console.log('[' + (idx + 1) + '] <' + item.path + '>: ' + item.text);
});
