// Lost and Found Portal Interactive Controller
let lostFoundRecords = [];
let currentLostType = 'all';

async function initLostFoundModule() {
  try {
    const res = await fetch('./src/data/lost-found.json');
    lostFoundRecords = await res.json();
    renderLostFoundCards();
    setupLostFoundListeners();
  } catch (e) {
    console.error('Error loading lost found records:', e);
  }
}

function setupLostFoundListeners() {
  // Tab switching between Search and Report
  const tabSearch = document.getElementById('lf-tab-search');
  const tabReport = document.getElementById('lf-tab-report');
  const sectionSearch = document.getElementById('lf-section-search');
  const sectionReport = document.getElementById('lf-section-report');

  if (tabSearch && tabReport && sectionSearch && sectionReport) {
    tabSearch.addEventListener('click', () => {
      tabSearch.classList.add('bg-gov-header', 'text-white');
      tabSearch.classList.remove('bg-slate-100', 'text-slate-700');
      tabReport.classList.add('bg-slate-100', 'text-slate-700');
      tabReport.classList.remove('bg-gov-header', 'text-white');
      tabSearch.setAttribute('aria-selected', 'true');
      tabReport.setAttribute('aria-selected', 'false');

      sectionSearch.classList.remove('hidden');
      sectionReport.classList.add('hidden');
    });

    tabReport.addEventListener('click', () => {
      tabReport.classList.add('bg-gov-header', 'text-white');
      tabReport.classList.remove('bg-slate-100', 'text-slate-700');
      tabSearch.classList.add('bg-slate-100', 'text-slate-700');
      tabSearch.classList.remove('bg-gov-header', 'text-white');
      tabReport.setAttribute('aria-selected', 'true');
      tabSearch.setAttribute('aria-selected', 'false');

      sectionReport.classList.remove('hidden');
      sectionSearch.classList.add('hidden');
    });
  }

  // Type filter buttons
  const typeButtons = document.querySelectorAll('[data-lf-filter]');
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-slate-900', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      currentLostType = btn.getAttribute('data-lf-filter');
      renderLostFoundCards();
    });
  });

  // Search input
  const searchInput = document.getElementById('lf-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderLostFoundCards(e.target.value.toLowerCase().trim());
    });
  }

  // Report Form submission
  const reportForm = document.getElementById('lf-report-form');
  const alertContainer = document.getElementById('lf-form-feedback');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = document.getElementById('report-type').value;
      const formName = document.getElementById('report-name').value;
      const formContact = document.getElementById('report-contact').value;
      const formLocation = document.getElementById('report-location').value;
      const formDesc = document.getElementById('report-desc').value;

      if (!formName || !formContact || !formLocation) {
        alertContainer.innerHTML = `
          <div role="alert" class="p-4 mb-4 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-sm font-medium">
            कृपया सर्व आवश्यक माहिती भरा (Please fill all mandatory fields).
          </div>
        `;
        return;
      }

      const generatedId = 'LF-2027-' + Math.floor(100 + Math.random() * 900);

      // Add to local records
      lostFoundRecords.unshift({
        id: generatedId,
        type: formType,
        status: 'reported_in_verification',
        name: formName,
        age: formType === 'person' ? 'नोंदणीकृत' : 'वस्तु',
        gender: '-',
        nativePlace: 'तपशील नोंदवला',
        clothColor: formDesc,
        reportedLocation: formLocation,
        dateTime: new Date().toLocaleDateString('en-GB') + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        currentLocation: 'केंद्रीय नियंत्रण कक्षात प्रसारित',
        deskContact: formContact,
        source: 'Pilgrim Web Portal Registration (To be verified)',
        lastUpdated: new Date().toLocaleDateString('en-GB')
      });

      alertContainer.innerHTML = `
        <div role="alert" class="p-4 mb-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-medium">
          <p class="font-bold text-base mb-1">नोंदणी यशस्वी झाली! / Registration Successful</p>
          <p>आपली तक्रार नोंदणी क्र. <strong>${generatedId}</strong> अंतर्गत मध्यवर्ती नियंत्रण कक्ष व सर्व घाटांवरील वायरलेस नेटवर्कवर पाठवण्यात आली आहे.</p>
          <p class="text-xs mt-2 text-emerald-700">निकटतम पोलीस अथवा कुंभदूत मदत केंद्रात जाऊन त्वरित संपर्क साधा.</p>
        </div>
      `;

      reportForm.reset();
      renderLostFoundCards();
    });
  }
}

