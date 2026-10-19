const fs = require('fs');

['snan-dates.json', 'notices.json', 'safety.json', 'map-locations.json', 'lost-found.json'].forEach(file => {
  const data = JSON.parse(fs.readFileSync('src/data/' + file, 'utf8'));
  console.log('=== Checking', file, '===');
  
  if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      ['mr', 'hi', 'en'].forEach(lang => {
        if (item.title_mr && !item['title_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing title_${lang}`);
        }
        if (item.name_mr && !item['name_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing name_${lang}`);
        }
        if (item.description_mr && !item['description_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing description_${lang}`);
        }
        if (item.location_mr && !item['location_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing location_${lang}`);
        }
        if (item.tithi_mr && !item['tithi_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing tithi_${lang}`);
        }
        if (item.proTip_mr && !item['proTip_' + lang]) {
          console.log(`[${file}] Item ${idx} (${item.id}) missing proTip_${lang}`);
        }
      });
    });
  } else if (file === 'safety.json') {
    if (data.emergencyNumbers) {
      data.emergencyNumbers.forEach((item, idx) => {
        ['mr', 'hi', 'en'].forEach(lang => {
          if (item.service_mr && !item['service_' + lang]) {
            console.log(`[safety.json] emergency #${idx} missing service_${lang}`);
          }
        });
      });
    }
  }
});
console.log('Check complete.');
