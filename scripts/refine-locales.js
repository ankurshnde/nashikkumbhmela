const fs = require('fs');
const path = require('path');

// 1. UPDATE mr.json
const mrPath = path.join(__dirname, '..', 'src', 'locales', 'mr.json');
const mr = JSON.parse(fs.readFileSync(mrPath, 'utf8'));

mr.siteTitle = "नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ | प्रस्तावित संदर्भ प्रारूप";
mr.portalSubtitle = "नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ • प्रस्तावित संदर्भ प्रारूप";
mr.officialStyleNotice = "नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ — प्रस्तावित संदर्भ प्रारूप";

mr.topStrip.prototypeDisclaimer = "प्रस्तावित संकेतस्थळ प्रारूप — शासकीय पडताळणी व अंतिम मंजुरीच्या अधीन | Proposed Website Design — Pending Verification";
mr.topStrip.skipToContent = "मुख्य मजकूर";
mr.topStrip.screenReader = "स्क्रीन रीडर प्रवेश";

mr.header.govTitle = "महाराष्ट्र शासन";
mr.header.authoritySub = "प्रस्तावित संकेतस्थळ संदर्भ प्रारूप • Proposed Reference Design";

mr.hero.badge = "प्रस्तावित संदर्भ प्रारूप • Proposed Reference Design";
mr.hero.title = "पवित्र गोदावरी तट व त्र्यंबकेश्वर ज्योतिर्लिंग सिंहस्थ कुंभमेळा २०२७";
mr.hero.datesPlaceholder = "नियोजित कालमर्यादा: ३१ ऑक्टोबर २०२६ (ध्वजारोहण) • सांगता: २४ जुलै २०२८";
mr.hero.datesSource = "परंपरागत संदर्भ पंचांग तिथींनुसार (nashikkumbhmela.co.in)";
mr.hero.datesGazette = "प्रस्तावित • अंतिम शासकीय अधिसूचनेच्या अधीन";
mr.hero.description = "नाशिक आणि त्र्यंबकेश्वरच्या पावन भूमीवर अवतरणाऱ्या भाविकांच्या नियोजित सेवेसाठी, मार्गदर्शनासाठी व सुखद तीर्थयात्रेसाठी प्रस्तावित एकात्मिक डिजिटल संदर्भ प्रारूप.";

mr.telemetry = {
  riverDischarge: "नियोजित कालावधी: २०२६ – २०२८",
  waterQuality: "मुख्य तीर्थक्षेत्र: रामकुंड व त्र्यंबकेश्वर",
  footfall: "प्रस्तावित वेळापत्रक: १५ पर्व स्नान तिथी",
  controlRoom: "प्रस्तावित एकात्मिक भाविक सहाय्य प्रणाली"
};

mr.leadership.subtitle = "सिंहस्थ कुंभमेळा २०२७ च्या नियोजन, मार्गदर्शन व प्रशासकीय समन्वयासाठी प्रस्तावित रूपरेषा";
mr.leadership.executiveGroupTitle = "शासकीय व मंत्रिमंडळ नेतृत्व";
mr.leadership.adminGroupTitle = "प्रशासकीय समन्वय व प्राधिकरण";
mr.leadership.dcm2Role = "मा. खासदार (राज्यसभा) [प्रस्तावित समावेश]";

mr.quickServices = {
  title: "तीर्थयात्री त्वरित सेवा व सुविधा (प्रस्तावित)",
  subtitle: "नियोजित प्रमुख सेवा व सुविधांची एका क्लिकवर माहिती",
  snanSchedule: "शाही स्नान वेळापत्रक",
  mapsRoutes: "पवित्र घाट व परिसर",
  parkingTransport: "पार्किंग व शटल बस मार्ग",
  stayDharmashala: "धर्मशाळा व निवास माहिती",
  lostFound: "हरवले-सापडले कक्ष",
  medicalHelp: "वैद्यकीय मदत व प्रथमोपचार",
  toiletsWater: "स्वच्छतागृह व पिण्याचे पाणी",
  helplines: "आपत्कालीन संपर्क क्रमांक"
};

