const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. REPLACE TOP STRIP CONTRAST EMOJI 🌓
const contrastSvg = `<svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0-18a9 9 0 019 9 9 9 0 01-9 9m0-18a9 9 0 00-9 9 9 9 0 009 9z"/></svg>`;
html = html.replace('<span aria-hidden="true">🌓</span>', contrastSvg);

// 2. UNIFY SEARCH BUTTON & KUMBHDOOT AI BUTTON (EXACT SAME SHAPE & STYLING), REMOVE HAMBURGER BUTTON
const oldHeaderRight = `      <!-- Header Right: Global Search & KumbhDoot AI Pilgrim Assistant -->
      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <!-- Search Input -->
        <div class="relative hidden xl:block w-56">
          <input id="global-search-input" type="search" data-i18n-placeholder="nav.searchPlaceholder" placeholder="घाट, पार्किंग, ई-पास शोधा..." class="w-full text-xs py-2 pl-8 pr-3 rounded-lg bg-slate-900/80 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400">
          <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <!-- KUMBHDOOT IN-PAGE AI ASSISTANT BUTTON (Desktop/Tablet Header, on mobile accessed via Bottom Nav & Menu) -->
        <button id="header-kumbhdoot-btn" onclick="window.openKumbhDootAssistant('general')" class="trigger-kumbhdoot-modal hidden sm:flex bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover text-white font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-lg shadow-md items-center gap-2 transition ring-2 ring-orange-300/40" title="Open KumbhDoot AI Pilgrim Assistant">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>
          <span class="btn-label" data-i18n="kumbhdootCta.label">कुंभदूत AI सहाय्यक</span>
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobile-menu-toggle" class="lg:hidden p-2 text-white hover:bg-slate-800 rounded tap-target" aria-label="Toggle navigation menu" aria-expanded="false">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>`;

const newHeaderRight = `      <!-- Header Right: Matching Official Action Buttons (Search & KumbhDoot AI Assistant - Unified Format, No Hamburger) -->
      <div class="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <!-- Search Button (Identical Dimensions, Height, Radius & Typography) -->
        <button id="header-search-btn" onclick="window.openSearchModal && window.openSearchModal()" class="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-3 sm:px-3.5 py-2.5 rounded-lg border border-slate-700 shadow-sm transition tap-target" aria-label="Search portal" title="Search portal">
          <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span data-i18n="nav.searchBtn">शोधा</span>
        </button>

        <!-- KumbhDoot In-Page AI Assistant Button (Identical Dimensions, Height, Radius & Typography) -->
        <button id="header-kumbhdoot-btn" onclick="window.openKumbhDootAssistant('general')" class="trigger-kumbhdoot-modal flex items-center gap-2 bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover text-white font-bold text-xs sm:text-sm px-3 sm:px-3.5 py-2.5 rounded-lg shadow-sm transition tap-target" title="Open KumbhDoot AI Pilgrim Assistant">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>
          <span class="btn-label" data-i18n="kumbhdootCta.label">कुंभदूत AI सहाय्यक</span>
        </button>
      </div>`;

html = html.replace(oldHeaderRight, newHeaderRight);

