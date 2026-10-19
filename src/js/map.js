// Interactive Map and Accessible Location Directory Controller
let mapLocations = [];
let currentCategoryFilter = 'all';
let currentCityFilter = 'all';

async function initMapModule() {
  try {
    const res = await fetch('./src/data/map-locations.json');
    mapLocations = await res.json();
    renderMapLocations();
    setupMapFilters();
  } catch (e) {
    console.error('Error loading map locations:', e);
  }
}

function setupMapFilters() {
  const categoryButtons = document.querySelectorAll('[data-map-filter]');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => {
        b.classList.remove('bg-gov-header', 'text-white', 'border-gov-header');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');
      btn.classList.add('bg-gov-header', 'text-white', 'border-gov-header');
      btn.setAttribute('aria-pressed', 'true');
      
      currentCategoryFilter = btn.getAttribute('data-map-filter');
      renderMapLocations();
    });
  });

  const cityFilterSelect = document.getElementById('map-city-select');
  if (cityFilterSelect) {
    cityFilterSelect.addEventListener('change', (e) => {
      currentCityFilter = e.target.value;
      renderMapLocations();
    });
  }

  const mapSearchInput = document.getElementById('map-search-input');
  if (mapSearchInput) {
    mapSearchInput.addEventListener('input', (e) => {
      renderMapLocations(e.target.value.toLowerCase().trim());
    });
  }
}

