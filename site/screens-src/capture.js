// usage: node capture.js <baseUrl> <outDir> <scale> name1 name2 ...
const { chromium } = require('playwright');
(async () => {
  const [, , base, out, scale, ...names] = process.argv;
  const b = await chromium.launch();
  for (const n of names) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: Number(scale) });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`${base}#${n}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
    await p.screenshot({ path: `${out}/${n}.png` });
    console.log(n, errs.length ? errs.slice(0, 3) : 'ok'); await p.close();
  }
  await b.close();
})();
