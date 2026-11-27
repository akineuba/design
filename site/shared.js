/* Shared by every Product Verse page: product screenshots, header menu, theme button and the / shortcut. */
/* ---------- Product screenshots (generated from the wBizManager and wCRM component libraries) ----------
   Each: image (a -dark.webp twin is used in dark mode), alt text, label, and numbered markers as [x%, y%] of the image. */
const SHOTS = {
  hero:    { src: 'assets/screens/hero-wbiz-dashboard.webp', w: 1600, h: 1000, label: 'wBizManager · Dashboard', alt: 'wBizManager dashboard with revenue, unpaid invoices, bills and cash cards, a money in and out chart, and requests waiting for approval', m: [[72.9, 14], [38.1, 22.2], [90.3, 42.8]] },
  heroCrm: { src: 'assets/screens/hero-crm-dashboard.webp', w: 1600, h: 1000, label: 'CRM Business Development · Dashboard', alt: 'CRM Business Development dashboard with open deals, deals won, companies and contacts, deal status, top customers and recent activity', m: [[76.4, 12.4], [32.6, 25.6], [59.7, 38.8]] },
  how:     { src: 'assets/screens/how-wbiz-invoice.webp', w: 1000, h: 607, label: 'wBizManager · Sales · New invoice', alt: 'New invoice form in wBizManager with customer, invoice date and project fields', m: [[27.7, 19.6], [65.2, 19.6], [36.6, 46]] },
  req:     { src: 'assets/screens/guide-wbiz-requisition.webp', w: 800, h: 563, label: 'wBizManager · Procurement', alt: 'New purchase requisition panel with department, reason and item lines', m: [[49.6, 16.8], [91.7, 38.9], [16.7, 52.1]] },
  crmdash: { src: 'assets/screens/guide-crm-dashboard.webp', w: 800, h: 563, label: 'CRM Business Development · Dashboard', alt: 'Business Development dashboard with open deals, deals won, deal status and top customers', m: [[20.7, 23.3], [17.4, 65.1], [52.6, 35.2]] },
  portal:  { src: 'assets/screens/guide-wbiz-workspace.webp', w: 800, h: 562, label: 'wBizManager · My workspace', alt: 'My workspace in wBizManager with leave, claims, loan and appraisal cards', m: [[63.4, 14.6], [83.8, 25.4], [22.6, 43.7]] },
  company: { src: 'assets/screens/guide-crm-create-company.webp', w: 800, h: 563, label: 'CRM Business Development · Companies', alt: 'Create company drawer with company name, industry, status and phone number with country code', m: [[87.4, 36.9], [49.8, 62.2], [87.4, 87.4]] },
};
function shot(s, small = false) {
  const mk = s.m.map(([x, y], i) => `<span class="marker ${small ? '!size-5 !text-[10px] !shadow-[0_0_0_3px_rgb(231_0_26/0.18)]' : '!size-7 !text-[12px]'} -translate-x-1/2 -translate-y-1/2" style="left:${x}%;top:${y}%" aria-hidden="true">${i + 1}</span>`).join('');
  return `<figure class="overflow-hidden rounded-lg border border-line bg-surface shadow-lift ${small ? '!shadow-none' : ''}">
      <div class="flex items-center gap-1.5 border-b border-line px-3 py-2"><i class="size-2 rounded-full bg-line"></i><i class="size-2 rounded-full bg-line"></i><i class="size-2 rounded-full bg-line"></i><span class="ml-auto min-w-0 truncate text-[11px] font-medium text-ink-3">${s.label}</span></div>
      <div class="relative"><img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.alt}" class="block h-auto w-full dark:hidden" loading="lazy"><img src="${s.src.replace('.webp', '-dark.webp')}" width="${s.w}" height="${s.h}" alt="${s.alt}" class="hidden h-auto w-full dark:block" loading="lazy">${mk}</div>
    </figure>`;
}

/* ---------- Products menu ---------- */
const pm = document.getElementById('products-menu');
const pb = document.getElementById('products-btn');
const placeMenu = () => { const r = pb.getBoundingClientRect(); pm.style.left = Math.max(16, r.left - 8) + 'px'; };
pb.onclick = () => { placeMenu(); pm.classList.toggle('hidden'); };
document.addEventListener('click', e => { if (!pm.contains(e.target) && !pb.contains(e.target)) pm.classList.add('hidden'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') pm.classList.add('hidden'); });
document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => e.preventDefault()));
/* Theme toggle: flips <html data-theme>, remembers the choice, keeps the button labels right. */
const root = document.documentElement;
const syncThemeButtons = () => document.querySelectorAll('.theme-btn').forEach(b => {
  const dark = root.dataset.theme === 'dark';
  b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  b.setAttribute('aria-pressed', String(dark));
});
document.querySelectorAll('.theme-btn').forEach(b => b.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('pv-theme', root.dataset.theme); } catch (e) {}
  syncThemeButtons();
}));
new MutationObserver(syncThemeButtons).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
syncThemeButtons();
document.addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); (document.querySelector('main input[type=search], main form input') || {}).focus?.(); } });
