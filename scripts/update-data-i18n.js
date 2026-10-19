const fs = require('fs');

// 1. Update snan-dates.json
const snanPath = 'src/data/snan-dates.json';
const snanDates = JSON.parse(fs.readFileSync(snanPath, 'utf8'));

const hindiTips = [
  "पारंपरिक ध्वजारोहण के साथ सिंहस्थ कुंभ मेला चक्र का विधिवत शुभारंभ होता है।",
  "मेले की प्रथम अनुष्ठानिक प्रार्थनाओं व दर्शन के इच्छुक श्रद्धालुओं हेतु अत्यंत उत्तम दिन।",
  "घाटों के अतिरिक्त आखाड़ा छावनियों (साधु शिविरों) के समीप भारी भीड़ की संभावना।",
  "आरामदायक जूते पहनें; परिक्रमा मार्ग प्राचीन शहर से होकर गुजरता है, प्रातःकाल निकलना उत्तम।",
  "शैव एवं वैष्णव आखाड़ों का प्रथम शाही जुलूस व अमृत स्नान। शटल बस से समय पूर्व पहुँचें।",
  "परिवारों के लिए अत्यंत लोकप्रिय दिन; रामकुंड पर भक्तिमय एवं उत्सवपूर्ण वातावरण।",
  "सम्पूर्ण महाकुंभ का सबसे विशाल, मुख्य और सर्वाधिक श्रद्धा से भरा अमृत स्नान दिवस।",
  "आत्मशुद्धि एवं पितृ तर्पण का पावन पर्व। श्राद्ध अनुष्ठान हेतु अत्यधिक फलदायी।",
  "रामकुंड, नासिक में वैष्णव आखाड़ों का अंतिम महा अमृत स्नान।",
  "पवित्र कुशावर्त तीर्थ, त्र्यंबकेश्वर में शैव आखाड़ों का अंतिम पावन अमृत स्नान।",
  "संध्याकाल अवश्य देखें: गोदावरी के पावन तट सहस्रों दीपों की रोशनी से जगमगाते हैं।",
  "मौन साधना का पावन दिवस। ध्यान दें: गणतंत्र दिवस के कारण विशेष सुरक्षा व यातायात व्यवस्था।",
  "भगवान शिव के भक्तों हेतु महाउत्सव। सर्वाधिक पावन निशीथ काल मध्यरात्रि पूजा इसी रात होती है।",
  "माँ गोदावरी के अवतरण का १० दिवसीय पावन जन्मोत्सव। २ जून को भव्य महाआरती एवं सांगता।",
  "पारंपरिक ध्वजावतरण समारोह के साथ नासिक-त्र्यंबकेश्वर सिंहस्थ महाकुंभ की औपचारिक सांगता।"
];

snanDates.forEach((item, idx) => {
  if (hindiTips[idx]) {
    item.proTip_hi = hindiTips[idx];
  }
});
fs.writeFileSync(snanPath, JSON.stringify(snanDates, null, 2), 'utf8');
console.log('Updated snan-dates.json with proTip_hi for all 15 items');

// 2. Update notices.json
const noticesPath = 'src/data/notices.json';
const notices = JSON.parse(fs.readFileSync(noticesPath, 'utf8'));

const noticeSummaries = [
  {
    hi: "शाही स्नान के दिन एकतरफा यातायात, बैरिकेड ऊंचाई एवं नदी में सुरक्षा रस्सियों की नियमावली।",
    en: "One-way crowd circulation, barricade heights, and river safety cable regulations for Shahi Snan days."
  },
  {
    hi: "वाहनों को नगर सीमा पर रोककर निःशुल्क ई-बसों द्वारा श्रद्धालुओं को घाटों तक लाने की प्रारूप योजना।",
    en: "Draft plan to hold private vehicles outside city limits and shuttle pilgrims via free e-buses."
  },
  {
    hi: "जल गुणवत्ता परीक्षण, २०० सचल चिकित्सा दल एवं आपातकालीन दवाओं का भंडारण प्रबंधन।",
    en: "Potable water sampling, 200 mobile medical teams, and emergency medical stockpile protocols."
  },
  {
    hi: "अखिल भारतीय आखाड़ा परिषद के साथ समन्वय, छावनी भू-आवंटन एवं साधु-संतों की मूलभूत सुविधाएं।",
    en: "Coordination with Akhil Bharatiya Akhara Parishad, camp land allocation, and civic amenities."
  }
];

notices.forEach((item, idx) => {
  if (noticeSummaries[idx]) {
    item.summary_hi = noticeSummaries[idx].hi;
    item.summary_en = noticeSummaries[idx].en;
  }
});
fs.writeFileSync(noticesPath, JSON.stringify(notices, null, 2), 'utf8');
console.log('Updated notices.json with summary_hi and summary_en');
