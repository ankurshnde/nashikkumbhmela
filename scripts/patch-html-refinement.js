const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. UPDATE TITLE & META
html = html.replace(
  '<title>नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ | महाराष्ट्र शासन अधिकृत महापोर्टल</title>',
  '<title>नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ | प्रस्तावित संदर्भ प्रारूप (Proposed Reference Design)</title>'
);

html = html.replace(
  'content="Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 - Official Government Portal for Shahi Snan dates, places, navigation, safety, and KumbhDoot AI assistant."',
  'content="Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 - Proposed Reference Design for Shahi Snan dates, places, navigation, safety, and KumbhDoot AI assistant."'
);

// 2. INSERT PROTOTYPE ADVISORY BANNER AT THE TOP OF BODY
const disclaimerBanner = `  <!-- PROTOTYPE REFERENCE DESIGN NOTICE (Management Review & Handover Reference) -->
  <aside class="bg-amber-950/90 text-amber-200 text-[11px] py-1 px-4 text-center border-b border-amber-800/80 font-medium tracking-wide" role="note" aria-label="प्रारूप सूचना">
    <div class="max-w-7xl mx-auto flex items-center justify-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
      <span data-i18n="topStrip.prototypeDisclaimer">प्रस्तावित संकेतस्थळ प्रारूप — शासकीय पडताळणी व अंतिम मंजुरीच्या अधीन | Proposed Website Design — Pending Verification</span>
    </div>
  </aside>\n\n`;

if (!html.includes('PROTOTYPE REFERENCE DESIGN NOTICE')) {
  html = html.replace('<body>', '<body>\n' + disclaimerBanner);
}

// 3. TIGHTEN TOP STRIP PADDING
html = html.replace(
  '<header id="top-strip" class="bg-gov-topStrip text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800"',
  '<header id="top-strip" class="bg-gov-topStrip text-slate-300 text-xs py-1 px-4 border-b border-slate-800"'
);

// 4. TIGHTEN MAIN HEADER PADDING & SUBTITLE
html = html.replace(
  '<div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">',
  '<div class="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4">'
);

html = html.replace(
  '<h1 class="text-sm sm:text-xl lg:text-2xl font-black tracking-tight leading-tight text-white drop-shadow-sm truncate sm:whitespace-normal" data-i18n="header.portalTitle">\n            नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७\n          </h1>',
  '<h1 class="text-sm sm:text-base lg:text-lg font-black tracking-tight leading-tight text-white drop-shadow-sm truncate sm:whitespace-normal" data-i18n="header.portalTitle">\n            नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७\n          </h1>'
);

html = html.replace(
  '<div class="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide hidden sm:block" data-i18n="header.authoritySub">\n            Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027\n          </div>',
  '<div class="text-[10px] sm:text-xs text-slate-300 font-medium tracking-wide hidden sm:block" data-i18n="header.authoritySub">\n            प्रस्तावित संकेतस्थळ संदर्भ प्रारूप • Proposed Reference Design\n          </div>'
);

// 5. REFINE HERO SECTION (Balanced headline, recognizable background photo, credible timeline)
html = html.replace(
  `style="background: linear-gradient(to right, rgba(10, 28, 51, 0.95), rgba(15, 37, 66, 0.88), rgba(10, 28, 51, 0.95)), url('./public/images/hero-kumbh-crowd.jpg') center/cover no-repeat;"`,
  `style="background: linear-gradient(to right, rgba(10, 28, 51, 0.88), rgba(10, 28, 51, 0.72), rgba(10, 28, 51, 0.88)), url('./public/images/hero-kumbh-crowd.jpg') center/cover no-repeat;"`
);

// Remove animate-ping from badge dot & replace badge text
html = html.replace(
  `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>\n              <span data-i18n="hero.badge">महाराष्ट्र शासन अधिकृत महाकुंभ पोर्टल</span>`,
  `<span class="w-2 h-2 rounded-full bg-amber-400"></span>\n              <span data-i18n="hero.badge">प्रस्तावित संदर्भ प्रारूप • Proposed Reference Design</span>`
);

// Headline size
html = html.replace(
  `<h1 id="hero-title" class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 drop-shadow-md" data-i18n="hero.title">`,
  `<h1 id="hero-title" class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-3 max-w-3xl drop-shadow" data-i18n="hero.title">`
);

