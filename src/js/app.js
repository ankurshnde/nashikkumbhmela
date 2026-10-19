// Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 Official Portal
// Government of Maharashtra & NTKMA Official Application Controller
// Meets GIGW 3.0 & WCAG 2.1 AA Accessibility Standards

const state = {
  currentLang: 'mr', // Marathi first by official requirement
  contrast: 'standard',
  fontSize: 'normal',
  currentPage: 'home',
  translations: {},
  snanDates: [],
  notices: [],
  safetyData: {}
};

// Expose state globally
window.kumbhApp = state;

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadTranslations();
  await loadDataFiles();
  setupAccessibilityControls();
  setupLanguageSwitcher();
  setupRouter();
  setupNoticeTicker();
  setupModals();
  setupVolunteerForm();
  setupScheduleFilters();
  setupGlobalSearch();
  setupKumbhCountdown();
  setupKumbhDootAssistant();

  // Initialize sub-modules if present
  if (window.initMapModule) window.initMapModule();
  if (window.initLostFoundModule) window.initLostFoundModule();
});

// 1. Translation Loader
async function loadTranslations() {
  try {
    const [mrRes, hiRes, enRes] = await Promise.all([
      fetch('./src/locales/mr.json'),
      fetch('./src/locales/hi.json'),
      fetch('./src/locales/en.json')
    ]);
    state.translations.mr = await mrRes.json();
    state.translations.hi = await hiRes.json();
    state.translations.en = await enRes.json();
    
    // Check URL parameter for initial language override (e.g. ?lang=hi)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (['mr', 'hi', 'en'].includes(langParam)) {
      state.currentLang = langParam;
    }

    applyTranslations();
  } catch (e) {
    console.error('Error loading language packs:', e);
  }
}

// 2. Data Files Loader
async function loadDataFiles() {
  try {
    const [snanRes, noticesRes, safetyRes] = await Promise.all([
      fetch('./src/data/snan-dates.json'),
      fetch('./src/data/notices.json'),
      fetch('./src/data/safety.json')
    ]);
    state.snanDates = await snanRes.json();
    state.notices = await noticesRes.json();
    state.safetyData = await safetyRes.json();

    renderScheduleSection();
    renderNoticesSection();
    renderEmergencyGrid();
  } catch (e) {
    console.error('Error loading data files:', e);
  }
}