mr.keyDates.title = "प्रस्तावित शाही स्नान वेळापत्रक";
mr.keyDates.heading = "शाही स्नान वेळापत्रक व आखाडा कार्यक्रम (Provisional Schedule)";
mr.keyDates.note = "परंपरागत संदर्भ तिथींवर आधारित (nashikkumbhmela.co.in) • अंतिम शासकीय अधिसूचनेच्या अधीन.";
mr.keyDates.downloadPdf = "प्रस्तावित वेळापत्रक माहिती (PDF)";

mr.safety.homeSubtitle = "भाविक व कुटुंबीयांच्या सुरक्षिततेसाठी मार्गदर्शक कार्यपद्धती";
mr.safety.emergencyBadge = "प्रस्तावित कार्यपद्धती";
mr.safety.lostChildTitle = "हरवलेली व्यक्ती / बालकांसाठी प्रस्तावित कार्यपद्धती (Proposed Protocol)";
mr.safety.lostChildSubtitle = "गर्दीच्या व्यवस्थापनासाठी नियोजित कार्यपद्धती — आपत्कालीन परिस्थितीत तात्काळ ११२ वर संपर्क साधावा";

mr.notices.homeTitle = "शासकीय परिपत्रके व संदर्भ सूचना";
mr.notices.homeSubtitle = "नाशिक जिल्हाधिकारी कार्यालय व पोलीस प्रशासनाचे संदर्भ आदेश";
mr.notices.pageBadge = "संदर्भ परिपत्रके";
mr.notices.pageSubtitle = "नाशिक जिल्हाधिकारी कार्यालय, पोलीस प्रशासन आणि आपत्ती व्यवस्थापन प्राधिकरणाची संदर्भ परिपत्रके";

mr.about.aiBadge = "प्रस्तावित AI तीर्थयात्रा सहाय्यक";
mr.assistantModal.welcomeText = "जय गोदावरी! नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ प्रस्तावित महापोर्टलवर आपले स्वागत आहे. मी आपला AI तीर्थयात्रा सहाय्यक आहे. आपण मला शाही स्नान तारखा, घाटांची माहिती, सॅटेलाइट पार्किंग, बस शटल किंवा आपत्कालीन वैद्यकीय मदतीविषयी थेट विचारू शकता!";
mr.assistantModal.dpdpNotice = "प्रस्तावित सुरक्षित माहिती प्रणाली • DPDP Act २०२३ मार्गदर्शक तत्त्वांवर आधारित";

mr.footer.gigwBadge = "GIGW 3.0 व WCAG 2.1 AA तत्त्वांवर आधारित संदर्भ प्रारूप";
mr.footer.disclaimerNotice = "हे संकेतस्थळ नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७ चे प्रस्तावित संदर्भ प्रारूप (Proposed Reference Design) असून शासकीय पुनरावलोकनासाठी तयार केले आहे. सर्व माहिती अंतिम शासकीय राजपत्र व अधिसूचनेच्या अधीन आहे.";

mr.ui.schedulePdfDownload = "प्रस्तावित वेळापत्रक माहिती (PDF)";
mr.ui.badgeOfficialCeremony = "प्रस्तावित विधी";

fs.writeFileSync(mrPath, JSON.stringify(mr, null, 2), 'utf8');
console.log('Updated mr.json successfully');