// 3. REMOVE MOBILE MENU BLOCK & MAKE MAIN NAV SCROLLABLE ON ALL SCREENS
const oldNavBlock = `    <!-- MAIN NAVIGATION BAR (Desktop) -->
    <nav id="main-nav" class="bg-slate-950/95 border-t border-slate-800 px-4 hidden lg:block" role="navigation" aria-label="मुख्य मार्गक्रमण">
      <div class="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
        <ul class="flex items-center flex-wrap gap-0.5">
          <li><a href="#home" data-nav-target="home" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.home">मुख्यपृष्ठ</a></li>
          <li><a href="#schedule" data-nav-target="schedule" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.schedule">शाही स्नान वेळापत्रक</a></li>
          <li><a href="#map" data-nav-target="map" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.map">तीर्थक्षेत्र नकाशा व घाट</a></li>
          <li><a href="#transport" data-nav-target="transport" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.transport">वाहतूक व पार्किंग</a></li>
          <li><a href="#safety" data-nav-target="safety" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.safety">सुरक्षा व नियंत्रण</a></li>
          <li><a href="#lost-found" data-nav-target="lost-found" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.lostFound">हरवले-सापडले</a></li>
          <li><a href="#volunteer" data-nav-target="volunteer" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.volunteer">स्वयंसेवक नोंदणी</a></li>
          <li><a href="#notices" data-nav-target="notices" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.notices">शासकीय परिपत्रके</a></li>
          <li><a href="#about" data-nav-target="about" class="nav-link py-3 px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.about">कुंभदूत AI व परिचय</a></li>
        </ul>
        
        <!-- On-site QR Code Shortcut -->
        <button class="open-qr-modal text-xs font-bold text-amber-300 hover:text-amber-200 py-1 px-2.5 rounded border border-amber-400/50 flex items-center gap-1.5 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
          <span data-i18n="hero.qrButton">ॲप QR कोड</span>
        </button>
      </div>
    </nav>

    <!-- MOBILE NAVIGATION MENU (Collapsible) -->
    <div id="mobile-menu" class="hidden lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-3">
      <ul class="space-y-1 text-sm font-semibold">
        <li><a href="#home" data-nav-target="home" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.home">मुख्यपृष्ठ</a></li>
        <li><a href="#schedule" data-nav-target="schedule" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.schedule">शाही स्नान वेळापत्रक</a></li>
        <li><a href="#map" data-nav-target="map" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.map">तीर्थक्षेत्र नकाशा व घाट</a></li>
        <li><a href="#transport" data-nav-target="transport" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.transport">वाहतूक व पार्किंग</a></li>
        <li><a href="#safety" data-nav-target="safety" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.safety">सुरक्षा व नियंत्रण</a></li>
        <li><a href="#lost-found" data-nav-target="lost-found" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.lostFound">हरवले-सापडले</a></li>
        <li><a href="#volunteer" data-nav-target="volunteer" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.volunteer">स्वयंसेवक नोंदणी</a></li>
        <li><a href="#notices" data-nav-target="notices" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.notices">शासकीय परिपत्रके</a></li>
        <li><a href="#about" data-nav-target="about" class="block py-2 px-3 rounded hover:bg-slate-800" data-i18n="nav.about">कुंभदूत AI व परिचय</a></li>
      </ul>
      <div class="mt-3 pt-3 border-t border-slate-800">
        <button onclick="window.openKumbhDootAssistant('general')" class="w-full bg-kumbhdoot-cta text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 mb-2">
          <span data-i18n="header.openAssistant">कुंभदूत AI सहाय्यक उघडा</span>
        </button>
        <button class="open-qr-modal text-xs font-bold text-amber-300 py-2 px-3 rounded border border-amber-400/40 w-full text-center" data-i18n="header.viewQr">
          📱 मुद्रणासाठी ॲप QR कोड पहा
        </button>
      </div>
    </div>`;

