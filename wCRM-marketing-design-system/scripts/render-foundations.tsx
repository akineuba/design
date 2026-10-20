// Renders the Storybook Foundations page to a single static HTML file (dist-foundations/index.html)
// with the compiled Tailwind CSS inlined, for sharing outside Storybook.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { Foundations } from '../src/docs/Foundations';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'dist-foundations');
mkdirSync(outDir, { recursive: true });

const cssOut = resolve(outDir, 'foundations.css');
execFileSync('npx', ['tailwindcss', '-i', 'src/styles/index.css', '-o', cssOut, '--minify'], { cwd: root, stdio: 'inherit' });
const css = readFileSync(cssOut, 'utf8');
const logo = `data:image/png;base64,${readFileSync(resolve(root, 'src/assets/wragby-logo.png')).toString('base64')}`;
const body = renderToStaticMarkup(<Foundations logoSrc={logo} />);

// Written as an artifact-ready fragment: the host adds doctype/head/body. The design system is
// light-only by design, so the page commits to one theme and sets its own background.
const html = `<title>wCRM Marketing Foundations</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>${css}
:root { color-scheme: light; }
body { background: var(--color-surface-canvas); }
[data-page="foundations"] {
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}
@media (min-width: 768px) {
  [data-page="foundations"] {
    padding-left: max(48px, env(safe-area-inset-left, 0px));
    padding-right: max(48px, env(safe-area-inset-right, 0px));
  }
}
</style>
${body}
`;
writeFileSync(resolve(outDir, 'index.html'), html);
console.log(`Wrote dist-foundations/index.html (${(html.length / 1024).toFixed(0)} KB)`);
