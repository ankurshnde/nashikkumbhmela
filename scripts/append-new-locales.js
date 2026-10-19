const fs = require('fs');
const path = require('path');

const locales = ['mr', 'hi', 'en'];

const additions = {
  mr: {
    sourceNotice: {
      sourceOffice: "नाशिक जिल्हा प्रशासन व NTKMA"
    },
    safety: {
      step1Num: "०१",
      step2Num: "०२",
      step3Num: "०३",
      step4Num: "०४"
    },
    ui: {
      filterCity: "शहर निवडा:",
      allCities: "सर्व शहरे (नाशिक व त्र्यंबकेश्वर)",
      nashikOnly: "फक्त नाशिक (Nashik)",
      trimbakOnly: "फक्त त्र्यंबकेश्वर (Trimbak)",
      accessibleListTitle: "स्क्रीन रीडर व सुलभता मजकूर यादी (Accessible Text List Alternative)",
      accessibleListDesc: "GIGW 3.0 व WCAG 2.1 निकषांनुसार नकाशा पाहू न शकणाऱ्या किंवा कमी नेटवर्क असणाऱ्या भाविकांसाठी संपूर्ण मजकूर तक्ता."
    },
    transport: {
      railKeyStationLabel: "प्रमुख स्थानक:",
      railKeyStationVal: "नाशिक रोड (NK) जंक्शन",
      railDistanceLabel: "घाटाचे अंतर:",
      railDistanceVal: "९ किमी (समर्पित बस कॉरिडोअरने १५-२० मिनिटे)",
      railFacilitiesLabel: "सुविधा:",
      railFacilitiesVal: "क्लॉक रूम, रुग्णवाहिका, २४x७ हेल्पडेस्क",
      busKeyDepotsLabel: "प्रमुख बस पोर्ट:",
      busKeyDepotsVal: "ठक्कर बाजार, महामार्ग, आडगाव तात्पुरते बस पोर्ट",
      busTrimbakLabel: "त्र्यंबकेश्वर सेवा:",
      busTrimbakVal: "नाशिक ते त्र्यंबक दर २ मिनिटांनी थेट बस फेरी",
      busFareLabel: "भाडे:",
      busFareVal: "सॅटेलाइट पार्किंग ते घाट प्रवास पूर्णपणे मोफत"
    },
    lostFound: {
      formTypeLabel: "प्रकार निवडा *",
      optPerson: "हरवलेली व्यक्ती (Missing Person)",
      optItem: "हरवलेली वस्तू / बॅग (Lost Article/Luggage)",
      formNameLabel: "व्यक्तीचे नाव किंवा वस्तूचा तपशील *",
      formNamePlaceholder: "उदा. सुरेश कांबळे किंवा निळी ट्रॅव्हल बॅग",
      formContactLabel: "आपला संपर्क क्रमांक *",
      formContactPlaceholder: "१० अंकी मोबाईल नंबर",
      formLocationLabel: "शेवटचे ठिकाण (Last seen location) *",
      formLocationPlaceholder: "उदा. रामकुंड घाट, पायऱ्यांजवळ",
      formDescLabel: "कपड्यांचा रंग / विशेष ओळख खूण *",
      formDescPlaceholder: "उदा. पिवळा कुर्ता, पांढरी धोती, चष्मा, वय अंदाजे ६५ वर्षे"
    },
    volunteer: {
      formNameLabel: "पूर्ण नाव *",
      formNamePlaceholder: "आपले नाव",
      formPhoneLabel: "मोबाईल नंबर *",
      formPhonePlaceholder: "१० अंकी फोन नंबर",
      formRoleLabel: "सेवा क्षेत्र (Preferred Role) *",
      roleGuidance: "भाविकांना मार्गदर्शन व मदत (Pilgrim Guidance)",
      roleCrowd: "गर्दी व्यवस्थापन व रांग नियंत्रण (Crowd Management)",
      roleSwachh: "स्वच्छ गोदावरी - स्वच्छता सेवा (Swachh Seva)",
      roleFirstAid: "वैद्यकीय प्रथमोपचार सहाय्य (First-Aid Assistance)",
      roleTranslation: "बहुभाषिक अनुवाद सहाय्य (Multilingual Translation)",
      formLangLabel: "अवगत भाषा (Languages known)",
      formLangPlaceholder: "उदा. मराठी, हिंदी, इंग्रजी, गुजराती",
      consentText: "मी याद्वारे संमती देतो/देते की वरील माहिती केवळ सिंहस्थ कुंभमेळा स्वयंसेवक समन्वयासाठी वापरली जाईल. कोणत्याही व्यावसायिक हेतूसाठी ही माहिती सामायिक केली जाणार नाही. (DPDP Act 2023 compliant consent)"
    },
    assistantModal: {
      sender: "🕉️ कुंभदूत AI सहाय्यक",
      placeholder: "आपला प्रश्न येथे टाईप करा किंवा विचारा..."
    },
    footer: {
      portalNashik: "नाशिक जिल्हाधिकारी कार्यालय (nashik.gov.in)",
      portalDivcom: "विभागीय आयुक्त नाशिक",
      portalNmc: "नाशिक महानगरपालिका (NMC)",
      portalMaha: "महाराष्ट्र शासन (maharashtra.gov.in)",
      portalIndia: "National Portal of India (india.gov.in)"
    }
  },
  hi: {
    sourceNotice: {
      sourceOffice: "नासिक जिला प्रशासन एवं NTKMA"
    },
    safety: {
      step1Num: "०१",
      step2Num: "०२",
      step3Num: "०३",
      step4Num: "०४"
    },
    ui: {
      filterCity: "शहर चुनें:",
      allCities: "सभी शहर (नासिक एवं त्र्यंबकेश्वर)",
      nashikOnly: "केवल नासिक (Nashik)",
      trimbakOnly: "केवल त्र्यंबकेश्वर (Trimbak)",
      accessibleListTitle: "स्क्रीन रीडर एवं सुगम पाठ्य सूची (Accessible Text List Alternative)",
      accessibleListDesc: "GIGW 3.0 एवं WCAG 2.1 मानकों के अनुसार नक्शा न देख पाने या कम नेटवर्क वाले श्रद्धालुओं के लिए पूर्ण पाठ्य तालिका।"
    },
    transport: {
      railKeyStationLabel: "प्रमुख स्टेशन:",
      railKeyStationVal: "नासिक रोड (NK) जंक्शन",
      railDistanceLabel: "घाट की दूरी:",
      railDistanceVal: "९ किमी (समर्पित बस कॉरिडोर से १५-२० मिनट)",
      railFacilitiesLabel: "सुविधाएं:",
      railFacilitiesVal: "क्लॉक रूम, एम्बुलेंस, २४x७ हेल्पडेस्क",
      busKeyDepotsLabel: "प्रमुख बस पोर्ट:",
      busKeyDepotsVal: "ठक्कर बाजार, महामार्ग, आडगांव अस्थायी बस पोर्ट",
      busTrimbakLabel: "त्र्यंबकेश्वर सेवा:",
      busTrimbakVal: "नासिक से त्र्यंबक हर २ मिनट में सीधी बस सेवा",
      busFareLabel: "किराया:",
      busFareVal: "सैटेलाइट पार्किंग से घाट तक यात्रा पूर्णतः निःशुल्क"
    },
    lostFound: {
      formTypeLabel: "प्रकार चुनें *",
      optPerson: "लापता व्यक्ति (Missing Person)",
      optItem: "खोया सामान / बैग (Lost Article/Luggage)",
      formNameLabel: "व्यक्ति का नाम अथवा वस्तु का विवरण *",
      formNamePlaceholder: "उदा. सुरेश कांबळे अथवा नीला ट्रैवल बैग",
      formContactLabel: "आपका संपर्क नंबर *",
      formContactPlaceholder: "१० अंकों का मोबाइल नंबर",
      formLocationLabel: "अंतिम देखा गया स्थान (Last seen location) *",
      formLocationPlaceholder: "उदा. रामकुंड घाट, सीढ़ियों के पास",
      formDescLabel: "कपड़ों का रंग / विशेष पहचान चिन्ह *",
      formDescPlaceholder: "उदा. पीला कुर्ता, सफेद धोती, चश्मा, उम्र लगभग ६५ वर्ष"
    },
    volunteer: {
      formNameLabel: "पूरा नाम *",
      formNamePlaceholder: "आपका नाम",
      formPhoneLabel: "मोबाइल नंबर *",
      formPhonePlaceholder: "१० अंकों का फोन नंबर",
      formRoleLabel: "सेवा क्षेत्र (Preferred Role) *",
      roleGuidance: "श्रद्धालुओं को मार्गदर्शन एवं सहायता (Pilgrim Guidance)",
      roleCrowd: "भीड़ प्रबंधन एवं पंक्ति नियंत्रण (Crowd Management)",
      roleSwachh: "स्वच्छ गोदावरी - स्वच्छता सेवा (Swachh Seva)",
      roleFirstAid: "चिकित्सा प्राथमिक उपचार सहायता (First-Aid Assistance)",
      roleTranslation: "बहुभाषी अनुवाद सहायता (Multilingual Translation)",
      formLangLabel: "ज्ञात भाषाएं (Languages known)",
      formLangPlaceholder: "उदा. मराठी, हिन्दी, अंग्रेजी, गुजराती",
      consentText: "मैं एतद्द्वारा सहमति देता/देती हूँ कि उपरोक्त जानकारी का उपयोग केवल सिंहस्थ कुंभ मेला स्वयंसेवक समन्वय के लिए किया जाएगा। किसी भी व्यावसायिक उद्देश्य के लिए यह जानकारी साझा नहीं की जाएगी। (DPDP Act 2023 compliant consent)"
    },
    assistantModal: {
      sender: "🕉️ कुंभदूत AI सहायक",
      placeholder: "अपना प्रश्न यहाँ टाइप करें या पूछें..."
    },
    footer: {
      portalNashik: "नासिक जिला कलेक्टर कार्यालय (nashik.gov.in)",
      portalDivcom: "विभागीय आयुक्त नासिक",
      portalNmc: "नासिक नगर निगम (NMC)",
      portalMaha: "महाराष्ट्र सरकार (maharashtra.gov.in)",
      portalIndia: "भारत का राष्ट्रीय पोर्टल (india.gov.in)"
    }
  },
  en: {
    sourceNotice: {
      sourceOffice: "Nashik District Administration & NTKMA"
    },
    safety: {
      step1Num: "01",
      step2Num: "02",
      step3Num: "03",
      step4Num: "04"
    },
    ui: {
      filterCity: "Select City:",
      allCities: "All Cities (Nashik & Trimbakeshwar)",
      nashikOnly: "Nashik Only",
      trimbakOnly: "Trimbakeshwar Only",
      accessibleListTitle: "Accessible Text List Directory (Screen Reader & Low Bandwidth)",
      accessibleListDesc: "Compliant with GIGW 3.0 & WCAG 2.1 standards for visually impaired pilgrims or low-bandwidth mobile devices."
    },
    transport: {
      railKeyStationLabel: "Primary Station:",
      railKeyStationVal: "Nashik Road (NK) Junction",
      railDistanceLabel: "Distance to Ghats:",
      railDistanceVal: "9 km (15-20 mins via dedicated green shuttle corridor)",
      railFacilitiesLabel: "Facilities:",
      railFacilitiesVal: "Cloakroom, Ambulance Bay, 24x7 Pilgrim Helpdesk",
      busKeyDepotsLabel: "Major Bus Terminals:",
      busKeyDepotsVal: "Thakkar Bazaar, Mahamarg Bus Port, Adgaon Satellite Terminal",
      busTrimbakLabel: "Trimbakeshwar Shuttle:",
      busTrimbakVal: "Direct shuttles every 2 minutes between Nashik and Trimbak",
      busFareLabel: "Fare:",
      busFareVal: "Zero Fare (100% Free Pilgrimage Transit from Satellite Parking)"
    },
    lostFound: {
      formTypeLabel: "Select Report Category *",
      optPerson: "Missing Person",
      optItem: "Lost Article / Luggage",
      formNameLabel: "Name of Person or Description of Article *",
      formNamePlaceholder: "e.g., Suresh Kamble or Blue Travel Backpack",
      formContactLabel: "Your Contact Number *",
      formContactPlaceholder: "10-digit mobile number",
      formLocationLabel: "Last Seen Location *",
      formLocationPlaceholder: "e.g., Ramkund Ghat, near central steps",
      formDescLabel: "Clothing / Distinguishing Marks *",
      formDescPlaceholder: "e.g., Yellow kurta, white dhoti, spectacles, approx age 65"
    },
    volunteer: {
      formNameLabel: "Full Name *",
      formNamePlaceholder: "Your Full Name",
      formPhoneLabel: "Mobile Number *",
      formPhonePlaceholder: "10-digit mobile number",
      formRoleLabel: "Preferred Volunteer Role *",
      roleGuidance: "Pilgrim Guidance & Assistance",
      roleCrowd: "Crowd Safety & Queue Management",
      roleSwachh: "Swachh Godavari Cleanliness Campaign",
      roleFirstAid: "First-Aid & Emergency Medical Support",
      roleTranslation: "Multilingual Pilgrim Help & Translation",
      formLangLabel: "Languages Known",
      formLangPlaceholder: "e.g., English, Hindi, Marathi, Gujarati, Telugu",
      consentText: "I hereby give consent that the above information will be used solely for Simhastha Kumbh Mela volunteer coordination and will not be shared with any commercial third party (DPDP Act 2023 compliant consent)."
    },
    assistantModal: {
      sender: "🕉️ KumbhDoot AI Assistant",
      placeholder: "Type your pilgrimage query or question here..."
    },
    footer: {
      portalNashik: "Nashik District Collectorate (nashik.gov.in)",
      portalDivcom: "Divisional Commissioner Office, Nashik",
      portalNmc: "Nashik Municipal Corporation (NMC)",
      portalMaha: "Government of Maharashtra (maharashtra.gov.in)",
      portalIndia: "National Portal of India (india.gov.in)"
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

locales.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  deepMerge(data, additions[lang]);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${lang}.json with new keys`);
});