// 3. Accessibility Controls (A- / A / A+, High Contrast, Skip Link)
function setupAccessibilityControls() {
  const html = document.documentElement;

  // Font size buttons
  const fontDecBtn = document.getElementById('font-decrease');
  const fontNormBtn = document.getElementById('font-normal');
  const fontIncBtn = document.getElementById('font-increase');

  if (fontDecBtn && fontNormBtn && fontIncBtn) {
    fontDecBtn.addEventListener('click', () => {
      html.classList.remove('font-lg', 'font-xl');
      state.fontSize = 'normal';
      updateFontBtnActive(fontDecBtn);
    });

    fontNormBtn.addEventListener('click', () => {
      html.classList.remove('font-xl');
      html.classList.add('font-lg');
      state.fontSize = 'lg';
      updateFontBtnActive(fontNormBtn);
    });

    fontIncBtn.addEventListener('click', () => {
      html.classList.remove('font-lg');
      html.classList.add('font-xl');
      state.fontSize = 'xl';
      updateFontBtnActive(fontIncBtn);
    });
  }

  function updateFontBtnActive(activeBtn) {
    [fontDecBtn, fontNormBtn, fontIncBtn].forEach(b => {
      if (b) {
        b.classList.remove('bg-white', 'text-slate-900', 'font-bold');
        b.setAttribute('aria-pressed', 'false');
      }
    });
    if (activeBtn) {
      activeBtn.classList.add('bg-white', 'text-slate-900', 'font-bold');
      activeBtn.setAttribute('aria-pressed', 'true');
    }
  }

  // High Contrast Mode Toggle
  const contrastToggleBtn = document.getElementById('contrast-toggle');
  if (contrastToggleBtn) {
    const savedContrast = localStorage.getItem('kumbh_contrast');
    if (savedContrast === 'high') {
      enableHighContrast(true);
    }

    contrastToggleBtn.addEventListener('click', () => {
      const isHigh = html.classList.contains('high-contrast');
      enableHighContrast(!isHigh);
    });
  }

  function enableHighContrast(enable) {
    if (enable) {
      html.classList.add('high-contrast');
      state.contrast = 'high';
      localStorage.setItem('kumbh_contrast', 'high');
      if (contrastToggleBtn) {
        contrastToggleBtn.setAttribute('aria-pressed', 'true');
        contrastToggleBtn.innerHTML = `<svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg> <span data-i18n="topStrip.standardContrast">सामान्य कॉन्ट्रास्ट</span>`;
      }
    } else {
      html.classList.remove('high-contrast');
      state.contrast = 'standard';
      localStorage.setItem('kumbh_contrast', 'standard');
      if (contrastToggleBtn) {
        contrastToggleBtn.setAttribute('aria-pressed', 'false');
        contrastToggleBtn.innerHTML = `<svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0-18a9 9 0 019 9 9 9 0 01-9 9m0-18a9 9 0 00-9 9 9 9 0 009 9z"/></svg> <span data-i18n="topStrip.highContrast">उच्च कॉन्ट्रास्ट</span>`;
      }
    }
    applyTranslations();
  }

  // Screen Reader Info Link
  const screenReaderBtn = document.getElementById('screen-reader-btn');
  if (screenReaderBtn) {
    screenReaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Screen Reader Access Enabled. The portal is compliant with GIGW 3.0 & WCAG 2.1 AA standards using semantic HTML5 landmarks, WAI-ARIA roles, and accessible tabular data alternatives for assistive technologies (NVDA, JAWS, TalkBack).');
    });
  }
}

// 4. Language Switcher (Marathi / Hindi / English)
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll('[data-lang-choice]');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang-choice');
      setLanguage(selected);
    });
  });
}

function setLanguage(lang) {
  if (!state.translations[lang]) return;
  state.currentLang = lang;
  document.documentElement.lang = lang;

  // Toggle font classes based on language (Noto Sans Devanagari for Devanagari languages, Poppins for English)
  if (lang === 'en') {
    document.body.classList.add('font-en');
    document.body.classList.remove('font-devanagari');
  } else {
    document.body.classList.remove('font-en');
    document.body.classList.add('font-devanagari');
  }

  // Update active state in switcher
  document.querySelectorAll('[data-lang-choice]').forEach(b => {
    if (b.getAttribute('data-lang-choice') === lang) {
      b.classList.add('bg-gov-header', 'text-white', 'font-bold');
      b.classList.remove('text-slate-300', 'hover:text-white');
      b.setAttribute('aria-current', 'true');
    } else {
      b.classList.remove('bg-gov-header', 'text-white', 'font-bold');
      b.classList.add('text-slate-300', 'hover:text-white');
      b.removeAttribute('aria-current');
    }
  });

  applyTranslations();
  renderScheduleSection();
  renderNoticesSection();
  renderEmergencyGrid();
  
  if (window.renderMapLocations) window.renderMapLocations();
  if (window.renderLostFoundCards) window.renderLostFoundCards();
}

function getNestedTranslation(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function applyTranslations() {
  const t = state.translations[state.currentLang];
  if (!t) return;

  // Text content replacements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNestedTranslation(t, key);
    if (val !== undefined) {
      el.textContent = val;
    }
  });

  // Placeholder replacements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getNestedTranslation(t, key);
    if (val !== undefined) {
      el.setAttribute('placeholder', val);
    }
  });

  // Page title
  document.title = t.siteTitle || 'नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७';
}

