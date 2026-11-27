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

/* ---------- Ask AI panel ----------
   Opens from every "Ask AI" button. Answers come only from Product Verse guides, for one product at a time:
   the page's product by default, or the one picked in the dropdown (the home page starts on "All products").
   Questions that aren't about Wragby products are declined. SAMPLE ANSWERS ONLY: no AI is connected yet;
   replace `answer()` with a call to the real service. */
{
  const PRODUCTS = { all: 'All products', wbiz: 'wBizManager', crm: 'CRM Business Development' };
  const body = document.body, page = body.dataset.scope || 'home', guide = body.dataset.guide || '';
  let scope = page === 'home' ? 'all' : page, withGuide = !!guide, msgs = [], busy = false, opener = null;

  const SUGGEST = {
    guide: ['Who approves my requisition?', 'Can I change it after sending?', 'When should I use Urgent?'],
    wbiz: ['How do I create an invoice?', 'Who approves my requisition?', 'How do I request leave?'],
    crm: ['How do I move a deal to the next stage?', 'What is BANT?', 'How do I add a company?'],
    all: ['How do I create a purchase requisition?', 'How do I add a company?', 'How do I request leave?'],
  };
  const REQ = 'assets/screens/step-req-panel.webp', LIST = 'assets/screens/step-req-list.webp';
  // product: which product the answer belongs to; zoom: [image, [x%, y%], label]
  const KB = [
    { re: /approv/, product: 'wbiz', text: 'The approver set for your department in <b>Approval Settings</b>. You see their name in the New Purchase Requisition panel, just above the buttons, before you send it.', zoom: [REQ, [91.5, 81.5], 'wBizManager · New Purchase Requisition'], src: ['Create a purchase requisition', 'step 6', 'guide.html?step=6'], also: ['Set up an approval flow', '#'] },
    { re: /change|edit|after send/, product: 'wbiz', text: 'Not while it’s <b>Pending approval</b>. Ask the approver to send it back to you, then edit it and send it again.', src: ['Create a purchase requisition', 'Common questions', 'guide.html#faq'] },
    { re: /urgent|priority/, product: 'wbiz', text: 'Use <b>Urgent</b> only when the items can’t wait. Approvers see urgent requests at the top of their list.', zoom: [REQ, [80.9, 26], 'wBizManager · New Purchase Requisition'], src: ['Create a purchase requisition', 'step 3', 'guide.html?step=3'] },
    { re: /requisition/, product: 'wbiz', steps: ['In the menu, open <b>Inventory → Requisitions</b>.', 'Click <b>New Requisition</b>.', 'Choose the department, say why you need it, and add the items.', 'Click <b>Send for approval</b>, or <b>Save as draft</b>.'], zoom: [LIST, [82.8, 24.6], 'wBizManager · Purchase Requisitions'], src: ['Create a purchase requisition', '6 steps', 'guide.html'] },
    { re: /invoice/, product: 'wbiz', steps: ['Open <b>Sales → Invoices</b> and click <b>New invoice</b>.', 'Choose the customer and check the dates.', 'Add the items, then save or send it.'], src: ['Create an invoice', '7 steps', '#'] },
    { re: /leave/, product: 'wbiz', steps: ['Open <b>My Portal → My workspace</b>.', 'Click <b>Request leave</b> and pick the leave type and dates.', 'Send it. Your manager is notified.'], src: ['Request leave', '4 steps', '#'] },
    { re: /deal|stage/, product: 'crm', steps: ['Open <b>Deals</b> and click the deal.', 'Click the next stage in the stage bar at the top.', 'If BANT is required, tick the four checks first.'], src: ['Move a deal through stages', '5 steps', '#'] },
    { re: /bant/, product: 'crm', text: '<b>BANT</b> is four checks on each deal: Budget, Authority, Need and Timeline. Your CRM administrator decides whether a deal can be won while any check is open.', src: ['What’s new: Deal qualification (BANT)', '13 Nov 2026', 'whatsnew.html'] },
    { re: /compan/, product: 'crm', steps: ['Open <b>Companies</b> and click <b>Create company</b>.', 'Enter the name, industry and status.', 'Pick the country code, then the phone number, and save.'], zoom: [SHOTS.company.src, [87.4, 36.9], 'CRM Business Development · Companies', 1.6], src: ['Create a company', '7 steps', '#'] },
  ];
  const OFF_TOPIC = /weather|football|match|recipe|movie|song|joke|poem|bitcoin|stock price|president|election|news|translate|homework|holiday/;

  function answer(q) {
    const s = q.toLowerCase();
    if (OFF_TOPIC.test(s)) return { kind: 'off' };
    const hit = KB.find(k => k.re.test(s) && (scope === 'all' || k.product === scope)) || KB.find(k => k.re.test(s));
    if (!hit) return { kind: 'unsure' };
    if (scope !== 'all' && hit.product !== scope) return { kind: 'other', product: hit.product };
    return { kind: 'ok', ...hit };
  }

  const dual = (src, cls, alt = '') => `<img src="${src}" alt="${alt}" class="${cls} dark:hidden"><img src="${src.replace('.webp', '-dark.webp')}" alt="${alt}" class="${cls} hidden dark:block">`;
  const zoom = ([src, [x, y], label, k = 2]) => {
    const off = v => Math.min(0, Math.max(100 - 100 * k, 50 - k * v)), ox = off(x), oy = off(y);
    return `<figure class="mt-3 overflow-hidden rounded-lg border border-line bg-surface">
      <div class="flex items-center gap-1.5 border-b border-line px-2.5 py-1.5"><i class="size-1.5 rounded-full bg-line"></i><i class="size-1.5 rounded-full bg-line"></i><i class="size-1.5 rounded-full bg-line"></i><span class="ml-auto truncate text-[10.5px] font-medium text-ink-3">${label}</span></div>
      <div class="relative aspect-[16/10] overflow-hidden"><div class="absolute" style="width:${k * 100}%;height:${k * 100}%;left:${ox}%;top:${oy}%">${dual(src, 'size-full')}</div>
      <span class="marker -translate-x-1/2 -translate-y-1/2 !size-6 !text-[11px]" style="left:${k * x + ox}%;top:${k * y + oy}%">1</span></div></figure>`;
  };
  const enc = encodeURIComponent;

  function bubble(m, i) {
    if (m.who === 'me') return `<div class="flex justify-end"><p class="max-w-[85%] rounded-lg rounded-br-sm bg-ink px-3.5 py-2.5 text-[14.5px] leading-snug text-on-ink">${m.text}</p></div>`;
    if (m.who === 'wait') return `<div class="flex items-center gap-2 text-[13.5px] text-ink-2"><span class="ai-dot grid size-7 place-items-center rounded-full bg-blush text-red"><svg class="size-3.5 animate-pulse fill-none stroke-current stroke-2"><use href="#i-spark"/></svg></span>Looking through the guides…</div>`;
    const a = m.a, q = msgs[i - 1]?.text || '';
    let inner;
    if (a.kind === 'off') inner = `<p>I can only help with Wragby products: ${scope === 'all' ? 'wBizManager and CRM Business Development' : PRODUCTS[scope]}. Try asking how to do something in the app.</p>
      <div class="mt-3 flex flex-wrap gap-1.5">${SUGGEST[scope === 'all' ? 'all' : scope].slice(0, 2).map(t => `<button type="button" data-ask-q="${t}" class="rounded-md border border-line bg-surface px-2.5 py-1.5 text-left text-[13px] font-medium hover:border-ink-3/40">${t}</button>`).join('')}</div>`;
    else if (a.kind === 'unsure') inner = `<p>I couldn’t find this in the ${scope === 'all' ? '' : PRODUCTS[scope] + ' '}guides, so I won’t guess.</p>
      <div class="mt-3 flex flex-wrap gap-2"><a href="#" class="rounded-md bg-ink px-3 py-1.5 text-[13px] font-semibold text-on-ink">Contact support</a><button type="button" data-ask-q="" class="rounded-md border border-line px-3 py-1.5 text-[13px] font-semibold">Ask another way</button></div>`;
    else if (a.kind === 'other') inner = `<p>That’s about <b>${PRODUCTS[a.product]}</b>, and I’m answering for ${PRODUCTS[scope]} right now.</p>
      <button type="button" data-ask-switch="${a.product}" data-ask-q="${q}" class="mt-3 rounded-md bg-ink px-3 py-1.5 text-[13px] font-semibold text-on-ink">Ask about ${PRODUCTS[a.product]} instead</button>`;
    else inner = `${a.text ? `<p>${a.text}</p>` : ''}${a.steps ? `<ol class="space-y-1.5">${a.steps.map((s, j) => `<li class="flex gap-2.5"><span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-red text-[11px] font-bold text-red">${j + 1}</span><span>${s}</span></li>`).join('')}</ol>` : ''}
      ${a.zoom ? zoom(a.zoom) : ''}
      <a href="${a.src[2]}" class="mt-3 flex items-center gap-2 rounded-md bg-mist px-3 py-2 text-[13px] hover:text-red-700"><svg class="size-3.5 shrink-0 fill-none stroke-current stroke-2"><use href="#i-book"/></svg><span class="min-w-0 flex-1 truncate">From <b class="font-semibold">${a.src[0]}</b> · ${a.src[1]}</span><svg class="size-3.5 shrink-0 fill-none stroke-current stroke-2"><use href="#i-arrow"/></svg></a>
      ${a.also ? `<p class="mt-2 text-[13px] text-ink-2">Also see <a href="${a.also[1]}" class="font-semibold text-red-700">${a.also[0]}</a></p>` : ''}
      <div class="mt-3 flex items-center gap-1 text-ink-3">
        <button type="button" data-rate="up" aria-label="Helpful" class="grid size-8 place-items-center rounded-md hover:bg-mist hover:text-ink"><svg class="size-4 fill-none stroke-current stroke-2"><use href="#i-thumb"/></svg></button>
        <button type="button" data-rate="down" aria-label="Not helpful" class="grid size-8 place-items-center rounded-md hover:bg-mist hover:text-ink"><svg class="size-4 rotate-180 fill-none stroke-current stroke-2"><use href="#i-thumb"/></svg></button>
        <button type="button" data-copy="${i}" aria-label="Copy answer" class="grid size-8 place-items-center rounded-md hover:bg-mist hover:text-ink"><svg class="size-4 fill-none stroke-current stroke-2"><use href="#i-copy"/></svg></button>
        <span class="ml-auto text-[12px]">Continue in</span>
        <a href="https://claude.ai/new?q=${enc(q)}" class="rounded-md px-2 py-1 text-[12.5px] font-semibold text-ink-2 hover:bg-mist hover:text-ink">Claude</a>
        <a href="https://chatgpt.com/?q=${enc(q)}" class="rounded-md px-2 py-1 text-[12.5px] font-semibold text-ink-2 hover:bg-mist hover:text-ink">ChatGPT</a>
      </div>`;
    return `<div class="flex gap-2.5"><span class="grid size-7 shrink-0 place-items-center rounded-full bg-blush text-red"><svg class="size-3.5 fill-none stroke-current stroke-2"><use href="#i-spark"/></svg></span>
      <div class="ai-answer min-w-0 flex-1 text-[14.5px] leading-relaxed [&_b]:font-semibold" data-i="${i}">${inner}</div></div>`;
  }

  const panel = document.createElement('aside');
  panel.id = 'ai-panel'; panel.setAttribute('aria-labelledby', 'ai-title'); panel.setAttribute('role', 'dialog'); panel.hidden = true;
  panel.className = 'fixed inset-0 z-[60] flex flex-col bg-surface shadow-lift xl:inset-y-0 xl:left-auto xl:right-0 xl:w-[420px] xl:border-l xl:border-line';
  panel.innerHTML = `
    <div class="flex items-center gap-3 border-b border-line px-4 py-3">
      <span class="grid size-8 place-items-center rounded-md bg-ink text-on-ink"><svg class="size-4 fill-none stroke-current stroke-2"><use href="#i-spark"/></svg></span>
      <h2 id="ai-title" class="text-[16px] font-semibold">Ask AI</h2>
      <label class="relative ml-auto"><span class="sr-only">Answer about</span>
        <select id="ai-scope" class="h-9 max-w-[190px] appearance-none truncate rounded-md border border-line bg-paper pl-2.5 pr-8 text-[13px] font-semibold outline-none focus:border-ink-3">
          ${Object.entries(PRODUCTS).filter(([k]) => k !== 'all' || page === 'home').map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
        <svg class="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 fill-none stroke-ink-2 stroke-2"><use href="#i-chev"/></svg></label>
      <button type="button" id="ai-close" aria-label="Close Ask AI" class="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-mist hover:text-ink"><svg class="size-4 fill-none stroke-current stroke-2"><use href="#i-close"/></svg></button>
    </div>
    <div id="ai-log" class="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5" aria-live="polite"></div>
    <form id="ai-form" class="border-t border-line p-3">
      <div id="ai-ctx"></div>
      <div class="flex items-end gap-2 rounded-lg border border-line bg-paper p-1.5 focus-within:border-ink-3">
        <textarea id="ai-q" rows="1" placeholder="Ask how to do something…" aria-label="Your question" class="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-[16px] leading-snug outline-none placeholder:text-ink-3"></textarea>
        <button type="submit" aria-label="Send" class="grid size-9 shrink-0 place-items-center rounded-md bg-red text-white disabled:opacity-40"><svg class="size-4 -rotate-90 fill-none stroke-current stroke-2"><use href="#i-arrow"/></svg></button>
      </div>
      <p class="mt-2 px-1 text-[11.5px] text-ink-3">Answers come from Product Verse guides. Check important details in the guide.</p>
    </form>`;
  document.body.appendChild(panel);
  const $ = id => document.getElementById(id), log = $('ai-log'), qEl = $('ai-q');
  $('ai-scope').value = scope;

  function render() {
    const ctx = withGuide && scope === page;
    $('ai-ctx').innerHTML = ctx ? `<div class="mb-2 flex items-center gap-2"><span class="inline-flex max-w-full items-center gap-1.5 rounded-md bg-mist py-1 pl-2.5 pr-1 text-[12.5px] font-medium"><svg class="size-3.5 shrink-0 fill-none stroke-current stroke-2"><use href="#i-book"/></svg><span class="truncate">About: ${guide}</span><button type="button" id="ai-ctx-x" aria-label="Remove this guide from the question" class="grid size-5 place-items-center rounded hover:bg-line"><svg class="size-3 fill-none stroke-current stroke-2"><use href="#i-close"/></svg></button></span></div>` : '';
    if (!msgs.length) {
      const key = ctx ? 'guide' : scope;
      log.innerHTML = `<div class="pt-4 text-center"><span class="mx-auto grid size-12 place-items-center rounded-full bg-blush text-red"><svg class="size-6 fill-none stroke-current stroke-[1.8]"><use href="#i-spark"/></svg></span>
        <p class="mt-3 text-[17px] font-semibold">${ctx ? 'Questions about this guide?' : `Ask about ${scope === 'all' ? 'any Wragby product' : PRODUCTS[scope]}`}</p>
        <p class="mt-1 text-[14px] text-ink-2">Answers come with the steps and the screen.</p></div>
        <div class="flex flex-col gap-2">${SUGGEST[key].map(t => `<button type="button" data-ask-q="${t}" class="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-2.5 text-left text-[14px] font-medium hover:border-ink-3/40">${t}<svg class="size-3.5 shrink-0 fill-none stroke-ink-3 stroke-2"><use href="#i-arrow"/></svg></button>`).join('')}</div>`;
    } else log.innerHTML = msgs.map(bubble).join('');
    // Keep the newest question at the top so its answer reads from the start
    const mine = log.querySelectorAll('.justify-end'), last = mine[mine.length - 1];
    log.scrollTop = last ? last.offsetTop - log.offsetTop - 12 : 0;
  }
  function ask(text, instant = false) {
    text = text.trim(); if (!text || busy) return;
    msgs.push({ who: 'me', text }); msgs.push({ who: 'wait' }); busy = true; qEl.value = ''; render();
    const done = () => { msgs.pop(); msgs.push({ who: 'ai', a: answer(text) }); busy = false; render(); };
    instant ? done() : setTimeout(done, 700);
  }
  function open(o, from) {
    panel.hidden = !o; document.documentElement.classList.toggle('ai-open', o);
    if (o) { opener = from || document.activeElement; render(); qEl.focus(); } else opener?.focus?.();
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('a,button'); if (!t) return;
    if (!panel.contains(t) && /^Ask AI/.test(t.textContent.trim())) { e.preventDefault(); open(true, t); return; }
    if (t.id === 'ai-close') return open(false);
    if (t.id === 'ai-ctx-x') { withGuide = false; return render(); }
    if (t.dataset.askSwitch) { scope = t.dataset.askSwitch; $('ai-scope').value = scope; msgs = []; return ask(t.dataset.askQ); }
    if ('askQ' in t.dataset) { if (t.dataset.askQ) ask(t.dataset.askQ); else qEl.focus(); return; }
    if (t.dataset.rate) { t.parentElement.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('text-red', b === t)); return; }
    if (t.dataset.copy) { const el = log.querySelector(`[data-i="${t.dataset.copy}"]`); navigator.clipboard?.writeText(el.innerText).catch(() => {}); t.classList.add('text-ink'); }
  });
  $('ai-scope').addEventListener('change', e => { scope = e.target.value; msgs = []; render(); });
  $('ai-form').addEventListener('submit', e => { e.preventDefault(); ask(qEl.value); });
  qEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(qEl.value); } });
  qEl.addEventListener('input', () => { qEl.style.height = 'auto'; qEl.style.height = qEl.scrollHeight + 'px'; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false); });

  // Screenshot hooks: ?ask=open | ?ask=<question>
  const hook = new URLSearchParams(location.search).get('ask');
  if (hook) { if (hook.startsWith('scope:')) { scope = hook.slice(6); $('ai-scope').value = scope; open(true); } else { open(true); if (hook !== 'open') ask(hook, true); } }
}