const newNavBlock = `    <!-- MAIN NAVIGATION BAR (Responsive Horizontal Scroll for all screens, No Hamburger) -->
    <nav id="main-nav" class="bg-slate-950/95 border-t border-slate-800 px-3 sm:px-4 overflow-x-auto scrollbar-none" role="navigation" aria-label="मुख्य मार्गक्रमण">
      <div class="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold gap-2">
        <ul class="flex items-center flex-nowrap lg:flex-wrap gap-0.5 whitespace-nowrap py-1 lg:py-0">
          <li><a href="#home" data-nav-target="home" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.home">मुख्यपृष्ठ</a></li>
          <li><a href="#schedule" data-nav-target="schedule" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.schedule">शाही स्नान वेळापत्रक</a></li>
          <li><a href="#map" data-nav-target="map" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.map">तीर्थक्षेत्र नकाशा व घाट</a></li>
          <li><a href="#transport" data-nav-target="transport" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.transport">वाहतूक व पार्किंग</a></li>
          <li><a href="#safety" data-nav-target="safety" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.safety">सुरक्षा व नियंत्रण</a></li>
          <li><a href="#lost-found" data-nav-target="lost-found" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.lostFound">हरवले-सापडले</a></li>
          <li><a href="#volunteer" data-nav-target="volunteer" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.volunteer">स्वयंसेवक नोंदणी</a></li>
          <li><a href="#notices" data-nav-target="notices" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.notices">शासकीय परिपत्रके</a></li>
          <li><a href="#about" data-nav-target="about" class="nav-link py-2.5 lg:py-3 px-2.5 sm:px-3 inline-block hover:text-amber-300 transition" data-i18n="nav.about">कुंभदूत AI व परिचय</a></li>
        </ul>
        
        <!-- On-site QR Code Shortcut (Clean SVG, No Emoji) -->
        <button class="open-qr-modal text-xs font-bold text-amber-300 hover:text-amber-200 py-1.5 px-2.5 rounded border border-amber-400/50 flex items-center gap-1.5 transition flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
          <span data-i18n="hero.qrButton">ॲप QR कोड</span>
        </button>
      </div>
    </nav>`;

html = html.replace(oldNavBlock, newNavBlock);

// 4. TICKER PAUSE BUTTON (REPLACE ⏸ WITH CLEAN SVG)
html = html.replace(
  '<button id="ticker-pause-btn" class="text-xs p-1 bg-amber-200 hover:bg-amber-300 rounded font-bold tap-target" aria-label="Pause announcement ticker" title="Pause / Play announcement ticker">⏸</button>',
  '<button id="ticker-pause-btn" class="text-xs p-1.5 bg-amber-200 hover:bg-amber-300 rounded font-bold tap-target flex items-center justify-center" aria-label="Pause announcement ticker" title="Pause / Play announcement ticker"><svg class="w-3.5 h-3.5 text-amber-900" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></button>'
);

// 5. REMOVE DECORATIVE ARROWS ➔
html = html.replace(/नकाशावर पहा ➔/g, 'नकाशावर पहा');
html = html.replace(/संपूर्ण वेळापत्रक पहा ➔/g, 'संपूर्ण वेळापत्रक पहा');
html = html.replace(/सर्व परिपत्रके पहा ➔/g, 'सर्व परिपत्रके पहा');

// 6. DOS & DON'TS ICONS (REPLACE ✓ AND ✕ WITH ACCESSIBLE SVGS)
html = html.replace(
  '<span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">✓</span>',
  '<span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></span>'
);
html = html.replace(
  '<span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs">✕</span>',
  '<span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></span>'
);

// 7. TRANSPORT ICONS (REPLACE 🚆, 🚌, 🅿️ WITH CLEAN SVGS)
html = html.replace(
  '<span class="text-xl">🚆</span>',
  '<span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg></span>'
);
html = html.replace(
  '<span class="text-xl">🚌</span>',
  '<span class="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg></span>'
);
html = html.replace(
  '<span>🅿️</span>',
  '<span class="w-6 h-6 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-xs">P</span>'
);

// 8. SAFETY ICONS (REPLACE 🚨 AND 🛡️ WITH CLEAN SVGS)
html = html.replace(
  '<span>🚨</span>',
  '<span class="w-6 h-6 rounded bg-rose-100 text-rose-700 inline-flex items-center justify-center mr-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></span>'
);
html = html.replace(
  '<span>🛡️</span>',
  '<span class="w-6 h-6 rounded bg-blue-100 text-blue-700 inline-flex items-center justify-center mr-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></span>'
);