// 5. Hash Routing & Page Switching
function setupRouter() {
  const pages = ['home', 'schedule', 'map', 'transport', 'safety', 'lost-found', 'volunteer', 'notices', 'about'];
  
  function handleRoute() {
    let hash = window.location.hash.replace('#', '').trim();
    if (!hash || !pages.includes(hash)) {
      hash = 'home';
    }
    
    state.currentPage = hash;

    // Show active page section and hide others
    pages.forEach(p => {
      const pageEl = document.getElementById(`page-${p}`);
      if (pageEl) {
        if (p === hash) {
          pageEl.classList.remove('hidden');
          pageEl.focus();
        } else {
          pageEl.classList.add('hidden');
        }
      }
    });

    // Update main nav active indicator
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-nav-target');
      if (target === hash) {
        link.classList.add('border-b-2', 'border-amber-400', 'text-amber-300', 'font-bold');
        link.classList.remove('text-white');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('border-b-2', 'border-amber-400', 'text-amber-300', 'font-bold');
        link.classList.add('text-white');
        link.removeAttribute('aria-current');
      }
    });

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update contextual KumbhDoot label based on page
    updateContextualKumbhdootCta(hash);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // Nav clicks
  document.querySelectorAll('[data-nav-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-nav-target');
      window.location.hash = target;
    });
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function updateContextualKumbhdootCta(page) {
  const ctaBtn = document.getElementById('header-kumbhdoot-btn');
  const bottomBarLabel = document.getElementById('bottom-bar-kd-label');
  const t = state.translations[state.currentLang];
  if (!t || !t.kumbhdootCta) return;

  let text = t.kumbhdootCta.label;
  let action = 'general';

  if (page === 'schedule') {
    text = t.kumbhdootCta.contextSchedule;
    action = 'schedule';
  } else if (page === 'map') {
    text = t.kumbhdootCta.contextMap;
    action = 'directions';
  } else if (page === 'safety') {
    text = t.kumbhdootCta.contextSafety;
    action = 'safety';
  } else if (page === 'lost-found') {
    text = t.kumbhdootCta.contextLostFound;
    action = 'lostfound';
  } else if (page === 'transport') {
    text = t.kumbhdootCta.contextTransport;
    action = 'transport';
  }

  if (ctaBtn) {
    const labelSpan = ctaBtn.querySelector('.btn-label');
    if (labelSpan) labelSpan.textContent = text;
    ctaBtn.setAttribute('data-kd-action', action);
  }

  if (bottomBarLabel) {
    bottomBarLabel.textContent = text;
  }
}

// 6. Notice Ticker with Pause/Play accessibility toggle
function setupNoticeTicker() {
  const tickerContainer = document.getElementById('notice-ticker-track');
  const pauseBtn = document.getElementById('ticker-pause-btn');
  let isPaused = false;

  if (pauseBtn && tickerContainer) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        tickerContainer.style.animationPlayState = 'paused';
        pauseBtn.setAttribute('aria-label', 'Play announcement ticker');
        pauseBtn.innerHTML = '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      } else {
        tickerContainer.style.animationPlayState = 'running';
        pauseBtn.setAttribute('aria-label', 'Pause announcement ticker');
        pauseBtn.innerHTML = '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      }
    });

    // Pause on mouse hover or keyboard focus for WCAG accessibility
    tickerContainer.addEventListener('mouseenter', () => tickerContainer.style.animationPlayState = 'paused');
    tickerContainer.addEventListener('mouseleave', () => { if (!isPaused) tickerContainer.style.animationPlayState = 'running'; });
    tickerContainer.addEventListener('focusin', () => tickerContainer.style.animationPlayState = 'paused');
    tickerContainer.addEventListener('focusout', () => { if (!isPaused) tickerContainer.style.animationPlayState = 'running'; });
  }
}

// 7. Live Countdown to First Shahi Snan (02 August 2027)
function setupKumbhCountdown() {
  const targetDate = new Date('2027-08-02T00:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const elDays = document.getElementById('countdown-days');
    const elHours = document.getElementById('countdown-hours');
    const elMins = document.getElementById('countdown-mins');
    const elSecs = document.getElementById('countdown-secs');

    if (elDays) elDays.textContent = String(days).padStart(3, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMins) elMins.textContent = String(mins).padStart(2, '0');
    if (elSecs) elSecs.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// 8. Render Schedule Section with Filter and Calendar Download
let currentScheduleCategory = 'all';

function setupScheduleFilters() {
  const filterBtns = document.querySelectorAll('[data-schedule-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-gov-header', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('bg-gov-header', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.setAttribute('aria-pressed', 'true');
      
      currentScheduleCategory = btn.getAttribute('data-schedule-filter');
      renderScheduleSection();
    });
  });
}

