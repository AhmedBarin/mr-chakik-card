/**
 * AHMAD CHAKIK — EXECUTIVE PROFILE & PORTFOLIO
 * High-performance vanilla JavaScript controller
 */

// ==========================================
// 1. DATA REPOSITORIES
// ==========================================

const COMPANY_VENTURES = [
  {
    id: "tech",
    title: "Opal World Technologies",
    tagline: "Technology · AI & Satellite Intelligence",
    logo: "assets/logo-tech.png",
    fallbackLogo: "https://static.wixstatic.com/media/e5c5f1_e20db5de443545f98acb2a6b38113ab2~mv2.png",
    description: "Pioneering the next era of high-impact technology. Opal World Technologies drives groundbreaking initiatives in Artificial Intelligence, enterprise blockchain infrastructure, and strategic integration with the BeiDou Navigation Satellite System.",
    website: "https://www.opalworldtechs.com/",
    badge: "Emerging Tech & Satellite"
  },
  {
    id: "sg",
    title: "Opal SG",
    tagline: "Innovation Hub · Southeast Asia",
    logo: "assets/logo-sg.png",
    fallbackLogo: "https://static.wixstatic.com/media/e5c5f1_42116871cdda4d3c9a761de53851ee08~mv2.png",
    description: "Anchored in Singapore, Opal SG serves as the conglomerate's high-velocity innovation gateway and venture advisory platform, linking Southeast Asian capital markets with global technology breakthroughs.",
    website: "https://www.opal-sg.com/",
    badge: "Venture Innovation"
  },
  {
    id: "grp",
    title: "Opal Group",
    tagline: "Management & Strategic Advisory",
    logo: "assets/logo-grp.png",
    fallbackLogo: "https://static.wixstatic.com/media/e5c5f1_b2ede517abe649688e2164e58b289dd3~mv2.png",
    description: "A premier multinational management and financial advisory conglomerate. Providing sovereign-level consultancy, cross-border M&A governance, and corporate structuring across the GCC, Africa, and Asia.",
    website: "https://www.opal-gp.com/home",
    badge: "Global Advisory"
  },
  {
    id: "mining",
    title: "Opal Mining",
    tagline: "Precious Metals & Natural Resources",
    logo: "assets/logo-mining.png",
    fallbackLogo: "https://static.wixstatic.com/media/e5c5f1_f91e6043a533419ca8e570a6b924c05d~mv2.png",
    description: "Leading sustainable gold exploration, mineral concession development, and international precious metal bullion trading with over three decades of field excellence across Africa.",
    website: "http://opal-mining.com/",
    badge: "Gold & Resources"
  },
  {
    id: "global",
    title: "Global Opal",
    tagline: "Infrastructure, Energy & Civil Works",
    logo: "assets/logo-global.png",
    fallbackLogo: "https://static.wixstatic.com/media/e5c5f1_1d82cb7eaf9142c5b40d925154bb3ccc~mv2.png",
    description: "Qatar-headquartered infrastructure and engineering powerhouse, executing critical civil infrastructure, power distribution networks, and industrial development projects across the Middle East.",
    website: "http://www.opalglobal-qatar.com/",
    badge: "Sovereign Infrastructure"
  },
  {
    id: "sp",
    title: "Opal SP",
    tagline: "Turnkey Mega-Projects & Strategic Consultancy · Saudi Arabia",
    logo: "assets/logo-sp.png",
    fallbackLogo: "https://opal-sp.com/favicon.png",
    description: "Operating in alignment with Saudi Vision 2030, Opal Strategic Partners develops, structures, and delivers large-scale turnkey megaprojects across LEO Satellite Networks, AI Technologies, Data Centers, Modular Construction Systems, Healthcare, Hospitality, Agriculture, and Sustainable Energy.",
    website: "https://opal-sp.com/",
    badge: "Saudi Vision 2030 & Megaprojects"
  }
];

