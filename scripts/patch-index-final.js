const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Fix safetyDosDonts keys -> safety keys
html = html.replace('data-i18n="safetyDosDonts.title"', 'data-i18n="safety.homeTitle"');
html = html.replace('data-i18n="safetyDosDonts.subtitle"', 'data-i18n="safety.homeSubtitle"');
html = html.replace('data-i18n="safetyDosDonts.dosTitle"', 'data-i18n="safety.dosTitle"');
html = html.replace('data-i18n="safetyDosDonts.do1"', 'data-i18n="safety.do1"');
html = html.replace('data-i18n="safetyDosDonts.do2"', 'data-i18n="safety.do2"');
html = html.replace('data-i18n="safetyDosDonts.do3"', 'data-i18n="safety.do3"');
html = html.replace('data-i18n="safetyDosDonts.do4"', 'data-i18n="safety.do4"');
html = html.replace('data-i18n="safetyDosDonts.dontsTitle"', 'data-i18n="safety.dontsTitle"');
html = html.replace('data-i18n="safetyDosDonts.dont1"', 'data-i18n="safety.dont1"');
html = html.replace('data-i18n="safetyDosDonts.dont2"', 'data-i18n="safety.dont2"');
html = html.replace('data-i18n="safetyDosDonts.dont3"', 'data-i18n="safety.dont3"');
html = html.replace('data-i18n="safetyDosDonts.dont4"', 'data-i18n="safety.dont4"');

// 2. Fix lostChild.step keys -> safety.step keys
html = html.replace('data-i18n="lostChild.step1Title"', 'data-i18n="safety.step1Title"');
html = html.replace('data-i18n="lostChild.step1Desc"', 'data-i18n="safety.step1Desc"');
html = html.replace('data-i18n="lostChild.step2Title"', 'data-i18n="safety.step2Title"');
html = html.replace('data-i18n="lostChild.step2Desc"', 'data-i18n="safety.step2Desc"');
html = html.replace('data-i18n="lostChild.step3Title"', 'data-i18n="safety.step3Title"');
html = html.replace('data-i18n="lostChild.step3Desc"', 'data-i18n="safety.step3Desc"');
html = html.replace('data-i18n="lostChild.step4Title"', 'data-i18n="safety.step4Title"');
html = html.replace('data-i18n="lostChild.step4Desc"', 'data-i18n="safety.step4Desc"');

// 3. Step numbers in lost child cards
html = html.replace('<div class="text-rose-600 font-mono text-2xl font-black mb-2">०१</div>', '<div class="text-rose-600 font-mono text-2xl font-black mb-2" data-i18n="safety.step1Num">०१</div>');
html = html.replace('<div class="text-blue-600 font-mono text-2xl font-black mb-2">०२</div>', '<div class="text-blue-600 font-mono text-2xl font-black mb-2" data-i18n="safety.step2Num">०२</div>');
html = html.replace('<div class="text-amber-600 font-mono text-2xl font-black mb-2">०३</div>', '<div class="text-amber-600 font-mono text-2xl font-black mb-2" data-i18n="safety.step3Num">०३</div>');
html = html.replace('<div class="text-emerald-600 font-mono text-2xl font-black mb-2">०४</div>', '<div class="text-emerald-600 font-mono text-2xl font-black mb-2" data-i18n="safety.step4Num">०४</div>');

// 4. Map search placeholder & city select
html = html.replace(
  '<input id="map-search-input" type="search" placeholder="घाट किंवा सुविधा शोधा..."',
  '<input id="map-search-input" type="search" placeholder="घाट किंवा सुविधा शोधा..." data-i18n-placeholder="ui.mapSearchPlaceholder"'
);
html = html.replace(
  '<label for="map-city-select" class="text-xs font-bold text-slate-700 whitespace-nowrap">शहर निवडा:</label>',
  '<label for="map-city-select" class="text-xs font-bold text-slate-700 whitespace-nowrap" data-i18n="ui.filterCity">शहर निवडा:</label>'
);
html = html.replace(
  '<option value="all">सर्व शहरे (नाशिक व त्र्यंबकेश्वर)</option>',
  '<option value="all" data-i18n="ui.allCities">सर्व शहरे (नाशिक व त्र्यंबकेश्वर)</option>'
);
html = html.replace(
  '<option value="Nashik">फक्त नाशिक (Nashik)</option>',
  '<option value="Nashik" data-i18n="ui.nashikOnly">फक्त नाशिक (Nashik)</option>'
);
html = html.replace(
  '<option value="Trimbakeshwar">फक्त त्र्यंबकेश्वर (Trimbak)</option>',
  '<option value="Trimbakeshwar" data-i18n="ui.trimbakOnly">फक्त त्र्यंबकेश्वर (Trimbak)</option>'
);

