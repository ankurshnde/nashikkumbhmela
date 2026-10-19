const fs = require('fs');
const path = require('path');

// 1. UPDATE MAP LOCATIONS
const mapLocPath = path.join(__dirname, '..', 'src', 'data', 'map-locations.json');
const mapLocs = JSON.parse(fs.readFileSync(mapLocPath, 'utf8'));

const facilitiesMap = {
  'loc-1': {
    mr: ["सुरक्षा रक्षक", "महिला चेंजिंग रूम", "लाइफ जॅकेट्स", "व्हीलचेअर रॅम्प", "तातडीची वैद्यकीय मदत"],
    hi: ["सुरक्षा गार्ड", "महिला चेंजिंग रूम", "लाइफ जैकेट्स", "व्हीलचेयर रैंप", "आपातकालीन चिकित्सा सहायता"],
    en: ["Security Guards", "Women's Changing Rooms", "Life Jackets", "Wheelchair Ramp", "Emergency Medical Post"]
  },
  'loc-2': {
    mr: ["बॅरिकेडिंग", "महिला चेंजिंग कक्ष", "लाइफ गार्ड्स", "ध्वनिक्षेपक प्रणाली"],
    hi: ["बैरिकेडिंग", "महिला चेंजिंग रूम", "लाइफ गार्ड्स", "सार्वजनिक उद्घोषणा प्रणाली"],
    en: ["Barricades", "Women's Changing Rooms", "Life Guards", "PA Announcement System"]
  },
  'loc-3': {
    mr: ["स्वच्छ पिण्याचे पाणी", "तात्पुरती स्वच्छतागृहे", "माहिती फलक"],
    hi: ["स्वच्छ पेयजल", "अस्थायी शौचालय", "सूचना पट्ट"],
    en: ["Clean Potable Water", "Temporary Restrooms", "Information Boards"]
  },
  'loc-4': {
    mr: ["१०,०००+ कार/बस क्षमता", "विश्राम मंडप", "स्वच्छतागृहे", "विनामूल्य ई-बस शटल"],
    hi: ["१०,०००+ कार/बस क्षमता", "विश्राम मंडप", "शौचालय", "निःशुल्क ई-बस शटल"],
    en: ["10,000+ Car/Bus Capacity", "Rest Pavilions", "Restrooms", "Complimentary E-Bus Shuttle"]
  },
  'loc-5': {
    mr: ["५,००० वाहन क्षमता", "पिण्याचे पाणी केंद्र", "हेल्पडेस्क"],
    hi: ["५,००० वाहन क्षमता", "पेयजल केंद्र", "हेल्पडेस्क"],
    en: ["5,000 Vehicle Capacity", "Drinking Water Stations", "Helpdesk"]
  },
  'loc-6': {
    mr: ["२४x७ बस सेवा", "हेल्पडेस्क", "व्हीलचेअर सहाय्य", "लागेज क्लॉक रूम"],
    hi: ["२४x७ बस सेवा", "हेल्पडेस्क", "व्हीलचेयर सहायता", "क्लॉक रूम"],
    en: ["24x7 Shuttle Service", "Helpdesk", "Wheelchair Assistance", "Luggage Cloakroom"]
  },
  'loc-7': {
    mr: ["कार्डियाक सपोर्ट", "२० ॲम्ब्युलन्स स्टँडबाय", "मोफत औषधे", "स्त्रीरोग तज्ज्ञ"],
    hi: ["कार्डियक सपोर्ट", "२० एम्बुलेंस तैनात", "निःशुल्क दवाएं", "स्त्री रोग विशेषज्ञ"],
    en: ["Cardiac Support", "20 Ambulances on Standby", "Free Medications", "Gynecologist on Duty"]
  },
  'loc-8': {
    mr: ["२४x७ नियंत्रण कक्ष", "महिला मदत डेस्क", "लाऊडस्पीकर समन्वयन"],
    hi: ["२४x७ नियंत्रण कक्ष", "महिला सहायता डेस्क", "लाउडस्पीकर समन्वय"],
    en: ["24x7 Control Room", "Women's Helpdesk", "Loudspeaker Broadcast Relay"]
  },
  'loc-9': {
    mr: ["डिजिटल फोटो सर्च", "बाल संगोपन कक्ष", "दूध व अल्पोपहार", "समुपदेशक"],
    hi: ["डिजिटल फोटो खोज", "बाल देखभाल कक्ष", "दूध एवं अल्पाहार", "परामर्शदाता"],
    en: ["Digital Photo Search", "Child Care Room", "Milk & Refreshments", "Counseling Staff"]
  },
  'loc-10': {
    mr: ["आरओ शुद्ध पाणी", "दिव्यांग सुलभ टॉयलेट", "सॅनिटरी पॅड वेंडिंग मशिन"],
    hi: ["आरओ शुद्ध पेयजल", "दिव्यांग सुलभ शौचालय", "सैनिटरी पैड वेंडिंग मशीन"],
    en: ["RO Purified Water", "Divyang-Accessible Toilets", "Sanitary Pad Dispenser"]
  }
};

mapLocs.forEach(loc => {
  if (facilitiesMap[loc.id]) {
    loc.facilities_mr = facilitiesMap[loc.id].mr;
    loc.facilities_hi = facilitiesMap[loc.id].hi;
    loc.facilities_en = facilitiesMap[loc.id].en;
  }
});
fs.writeFileSync(mapLocPath, JSON.stringify(mapLocs, null, 2), 'utf8');
console.log('Updated map-locations.json');

// 2. UPDATE LOST & FOUND
const lfPath = path.join(__dirname, '..', 'src', 'data', 'lost-found.json');
const lf = JSON.parse(fs.readFileSync(lfPath, 'utf8'));