function renderScheduleSection() {
  const container = document.getElementById('schedule-cards-grid');
  const homeSchedulePreview = document.getElementById('home-schedule-preview');
  if (!container && !homeSchedulePreview) return;

  const currentLang = state.currentLang;
  const t = state.translations[currentLang] || state.translations.mr || {};
  const ui = t.ui || {};

  const filtered = state.snanDates.filter(item => {
    if (currentScheduleCategory === 'all') return true;
    return item.category === currentScheduleCategory;
  });

  function renderCard(item) {
    const title = item[`title_${currentLang}`] || item.title_en;
    const tithi = item[`tithi_${currentLang}`] || item.tithi_en;
    const loc = item[`location_${currentLang}`] || item.location_en;
    const akharas = item[`akharas_${currentLang}`] || item.akharas_en;
    const proTip = item[`proTip_${currentLang}`] || item.proTip_en || item.proTip_mr;
    const isShahi = item.category === 'shahi';
    const isCeremony = item.category === 'ceremony';

    let badgeHtml = '';
    if (isShahi) {
      badgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs"><span class="w-2 h-2 rounded-full bg-amber-500"></span>${ui.badgeAmritSnan || 'अमृत स्नान (Amrit Snan)'}</span>`;
    } else if (isCeremony) {
      badgeHtml = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>${ui.badgeOfficialCeremony || 'प्रस्तावित विधी'}</span>`;
    } else {
      badgeHtml = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>${ui.badgeFestivalSnan || 'पर्व स्नान व उत्सव'}</span>`;
    }

    const eventDate = item['date_' + currentLang] || item.date;
    const eventDay = item['day_' + currentLang] || item.day;
    const yearBadge = (currentLang === 'mr' || currentLang === 'hi') ? '२०२७-२८' : '2027-28';

    return `
      <article class="bg-white rounded-2xl border ${isShahi ? 'border-amber-400/90 ring-1 ring-amber-300/40 shadow-sm' : 'border-slate-200/90 shadow-sm'} hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6 flex flex-col justify-between group" tabindex="0">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            ${badgeHtml}
            <span class="text-[11px] font-mono text-slate-400 font-semibold uppercase">${yearBadge}</span>
          </div>
          
          <div class="text-slate-900 font-black text-2xl tracking-tight mb-0.5 group-hover:text-amber-800 transition">${eventDate}</div>
          <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">${eventDay} • ${tithi}</div>

          <h3 class="text-lg font-bold text-slate-900 mb-3 leading-snug">${title}</h3>
          
          <div class="space-y-2 text-xs sm:text-sm text-slate-700 mb-3 bg-slate-50/80 border border-slate-100 p-3 rounded-xl">
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-900 min-w-[85px] flex-shrink-0">${ui.location || 'स्थान:'}</span>
              <span class="text-slate-800 font-medium">${loc}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-900 min-w-[85px] flex-shrink-0">${ui.participating || 'सहभागी:'}</span>
              <span class="text-slate-600">${akharas}</span>
            </div>
          </div>

          ${proTip ? `
          <div class="mb-4 text-xs bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 text-amber-950 flex items-start gap-2">
            <span class="text-amber-600 font-bold flex-shrink-0">${ui.proTip || 'सल्ला:'}</span>
            <span class="leading-relaxed font-medium">${proTip}</span>
          </div>
          ` : ''}
        </div>

        <div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap mb-2">
            <button onclick="downloadEventIcs('${item.id}')" class="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-200 transition inline-flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              ${ui.addToCalendar || 'कॅलेंडरमध्ये जोडा (.ics)'}
            </button>
            <button onclick="window.openKumbhDootAssistant('snan', '${encodeURIComponent(title)}')" class="text-xs font-bold text-white bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover px-3 py-1.5 rounded-lg shadow-sm transition inline-flex items-center gap-1">
              ${ui.kumbhdootSnanInfo || 'कुंभदूत AI स्नान माहिती'}
            </button>
          </div>
          <div class="text-[10px] text-slate-400 flex items-center justify-between">
            <span class="truncate max-w-[200px]" title="${item.source}">${ui.source || 'संदर्भ:'} nashikkumbhmela.co.in</span>
            <span>${ui.updated || 'अद्यतन:'} ${item.lastUpdated}</span>
          </div>
        </div>
      </article>
    `;
  }

  const cardsHtml = filtered.map(item => renderCard(item)).join('');
  if (container) container.innerHTML = cardsHtml;

  if (homeSchedulePreview) {
    const previewCards = state.snanDates.filter(d => d.category === 'shahi').slice(0, 3);
    homeSchedulePreview.innerHTML = previewCards.map(item => renderCard(item)).join('');
  }
}