function renderMapLocations(searchTerm = '') {
  const container = document.getElementById('map-locations-grid');
  const textListContainer = document.getElementById('accessible-text-list-body');
  if (!container) return;

  const currentLang = window.kumbhApp ? window.kumbhApp.currentLang : 'mr';
  const t = (window.kumbhApp && window.kumbhApp.translations && window.kumbhApp.translations[currentLang]) || {};
  const ui = t.ui || {};

  const filtered = mapLocations.filter(loc => {
    const matchesCategory = currentCategoryFilter === 'all' || loc.category === currentCategoryFilter;
    const matchesCity = currentCityFilter === 'all' || loc.city.toLowerCase() === currentCityFilter.toLowerCase();
    
    const name = (loc[`name_${currentLang}`] || loc.name_en).toLowerCase();
    const desc = (loc[`description_${currentLang}`] || loc.description_en).toLowerCase();
    const matchesSearch = !searchTerm || name.includes(searchTerm) || desc.includes(searchTerm);

    return matchesCategory && matchesCity && matchesSearch;
  });

  // Render Visual Grid Cards
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white rounded-lg border border-slate-200">
        <p class="text-slate-600 font-medium">${ui.noLocationsFound || 'No locations found matching your filter.'}</p>
        <button onclick="document.querySelector('[data-map-filter=\\'all\\']').click()" class="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-sm">${ui.resetFilters || 'Show All Locations (Reset Filters)'}</button>
      </div>
    `;
  } else {
    container.innerHTML = filtered.map(loc => {
      const name = loc[`name_${currentLang}`] || loc.name_en;
      const desc = loc[`description_${currentLang}`] || loc.description_en;
      const categoryBadges = {
        ghat: { bg: 'bg-amber-100', text: 'text-amber-800', label: ui.catGhat || 'पवित्र स्नान घाट / Sacred Ghat' },
        parking: { bg: 'bg-blue-100', text: 'text-blue-800', label: ui.catParking || 'सॅटेलाइट पार्किंग / Parking' },
        shuttle: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: ui.catShuttle || 'बस शटल थांबा / Shuttle Hub' },
        medical: { bg: 'bg-rose-100', text: 'text-rose-800', label: ui.catMedical || 'वैद्यकीय मदत / Emergency Medical' },
        police: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: ui.catPolice || 'पोलीस मदत कक्ष / Police Hub' },
        water_toilet: { bg: 'bg-teal-100', text: 'text-teal-800', label: ui.catSanitation || 'पाणी व स्वच्छता / Sanitation' },
        lost_found: { bg: 'bg-purple-100', text: 'text-purple-800', label: ui.catLostFound || 'हरवले-सापडले / Lost & Found' }
      };
      const badge = categoryBadges[loc.category] || { bg: 'bg-slate-100', text: 'text-slate-800', label: loc.category };

      return `
        <article class="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between" tabindex="0">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}">
                ${badge.label}
              </span>
              <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ${loc.city === 'Nashik' ? (ui.cityNashik || 'Nashik') : (ui.cityTrimbak || 'Trimbakeshwar')}
              </span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">${name}</h3>
            <p class="text-slate-600 text-sm mb-4 leading-relaxed">${desc}</p>
            
            <div class="mb-4">
              <span class="text-xs font-bold text-slate-700 block mb-1">${ui.availableFacilities || 'उपलब्ध सुविधा (Facilities):'}</span>
              <div class="flex flex-wrap gap-1.5">
                ${(loc['facilities_' + currentLang] || loc.facilities).map(f => `<span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">${f}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-2">
              <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 underline py-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                ${ui.openGoogleMaps || 'Google Maps मध्ये पहा'}
              </a>
              <button onclick="window.openKumbhDootAssistant && window.openKumbhDootAssistant('directions', '${name.replace(/'/g, "\\'")}')" class="inline-flex items-center gap-1 text-xs font-bold text-white bg-kumbhdoot-cta hover:bg-kumbhdoot-ctaHover px-3 py-1.5 rounded transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>
                ${ui.askDirectionsAi || 'कुंभदूत AI मार्ग विचारा'}
              </button>
            </div>
            <div class="text-[11px] text-slate-400 flex items-center justify-between">
              <span>${ui.source || 'स्त्रोत:'} ${loc.source}</span>
              <span>${ui.updated || 'अद्यतन:'} ${loc.lastUpdated}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Accessible Text List Alternative (Table format for screen readers and low-bandwidth users)
  if (textListContainer) {
    textListContainer.innerHTML = filtered.map((loc, idx) => {
      const name = loc[`name_${currentLang}`] || loc.name_en;
      const desc = loc[`description_${currentLang}`] || loc.description_en;
      const categoryBadges = {
        ghat: ui.catGhat || 'पवित्र स्नान घाट / Sacred Ghat',
        parking: ui.catParking || 'सॅटेलाइट पार्किंग / Parking',
        shuttle: ui.catShuttle || 'बस शटल थांबा / Shuttle Hub',
        medical: ui.catMedical || 'वैद्यकीय मदत / Emergency Medical',
        police: ui.catPolice || 'पोलीस मदत कक्ष / Police Hub',
        water_toilet: ui.catSanitation || 'पाणी व स्वच्छता / Sanitation',
        lost_found: ui.catLostFound || 'हरवले-सापडले / Lost & Found'
      };
      const catLabel = categoryBadges[loc.category] || loc.category;
      const cityLabel = loc.city === 'Nashik' ? (ui.cityNashik || 'Nashik') : (ui.cityTrimbak || 'Trimbakeshwar');
      const facilitiesList = (loc['facilities_' + currentLang] || loc.facilities).join(', ');

      return `
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-sm">
          <td class="p-3 font-semibold text-slate-800">${idx + 1}</td>
          <td class="p-3">
            <div class="font-bold text-slate-900">${name}</div>
            <div class="text-xs text-slate-500">${desc}</div>
          </td>
          <td class="p-3 text-slate-700 font-medium">${catLabel}</td>
          <td class="p-3 text-slate-700">${cityLabel}</td>
          <td class="p-3 text-xs text-slate-600">${facilitiesList}</td>
          <td class="p-3">
            <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline font-semibold text-xs whitespace-nowrap">${ui.openGoogleMaps || 'Open Map'}</a>
          </td>
        </tr>
      `;
    }).join('');
  }
}

window.initMapModule = initMapModule;
window.renderMapLocations = renderMapLocations;