// 2. UPDATE en.json
const enPath = path.join(__dirname, '..', 'src', 'locales', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

en.siteTitle = "Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 | Proposed Reference Design";
en.portalSubtitle = "Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 • Proposed Reference Design";
en.officialStyleNotice = "Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 — Proposed Reference Design";

en.topStrip.prototypeDisclaimer = "Proposed website design — content and official designations pending verification";
en.topStrip.skipToContent = "Skip to Content";
en.topStrip.screenReader = "Screen Reader Access";

en.header.authoritySub = "Proposed Reference Design | Pending Official Verification";

en.hero.badge = "Proposed Reference Design";
en.hero.title = "Sacred Godavari Ghats & Trimbakeshwar Jyotirlinga Simhastha Kumbh Mela 2027";
en.hero.datesPlaceholder = "Planned Simhastha Cycle: 31 Oct 2026 (Flag Hoisting) • Conclusion: 24 July 2028";
en.hero.datesSource = "Based on traditional reference calendar (nashikkumbhmela.co.in)";
en.hero.datesGazette = "Provisional • Awaiting Official Notification";
en.hero.description = "Proposed integrated digital reference design for pilgrim services, situational guidance, and coordinated administration for the upcoming Simhastha Kumbh Mela.";

en.telemetry = {
  riverDischarge: "Planned Cycle: 2026 – 2028",
  waterQuality: "Primary Locations: Ramkund & Trimbakeshwar",
  footfall: "Provisional Schedule: 15 Snan Dates",
  controlRoom: "Proposed Integrated Assistance System"
};

en.leadership.subtitle = "Proposed leadership hierarchy and administrative coordination framework for Simhastha Kumbh Mela 2027";
en.leadership.executiveGroupTitle = "Executive & Ministerial Leadership";
en.leadership.adminGroupTitle = "Administrative Coordination & Authority";
en.leadership.dcm2Role = "Hon'ble Member of Parliament (Rajya Sabha) [Proposed Inclusion]";

en.quickServices = {
  title: "Pilgrim Quick Services (Proposed)",
  subtitle: "Planned key citizen services and facilities available at a single touchpoint",
  snanSchedule: "Shahi Snan Schedule",
  mapsRoutes: "Sacred Ghats & Places",
  parkingTransport: "Parking & Shuttle Routes",
  stayDharmashala: "Dharamshala & Stay Info",
  lostFound: "Lost & Found Center",
  medicalHelp: "First Aid & Medical Camps",
  toiletsWater: "Sanitation & Potable Water",
  helplines: "Emergency Helplines"
};

en.keyDates.title = "Provisional Shahi Snan Schedule";
en.keyDates.heading = "Shahi Snan Schedule & Akhara Programs (Provisional)";
en.keyDates.note = "Compiled from traditional calendar sources (nashikkumbhmela.co.in) • Subject to final official gazette notification.";
en.keyDates.downloadPdf = "Provisional Schedule Summary (PDF)";

en.safety.homeSubtitle = "Advisory guidelines for pilgrim and family safety";
en.safety.emergencyBadge = "Proposed Protocol";
en.safety.lostChildTitle = "Proposed 4-Step Protocol for Lost Persons (Reference Concept)";
en.safety.lostChildSubtitle = "Planned crowd management and lost person identification procedure — dial 112 in emergencies";

en.notices.homeTitle = "Administrative Circulars & Reference Notices";
en.notices.homeSubtitle = "Reference notifications and planning circulars from Nashik administration";
en.notices.pageBadge = "Reference Circulars";
en.notices.pageSubtitle = "Reference circulars from Nashik Collectorate, Police Administration, and Disaster Management Cell";

en.about.aiBadge = "Proposed AI Pilgrim Assistant";
en.assistantModal.welcomeText = "Jai Godavari! Welcome to the proposed reference portal for Nashik-Trimbakeshwar Simhastha 2027. I am your AI pilgrimage assistant concept. You can ask about proposed bathing dates, ghat locations, planned parking hubs, or emergency contact points!";
en.assistantModal.dpdpNotice = "Proposed secure data framework • Aligned with DPDP Act 2023 principles";

en.footer.gigwBadge = "Reference design aligned with GIGW 3.0 & WCAG 2.1 AA principles";
en.footer.disclaimerNotice = "This website is a proposed reference design created for management review and technical consultation. All dates, designations, and plans remain subject to official government notification.";

en.ui.schedulePdfDownload = "Provisional Schedule Summary (PDF)";
en.ui.badgeOfficialCeremony = "Provisional Ceremony";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
console.log('Updated en.json successfully');

// 3. UPDATE hi.json
const hiPath = path.join(__dirname, '..', 'src', 'locales', 'hi.json');
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

hi.siteTitle = "नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 | प्रस्तावित संदर्भ प्रारूप";
hi.portalSubtitle = "नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 • प्रस्तावित संदर्भ प्रारूप";
hi.officialStyleNotice = "नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 — प्रस्तावित संदर्भ प्रारूप";

hi.topStrip.prototypeDisclaimer = "प्रस्तावित वेबसाइट प्रारूप — शासकीय सत्यापन एवं अंतिम स्वीकृति के अधीन | Proposed Website Design — Pending Verification";
hi.topStrip.skipToContent = "मुख्य सामग्री";
hi.topStrip.screenReader = "स्क्रीन रीडर एक्सेस";

hi.header.authoritySub = "प्रस्तावित संदर्भ प्रारूप • Proposed Reference Design";

hi.hero.badge = "प्रस्तावित संदर्भ प्रारूप • Proposed Reference Design";
hi.hero.title = "पवित्र गोदावरी तट एवं त्र्यंबकेश्वर ज्योतिर्लिंग सिंहस्थ कुंभ मेला 2027";
hi.hero.datesPlaceholder = "नियोजित कालमर्यादा: ३१ अक्टूबर २०२६ (ध्वजारोहण) • समापन: २४ जुलाई २०२८";
hi.hero.datesSource = "पारंपरिक संदर्भ पंचांग तिथियों के अनुसार (nashikkumbhmela.co.in)";
hi.hero.datesGazette = "प्रस्तावित • अंतिम शासकीय अधिसूचना के अधीन";
hi.hero.description = "नासिक एवं त्र्यंबकेश्वर की पावन भूमि पर पधारने वाले श्रद्धालुओं की नियोजित सेवा, सुरक्षा व सुखद तीर्थयात्रा हेतु प्रस्तावित एकीकृत डिजिटल संदर्भ प्रारूप।";

hi.telemetry = {
  riverDischarge: "नियोजित समयावधि: २०२६ – २०२८",
  waterQuality: "प्रमुख तीर्थक्षेत्र: रामकुंड एवं त्र्यंबकेश्वर",
  footfall: "प्रस्तावित समय-सारणी: १५ पर्व स्नान तिथियां",
  controlRoom: "प्रस्तावित एकीकृत तीर्थयात्री सहायता प्रणाली"
};

hi.leadership.subtitle = "सिंहस्थ कुंभ मेला 2027 के नियोजन, मार्गदर्शन एवं प्रशासनिक समन्वय हेतु प्रस्तावित रूपरेखा";
hi.leadership.executiveGroupTitle = "शासकीय एवं मंत्रिमंडलीय नेतृत्व";
hi.leadership.adminGroupTitle = "प्रशासनिक समन्वय एवं प्राधिकरण";
hi.leadership.dcm2Role = "मा. सांसद (राज्यसभा) [प्रस्तावित समावेश]";

hi.quickServices = {
  title: "तीर्थयात्री त्वरित सेवाएं एवं सुविधाएं (प्रस्तावित)",
  subtitle: "नियोजित प्रमुख सेवाओं एवं सुविधाओं की एक क्लिक पर जानकारी",
  snanSchedule: "शाही स्नान समय-सारणी",
  mapsRoutes: "पवित्र घाट एवं परिसर",
  parkingTransport: "पार्किंग एवं शटल बस मार्ग",
  stayDharmashala: "धर्मशाला एवं आवास जानकारी",
  lostFound: "खोया-पाया केंद्र",
  medicalHelp: "चिकित्सा सहायता एवं प्राथमिक उपचार",
  toiletsWater: "शौचालय एवं पेयजल",
  helplines: "आपातकालीन संपर्क नंबर"
};

hi.keyDates.title = "प्रस्तावित शाही स्नान समय-सारणी";
hi.keyDates.heading = "शाही स्नान समय-सारणी एवं अखाड़ा कार्यक्रम (Provisional)";
hi.keyDates.note = "पारंपरिक संदर्भ तिथियों पर आधारित (nashikkumbhmela.co.in) • अंतिम शासकीय अधिसूचना के अधीन।";
hi.keyDates.downloadPdf = "प्रस्तावित समय-सारणी विवरण (PDF)";

hi.safety.homeSubtitle = "श्रद्धालुओं एवं परिवार की सुरक्षा हेतु मार्गदर्शक कार्यपद्धति";
hi.safety.emergencyBadge = "प्रस्तावित कार्यपद्धति";
hi.safety.lostChildTitle = "लापता व्यक्ति / बच्चों हेतु प्रस्तावित कार्यपद्धति (Proposed Protocol)";
hi.safety.lostChildSubtitle = "भीड़ प्रबंधन हेतु नियोजित प्रक्रिया — आपातकाल में तत्काल 112 पर संपर्क करें";

hi.notices.homeTitle = "प्रशासनिक परिपत्र एवं संदर्भ सूचनाएं";
hi.notices.homeSubtitle = "नासिक जिला प्रशासन एवं पुलिस प्रशासन के संदर्भ आदेश";
hi.notices.pageBadge = "संदर्भ परिपत्र";
hi.notices.pageSubtitle = "नासिक जिला प्रशासन, पुलिस प्रशासन एवं आपदा प्रबंधन प्राधिकरण के संदर्भ परिपत्र";

hi.about.aiBadge = "प्रस्तावित AI तीर्थयात्रा सहायक";
hi.assistantModal.welcomeText = "जय गोदावरी! नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 प्रस्तावित महापोर्टल पर आपका स्वागत है। मैं आपका AI तीर्थयात्रा सहायक प्रारूप हूँ। आप मुझसे शाही स्नान तिथियां, घाटों की जानकारी, सैटेलाइट पार्किंग, बस शटल अथवा आपातकालीन सहायता के बारे में पूछ सकते हैं!";
hi.assistantModal.dpdpNotice = "प्रस्तावित सुरक्षित सूचना प्रणाली • DPDP Act 2023 सिद्धांतों पर आधारित";

hi.footer.gigwBadge = "GIGW 3.0 एवं WCAG 2.1 AA सिद्धांतों पर आधारित संदर्भ प्रारूप";
hi.footer.disclaimerNotice = "यह वेबसाइट नासिक-त्र्यंबकेश्वर सिंहस्थ 2027 का प्रस्तावित संदर्भ प्रारूप (Proposed Reference Design) है, जो प्रबंधन एवं तकनीकी समीक्षा हेतु निर्मित किया गया है। समस्त जानकारी अंतिम शासकीय अधिसूचना के अधीन है।";

hi.ui.schedulePdfDownload = "प्रस्तावित समय-सारणी विवरण (PDF)";
hi.ui.badgeOfficialCeremony = "प्रस्तावित विधि";

fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), 'utf8');
console.log('Updated hi.json successfully');

// 4. UPDATE safety.json emergency number
const safetyPath = path.join(__dirname, '..', 'src', 'data', 'safety.json');
const safetyData = JSON.parse(fs.readFileSync(safetyPath, 'utf8'));
safetyData.emergencyNumbers.forEach(item => {
  if (item.number.includes('XXXX')) {
    item.number = "1077 / 0253-2305233";
    item.service_mr = "जिल्हा आपत्ती व्यवस्थापन व नियंत्रण कक्ष";
    item.service_hi = "जिला आपदा प्रबंधन एवं नियंत्रण कक्ष";
    item.service_en = "District Disaster Management & Control Room";
    item.source = "District Disaster Management Authority, Nashik";
  }
});
fs.writeFileSync(safetyPath, JSON.stringify(safetyData, null, 2), 'utf8');
console.log('Updated safety.json successfully');