function renderLostFoundCards(searchTerm = '') {
  const container = document.getElementById('lf-cards-container');
  if (!container) return;

  const currentLang = (window.kumbhApp && window.kumbhApp.currentLang) || 'mr';
  const t = (window.kumbhApp && window.kumbhApp.translations && window.kumbhApp.translations[currentLang]) || {};
  const ui = t.ui || {};

  const filtered = lostFoundRecords.filter(item => {
    const matchesType = currentLostType === 'all' || item.type === currentLostType;
    const searchTarget = (item.name + ' ' + (item.clothColor || '') + ' ' + (item.reportedLocation || '') + ' ' + item.id).toLowerCase();
    const matchesSearch = !searchTerm || searchTarget.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white rounded-lg border border-slate-200">
        <p class="text-slate-600 font-medium">${ui.lfNoRecords || 'No records match your criteria.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isPerson = item.type === 'person';
    const statusBadges = {
      found_at_camp: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: ui.lfStatusAtCamp || 'केंद्रात सुरक्षित / At Camp' },
      missing_search_active: { bg: 'bg-rose-100', text: 'text-rose-800', label: ui.lfStatusSearchActive || 'शोध सुरू / Search Active' },
      in_safe_custody: { bg: 'bg-blue-100', text: 'text-blue-800', label: ui.lfStatusInCustody || 'पोलीस ताब्यात / In Custody' },
      reported_in_verification: { bg: 'bg-amber-100', text: 'text-amber-800', label: ui.lfStatusVerifying || 'पडताळणी सुरू / Verifying' }
    };
    const badge = statusBadges[item.status] || { bg: 'bg-slate-100', text: 'text-slate-800', label: item.status };

    const itemName = item['name_' + currentLang] || item.name;
    const itemAge = item['age_' + currentLang] || item.age;
    const itemGender = item['gender_' + currentLang] || item.gender;
    const itemTypeLabel = item['itemType_' + currentLang] || item.itemType || 'साहित्य';
    const itemDesc = item['clothColor_' + currentLang] || item.clothColor || item['description_' + currentLang] || item.description;
    const itemLocation = item['reportedLocation_' + currentLang] || item.reportedLocation;
    const itemCurrentLoc = item['currentLocation_' + currentLang] || item.currentLocation;
    const itemContact = item['deskContact_' + currentLang] || item.deskContact;

    return `
      <article class="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition" tabindex="0">
        <div class="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}">
            ${badge.label}
          </span>
          <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            #${item.id}
          </span>
        </div>

        <h3 class="text-lg font-bold text-slate-900 mb-1">${itemName}</h3>
        <p class="text-xs text-slate-500 mb-3">${isPerson ? `${ui.lfAge || 'वय:'} ${itemAge} | ${ui.lfGender || 'लिंग:'} ${itemGender}` : `${ui.lfItemType || 'वस्तू प्रकार:'} ${itemTypeLabel}`}</p>

        <div class="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded mb-4">
          <div><span class="font-bold text-slate-900">${ui.lfDescClothes || 'वर्णन / कपडे:'}</span> ${itemDesc}</div>
          <div><span class="font-bold text-slate-900">${ui.lfLastSeen || 'शेवटचे ठिकाण:'}</span> ${itemLocation}</div>
          <div><span class="font-bold text-slate-900">${ui.lfTime || 'वेळ:'}</span> ${item.dateTime}</div>
          <div><span class="font-bold text-slate-900">${ui.lfCurrentLocation || 'सध्याचे स्थान:'}</span> <span class="text-blue-800 font-semibold">${itemCurrentLoc}</span></div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <span class="text-xs font-semibold text-slate-700">${ui.lfContactDesk || 'संपर्क कक्ष:'} <a href="tel:${itemContact.replace(/[^\d+]/g, '')}" class="text-blue-700 underline font-mono">${itemContact}</a></span>
          <button onclick="window.openKumbhDootAssistant && window.openKumbhDootAssistant('lostfound', '${item.id}')" class="text-xs font-bold text-white bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover px-2.5 py-1.5 rounded inline-flex items-center gap-1 transition">
            ${ui.lfAiHelp || 'कुंभदूत AI वर माहिती द्या'}
          </button>
        </div>
        <div class="mt-2 text-[10px] text-slate-400">
          ${item.source} • ${ui.updated || 'अद्यतन:'} ${item.lastUpdated}
        </div>
      </article>
    `;
  }).join('');
}

window.initLostFoundModule = initLostFoundModule;
window.renderLostFoundCards = renderLostFoundCards;
