const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'snan-dates.json');
const snanDates = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const localizedData = [
  {
    id: "snan-1",
    date_mr: "३१ ऑक्टोबर २०२६",
    date_hi: "३१ अक्टूबर २०२६",
    date_en: "31 October 2026",
    day_mr: "शनिवार",
    day_hi: "शनिवार",
    day_en: "Saturday"
  },
  {
    id: "snan-2",
    date_mr: "१७ जुलै २०२७",
    date_hi: "१७ जुलाई २०२७",
    date_en: "17 July 2027",
    day_mr: "शनिवार",
    day_hi: "शनिवार",
    day_en: "Saturday"
  },
  {
    id: "snan-3",
    date_mr: "१८ जुलै २०२७",
    date_hi: "१८ जुलाई २०२७",
    date_en: "18 July 2027",
    day_mr: "रविवार",
    day_hi: "रविवार",
    day_en: "Sunday"
  },
  {
    id: "snan-4",
    date_mr: "२९ जुलै २०२७",
    date_hi: "२९ जुलाई २०२७",
    date_en: "29 July 2027",
    day_mr: "गुरुवार",
    day_hi: "गुरुवार",
    day_en: "Thursday"
  },
  {
    id: "snan-5",
    date_mr: "०२ ऑगस्ट २०२७",
    date_hi: "०२ अगस्त २०२७",
    date_en: "02 August 2027",
    day_mr: "सोमवार",
    day_hi: "सोमवार",
    day_en: "Monday"
  },
  {
    id: "snan-6",
    date_mr: "१७ ऑगस्ट २०२७",
    date_hi: "१७ अगस्त २०२७",
    date_en: "17 August 2027",
    day_mr: "मंगळवार",
    day_hi: "मंगलवार",
    day_en: "Tuesday"
  },
  {
    id: "snan-7",
    date_mr: "३१ ऑगस्ट २०२७",
    date_hi: "३१ अगस्त २०२७",
    date_en: "31 August 2027",
    day_mr: "मंगळवार",
    day_hi: "मंगलवार",
    day_en: "Tuesday"
  },
  {
    id: "snan-8",
    date_mr: "०५ सप्टेंबर २०२७",
    date_hi: "०५ सितम्बर २०२७",
    date_en: "05 September 2027",
    day_mr: "रविवार",
    day_hi: "रविवार",
    day_en: "Sunday"
  },
  {
    id: "snan-9",
    date_mr: "११ सप्टेंबर २०२७",
    date_hi: "११ सितम्बर २०२७",
    date_en: "11 September 2027",
    day_mr: "शनिवार",
    day_hi: "शनिवार",
    day_en: "Saturday"
  },
  {
    id: "snan-10",
    date_mr: "१२ सप्टेंबर २०२७",
    date_hi: "१२ सितम्बर २०२७",
    date_en: "12 September 2027",
    day_mr: "रविवार",
    day_hi: "रविवार",
    day_en: "Sunday"
  },
  {
    id: "snan-11",
    date_mr: "१४ नोव्हेंबर २०२७",
    date_hi: "१४ नवम्बर २०२७",
    date_en: "14 November 2027",
    day_mr: "रविवार",
    day_hi: "रविवार",
    day_en: "Sunday"
  },
  {
    id: "snan-12",
    date_mr: "२६ जानेवारी २०२८",
    date_hi: "२६ जनवरी २०२८",
    date_en: "26 January 2028",
    day_mr: "बुधवार",
    day_hi: "बुधवार",
    day_en: "Wednesday"
  },
  {
    id: "snan-13",
    date_mr: "२३ फेब्रुवारी २०२८",
    date_hi: "२३ फ़रवरी २०२८",
    date_en: "23 February 2028",
    day_mr: "बुधवार",
    day_hi: "बुधवार",
    day_en: "Wednesday"
  },
  {
    id: "snan-14",
    date_mr: "२५ मे - ०२ जून २०२८",
    date_hi: "२५ मई - ०२ जून २०२८",
    date_en: "25 May - 02 June 2028",
    day_mr: "गुरुवार - शुक्रवार",
    day_hi: "गुरुवार - शुक्रवार",
    day_en: "Thursday - Friday"
  },
  {
    id: "snan-15",
    date_mr: "२४ जुलै २०२८",
    date_hi: "२४ जुलाई २०२८",
    date_en: "24 July 2028",
    day_mr: "सोमवार",
    day_hi: "सोमवार",
    day_en: "Monday"
  }
];

snanDates.forEach(item => {
  const loc = localizedData.find(d => d.id === item.id);
  if (loc) {
    item.date_mr = loc.date_mr;
    item.date_hi = loc.date_hi;
    item.date_en = loc.date_en;
    item.day_mr = loc.day_mr;
    item.day_hi = loc.day_hi;
    item.day_en = loc.day_en;
  }
});

fs.writeFileSync(filePath, JSON.stringify(snanDates, null, 2), 'utf8');
console.log('Successfully localized all 15 snan dates into Devanagari and English');
