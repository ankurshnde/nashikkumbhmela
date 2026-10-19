const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  // 1. Top Strip & Header
  [
    '<span class="text-amber-400 font-bold">महाराष्ट्र शासन</span>',
    '<span class="text-amber-400 font-bold" data-i18n="header.govTitle">महाराष्ट्र शासन</span>'
  ],
  [
    '<div class="text-[9px] sm:text-xs text-amber-300 font-extrabold uppercase tracking-wider truncate">\n            महाराष्ट्र शासन • Government of Maharashtra\n          </div>',
    '<div class="text-[9px] sm:text-xs text-amber-300 font-extrabold uppercase tracking-wider truncate" data-i18n="header.govSubtitle">\n            महाराष्ट्र शासन • Government of Maharashtra\n          </div>'
  ],
  [
    '<h1 class="text-sm sm:text-xl lg:text-2xl font-black tracking-tight leading-tight text-white drop-shadow-sm truncate sm:whitespace-normal">\n            नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७\n          </h1>',
    '<h1 class="text-sm sm:text-xl lg:text-2xl font-black tracking-tight leading-tight text-white drop-shadow-sm truncate sm:whitespace-normal" data-i18n="header.portalTitle">\n            नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७\n          </h1>'
  ],
  [
    '<div class="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide hidden sm:block">\n            Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027\n          </div>',
    '<div class="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide hidden sm:block" data-i18n="header.authoritySub">\n            Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027\n          </div>'
  ],
  [
    '<span>कुंभदूत AI सहाय्यक उघडा</span>',
    '<span data-i18n="header.openAssistant">कुंभदूत AI सहाय्यक उघडा</span>'
  ],
  [
    '<button class="open-qr-modal text-xs font-bold text-amber-300 py-2 px-3 rounded border border-amber-400/40 w-full text-center">\n          📱 मुद्रणासाठी ॲप QR कोड पहा\n        </button>',
    '<button class="open-qr-modal text-xs font-bold text-amber-300 py-2 px-3 rounded border border-amber-400/40 w-full text-center" data-i18n="header.viewQr">\n          📱 मुद्रणासाठी ॲप QR कोड पहा\n        </button>'
  ],

  // 2. Telemetry Ribbon
  [
    '<span data-i18n="telemetry.weather">हवामान: २४°C, आल्हाददायक</span>',
    '<span data-i18n="telemetry.footfall">अपेक्षित भाविक उपस्थिती: १.२ कोटी (आजचे अंदाज)</span>'
  ],
  [
    '<span data-i18n="telemetry.crowdFlow">गर्दी नियंत्रण: सुरळीत व नियंत्रित</span>',
    '<span data-i18n="telemetry.controlRoom">थेट आपत्कालीन नियंत्रण कक्ष: २४x७ कार्यरत</span>'
  ],

  // 3. Heritage Section
  [
    '<span class="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">पवित्र तीर्थक्षेत्रे</span>',
    '<span class="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full" data-i18n="heritage.badge">पवित्र तीर्थक्षेत्रे</span>'
  ],
  [
    '<h2 id="heritage-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">\n              नाशिक-त्र्यंबकेश्वर पावन तीर्थक्षेत्र दर्शन\n            </h2>\n            <p class="text-slate-600 text-xs sm:text-sm mt-1">\n              गोदावरी नदीचे पवित्र रामकुंड व त्र्यंबकेश्वर ज्योतिर्लिंग कुशावर्त तीर्थ\n            </p>',
    '<h2 id="heritage-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2" data-i18n="heritage.title">\n              नाशिक-त्र्यंबकेश्वर पावन तीर्थक्षेत्र दर्शन\n            </h2>\n            <p class="text-slate-600 text-xs sm:text-sm mt-1" data-i18n="heritage.subtitle">\n              गोदावरी नदीचे पवित्र रामकुंड व त्र्यंबकेश्वर ज्योतिर्लिंग कुशावर्त तीर्थ\n            </p>'
  ],
  [
    '<span class="text-xs font-bold text-amber-400 uppercase tracking-wider">नाशिक • पंचवटी</span>\n                  <h3 class="text-xl sm:text-2xl font-black text-white">पवित्र रामकुंड स्नान घाट व दीपमाळ</h3>\n                  <p class="text-xs text-slate-300 mt-0.5">वैष्णव आखाड्यांचे मुख्य शाही स्नान तीर्थ व गोदावरी महाआरती परिसर</p>',
    '<span class="text-xs font-bold text-amber-400 uppercase tracking-wider" data-i18n="heritage.ramkundLoc">नाशिक • पंचवटी</span>\n                  <h3 class="text-xl sm:text-2xl font-black text-white" data-i18n="heritage.ramkundTitle">पवित्र रामकुंड स्नान घाट व दीपमाळ</h3>\n                  <p class="text-xs text-slate-300 mt-0.5" data-i18n="heritage.ramkundDesc">वैष्णव आखाड्यांचे मुख्य शाही स्नान तीर्थ व गोदावरी महाआरती परिसर</p>'
  ],
  [
    '<div class="text-xs text-slate-600">\n                  <strong>सुविधा:</strong> महिला चेंजिंग कक्ष, सुरक्षा रक्षक, लाइफ जॅकेट्स, पिण्याचे पाणी\n                </div>\n                <a href="#map" data-nav-target="map" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1">\n                  नकाशावर पहा ➔\n                </a>',
    '<div class="text-xs text-slate-600">\n                  <strong data-i18n="heritage.ramkundFacilitiesLabel">सुविधा:</strong> <span data-i18n="heritage.ramkundFacilities">महिला चेंजिंग कक्ष, सुरक्षा रक्षक, लाइफ जॅकेट्स, पिण्याचे पाणी</span>\n                </div>\n                <a href="#map" data-nav-target="map" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1" data-i18n="heritage.viewOnMap">\n                  नकाशावर पहा ➔\n                </a>'
  ],
  [
    '<span class="text-xs font-bold text-amber-400 uppercase tracking-wider">त्र्यंबकेश्वर • ब्रह्मगिरी</span>\n                  <h3 class="text-xl sm:text-2xl font-black text-white">त्र्यंबकेश्वर ज्योतिर्लिंग व कुशावर्त कुंड</h3>\n                  <p class="text-xs text-slate-300 mt-0.5">द्वादश ज्योतिर्लिंगांपैकी एक आणि शैव आखाड्यांचे पावन शाही स्नान कुंड</p>',
    '<span class="text-xs font-bold text-amber-400 uppercase tracking-wider" data-i18n="heritage.trimbakLoc">त्र्यंबकेश्वर • ब्रह्मगिरी</span>\n                  <h3 class="text-xl sm:text-2xl font-black text-white" data-i18n="heritage.trimbakTitle">त्र्यंबकेश्वर ज्योतिर्लिंग व कुशावर्त कुंड</h3>\n                  <p class="text-xs text-slate-300 mt-0.5" data-i18n="heritage.trimbakDesc">द्वादश ज्योतिर्लिंगांपैकी एक आणि शैव आखाड्यांचे पावन शाही स्नान कुंड</p>'
  ],
  [
    '<div class="text-xs text-slate-600">\n                  <strong>सुविधा:</strong> बॅरिकेडिंग, ध्वनिक्षेपक नियंत्रण, मोफत शटल बस थांबा\n                </div>\n                <a href="#map" data-nav-target="map" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1">\n                  नकाशावर पहा ➔\n                </a>',
    '<div class="text-xs text-slate-600">\n                  <strong data-i18n="heritage.trimbakFacilitiesLabel">सुविधा:</strong> <span data-i18n="heritage.trimbakFacilities">बॅरिकेडिंग, ध्वनिक्षेपक नियंत्रण, मोफत शटल बस थांबा</span>\n                </div>\n                <a href="#map" data-nav-target="map" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1" data-i18n="heritage.viewOnMap">\n                  नकाशावर पहा ➔\n                </a>'
  ],

  // 4. Home Notices Preview
  [
    '<h2 id="home-notices-heading" class="text-2xl font-extrabold text-slate-900" data-i18n="nav.notices">\n                शासकीय परिपत्रके व आदेश (Official Notices)\n              </h2>\n              <p class="text-xs text-slate-600 mt-1">\n                नाशिक जिल्हाधिकारी कार्यालय, पोलीस प्रशासन आणि आपत्ती व्यवस्थापन प्राधिकरणाची अधिकृत परिपत्रके\n              </p>',
    '<h2 id="home-notices-heading" class="text-2xl font-extrabold text-slate-900" data-i18n="notices.homeTitle">\n                शासकीय परिपत्रके व आदेश (Official Notices)\n              </h2>\n              <p class="text-xs text-slate-600 mt-1" data-i18n="notices.homeSubtitle">\n                नाशिक जिल्हाधिकारी कार्यालय, पोलीस प्रशासन आणि आपत्ती व्यवस्थापन प्राधिकरणाची अधिकृत परिपत्रके\n              </p>'
  ],
  [
    '<a href="#notices" data-nav-target="notices" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 whitespace-nowrap">\n              सर्व परिपत्रके पहा ➔\n            </a>',
    '<a href="#notices" data-nav-target="notices" class="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 whitespace-nowrap" data-i18n="notices.viewAll">\n              सर्व परिपत्रके पहा ➔\n            </a>'
  ],

  // 5. Lost Child Protocol Subtitle
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded">आपत्कालीन कार्यपद्धती</span>\n            <h2 id="lost-child-heading" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2" data-i18n="lostChild.title">\n              हरवलेली व्यक्ती / बालकांसाठी ४-टप्प्यांची एकात्मिक कार्यपद्धती\n            </h2>\n            <p class="text-slate-600 text-xs sm:text-sm mt-1">\n              कुंभमेळ्यातील गर्दीत कोणी हरवल्यास तात्काळ करावयाची अधिकृत सुरक्षा कृती\n            </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded" data-i18n="safety.emergencyBadge">आपत्कालीन कार्यपद्धती</span>\n            <h2 id="lost-child-heading" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2" data-i18n="safety.lostChildTitle">\n              हरवलेली व्यक्ती / बालकांसाठी ४-टप्प्यांची एकात्मिक कार्यपद्धती\n            </h2>\n            <p class="text-slate-600 text-xs sm:text-sm mt-1" data-i18n="safety.lostChildSubtitle">\n              कुंभमेळ्यातील गर्दीत कोणी हरवल्यास तात्काळ करावयाची अधिकृत सुरक्षा कृती\n            </p>'
  ],

  // 6. Schedule Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">अधिकृत पर्व वेळापत्रक</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.schedule">\n            शाही स्नान वेळापत्रक व आखाडा कार्यक्रम (Shahi Snan Schedule)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1 font-medium">\n            अखिल भारतीय आखाडा परिषद, पुरोहित संघ आणि महाराष्ट्र शासन मान्यताप्राप्त अधिकृत तिथी\n          </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded" data-i18n="keyDates.title">अधिकृत पर्व वेळापत्रक</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="keyDates.heading">\n            शाही स्नान वेळापत्रक व आखाडा कार्यक्रम (Shahi Snan Schedule)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1 font-medium" data-i18n="keyDates.note">\n            अखिल भारतीय आखाडा परिषद, पुरोहित संघ आणि महाराष्ट्र शासन मान्यताप्राप्त अधिकृत तिथी\n          </p>'
  ],
  [
    '<button data-schedule-filter="all" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-gov-header text-white transition tap-target whitespace-nowrap shadow-sm" aria-pressed="true">सर्व तिथी व विधी (All Dates)</button>\n        <button data-schedule-filter="shahi" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">अमृत / शाही स्नान (Amrit Snan)</button>\n        <button data-schedule-filter="parva" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पर्व स्नान व उत्सव (Parva Snan)</button>\n        <button data-schedule-filter="ceremony" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">ध्वजारोहण व सांगता (Ceremonies)</button>',
    '<button data-schedule-filter="all" data-i18n="ui.scheduleFilterAll" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-gov-header text-white transition tap-target whitespace-nowrap shadow-sm" aria-pressed="true">सर्व तिथी व विधी (All Dates)</button>\n        <button data-schedule-filter="shahi" data-i18n="ui.scheduleFilterShahi" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">अमृत / शाही स्नान (Amrit Snan)</button>\n        <button data-schedule-filter="parva" data-i18n="ui.scheduleFilterParva" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पर्व स्नान व उत्सव (Parva Snan)</button>\n        <button data-schedule-filter="ceremony" data-i18n="ui.scheduleFilterCeremony" class="flex-shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">ध्वजारोहण व सांगता (Ceremonies)</button>'
  ],

  // 7. Map Page Filters & Table
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">तीर्थक्षेत्र जीआयएस</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.map">\n            तीर्थक्षेत्र नकाशा व महत्त्वाची ठिकाणे (Places & Map)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1">\n            पवित्र घाट, सॅटेलाइट पार्किंग, बस शटल पिकअप, मोफत वैद्यकीय केंद्रे आणि पोलीस चौक्यांची स्थाने\n          </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded" data-i18n="heritage.badge">तीर्थक्षेत्र जीआयएस</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.map">\n            तीर्थक्षेत्र नकाशा व महत्त्वाची ठिकाणे (Places & Map)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="heritage.subtitle">\n            पवित्र घाट, सॅटेलाइट पार्किंग, बस शटल पिकअप, मोफत वैद्यकीय केंद्रे आणि पोलीस चौक्यांची स्थाने\n          </p>'
  ],
  [
    '<button data-map-filter="all" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gov-header text-white transition tap-target whitespace-nowrap" aria-pressed="true">सर्व सुविधा (All)</button>\n        <button data-map-filter="ghat" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पवित्र घाट (Ghats)</button>\n        <button data-map-filter="parking" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पार्किंग हब (Parking)</button>\n        <button data-map-filter="shuttle" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">बस शटल (Shuttles)</button>\n        <button data-map-filter="medical" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">वैद्यकीय मदत (Medical)</button>\n        <button data-map-filter="police" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पोलीस मदत (Police)</button>\n        <button data-map-filter="water_toilet" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पाणी व स्वच्छता (Sanitation)</button>',
    '<button data-map-filter="all" data-i18n="ui.mapFilterAll" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gov-header text-white transition tap-target whitespace-nowrap" aria-pressed="true">सर्व सुविधा (All)</button>\n        <button data-map-filter="ghat" data-i18n="ui.mapFilterGhats" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पवित्र घाट (Ghats)</button>\n        <button data-map-filter="parking" data-i18n="ui.mapFilterParking" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पार्किंग हब (Parking)</button>\n        <button data-map-filter="shuttle" data-i18n="ui.mapFilterShuttles" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">बस शटल (Shuttles)</button>\n        <button data-map-filter="medical" data-i18n="ui.mapFilterMedical" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">वैद्यकीय मदत (Medical)</button>\n        <button data-map-filter="police" data-i18n="ui.mapFilterPolice" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पोलीस मदत (Police)</button>\n        <button data-map-filter="water_toilet" data-i18n="ui.mapFilterSanitation" class="flex-shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition tap-target whitespace-nowrap" aria-pressed="false">पाणी व स्वच्छता (Sanitation)</button>'
  ],
  [
    '<th class="p-3">अ.क्र.</th>\n                <th class="p-3">ठिकाणाचे नाव व माहिती</th>\n                <th class="p-3">प्रवर्ग</th>\n                <th class="p-3">शहर</th>\n                <th class="p-3">उपलब्ध सुविधा</th>\n                <th class="p-3">नकाशा लिंक</th>',
    '<th class="p-3" data-i18n="ui.mapTableSr">अ.क्र.</th>\n                <th class="p-3" data-i18n="ui.mapTableName">ठिकाणाचे नाव व माहिती</th>\n                <th class="p-3" data-i18n="ui.mapTableCategory">प्रवर्ग</th>\n                <th class="p-3" data-i18n="ui.mapTableCity">शहर</th>\n                <th class="p-3" data-i18n="ui.mapTableFacilities">उपलब्ध सुविधा</th>\n                <th class="p-3" data-i18n="ui.mapTableLink">नकाशा लिंक</th>'
  ],

  // 8. Transport Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">वाहतूक व्यवस्था</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.transport">\n          वाहतूक, पार्किंग व विशेष शटल व्यवस्था (Transport & Parking)\n        </h2>\n        <p class="text-xs sm:text-sm text-slate-600 mt-1">\n          रेल्वे स्थानक, एसटी बस टर्मिनल्स, सॅटेलाइट पार्किंग हब आणि पादचारी नो-व्हेईकल झोनची माहिती\n        </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded" data-i18n="transport.badge">वाहतूक व्यवस्था</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="transport.title">\n          वाहतूक, पार्किंग व विशेष शटल व्यवस्था (Transport & Parking)\n        </h2>\n        <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="transport.subtitle">\n          रेल्वे स्थानक, एसटी बस टर्मिनल्स, सॅटेलाइट पार्किंग हब आणि पादचारी नो-व्हेईकल झोनची माहिती\n        </p>'
  ],
  [
    '<h3 class="text-lg font-bold text-slate-900">रेल्वे वाहतूक व्यवस्था (Indian Railways)</h3>',
    '<h3 class="text-lg font-bold text-slate-900" data-i18n="transport.railTitle">रेल्वे वाहतूक व्यवस्था (Indian Railways)</h3>'
  ],
  [
    '<p class="text-sm text-slate-700 mb-3">नाशिक रोड रेल्वे स्थानकावरून पंचवटी आणि तपोवन घाटाकडे जाणाऱ्या मोफत इलेक्ट्रिक बस शटल्स दर ३ ते ५ मिनिटांनी उपलब्ध असतील.</p>',
    '<p class="text-sm text-slate-700 mb-3" data-i18n="transport.railDesc">नाशिक रोड रेल्वे स्थानकावरून पंचवटी आणि तपोवन घाटाकडे जाणाऱ्या मोफत इलेक्ट्रिक बस शटल्स दर ३ ते ५ मिनिटांनी उपलब्ध असतील.</p>'
  ],
  [
    '<h3 class="text-lg font-bold text-slate-900">एसटी व तीर्थक्षेत्र शटल बसेस (MSRTC)</h3>',
    '<h3 class="text-lg font-bold text-slate-900" data-i18n="transport.busTitle">एसटी व तीर्थक्षेत्र शटल बसेस (MSRTC)</h3>'
  ],
  [
    '<p class="text-sm text-slate-700 mb-3">महाराष्ट्रभरातून येणाऱ्या भाविकांसाठी ३,५००+ विशेष कुंभ बसेस आणि शहराबाहेरील पार्किंगमधून सतत रिंगरोड शटल्स.</p>',
    '<p class="text-sm text-slate-700 mb-3" data-i18n="transport.busDesc">महाराष्ट्रभरातून येणाऱ्या भाविकांसाठी ३,५००+ विशेष कुंभ बसेस आणि शहराबाहेरील पार्किंगमधून सतत रिंगरोड शटल्स.</p>'
  ],
  [
    'शहराबाहेरील सॅटेलाइट पार्किंग हब (Outer Satellite Parking Hubs)',
    '<span data-i18n="transport.parkingTitle">शहराबाहेरील सॅटेलाइट पार्किंग हब (Outer Satellite Parking Hubs)</span>'
  ],
  [
    'सर्व खाजगी वाहने (कार, ट्रॅव्हल्स बसेस) खालील निश्चित पार्किंग झोनमध्ये लावणे अनिवार्य आहे.',
    '<span data-i18n="transport.parkingSubtitle">सर्व खाजगी वाहने (कार, ट्रॅव्हल्स बसेस) खालील निश्चित पार्किंग झोनमध्ये लावणे अनिवार्य आहे.</span>'
  ],
  [
    '<span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">झोन P1 - आडगाव</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2">मुंबई-धुळे महामार्ग (NH-3)</h4>\n            <p class="text-xs text-slate-600 mt-1">उत्तर व पूर्व महाराष्ट्रातून येणाऱ्या वाहनांसाठी. १२,००० वाहनांची क्षमता. थेट तपोवन शटल कॉरिडोअर.</p>',
    '<span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded" data-i18n="transport.p1Zone">झोन P1 - आडगाव</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2" data-i18n="transport.p1Highway">मुंबई-धुळे महामार्ग (NH-3)</h4>\n            <p class="text-xs text-slate-600 mt-1" data-i18n="transport.p1Desc">उत्तर व पूर्व महाराष्ट्रातून येणाऱ्या वाहनांसाठी. १२,००० वाहनांची क्षमता. थेट तपोवन शटल कॉरिडोअर.</p>'
  ],
  [
    '<span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">झोन P2 - अंबड</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2">पुणे-नाशिक महामार्ग (NH-60)</h4>\n            <p class="text-xs text-slate-600 mt-1">पुणे व दक्षिण भारतातून येणाऱ्या वाहनांसाठी. १५,००० वाहनांची क्षमता. द्वारका व पंचवटी शटल मार्ग.</p>',
    '<span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded" data-i18n="transport.p2Zone">झोन P2 - अंबड</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2" data-i18n="transport.p2Highway">पुणे-नाशिक महामार्ग (NH-60)</h4>\n            <p class="text-xs text-slate-600 mt-1" data-i18n="transport.p2Desc">पुणे व दक्षिण भारतातून येणाऱ्या वाहनांसाठी. १५,००० वाहनांची क्षमता. द्वारका व पंचवटी शटल मार्ग.</p>'
  ],
  [
    '<span class="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">झोन P3 - त्र्यंबक रोड</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2">सातपूर व त्र्यंबक बायपास</h4>\n            <p class="text-xs text-slate-600 mt-1">त्र्यंबकेश्वर मंदिराकडे जाणाऱ्या वाहनांसाठी. ८,००० क्षमता. मंदिर परिसराकडे इलेक्ट्रिक बसेस.</p>',
    '<span class="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded" data-i18n="transport.p3Zone">झोन P3 - त्र्यंबक रोड</span>\n            <h4 class="text-sm font-bold text-slate-900 mt-2" data-i18n="transport.p3Highway">सातपूर व त्र्यंबक बायपास</h4>\n            <p class="text-xs text-slate-600 mt-1" data-i18n="transport.p3Desc">त्र्यंबकेश्वर मंदिराकडे जाणाऱ्या वाहनांसाठी. ८,००० क्षमता. मंदिर परिसराकडे इलेक्ट्रिक बसेस.</p>'
  ],
  [
    '<h4 class="text-sm font-bold text-rose-900">पादचारी व नो-व्हेईकल झोन (Strict Zero-Vehicle Sacred Zones)</h4>\n        <p class="text-xs text-rose-800 mt-1 leading-relaxed">\n          शाही स्नानाच्या दिवशी रामकुंड परिसर, दोन्ही गोदावरी तट (२ किमी परिघ) आणि त्र्यंबकेश्वर कुशावर्त परिसरामध्ये कोणत्याही वाहनांना (दोन चाकी व चार चाकी) प्रवेश दिला जाणार नाही. केवळ रुग्णवाहिका व अत्यावश्यक सेवा वाहनांना परवानगी असेल.\n        </p>',
    '<h4 class="text-sm font-bold text-rose-900" data-i18n="transport.noVehicleTitle">पादचारी व नो-व्हेईकल झोन (Strict Zero-Vehicle Sacred Zones)</h4>\n        <p class="text-xs text-rose-800 mt-1 leading-relaxed" data-i18n="transport.noVehicleDesc">\n          शाही स्नानाच्या दिवशी रामकुंड परिसर, दोन्ही गोदावरी तट (२ किमी परिघ) आणि त्र्यंबकेश्वर कुशावर्त परिसरामध्ये कोणत्याही वाहनांना (दोन चाकी व चार चाकी) प्रवेश दिला जाणार नाही. केवळ रुग्णवाहिका व अत्यावश्यक सेवा वाहनांना परवानगी असेल.\n        </p>'
  ],

  // 9. Safety Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">आपत्कालीन नियंत्रण</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.safety">\n            सुरक्षा, आपत्कालीन संपर्क व नियंत्रण कक्ष (Safety & Helplines)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1">\n            २४x७ आपत्कालीन संपर्क क्रमांक, महिला व बालक सुरक्षा, आपत्ती नियंत्रण मार्गदर्शक\n          </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded" data-i18n="safety.emergencyBadge">आपत्कालीन नियंत्रण</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="safety.emergencyTitle">\n            सुरक्षा, आपत्कालीन संपर्क व नियंत्रण कक्ष (Safety & Helplines)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="safety.emergencySubtitle">\n            २४x७ आपत्कालीन संपर्क क्रमांक, महिला व बालक सुरक्षा, आपत्ती नियंत्रण मार्गदर्शक\n          </p>'
  ],
  [
    '<span>🚨</span> २४x७ राष्ट्रीय व शासकीय आपत्कालीन संपर्क क्रमांक (Emergency Numbers)',
    '<span>🚨</span> <span data-i18n="safety.numbersTitle">२४x७ राष्ट्रीय व शासकीय आपत्कालीन संपर्क क्रमांक (Emergency Numbers)</span>'
  ],
  [
    '<span>🛡️</span> महिला, बालके व ज्येष्ठ नागरिकांची विशेष सुरक्षा',
    '<span>🛡️</span> <span data-i18n="safety.womenSectionTitle">महिला, बालके व ज्येष्ठ नागरिकांची विशेष सुरक्षा</span>'
  ],
  [
    'महिला व बालकांसाठी सर्व घाटांवर स्वतंत्र, सुरक्षित आणि संवेदनशील सुविधा उपलब्ध करण्यात आल्या आहेत.',
    '<span data-i18n="safety.womenSectionSubtitle">महिला व बालकांसाठी सर्व घाटांवर स्वतंत्र, सुरक्षित आणि संवेदनशील सुविधा उपलब्ध करण्यात आल्या आहेत.</span>'
  ],
  [
    '<h4 class="text-sm font-bold text-purple-950 mb-1">पिंक पोलीस मदत केंद्र (Pink Booths)</h4>\n            <p class="text-xs text-slate-600">सर्व घाटांवर महिला पोलीस अधिकाऱ्यांची स्वतंत्र मदत केंद्रे, जिथे महिला भाविकांना त्वरित तक्रार नोंदणी व मदत मिळेल.</p>',
    '<h4 class="text-sm font-bold text-purple-950 mb-1" data-i18n="safety.pinkBoothTitle">पिंक पोलीस मदत केंद्र (Pink Booths)</h4>\n            <p class="text-xs text-slate-600" data-i18n="safety.pinkBoothDesc">सर्व घाटांवर महिला पोलीस अधिकाऱ्यांची स्वतंत्र मदत केंद्रे, जिथे महिला भाविकांना त्वरित तक्रार नोंदणी व मदत मिळेल.</p>'
  ],
  [
    '<h4 class="text-sm font-bold text-purple-950 mb-1">हिरकणी कक्ष (माता-बाल संगोपन)</h4>\n            <p class="text-xs text-slate-600">स्तनपान करणाऱ्या मातांसाठी व लहान बालकांच्या काळजीसाठी स्वच्छ, सुरक्षित, पडद्याची वातानुकूलित स्वतंत्र व्यवस्था.</p>',
    '<h4 class="text-sm font-bold text-purple-950 mb-1" data-i18n="safety.hirkaniTitle">हिरकणी कक्ष (माता-बाल संगोपन)</h4>\n            <p class="text-xs text-slate-600" data-i18n="safety.hirkaniDesc">स्तनपान करणाऱ्या मातांसाठी व लहान बालकांच्या काळजीसाठी स्वच्छ, सुरक्षित, पडद्याची वातानुकूलित स्वतंत्र व्यवस्था.</p>'
  ],
  [
    '<h4 class="text-sm font-bold text-purple-950 mb-1">सुरक्षित चेंजिंग रूम्स</h4>\n            <p class="text-xs text-slate-600">स्नानानंतर कपडे बदलण्यासाठी १००+ वॉटरप्रूफ, योग्य प्रकाशयोजना असलेली आणि महिला सुरक्षारक्षक तैनात असलेली चेंजिंग रूम्स.</p>',
    '<h4 class="text-sm font-bold text-purple-950 mb-1" data-i18n="safety.changingRoomTitle">सुरक्षित चेंजिंग रूम्स</h4>\n            <p class="text-xs text-slate-600" data-i18n="safety.changingRoomDesc">स्नानानंतर कपडे बदलण्यासाठी १००+ वॉटरप्रूफ, योग्य प्रकाशयोजना असलेली आणि महिला सुरक्षारक्षक तैनात असलेली चेंजिंग रूम्स.</p>'
  ],

  // 10. Lost & Found Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">कुटुंब पुनर्मिलन</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.lostFound">\n            हरवले व सापडले नियंत्रण कक्ष (Lost & Found Portal)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1">\n            हरवलेल्या व्यक्तींचा शोध, सापडलेल्या साहित्याची नोंदणी व मध्यवर्ती मदत कक्ष संपर्क\n          </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded" data-i18n="lostFound.badge">कुटुंब पुनर्मिलन</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="lostFound.title">\n            हरवले व सापडले नियंत्रण कक्ष (Lost & Found Portal)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="lostFound.subtitle">\n            हरवलेल्या व्यक्तींचा शोध, सापडलेल्या साहित्याची नोंदणी व मध्यवर्ती मदत कक्ष संपर्क\n          </p>'
  ],
  [
    '<button id="lf-tab-search" class="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-gov-header text-white transition tap-target" role="tab" aria-selected="true">\n          🔍 नोंदी शोधा (Search Registry)\n        </button>\n        <button id="lf-tab-report" class="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition tap-target" role="tab" aria-selected="false">\n          ✍️ नवीन नोंद करा (Report Missing/Found)\n        </button>',
    '<button id="lf-tab-search" data-i18n="lostFound.tabSearch" class="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-gov-header text-white transition tap-target" role="tab" aria-selected="true">\n          🔍 नोंदी शोधा (Search Registry)\n        </button>\n        <button id="lf-tab-report" data-i18n="lostFound.tabReport" class="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition tap-target" role="tab" aria-selected="false">\n          ✍️ नवीन नोंद करा (Report Missing/Found)\n        </button>'
  ],
  [
    '<button data-lf-filter="all" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-900 text-white tap-target">सर्व नोंदी</button>\n            <button data-lf-filter="person" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 tap-target">फक्त व्यक्ती (Persons)</button>\n            <button data-lf-filter="item" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 tap-target">साहित्य/बॅगा (Articles)</button>',
    '<button data-lf-filter="all" data-i18n="lostFound.filterAll" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-900 text-white tap-target">सर्व नोंदी</button>\n            <button data-lf-filter="person" data-i18n="lostFound.filterPerson" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 tap-target">फक्त व्यक्ती (Persons)</button>\n            <button data-lf-filter="item" data-i18n="lostFound.filterItem" class="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 tap-target">साहित्य/बॅगा (Articles)</button>'
  ],
  [
    '<h3 class="text-lg font-bold text-slate-900 mb-2">हरवलेल्या व्यक्ती किंवा साहित्याची प्राथमिक नोंदणी</h3>\n        <p class="text-xs text-slate-500 mb-6">\n          ही माहिती मध्यवर्ती पोलीस व कुंभदूत मदत नेटवर्कवर त्वरित प्रसारित केली जाईल.\n        </p>',
    '<h3 class="text-lg font-bold text-slate-900 mb-2" data-i18n="lostFound.reportTitle">हरवलेल्या व्यक्ती किंवा साहित्याची प्राथमिक नोंदणी</h3>\n        <p class="text-xs text-slate-500 mb-6" data-i18n="lostFound.reportSubtitle">\n          ही माहिती मध्यवर्ती पोलीस व कुंभदूत मदत नेटवर्कवर त्वरित प्रसारित केली जाईल.\n        </p>'
  ],
  [
    '<button type="submit" class="w-full bg-gov-header hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-lg shadow transition tap-target">\n              नोंदणी सबमिट करा (Submit Report)\n            </button>',
    '<button type="submit" class="w-full bg-gov-header hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-lg shadow transition tap-target" data-i18n="lostFound.btnSubmit">\n              नोंदणी सबमिट करा (Submit Report)\n            </button>'
  ],

  // 11. Volunteer Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded">सिंहस्थ सेवा</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.volunteer">\n            सिंहस्थ मित्र स्वयंसेवक नोंदणी (Volunteer Registration)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1">\n            देशभरातून येणाऱ्या भाविकांच्या सेवेसाठी, गर्दी व्यवस्थापनासाठी आणि स्वच्छता अभियानासाठी स्वयंसेवक म्हणून सहभागी व्हा.\n          </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded" data-i18n="volunteer.badge">सिंहस्थ सेवा</span>\n          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="volunteer.title">\n            सिंहस्थ मित्र स्वयंसेवक नोंदणी (Volunteer Registration)\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="volunteer.subtitle">\n            देशभरातून येणाऱ्या भाविकांच्या सेवेसाठी, गर्दी व्यवस्थापनासाठी आणि स्वच्छता अभियानासाठी स्वयंसेवक म्हणून सहभागी व्हा.\n          </p>'
  ],
  [
    '<button type="submit" class="w-full bg-gov-header hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-lg shadow transition tap-target">\n                स्वयंसेवक नोंदणी सबमिट करा (Register as Volunteer)\n              </button>',
    '<button type="submit" class="w-full bg-gov-header hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-lg shadow transition tap-target" data-i18n="volunteer.btnSubmit">\n                स्वयंसेवक नोंदणी सबमिट करा (Register as Volunteer)\n              </button>'
  ],

  // 12. Notices Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">अधिकृत परिपत्रके</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.notices">\n          शासकीय परिपत्रके व आदेश (Official Notices)\n        </h2>\n        <p class="text-xs sm:text-sm text-slate-600 mt-1">\n          नाशिक जिल्हाधिकारी कार्यालय, पोलीस प्रशासन आणि आपत्ती व्यवस्थापन प्राधिकरणाची अधिकृत परिपत्रके\n        </p>',
    '<span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded" data-i18n="notices.pageBadge">अधिकृत परिपत्रके</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="notices.pageTitle">\n          शासकीय परिपत्रके व आदेश (Official Notices)\n        </h2>\n        <p class="text-xs sm:text-sm text-slate-600 mt-1" data-i18n="notices.pageSubtitle">\n          नाशिक जिल्हाधिकारी कार्यालय, पोलीस प्रशासन आणि आपत्ती व्यवस्थापन प्राधिकरणाची अधिकृत परिपत्रके\n        </p>'
  ],

  // 13. About Page
  [
    '<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">डिजिटल तीर्थयात्रा</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="nav.about">\n          कुंभदूत AI सहाय्यक व पोर्टल परिचय\n        </h2>',
    '<span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded" data-i18n="about.badge">डिजिटल तीर्थयात्रा</span>\n        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1" data-i18n="about.title">\n          कुंभदूत AI सहाय्यक व पोर्टल परिचय\n        </h2>'
  ],
  [
    '<div class="inline-block bg-kumbhdoot-cta text-white text-xs font-bold px-2.5 py-1 rounded mb-2">\n              महाराष्ट्र शासन अधिकृत AI सहाय्यक\n            </div>\n            <h3 class="text-xl sm:text-2xl font-black text-slate-900 mb-2">\n              कुंभदूत (KumbhDoot) - भाविकांचा व्हॉईस-फर्स्ट डिजिटल मार्गदर्शक\n            </h3>\n            <p class="text-slate-700 text-sm leading-relaxed mb-4">\n              गर्दीच्या ठिकाणी टाइप न करता थेट आपल्या भाषेत बोलून स्नान वेळापत्रक, जवळचे पार्किंग, पिण्याचे पाणी आणि वैद्यकीय मदत केंद्रांची अचूक माहिती मिळवा.\n            </p>\n            <button onclick="window.openKumbhDootAssistant(\'general\')" class="bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover text-white font-bold text-sm px-6 py-3 rounded-lg shadow flex items-center gap-2 transition">\n              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>\n              <span>कुंभदूत AI सहाय्यकाशी आताच बोला</span>\n            </button>',
    '<div class="inline-block bg-kumbhdoot-cta text-white text-xs font-bold px-2.5 py-1 rounded mb-2" data-i18n="about.aiBadge">\n              महाराष्ट्र शासन अधिकृत AI सहाय्यक\n            </div>\n            <h3 class="text-xl sm:text-2xl font-black text-slate-900 mb-2" data-i18n="about.aiTitle">\n              कुंभदूत (KumbhDoot) - भाविकांचा व्हॉईस-फर्स्ट डिजिटल मार्गदर्शक\n            </h3>\n            <p class="text-slate-700 text-sm leading-relaxed mb-4" data-i18n="about.aiDesc">\n              गर्दीच्या ठिकाणी टाइप न करता थेट आपल्या भाषेत बोलून स्नान वेळापत्रक, जवळचे पार्किंग, पिण्याचे पाणी आणि वैद्यकीय मदत केंद्रांची अचूक माहिती मिळवा.\n            </p>\n            <button onclick="window.openKumbhDootAssistant(\'general\')" class="bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover text-white font-bold text-sm px-6 py-3 rounded-lg shadow flex items-center gap-2 transition">\n              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>\n              <span data-i18n="about.aiBtn">कुंभदूत AI सहाय्यकाशी आताच बोला</span>\n            </button>'
  ],
  [
    '<span class="text-[11px] font-bold text-slate-600 block mt-2">मुद्रणासाठी QR कोड</span>',
    '<span class="text-[11px] font-bold text-slate-600 block mt-2" data-i18n="about.qrLabel">मुद्रणासाठी QR कोड</span>'
  ],
  [
    '<h3 class="text-lg font-bold text-slate-900">पोर्टल वैशिष्ट्ये व तांत्रिक मानके (GIGW 3.0 & WCAG 2.1 AA)</h3>\n        <p>\n          हे महापोर्टल भारत सरकारच्या राष्ट्रीय संकेतस्थळ मार्गदर्शक तत्त्वे (GIGW 3.0) आणि WCAG 2.1 AA मानकांनुसार तयार करण्यात आले आहे. सर्व दिव्यांगजन, ज्येष्ठ नागरिक आणि विविध भाषिक भाविकांना अखंड डिजिटल सेवा पुरवणे हे याचे उद्दिष्ट आहे.\n        </p>\n        <ul class="space-y-1.5 list-disc pl-5">\n          <li><strong>त्रिभाषिक रचना:</strong> मराठी (प्राथमिक), हिंदी आणि इंग्रजी पूर्ण समक्रमित.</li>\n          <li><strong>सुलभता साधने:</strong> उच्च कॉन्ट्रास्ट, अक्षर आकार नियंत्रण (A- / A / A+), स्क्रीन रीडर तक्ता.</li>\n          <li><strong>अतिजलद २G/३G कार्यक्षमता:</strong> कमी नेटवर्कवरही त्वरित लोड होणारे हलके डिझाइन.</li>\n        </ul>',
    '<h3 class="text-lg font-bold text-slate-900" data-i18n="about.standardsTitle">पोर्टल वैशिष्ट्ये व तांत्रिक मानके (GIGW 3.0 & WCAG 2.1 AA)</h3>\n        <p data-i18n="about.standardsDesc">\n          हे महापोर्टल भारत सरकारच्या राष्ट्रीय संकेतस्थळ मार्गदर्शक तत्त्वे (GIGW 3.0) आणि WCAG 2.1 AA मानकांनुसार तयार करण्यात आले आहे. सर्व दिव्यांगजन, ज्येष्ठ नागरिक आणि विविध भाषिक भाविकांना अखंड डिजिटल सेवा पुरवणे हे याचे उद्दिष्ट आहे.\n        </p>\n        <ul class="space-y-1.5 list-disc pl-5">\n          <li><strong data-i18n="about.stdItem1Label">त्रिभाषिक रचना:</strong> <span data-i18n="about.stdItem1Text">मराठी (प्राथमिक), हिंदी आणि इंग्रजी पूर्ण समक्रमित.</span></li>\n          <li><strong data-i18n="about.stdItem2Label">सुलभता साधने:</strong> <span data-i18n="about.stdItem2Text">उच्च कॉन्ट्रास्ट, अक्षर आकार नियंत्रण (A- / A / A+), स्क्रीन रीडर तक्ता.</span></li>\n          <li><strong data-i18n="about.stdItem3Label">अतिजलद २G/३G कार्यक्षमता:</strong> <span data-i18n="about.stdItem3Text">कमी नेटवर्कवरही त्वरित लोड होणारे हलके डिझाइन.</span></li>\n        </ul>'
  ],

  // 14. Assistant Modal
  [
    '<span>कुंभदूत AI डिजिटल सहाय्यक</span>\n              <span class="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded">LIVE</span>\n            </h3>\n            <p class="text-xs text-slate-300">महाराष्ट्र शासन • नाशिक सिंहस्थ २०२७</p>',
    '<span data-i18n="assistantModal.title">कुंभदूत AI डिजिटल सहाय्यक</span>\n              <span class="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded" data-i18n="assistantModal.liveBadge">LIVE</span>\n            </h3>\n            <p class="text-xs text-slate-300" data-i18n="assistantModal.govSub">महाराष्ट्र शासन • नाशिक सिंहस्थ २०२७</p>'
  ],
  [
    '<button data-query="पुढचे शाही स्नान कधी आहे?" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🗓️ पुढचे शाही स्नान कधी?\n        </button>\n        <button data-query="जवळचे सॅटेलाइट पार्किंग कुठे आहे?" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🅿️ जवळचे पार्किंग कुठे?\n        </button>\n        <button data-query="तातडीची रुग्णवाहिका संपर्क 108" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🚑 आपत्कालीन मदत\n        </button>\n        <button data-query="हरवलेली व्यक्ती कशी नोंदवावी?" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🔍 हरवले-सापडले\n        </button>',
    '<button data-query="पुढचे शाही स्नान कधी आहे?" data-i18n="assistantModal.pillSnan" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🗓️ पुढचे शाही स्नान कधी?\n        </button>\n        <button data-query="जवळचे सॅटेलाइट पार्किंग कुठे आहे?" data-i18n="assistantModal.pillParking" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🅿️ जवळचे पार्किंग कुठे?\n        </button>\n        <button data-query="तातडीची रुग्णवाहिका संपर्क 108" data-i18n="assistantModal.pillEmergency" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🚑 आपत्कालीन मदत\n        </button>\n        <button data-query="हरवलेली व्यक्ती कशी नोंदवावी?" data-i18n="assistantModal.pillLostFound" class="assistant-preset-pill flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 font-bold text-slate-700 transition">\n          🔍 हरवले-सापडले\n        </button>'
  ],
  [
    '<p class="leading-relaxed">\n              जय गोदावरी! नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ महापोर्टलवर आपले स्वागत आहे. मी आपला अधिकृत AI तीर्थयात्रा सहाय्यक आहे. आपण मला शाही स्नान तारखा, घाटांची माहिती, सॅटेलाइट पार्किंग, बस शटल किंवा आपत्कालीन वैद्यकीय मदतीविषयी थेट विचारू शकता!\n            </p>',
    '<p class="leading-relaxed" data-i18n="assistantModal.welcomeText">\n              जय गोदावरी! नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ महापोर्टलवर आपले स्वागत आहे. मी आपला अधिकृत AI तीर्थयात्रा सहाय्यक आहे. आपण मला शाही स्नान तारखा, घाटांची माहिती, सॅटेलाइट पार्किंग, बस शटल किंवा आपत्कालीन वैद्यकीय मदतीविषयी थेट विचारू शकता!\n            </p>'
  ],
  [
    '<span>पाठवा</span>',
    '<span data-i18n="assistantModal.sendBtn">पाठवा</span>'
  ],
  [
    '<div class="text-[10px] text-slate-400 text-center mt-2">\n          महाराष्ट्र शासन अधिकृत सुरक्षित माहिती प्रणाली • DPDP Act २०२३ संमत\n        </div>',
    '<div class="text-[10px] text-slate-400 text-center mt-2" data-i18n="assistantModal.dpdpNotice">\n          महाराष्ट्र शासन अधिकृत सुरक्षित माहिती प्रणाली • DPDP Act २०२३ संमत\n        </div>'
  ],

  // 15. QR Modal
  [
    '<span class="inline-block bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">मुद्रण व फलकांसाठी अधिकृत QR कोड</span>\n      <h3 id="qr-modal-title" class="text-lg font-bold text-slate-900 mb-1">कुंभमेळा पोर्टल व सहाय्यक</h3>\n      <p class="text-xs text-slate-500 mb-4">मोबाइल कॅमेराने स्कॅन करून महापोर्टल व कुंभदूत AI सहाय्यक वापरा.</p>',
    '<span class="inline-block bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2" data-i18n="qrModal.badge">मुद्रण व फलकांसाठी अधिकृत QR कोड</span>\n      <h3 id="qr-modal-title" class="text-lg font-bold text-slate-900 mb-1" data-i18n="qrModal.title">कुंभमेळा पोर्टल व सहाय्यक</h3>\n      <p class="text-xs text-slate-500 mb-4" data-i18n="qrModal.desc">मोबाइल कॅमेराने स्कॅन करून महापोर्टल व कुंभदूत AI सहाय्यक वापरा.</p>'
  ],
  [
    '<div class="text-xs font-mono font-bold text-amber-800 mb-4">नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७</div>',
    '<div class="text-xs font-mono font-bold text-amber-800 mb-4" data-i18n="qrModal.sub">नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७</div>'
  ],
  [
    '<button onclick="window.print()" class="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg shadow transition tap-target">\n          🖨️ QR कोड प्रिंट करा\n        </button>',
    '<button onclick="window.print()" class="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg shadow transition tap-target" data-i18n="qrModal.printBtn">\n          🖨️ QR कोड प्रिंट करा\n        </button>'
  ],

  // 16. Mobile Bottom Bar
  [
    '<span id="bottom-bar-kd-label" class="text-[9px] font-extrabold whitespace-nowrap">कुंभदूत AI</span>',
    '<span id="bottom-bar-kd-label" class="text-[9px] font-extrabold whitespace-nowrap" data-i18n="kumbhdootCta.mobileLabel">कुंभदूत AI</span>'
  ],

  // 17. Footer
  [
    '<h4 class="text-sm font-black text-white">महाराष्ट्र शासन • नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा प्राधिकरण</h4>',
    '<h4 class="text-sm font-black text-white" data-i18n="footer.title">महाराष्ट्र शासन • नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा प्राधिकरण</h4>'
  ],
  [
    '<h4 class="font-bold text-white text-sm mb-3">धोरणे व कायदेशीर (Compliance)</h4>',
    '<h4 class="font-bold text-white text-sm mb-3" data-i18n="footer.policiesTitle">धोरणे व कायदेशीर</h4>'
  ],
  [
    '<h4 class="font-bold text-white text-sm mb-3">कुंभदूत AI सहाय्यक</h4>\n          <p class="text-slate-400 mb-3 leading-relaxed">\n            प्रत्येक भाविकाच्या हाती स्वतःच्या भाषेत थेट मार्गदर्शन देणारा एकात्मिक शासकीय AI सहाय्यक.\n          </p>\n          <button onclick="window.openKumbhDootAssistant(\'general\')" class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover px-3.5 py-2 rounded-lg transition shadow">\n            <span>कुंभदूत AI सहाय्यक उघडा</span>',
    '<h4 class="font-bold text-white text-sm mb-3" data-i18n="footer.kdTitle">कुंभदूत AI सहाय्यक</h4>\n          <p class="text-slate-400 mb-3 leading-relaxed" data-i18n="footer.kdDesc">\n            प्रत्येक भाविकाच्या हाती स्वतःच्या भाषेत थेट मार्गदर्शन देणारा एकात्मिक शासकीय AI सहाय्यक.\n          </p>\n          <button onclick="window.openKumbhDootAssistant(\'general\')" class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover px-3.5 py-2 rounded-lg transition shadow">\n            <span data-i18n="footer.kdBtn">कुंभदूत AI सहाय्यक उघडा</span>'
  ],
  [
    '<span class="text-emerald-500 font-semibold">GIGW 3.0 मानकांनुसार अधिकृत डिझाइन</span>',
    '<span class="text-emerald-500 font-semibold" data-i18n="footer.gigwBadge">GIGW 3.0 मानकांनुसार अधिकृत डिझाइन</span>'
  ]
];

let appliedCount = 0;
for (const [target, replacement] of replacements) {
  if (html.includes(target)) {
    html = html.replace(target, replacement);
    appliedCount++;
  } else {
    console.warn('Target not found for replacement snippet starting with:', target.slice(0, 40).replace(/\n/g, ' '));
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log(`Applied ${appliedCount} of ${replacements.length} replacements to index.html`);