// Timeline block replacement
const oldTimeline = `            <!-- Official Kumbh Dates Banner -->
            <div class="bg-slate-900/90 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl max-w-3xl mb-6 shadow-xl backdrop-blur-md">
              <div class="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                <svg class="w-5 h-5 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span data-i18n="hero.datesPlaceholder">सिंहस्थ कालमर्यादा: ३१ ऑक्टोबर २०२६ (ध्वजारोहण) • मुख्य अमृत स्नान: ऑगस्ट – सप्टेंबर २०२७ • सांगता: २४ जुलै २०२८</span>
              </div>
              <div class="text-xs text-slate-300 mt-2 flex items-center justify-between flex-wrap gap-2">
                <span data-i18n="hero.datesSource">अखिल भारतीय आखाडा परिषद व पुरोहित संघ मान्यताप्राप्त (nashikkumbhmela.co.in)</span>
                <span class="text-emerald-400 font-bold font-mono" data-i18n="hero.datesGazette">शासकीय राजपत्र अधिसूचित</span>
              </div>
            </div>`;

const newTimeline = `            <!-- Reference Timeline Window (Clearly labeled provisional) -->
            <div class="bg-slate-900/85 border-l-4 border-amber-500 p-3.5 sm:p-4 rounded-r-lg max-w-2xl mb-5 shadow-md backdrop-blur-sm">
              <div class="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
                <svg class="w-4 h-4 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span data-i18n="hero.datesPlaceholder">नियोजित कालमर्यादा: ३१ ऑक्टोबर २०२६ (ध्वजारोहण) • सांगता: २४ जुलै २०२८</span>
              </div>
              <div class="text-[11px] text-slate-300 mt-1.5 flex items-center justify-between flex-wrap gap-2">
                <span data-i18n="hero.datesSource">परंपरागत संदर्भ पंचांग तिथींनुसार (nashikkumbhmela.co.in)</span>
                <span class="text-amber-300 font-medium bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-[10px]" data-i18n="hero.datesGazette">प्रस्तावित • अंतिम शासकीय अधिसूचनेच्या अधीन</span>
              </div>
            </div>`;

html = html.replace(oldTimeline, newTimeline);

// Remove animate-pulse on hero AI button icon
html = html.replace('<svg class="w-5 h-5 animate-pulse"', '<svg class="w-5 h-5"');

// 6. REPLACE SIMULATED TELEMETRY WITH FACTUAL KEY REFERENCE METRICS
const oldTelemetry = `      <!-- REAL-TIME SACRED TELEMETRY RIBBON -->
      <section class="bg-slate-900 border-y border-slate-800 py-3 px-4 text-xs font-semibold text-slate-300" aria-label="थेट माहिती फलक">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <span data-i18n="telemetry.riverDischarge">गोदावरी जलप्रवाह: ४,८५० क्युसेक्स (सामान्य / सुरक्षित)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span data-i18n="telemetry.waterQuality">जल गुणवत्ता: वर्ग 'अ' (उत्कृष्ट / स्नानायोग्य)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span data-i18n="telemetry.footfall">अपेक्षित भाविक उपस्थिती: १.२ कोटी (आजचे अंदाज)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span data-i18n="telemetry.controlRoom">थेट आपत्कालीन नियंत्रण कक्ष: २४x७ कार्यरत</span>
          </div>
        </div>
      </section>`;

const newTelemetry = `      <!-- INFORMATIONAL KEY METRICS RIBBON (Reference Information) -->
      <section class="bg-slate-900 border-y border-slate-800 py-2.5 px-4 text-xs font-medium text-slate-300" aria-label="पर्व संदर्भ माहिती पट्टी">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
            <span data-i18n="telemetry.riverDischarge">नियोजित कालावधी: २०२६ – २०२८</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
            <span data-i18n="telemetry.waterQuality">मुख्य तीर्थक्षेत्र: रामकुंड व त्र्यंबकेश्वर</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
            <span data-i18n="telemetry.footfall">प्रस्तावित वेळापत्रक: १५ पर्व स्नान तिथी</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0"></span>
            <span data-i18n="telemetry.controlRoom">प्रस्तावित एकात्मिक भाविक सहाय्य प्रणाली</span>
          </div>
        </div>
      </section>`;