// 9. LOST & FOUND TABS (REPLACE 🔍 AND ✍️ WITH CLEAN SVGS)
html = html.replace(
  '🔍 नोंदी शोधा (Search Registry)',
  '<span class="flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> <span>नोंदी शोधा (Search Registry)</span></span>'
);
html = html.replace(
  '✍️ नवीन नोंद करा (Report Missing/Found)',
  '<span class="flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> <span>नवीन नोंद करा (Report Missing/Found)</span></span>'
);

// 10. AI ASSISTANT MODAL (REMOVE 🕉️, REPLACE ✕ WITH SVG, REMOVE PILL EMOJIS)
html = html.replace(
  '<span class="text-xl">🕉️</span>',
  '<span class="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></span>'
);
html = html.replace(
  '<button id="close-assistant-modal" class="text-slate-300 hover:text-white p-2 text-xl tap-target" aria-label="Close dialog">✕</button>',
  '<button id="close-assistant-modal" class="text-slate-300 hover:text-white p-2 tap-target" aria-label="Close dialog"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>'
);
html = html.replace('🗓️ पुढचे शाही स्नान कधी?', 'पुढचे शाही स्नान कधी?');
html = html.replace('🅿️ जवळचे पार्किंग कुठे?', 'जवळचे पार्किंग कुठे?');
html = html.replace('🚑 आपत्कालीन मदत', 'आपत्कालीन मदत');
html = html.replace('🔍 हरवले-सापडले', 'हरवले-सापडले');
html = html.replace('<span data-i18n="assistantModal.sender">🕉️ कुंभदूत AI सहाय्यक</span>', '<span data-i18n="assistantModal.sender">कुंभदूत AI सहाय्यक</span>');

// 11. QR MODAL (REPLACE ✕ AND 🖨️ WITH SVGS)
html = html.replace(
  '<button id="close-qr-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 text-lg tap-target" aria-label="Close dialog">✕</button>',
  '<button id="close-qr-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 tap-target" aria-label="Close dialog"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>'
);
html = html.replace(
  '<span data-i18n="qrModal.printBtn">🖨️ QR कोड प्रिंट करा</span>',
  '<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg> <span data-i18n="qrModal.printBtn">QR कोड प्रिंट करा</span></span>'
);

// 12. ADD ACCESSIBLE GLOBAL SEARCH MODAL DIALOG (BEFORE CLOSING BODY)
const searchModalHtml = `
  <!-- ACCESSIBLE GLOBAL SEARCH MODAL (GIGW 3.0 Standard) -->
  <div id="portal-search-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
    <div class="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
      <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 flex-grow">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input id="portal-search-input" type="search" placeholder="पोर्टलवर शोधा (उदा. शाही स्नान, रामकुंड, पार्किंग, आपत्कालीन मदत)..." class="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none" autofocus>
        </div>
        <button id="close-search-modal" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition tap-target" aria-label="Close search">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Quick Search Shortcuts -->
      <div class="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">त्वरित विभाग व सेवा (Quick Sections)</span>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <a href="#schedule" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            शाही स्नान वेळापत्रक
          </a>
          <a href="#map" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            तीर्थक्षेत्र नकाशा व घाट
          </a>
          <a href="#transport" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            सॅटेलाइट पार्किंग व बस
          </a>
          <a href="#safety" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            आपत्कालीन व पोलीस मदत
          </a>
          <a href="#lost-found" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            हरवले-सापडले कक्ष
          </a>
          <a href="#volunteer" onclick="window.closeSearchModal()" class="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-xs font-bold text-slate-800 transition block">
            स्वयंसेवक नोंदणी
          </a>
        </div>
      </div>

      <div class="p-3 bg-white text-center text-xs text-slate-400">
        शोधण्यासाठी कीवर्ड टाईप करा किंवा थेट विभागात जाण्यासाठी क्लिक करा.
      </div>
    </div>
  </div>
`;

html = html.replace('<!-- Scripts -->', searchModalHtml + '\n  <!-- Scripts -->');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully cleaned emojis and patched index.html');