const DIRECT_LINES = [
  { city: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", tz: "Asia/Dubai", tzCode: "GST", number: "+971 50 960 1323", raw: "+971509601323", primary: true },
  { city: "Doha", country: "Qatar", flag: "🇶🇦", tz: "Asia/Qatar", tzCode: "AST", number: "+974 3396 1119", raw: "+97433961119", primary: false },
  { city: "Beirut", country: "Lebanon", flag: "🇱🇧", tz: "Asia/Beirut", tzCode: "EET", number: "+961 79 139 129", raw: "+96179139129", primary: false },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", tz: "Europe/Istanbul", tzCode: "TRT", number: "+90 538 849 9119", raw: "+905388499119", primary: false },
  { city: "Khartoum", country: "Sudan", flag: "🇸🇩", tz: "Africa/Khartoum", tzCode: "CAT", number: "+249 99 195 9595", raw: "+249991959595", primary: false }
];

// ==========================================
// 2. THEME CONTROLLER
// ==========================================

function initTheme() {
  const saved = localStorage.getItem('chakik_executive_theme');
  const activeTheme = saved ? saved : 'light'; // Light theme is default
  setTheme(activeTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('chakik_executive_theme', theme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) {
    if (theme === 'dark') {
      // Moon to Sun icon
      icon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
    } else {
      // Sun to Moon icon
      icon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ==========================================
// 3. LIVE WORLD CLOCKS
// ==========================================

function updateWorldClocks() {
  DIRECT_LINES.forEach((line, index) => {
    const el = document.getElementById(`tz-clock-${index}`);
    if (!el) return;
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: line.tz,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      const timeStr = formatter.format(now);
      el.textContent = `${timeStr} (${line.tzCode})`;
    } catch (e) {
      el.textContent = line.tzCode;
    }
  });
}

// ==========================================
// 4. TOAST NOTIFICATIONS
// ==========================================

let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('globalToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================
// 5. CLIPBOARD COPY UTILITIES
// ==========================================

function copyToClipboard(text, label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label || 'number'}: ${text}`);
    }).catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${label || 'number'}: ${text}`);
  } catch (err) {
    showToast(`Direct Line: ${text}`);
  }
  document.body.removeChild(textArea);
}

// ==========================================
// 6. ENRICHED VCARD DOWNLOAD
// ==========================================

function downloadExecutiveVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Chakik;Ahmad;;Mr.;',
    'FN:Ahmad Chakik',
    'ORG:Opal Group;Opal World Technologies;Opal Mining Co Ltd;Opal Strategic Partners',
    'TITLE:Chairman',
    'TEL;TYPE=CELL,VOICE,PREF:+971509601323',
    'TEL;TYPE=WORK,VOICE:+97433961119',
    'TEL;TYPE=WORK,VOICE:+96179139129',
    'TEL;TYPE=WORK,VOICE:+905388499119',
    'TEL;TYPE=WORK,VOICE:+249991959595',
    'EMAIL;TYPE=INTERNET,WORK,PREF:chakik@opal-gp.com',
    'URL;TYPE=WORK:https://www.opal-gp.com',
    'URL;TYPE=TECH:https://www.opalworldtechs.com',
    'URL;TYPE=SAUDI:https://opal-sp.com',
    'ADR;TYPE=WORK:;;Office Suite;Dubai;Dubai;;United Arab Emirates',
    'NOTE:Chairman & Prominent International Business Leader across Mining, Technology, Advisory, and Sovereign Infrastructure.',
    'X-SOCIALPROFILE;type=whatsapp:https://wa.me/971509601323',
    'REV:' + new Date().toISOString(),
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'Ahmad_Chakik_Chairman.vcf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast('Executive Contact Saved (.vcf)');
}

// ==========================================
// 7. QR CODE GENERATION
// ==========================================

function openQrModal() {
  const modal = document.getElementById('qrModal');
  const qrContainer = document.getElementById('qrCodeContainer');
  if (!modal || !qrContainer) return;

  const currentUrl = window.location.href.split('#')[0];
  // Generate clean high-resolution QR via high-availability QR SVG API with fallback
  qrContainer.innerHTML = `
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentUrl)}&margin=1" 
         alt="Executive QR Code" 
         class="w-full h-full object-contain"
         onerror="this.onerror=null; this.src='https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encodeURIComponent(currentUrl)}';" />
  `;

  document.getElementById('qrPageUrl').textContent = currentUrl;
  openModal('qrModal');
}

function shareProfile() {
  const shareData = {
    title: 'Ahmad Chakik — Chairman & Executive Profile',
    text: 'Executive Digital Card and Portfolio of Ahmad Chakik, Chairman of Opal Group, Opal World Technologies & Opal Mining.',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    copyToClipboard(window.location.href, 'profile link');
  }
}

// ==========================================
// 8. MODAL CONTROLLERS
// ==========================================

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

// Modal Backdrop Click
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    closeAllModals();
  }
});

// ESC Key Listener
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// ==========================================
// 9. COMPANY MODAL
// ==========================================

function openCompanyModal(index) {
  const venture = COMPANY_VENTURES[index];
  if (!venture) return;

  document.getElementById('companyModalTitle').textContent = venture.title;
  document.getElementById('companyModalBadge').textContent = venture.badge;
  document.getElementById('companyModalTagline').textContent = venture.tagline;
  document.getElementById('companyModalDesc').textContent = venture.description;
  
  const logoImg = document.getElementById('companyModalLogo');
  logoImg.src = venture.logo;
  logoImg.onerror = () => { logoImg.src = venture.fallbackLogo; };

  const webBtn = document.getElementById('companyModalWebBtn');
  webBtn.href = venture.website;

  openModal('companyModal');
}

// ==========================================
// 10. CALL SELECTOR MODAL
// ==========================================

function openCallSelector(number) {
  const targetNumber = number || '+971 50 960 1323';
  const cleanNumber = targetNumber.replace(/[^\d+]/g, '');

  document.getElementById('modalCallCellularBtn').href = `tel:${cleanNumber}`;
  document.getElementById('modalCallWhatsappBtn').href = `https://wa.me/${cleanNumber.replace('+', '')}`;
  document.getElementById('modalCallNumberLabel').textContent = targetNumber;
  
  const copyBtn = document.getElementById('modalCallCopyBtn');
  copyBtn.onclick = () => copyToClipboard(targetNumber, 'number');

  openModal('callModal');
}

// ==========================================
// 11. LIGHTBOX PREVIEW
// ==========================================

function openLightbox(imgSrc, caption) {
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCaption');
  if (imgEl && capEl) {
    imgEl.src = imgSrc;
    capEl.textContent = caption;
    openModal('lightboxModal');
  }
}

// ==========================================
// 12. BIO EXPANSION TOGGLE
// ==========================================

function toggleBio() {
  const content = document.getElementById('expandableBioContent');
  const btn = document.getElementById('bioToggleBtn');
  const textSpan = document.getElementById('bioToggleText');
  const icon = document.getElementById('bioToggleIcon');

  if (!content) return;

  const isExpanded = content.classList.contains('expanded');
  if (isExpanded) {
    content.classList.remove('expanded');
    textSpan.textContent = 'Read Full Biography';
    icon.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('expanded');
    textSpan.textContent = 'Collapse Biography';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ==========================================
// 13. INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateWorldClocks();
  setInterval(updateWorldClocks, 60000); // Live clock update every minute
});