html = html.replace(oldTelemetry, newTelemetry);

// 7. REVISE LEADERSHIP SECTION (Separating elected ministers from administrative officers, fixing designations)
const oldSunetra = `              <h3 class="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-amber-800 transition" data-i18n="leadership.dcm2Name">श्रीमती सुनेत्रा अजित पवार</h3>
              <div class="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/70" data-i18n="leadership.dcm2Role">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                मा. उपमुख्यमंत्री, महाराष्ट्र राज्य
              </div>`;

const newSunetra = `              <h3 class="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-amber-800 transition" data-i18n="leadership.dcm2Name">श्रीमती सुनेत्रा अजित पवार</h3>
              <div class="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200 text-center" data-i18n="leadership.dcm2Role">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                मा. खासदार (राज्यसभा) [प्रस्तावित समावेश]
              </div>`;

html = html.replace(oldSunetra, newSunetra);

// Remove group-hover:scale-105 from minister images for dignified institutional stability
html = html.replace(/transition duration-300 group-hover:scale-105/g, 'transition duration-200');

// 8. FIX MEDICAL HELP ICON IN QUICK SERVICE TILES
const oldMedicalTile = `          <!-- Tile 6: Medical Help -->
          <a href="#safety" data-nav-target="safety" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-400 transition flex flex-col items-center text-center group tap-target">
            <div class="w-14 h-14 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </div>
            <span class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-800" data-i18n="quickServices.medicalHelp">मोफत वैद्यकीय मदत</span>
          </a>`;

const newMedicalTile = `          <!-- Tile 6: Medical Help (Accurate First-Aid Cross SVG) -->
          <a href="#safety" data-nav-target="safety" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-400 transition flex flex-col items-center text-center group tap-target">
            <div class="w-14 h-14 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </div>
            <span class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-800" data-i18n="quickServices.medicalHelp">वैद्यकीय मदत व प्रथमोपचार</span>
          </a>`;

html = html.replace(oldMedicalTile, newMedicalTile);

// Tile 3 rephrase
html = html.replace(
  `<span class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800" data-i18n="quickServices.parkingTransport">पार्किंग व मोफत बसेस</span>`,
  `<span class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800" data-i18n="quickServices.parkingTransport">पार्किंग व शटल बस मार्ग</span>`
);

// 9. SCHEDULE SECTION HEADINGS
html = html.replace(
  `<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded" data-i18n="keyDates.title">अधिकृत पर्व वेळापत्रक</span>`,
  `<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded" data-i18n="keyDates.title">प्रस्तावित पर्व वेळापत्रक</span>`
);

html = html.replace(
  `<button onclick="simulatePdfDownload('schedule-pdf', 'सिंहस्थ २०२७ अधिकृत राजपत्र वेळापत्रक')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded border border-slate-300 flex items-center gap-1.5 transition">
            <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>
            <span data-i18n="keyDates.downloadPdf">अधिकृत वेळापत्रक राजपत्र (PDF)</span>
          </button>`,
  `<button onclick="simulatePdfDownload('schedule-pdf', 'सिंहस्थ २०२७ प्रस्तावित वेळापत्रक माहिती')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded border border-slate-300 flex items-center gap-1.5 transition">
            <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>
            <span data-i18n="keyDates.downloadPdf">प्रस्तावित वेळापत्रक माहिती (PDF)</span>
          </button>`
);

// 10. FOOTER DISCLAIMER NOTICE
const footerNotice = `      <!-- Reference Prototype Legal Notice -->
      <div class="mt-4 pt-4 border-t border-slate-800/60 text-center">
        <p class="text-[11px] text-slate-400 max-w-4xl mx-auto leading-relaxed" data-i18n="footer.disclaimerNotice">
          हे संकेतस्थळ नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७ चे प्रस्तावित संदर्भ प्रारूप (Proposed Reference Design) असून शासकीय पुनरावलोकनासाठी तयार केले आहे. सर्व माहिती अंतिम शासकीय राजपत्र व अधिसूचनेच्या अधीन आहे.
        </p>
      </div>`;

if (!html.includes('footer.disclaimerNotice')) {
  html = html.replace('<!-- Copyright & Last Updated -->', footerNotice + '\n\n      <!-- Copyright & Last Updated -->');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Updated index.html successfully');