// 5. Accessible text table header & subtitle
html = html.replace(
  '<h3 id="accessible-list-heading" class="text-lg font-bold text-slate-900 flex items-center gap-2">\n              <span class="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>\n              स्क्रीन रीडर व सुलभता मजकूर यादी (Accessible Text List Alternative)\n            </h3>',
  '<h3 id="accessible-list-heading" class="text-lg font-bold text-slate-900 flex items-center gap-2">\n              <span class="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>\n              <span data-i18n="ui.accessibleListTitle">स्क्रीन रीडर व सुलभता मजकूर यादी (Accessible Text List Alternative)</span>\n            </h3>'
);
html = html.replace(
  '<p class="text-xs text-slate-500">\n              GIGW 3.0 व WCAG 2.1 निकषांनुसार नकाशा पाहू न शकणाऱ्या किंवा कमी नेटवर्क असणाऱ्या भाविकांसाठी संपूर्ण मजकूर तक्ता.\n            </p>',
  '<p class="text-xs text-slate-500" data-i18n="ui.accessibleListDesc">\n              GIGW 3.0 व WCAG 2.1 निकषांनुसार नकाशा पाहू न शकणाऱ्या किंवा कमी नेटवर्क असणाऱ्या भाविकांसाठी संपूर्ण मजकूर तक्ता.\n            </p>'
);

// 6. Transport Rail & Bus details
html = html.replace(
  '<div><strong>प्रमुख स्थानक:</strong> नाशिक रोड (NK) जंक्शन</div>',
  '<div><strong data-i18n="transport.railKeyStationLabel">प्रमुख स्थानक:</strong> <span data-i18n="transport.railKeyStationVal">नाशिक रोड (NK) जंक्शन</span></div>'
);
html = html.replace(
  '<div><strong>घाटाचे अंतर:</strong> ९ किमी (समर्पित बस कॉरिडोअरने १५-२० मिनिटे)</div>',
  '<div><strong data-i18n="transport.railDistanceLabel">घाटाचे अंतर:</strong> <span data-i18n="transport.railDistanceVal">९ किमी (समर्पित बस कॉरिडोअरने १५-२० मिनिटे)</span></div>'
);
html = html.replace(
  '<div><strong>सुविधा:</strong> क्लॉक रूम, रुग्णवाहिका, २४x७ हेल्पडेस्क</div>',
  '<div><strong data-i18n="transport.railFacilitiesLabel">सुविधा:</strong> <span data-i18n="transport.railFacilitiesVal">क्लॉक रूम, रुग्णवाहिका, २४x७ हेल्पडेस्क</span></div>'
);

html = html.replace(
  '<div><strong>प्रमुख बस पोर्ट:</strong> ठक्कर बाजार, महामार्ग, आडगाव तात्पुरते बस पोर्ट</div>',
  '<div><strong data-i18n="transport.busKeyDepotsLabel">प्रमुख बस पोर्ट:</strong> <span data-i18n="transport.busKeyDepotsVal">ठक्कर बाजार, महामार्ग, आडगाव तात्पुरते बस पोर्ट</span></div>'
);
html = html.replace(
  '<div><strong>त्र्यंबकेश्वर सेवा:</strong> नाशिक ते त्र्यंबक दर २ मिनिटांनी थेट बस फेरी</div>',
  '<div><strong data-i18n="transport.busTrimbakLabel">त्र्यंबकेश्वर सेवा:</strong> <span data-i18n="transport.busTrimbakVal">नाशिक ते त्र्यंबक दर २ मिनिटांनी थेट बस फेरी</span></div>'
);
html = html.replace(
  '<div><strong>भाडे:</strong> सॅटेलाइट पार्किंग ते घाट प्रवास पूर्णपणे मोफत</div>',
  '<div><strong data-i18n="transport.busFareLabel">भाडे:</strong> <span data-i18n="transport.busFareVal">सॅटेलाइट पार्किंग ते घाट प्रवास पूर्णपणे मोफत</span></div>'
);