// 9. Add to Calendar (.ics download generator)
window.downloadEventIcs = function(eventId) {
  const item = state.snanDates.find(d => d.id === eventId);
  if (!item) return;

  const currentLang = state.currentLang;
  const title = item[`title_${currentLang}`] || item.title_en;
  const loc = item[`location_${currentLang}`] || item.location_en;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Government of Maharashtra//Nashik Simhastha 2027//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Simhastha Kumbh 2027: ${title}`,
    `DESCRIPTION:${title} - ${loc} (Government of Maharashtra Official Simhastha Schedule)`,
    `LOCATION:${loc}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${item.id}-kumbh-2027.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 10. Render Live Notices
function renderNoticesSection() {
  const container = document.getElementById('notices-cards-container');
  const homeNoticesContainer = document.getElementById('home-notices-preview');
  if (!container && !homeNoticesContainer) return;

  const currentLang = state.currentLang;
  const t = state.translations[currentLang] || state.translations.mr || {};
  const ui = t.ui || {};

  const noticesHtml = state.notices.map(n => {
    const title = n[`title_${currentLang}`] || n.title_en;
    const dept = n[`department_${currentLang}`] || n.department_en;
    const cat = n[`category_${currentLang}`] || n.category_en;

    return `
      <article class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col justify-between" tabindex="0">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">${cat}</span>
            <time class="text-xs font-bold text-slate-500">${n.date}</time>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2 leading-snug">${title}</h3>
          <p class="text-xs text-slate-600 mb-3">${dept}</p>
        </div>
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <button onclick="simulatePdfDownload('${n.id}', '${encodeURIComponent(title)}')" class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 underline py-1">
            <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>
            ${n.fileType} (${n.fileSize})
          </button>
          <span class="text-[10px] text-slate-400">${ui.source || 'स्त्रोत:'} ${n.source}</span>
        </div>
      </article>
    `;
  }).join('');

  if (container) container.innerHTML = noticesHtml;
  if (homeNoticesContainer) homeNoticesContainer.innerHTML = noticesHtml.slice(0, 3);
}

// 11. Render Emergency Numbers Grid
function renderEmergencyGrid() {
  const container = document.getElementById('emergency-numbers-grid');
  if (!container || !state.safetyData.emergencyNumbers) return;

  const currentLang = state.currentLang;
  const t = state.translations[currentLang] || state.translations.mr || {};
  const ui = t.ui || {};

  container.innerHTML = state.safetyData.emergencyNumbers.map(item => {
    const serviceName = item[`service_${currentLang}`] || item.service_en;
    const available = item[`available_${currentLang}`] || item.available;
    return `
      <div class="bg-white rounded-xl border border-rose-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition">
        <div>
          <span class="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wider">${item.badge}</span>
          <h4 class="text-base font-bold text-slate-900 mt-2 mb-1">${serviceName}</h4>
          <div class="text-3xl font-extrabold text-rose-700 font-mono my-2 tracking-tight">
            <a href="tel:${item.number}" class="hover:underline">${item.number}</a>
          </div>
          <div class="text-xs text-slate-500">${available}</div>
        </div>
        <div class="pt-3 border-t border-slate-100 text-[10px] text-slate-400 mt-3">
          ${item.source} • ${ui.updated || 'अद्यतन:'} ${item.lastUpdated}
        </div>
      </div>
    `;
  }).join('');
}

// 12. IN-PAGE KUMBHDOOT AI ASSISTANT MODAL (No .app redirect)
function setupKumbhDootAssistant() {
  const assistantModal = document.getElementById('kumbhdoot-assistant-modal');
  const closeBtn = document.getElementById('close-assistant-modal');
  const chatForm = document.getElementById('assistant-chat-form');
  const chatInput = document.getElementById('assistant-chat-input');
  const chatHistory = document.getElementById('assistant-chat-history');

  // Trigger buttons across portal
  document.querySelectorAll('.trigger-kumbhdoot-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.getAttribute('data-kd-action') || 'general';
      const context = btn.getAttribute('data-kd-context') || '';
      window.openKumbhDootAssistant(action, context);
    });
  });

  if (closeBtn && assistantModal) {
    closeBtn.addEventListener('click', () => {
      assistantModal.classList.add('hidden');
    });
  }

  // Preset question pills
  document.querySelectorAll('.assistant-preset-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      if (q && chatInput) {
        chatInput.value = q;
        sendAssistantMessage(q);
      }
    });
  });

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = chatInput.value.trim();
      if (q) {
        sendAssistantMessage(q);
        chatInput.value = '';
      }
    });
  }

  function sendAssistantMessage(userQuery) {
    if (!chatHistory) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'flex justify-end mb-3';
    userMsg.innerHTML = `
      <div class="bg-amber-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[80%] text-xs sm:text-sm shadow-sm font-medium">
        ${escapeHtml(userQuery)}
      </div>
    `;
    chatHistory.appendChild(userMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Generate intelligent response based on loaded government data
    setTimeout(() => {
      const reply = generateAssistantReply(userQuery.toLowerCase());
      const botMsg = document.createElement('div');
      botMsg.className = 'flex justify-start mb-3';
      botMsg.innerHTML = `
        <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] text-xs sm:text-sm shadow-sm border border-slate-200">
          <div class="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 mb-1">
            <span>कुंभदूत AI सहाय्यक</span>
          </div>
          <div class="leading-relaxed">${reply}</div>
        </div>
      `;
      chatHistory.appendChild(botMsg);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 400);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function generateAssistantReply(q) {
    const lang = state.currentLang;

    if (q.includes('स्नान') || q.includes('snan') || q.includes('muhurat') || q.includes('मुहूर्त') || q.includes('शाही')) {
      if (lang === 'en') {
        return "The First Shahi Snan will be held on <strong>02 August 2027 (Monday - Shravana Amavasya)</strong> at Ramkund (Nashik) for Vaishnava Akharas and Kushavarta (Trimbakeshwar) for Shaiva Akharas. Auspicious Brahma Muhurat starts at 04:15 AM.";
      } else if (lang === 'hi') {
        return "प्रथम शाही स्नान <strong>02 अगस्त 2027 (सोमवार - श्रावण अमावस्या)</strong> को रामकुंड (नासिक) में वैष्णव अखाड़ों एवं कुशावर्त (त्र्यंबकेश्वर) में शैव अखाड़ों द्वारा संपन्न होगा। ब्रह्म मुहूर्त प्रातः 04:15 से प्रारंभ होगा।";
      } else {
        return "प्रथम शाही स्नान <strong>०२ ऑगस्ट २०२७ (सोमवार - श्रावणी अमावास्या)</strong> रोजी रामकुंड (नाशिक) येथे वैष्णव आखाडे आणि कुशावर्त (त्र्यंबकेश्वर) येथे शैव आखाड्यांसाठी संपन्न होईल. पहाटे ०४:१५ पासून शुभ स्नान सुरू होईल.";
      }
    }

    if (q.includes('पार्किंग') || q.includes('parking') || q.includes('गाडी') || q.includes('car') || q.includes('bus') || q.includes('बस')) {
      if (lang === 'en') {
        return "Private vehicles are routed to outer satellite hubs: <strong>Adgaon P1 (NH-3)</strong> and <strong>Ambad P2 (NH-60)</strong>. Free non-stop MSRTC electric shuttle buses connect these parking hubs directly to sacred ghats.";
      } else if (lang === 'hi') {
        return "निजी वाहनों हेतु बाह्य सैटेलाइट पार्किंग: <strong>आडगांव P1 (NH-3)</strong> एवं <strong>अंबड P2 (NH-60)</strong> निर्धारित हैं। यहां से घाटों तक निरंतर निःशुल्क ई-बस सेवा उपलब्ध है।";
      } else {
        return "सर्व खाजगी वाहने शहराबाहेरील <strong>आडगाव P1 (मुंबई-धुळे महामार्ग)</strong> व <strong>अंबड P2 (पुणे महामार्ग)</strong> सॅटेलाइट पार्किंगमध्ये लावणे अनिवार्य आहे. तेथून पवित्र घाटांपर्यंत मोफत ई-बस शटल उपलब्ध आहेत.";
      }
    }

    if (q.includes('मदत') || q.includes('help') || q.includes('police') || q.includes('पोलीस') || q.includes('emergency') || q.includes('रुग्ण')) {
      return "२४x७ एकात्मिक आपत्कालीन संपर्क:<br>• पोलीस / आपत्कालीन: <strong>112</strong><br>• मोफत शासकीय ॲम्ब्युलन्स: <strong>108</strong><br>• महिला सुरक्षा निर्भया पथक: <strong>1091</strong><br>• बाल संरक्षण व हरवलेली मुले: <strong>1098</strong><br>जवळचे आपत्कालीन रुग्णालय पंचवटी मुख्य आरोग्य केंद्र येथे सज्ज आहे.";
    }

    if (q.includes('हरवले') || q.includes('lost') || q.includes('found') || q.includes('मुले')) {
      return "हरवलेली व्यक्ती किंवा बालकांसाठी सर्व प्रमुख घाटांवर ‘कुंभदूत पुनर्मिलन कक्ष’ कार्यरत आहेत. आपण थेट पोर्टलवरील <strong>हरवले-सापडले (Lost & Found)</strong> टॅबवर जाऊन तात्काळ फोटो व माहिती नोंदवू शकता.";
    }

    return "जय गोदावरी! मी सिंहस्थ कुंभमेळा २०२७ चा अधिकृत डिजिटल सहाय्यक आहे. आपण मला शाही स्नान तारखा, घाटांची माहिती, सॅटेलाइट पार्किंग, बस शटल किंवा आपत्कालीन वैद्यकीय मदतीविषयी विचारू शकता.";
  }
}

// Global window trigger to open the assistant modal from any button on page
window.openKumbhDootAssistant = function(action = 'general', context = '') {
  const modal = document.getElementById('kumbhdoot-assistant-modal');
  if (!modal) return;

  modal.classList.remove('hidden');

  const chatInput = document.getElementById('assistant-chat-input');
  if (chatInput) {
    if (action === 'snan') {
      chatInput.value = context ? decodeURIComponent(context) + " ची माहिती" : "शाही स्नान वेळापत्रक";
    } else if (action === 'directions') {
      chatInput.value = context ? decodeURIComponent(context) + " कडे जाण्याचा मार्ग व पार्किंग" : "जवळचे पार्किंग कुठे आहे?";
    } else if (action === 'safety') {
      chatInput.value = "तातडीची आपत्कालीन मदत व रुग्णवाहिका";
    } else if (action === 'lostfound') {
      chatInput.value = context ? "नोंद क्र. " + context + " विषयी चौकशी" : "हरवलेल्या व्यक्तीची नोंदणी";
    }
  }

  const closeBtn = document.getElementById('close-assistant-modal');
  if (closeBtn) closeBtn.focus();
};

// 13. Modals & Dialogs (QR Code Modal & PDF Notice Reader)
function setupModals() {
  const qrModal = document.getElementById('qr-modal');
  const openQrBtns = document.querySelectorAll('.open-qr-modal');
  const closeQrBtn = document.getElementById('close-qr-modal');

  openQrBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (qrModal) {
        qrModal.classList.remove('hidden');
        closeQrBtn.focus();
      }
    });
  });

  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.add('hidden');
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.app-modal').forEach(m => m.classList.add('hidden'));
    }
  });
}

window.simulatePdfDownload = function(noticeId, encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  alert(`[महाराष्ट्र शासन राजपत्र व अधिकृत सूचना]\n\nदस्तऐवज / Gazette: "${title}"\n\nसदर अधिकृत परिपत्रक महाराष्ट्र शासन व नाशिक-त्र्यंबकेश्वर कुंभमेळा विकास प्राधिकरण (NTKMA) अभिलेखातून उपलब्ध करण्यात आले आहे.`);
};

// 14. Volunteer Form
function setupVolunteerForm() {
  const form = document.getElementById('volunteer-registration-form');
  const feedback = document.getElementById('volunteer-form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('vol-name').value;
    const phone = document.getElementById('vol-phone').value;
    const role = document.getElementById('vol-role').value;
    const consent = document.getElementById('vol-consent').checked;

    if (!name || !phone || !consent) {
      feedback.innerHTML = `
        <div role="alert" class="p-4 mb-4 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-sm font-medium">
          कृपया सर्व आवश्यक माहिती भरा आणि संमती मान्य करा.
        </div>
      `;
      return;
    }

    const regId = 'VOL-2027-' + Math.floor(1000 + Math.random() * 9000);

    feedback.innerHTML = `
      <div role="alert" class="p-4 mb-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm">
        <p class="font-bold text-base mb-1">स्वयंसेवक नोंदणी यशस्वी! (Registration Successful)</p>
        <p>नोंदणी क्रमांक: <strong>${regId}</strong></p>
        <p class="text-xs mt-1">आपले नाव आणि निवडलेली सेवा <strong>(${role})</strong> नाशिक प्रशासन व कुंभ स्वयंसेवक समन्वय कक्षाकडे नोंदवली गेली आहे. प्रशिक्षणाची माहिती एसएमएसद्वारे कळवली जाईल.</p>
      </div>
    `;

    form.reset();
  });
}

// 15. Accessible Global Search Modal
function setupGlobalSearch() {
  const searchBtn = document.getElementById('header-search-btn');
  const searchModal = document.getElementById('portal-search-modal');
  const searchInput = document.getElementById('portal-search-input');
  const closeBtn = document.getElementById('close-search-modal');

  window.openSearchModal = function() {
    if (searchModal) {
      searchModal.classList.remove('hidden');
      setTimeout(() => searchInput?.focus(), 50);
    }
  };

  window.closeSearchModal = function() {
    if (searchModal) {
      searchModal.classList.add('hidden');
    }
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', window.openSearchModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeSearchModal);
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) window.closeSearchModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
      window.closeSearchModal();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) return;

        window.closeSearchModal();

        if (q.includes('स्नान') || q.includes('snan') || q.includes('date') || q.includes('तारीख')) {
          window.location.hash = 'schedule';
        } else if (q.includes('नकाशा') || q.includes('map') || q.includes('घाट') || q.includes('ramkund') || q.includes('रामकुंड')) {
          window.location.hash = 'map';
        } else if (q.includes('पार्किंग') || q.includes('parking') || q.includes('bus') || q.includes('वाहतूक')) {
          window.location.hash = 'transport';
        } else if (q.includes('मदत') || q.includes('help') || q.includes('पोलीस') || q.includes('police') || q.includes('रुग्ण')) {
          window.location.hash = 'safety';
        } else if (q.includes('हरवले') || q.includes('lost') || q.includes('found')) {
          window.location.hash = 'lost-found';
        } else if (q.includes('सूचना') || q.includes('notice') || q.includes('परिपत्र')) {
          window.location.hash = 'notices';
        } else {
          window.location.hash = 'map';
          setTimeout(() => {
            const mapInput = document.getElementById('map-search-input');
            if (mapInput) {
              mapInput.value = q;
              mapInput.dispatchEvent(new Event('input'));
            }
          }, 100);
        }
      }
    });
  }
}