lf[0] = {
  ...lf[0],
  name_mr: "गणेश शर्मा",
  name_hi: "गणेश शर्मा",
  name_en: "Ganesh Sharma",
  age_mr: "8 वर्षे",
  age_hi: "8 वर्ष",
  age_en: "8 Years",
  gender_mr: "मुलगा",
  gender_hi: "बालक",
  gender_en: "Male",
  clothColor_mr: "पिवळा टी-शर्ट, निळी जीन्स",
  clothColor_hi: "पीली टी-शर्ट, नीली जींस",
  clothColor_en: "Yellow T-Shirt, Blue Jeans",
  reportedLocation_mr: "रामकुंड परिसर, नाशिक",
  reportedLocation_hi: "रामकुंड क्षेत्र, नासिक",
  reportedLocation_en: "Ramkund Area, Nashik",
  currentLocation_mr: "मध्यवर्ती पुनर्मिलन केंद्र (बाल कक्ष)",
  currentLocation_hi: "केंद्रीय पुनर्मिलन केंद्र (बाल कक्ष)",
  currentLocation_en: "Central Child Reunification Pavilion (Child Care Bay)",
  deskContact_mr: "0253-257XXXX (विस्तार क्र. ४)",
  deskContact_hi: "0253-257XXXX (विस्तार क्र. ४)",
  deskContact_en: "0253-257XXXX (Ext. 4)"
};

lf[1] = {
  ...lf[1],
  name_mr: "काळ्या रंगाची ट्रॅव्हल बॅग",
  name_hi: "काले रंग का ट्रैवल बैग",
  name_en: "Black Travel Backpack",
  itemType_mr: "बॅग / साहित्य",
  itemType_hi: "बैग / सामान",
  itemType_en: "Bag / Luggage",
  description_mr: "अमेरिकन टुरिस्टर बॅग, आत कपडे व आधार कार्ड (नाव: रमेश जोशी)",
  description_hi: "अमेरिकन टूरिस्टर बैग, भीतर कपड़े व आधार कार्ड (नाम: रमेश जोशी)",
  description_en: "American Tourister backpack, clothes & Aadhaar card inside (Name: Ramesh Joshi)",
  clothColor_mr: "अमेरिकन टुरिस्टर बॅग, आत कपडे व आधार कार्ड (नाव: रमेश जोशी)",
  clothColor_hi: "अमेरिकन टूरिस्टर बैग, भीतर कपड़े व आधार कार्ड (नाम: रमेश जोशी)",
  clothColor_en: "American Tourister backpack, clothes & Aadhaar card inside (Name: Ramesh Joshi)",
  reportedLocation_mr: "नाशिक रोड रेल्वे शटल बस थांबा",
  reportedLocation_hi: "नासिक रोड रेलवे शटल बस स्टॉप",
  reportedLocation_en: "Nashik Road Railway Shuttle Bus Stop",
  currentLocation_mr: "रेल्वे पोलीस मदत केंद्र, नाशिक रोड",
  currentLocation_hi: "रेलवे पुलिस सहायता केंद्र, नासिक रोड",
  currentLocation_en: "Railway Police Assistance Post, Nashik Road",
  deskContact_mr: "0253-246XXXX",
  deskContact_hi: "0253-246XXXX",
  deskContact_en: "0253-246XXXX"
};

lf[2] = {
  ...lf[2],
  name_mr: "कमलाबाई पवार",
  name_hi: "कमलाबाई पवार",
  name_en: "Kamalabai Pawar",
  age_mr: "68 वर्षे",
  age_hi: "68 वर्ष",
  age_en: "68 Years",
  gender_mr: "महिला",
  gender_hi: "महिला",
  gender_en: "Female",
  clothColor_mr: "हिरवी नववारी साडी",
  clothColor_hi: "हरी नववारी साड़ी",
  clothColor_en: "Green Nauvari Saree",
  reportedLocation_mr: "कुशावर्त तीर्थ मार्ग, त्र्यंबकेश्वर",
  reportedLocation_hi: "कुशावर्त तीर्थ मार्ग, त्र्यंबकेश्वर",
  reportedLocation_en: "Kushavarta Teerth Access Way, Trimbakeshwar",
  currentLocation_mr: "शोध मोहीम सक्रिय (सर्व सेक्टर वायरलेस संदेश जारी)",
  currentLocation_hi: "सक्रिय खोज अभियान (सभी सेक्टर में वायरलेस संदेश जारी)",
  currentLocation_en: "Active Search Operation (Sector-wide Wireless Broadcast Dispatched)",
  deskContact_mr: "त्र्यंबक पोलीस नियंत्रण कक्ष 112",
  deskContact_hi: "त्र्यंबक पुलिस नियंत्रण कक्ष 112",
  deskContact_en: "Trimbak Police Control Room 112"
};

fs.writeFileSync(lfPath, JSON.stringify(lf, null, 2), 'utf8');
console.log('Updated lost-found.json');

// 3. UPDATE SAFETY EMERGENCY CONTACTS
const safePath = path.join(__dirname, '..', 'src', 'data', 'safety.json');
const safe = JSON.parse(fs.readFileSync(safePath, 'utf8'));

safe.emergencyNumbers.forEach(num => {
  if (num.number === '1924') {
    num.available_mr = '२४x७ बहुभाषिक';
    num.available_hi = '24x7 बहुभाषी';
    num.available_en = '24x7 Multilingual';
  } else {
    num.available_mr = '२४x७ टोल-फ्री';
    num.available_hi = '24x7 टोल-फ्री';
    num.available_en = '24x7 Toll-Free';
  }
});

fs.writeFileSync(safePath, JSON.stringify(safe, null, 2), 'utf8');
console.log('Updated safety.json');