// 7. Lost & Found form
html = html.replace(
  '<label for="report-type" class="block text-xs font-bold text-slate-700 mb-1">प्रकार निवडा *</label>',
  '<label for="report-type" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="lostFound.formTypeLabel">प्रकार निवडा *</label>'
);
html = html.replace(
  '<option value="person">हरवलेली व्यक्ती (Missing Person)</option>',
  '<option value="person" data-i18n="lostFound.optPerson">हरवलेली व्यक्ती (Missing Person)</option>'
);
html = html.replace(
  '<option value="item">हरवलेली वस्तू / बॅग (Lost Article/Luggage)</option>',
  '<option value="item" data-i18n="lostFound.optItem">हरवलेली वस्तू / बॅग (Lost Article/Luggage)</option>'
);
html = html.replace(
  '<label for="report-name" class="block text-xs font-bold text-slate-700 mb-1">व्यक्तीचे नाव किंवा वस्तूचा तपशील *</label>',
  '<label for="report-name" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="lostFound.formNameLabel">व्यक्तीचे नाव किंवा वस्तूचा तपशील *</label>'
);
html = html.replace(
  '<input id="report-name" type="text" placeholder="उदा. सुरेश कांबळे किंवा निळी ट्रॅव्हल बॅग"',
  '<input id="report-name" type="text" placeholder="उदा. सुरेश कांबळे किंवा निळी ट्रॅव्हल बॅग" data-i18n-placeholder="lostFound.formNamePlaceholder"'
);
html = html.replace(
  '<label for="report-contact" class="block text-xs font-bold text-slate-700 mb-1">आपला संपर्क क्रमांक *</label>',
  '<label for="report-contact" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="lostFound.formContactLabel">आपला संपर्क क्रमांक *</label>'
);
html = html.replace(
  '<input id="report-contact" type="tel" placeholder="१० अंकी मोबाईल नंबर"',
  '<input id="report-contact" type="tel" placeholder="१० अंकी मोबाईल नंबर" data-i18n-placeholder="lostFound.formContactPlaceholder"'
);
html = html.replace(
  '<label for="report-location" class="block text-xs font-bold text-slate-700 mb-1">शेवटचे ठिकाण (Last seen location) *</label>',
  '<label for="report-location" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="lostFound.formLocationLabel">शेवटचे ठिकाण (Last seen location) *</label>'
);
html = html.replace(
  '<input id="report-location" type="text" placeholder="उदा. रामकुंड घाट, पायऱ्यांजवळ"',
  '<input id="report-location" type="text" placeholder="उदा. रामकुंड घाट, पायऱ्यांजवळ" data-i18n-placeholder="lostFound.formLocationPlaceholder"'
);
html = html.replace(
  '<label for="report-desc" class="block text-xs font-bold text-slate-700 mb-1">कपड्यांचा रंग / विशेष ओळख खूण *</label>',
  '<label for="report-desc" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="lostFound.formDescLabel">कपड्यांचा रंग / विशेष ओळख खूण *</label>'
);
html = html.replace(
  '<textarea id="report-desc" rows="3" placeholder="उदा. पिवळा कुर्ता, पांढरी धोती, चष्मा, वय अंदाजे ६५ वर्षे"',
  '<textarea id="report-desc" rows="3" placeholder="उदा. पिवळा कुर्ता, पांढरी धोती, चष्मा, वय अंदाजे ६५ वर्षे" data-i18n-placeholder="lostFound.formDescPlaceholder"'
);

// 8. Volunteer form
html = html.replace(
  '<label for="vol-name" class="block text-xs font-bold text-slate-700 mb-1">पूर्ण नाव *</label>',
  '<label for="vol-name" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="volunteer.formNameLabel">पूर्ण नाव *</label>'
);
html = html.replace(
  '<input id="vol-name" type="text" placeholder="आपले नाव"',
  '<input id="vol-name" type="text" placeholder="आपले नाव" data-i18n-placeholder="volunteer.formNamePlaceholder"'
);
html = html.replace(
  '<label for="vol-phone" class="block text-xs font-bold text-slate-700 mb-1">मोबाईल नंबर *</label>',
  '<label for="vol-phone" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="volunteer.formPhoneLabel">मोबाईल नंबर *</label>'
);
html = html.replace(
  '<input id="vol-phone" type="tel" placeholder="१० अंकी फोन नंबर"',
  '<input id="vol-phone" type="tel" placeholder="१० अंकी फोन नंबर" data-i18n-placeholder="volunteer.formPhonePlaceholder"'
);
html = html.replace(
  '<label for="vol-role" class="block text-xs font-bold text-slate-700 mb-1">सेवा क्षेत्र (Preferred Role) *</label>',
  '<label for="vol-role" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="volunteer.formRoleLabel">सेवा क्षेत्र (Preferred Role) *</label>'
);
html = html.replace(
  '<option value="भाविकांना मार्गदर्शन व मदत">भाविकांना मार्गदर्शन व मदत (Pilgrim Guidance)</option>',
  '<option value="भाविकांना मार्गदर्शन व मदत" data-i18n="volunteer.roleGuidance">भाविकांना मार्गदर्शन व मदत (Pilgrim Guidance)</option>'
);
html = html.replace(
  '<option value="गर्दी व्यवस्थापन व रांग नियंत्रण">गर्दी व्यवस्थापन व रांग नियंत्रण (Crowd Management)</option>',
  '<option value="गर्दी व्यवस्थापन व रांग नियंत्रण" data-i18n="volunteer.roleCrowd">गर्दी व्यवस्थापन व रांग नियंत्रण (Crowd Management)</option>'
);
html = html.replace(
  '<option value="स्वच्छ गोदावरी - स्वच्छता सेवा">स्वच्छ गोदावरी - स्वच्छता सेवा (Swachh Seva)</option>',
  '<option value="स्वच्छ गोदावरी - स्वच्छता सेवा" data-i18n="volunteer.roleSwachh">स्वच्छ गोदावरी - स्वच्छता सेवा (Swachh Seva)</option>'
);
html = html.replace(
  '<option value="वैद्यकीय प्रथमोपचार सहाय्य">वैद्यकीय प्रथमोपचार सहाय्य (First-Aid Assistance)</option>',
  '<option value="वैद्यकीय प्रथमोपचार सहाय्य" data-i18n="volunteer.roleFirstAid">वैद्यकीय प्रथमोपचार सहाय्य (First-Aid Assistance)</option>'
);
html = html.replace(
  '<option value="बहुभाषिक अनुवाद सहाय्य">बहुभाषिक अनुवाद सहाय्य (Multilingual Translation)</option>',
  '<option value="बहुभाषिक अनुवाद सहाय्य" data-i18n="volunteer.roleTranslation">बहुभाषिक अनुवाद सहाय्य (Multilingual Translation)</option>'
);
html = html.replace(
  '<label for="vol-languages" class="block text-xs font-bold text-slate-700 mb-1">अवगत भाषा (Languages known)</label>',
  '<label for="vol-languages" class="block text-xs font-bold text-slate-700 mb-1" data-i18n="volunteer.formLangLabel">अवगत भाषा (Languages known)</label>'
);
html = html.replace(
  '<input id="vol-languages" type="text" placeholder="उदा. मराठी, हिंदी, इंग्रजी, गुजराती"',
  '<input id="vol-languages" type="text" placeholder="उदा. मराठी, हिंदी, इंग्रजी, गुजराती" data-i18n-placeholder="volunteer.formLangPlaceholder"'
);
html = html.replace(
  '<span>\n                  मी याद्वारे संमती देतो/देते की वरील माहिती केवळ सिंहस्थ कुंभमेळा स्वयंसेवक समन्वयासाठी वापरली जाईल. कोणत्याही व्यावसायिक हेतूसाठी ही माहिती सामायिक केली जाणार नाही. (DPDP Act 2023 compliant consent)\n                </span>',
  '<span data-i18n="volunteer.consentText">\n                  मी याद्वारे संमती देतो/देते की वरील माहिती केवळ सिंहस्थ कुंभमेळा स्वयंसेवक समन्वयासाठी वापरली जाईल. कोणत्याही व्यावसायिक हेतूसाठी ही माहिती सामायिक केली जाणार नाही. (DPDP Act 2023 compliant consent)\n                </span>'
);

// 9. AI Assistant Modal greeting header & placeholder
html = html.replace(
  '<span>🕉️ कुंभदूत AI सहाय्यक</span>',
  '<span data-i18n="assistantModal.sender">🕉️ कुंभदूत AI सहाय्यक</span>'
);
html = html.replace(
  '<input id="assistant-chat-input" type="text" placeholder="आपला प्रश्न येथे टाईप करा किंवा विचारा..."',
  '<input id="assistant-chat-input" type="text" placeholder="आपला प्रश्न येथे टाईप करा किंवा विचारा..." data-i18n-placeholder="assistantModal.placeholder"'
);

// 10. Footer Official Portals
html = html.replace(
  '<a href="https://nashik.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">नाशिक जिल्हाधिकारी कार्यालय (nashik.gov.in)</a>',
  '<a href="https://nashik.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline" data-i18n="footer.portalNashik">नाशिक जिल्हाधिकारी कार्यालय (nashik.gov.in)</a>'
);
html = html.replace(
  '<a href="https://divcomnashik.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">विभागीय आयुक्त नाशिक</a>',
  '<a href="https://divcomnashik.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline" data-i18n="footer.portalDivcom">विभागीय आयुक्त नाशिक</a>'
);
html = html.replace(
  '<a href="https://nmc.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">नाशिक महानगरपालिका (NMC)</a>',
  '<a href="https://nmc.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline" data-i18n="footer.portalNmc">नाशिक महानगरपालिका (NMC)</a>'
);
html = html.replace(
  '<a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">महाराष्ट्र शासन (maharashtra.gov.in)</a>',
  '<a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline" data-i18n="footer.portalMaha">महाराष्ट्र शासन (maharashtra.gov.in)</a>'
);
html = html.replace(
  '<a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">National Portal of India (india.gov.in)</a>',
  '<a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" class="hover:text-white underline" data-i18n="footer.portalIndia">National Portal of India (india.gov.in)</a>'
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully patched index.html with final i18n tags');
