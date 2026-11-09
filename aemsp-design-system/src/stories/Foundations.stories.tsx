import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconNames, iconSource } from '../components/Icon';

const meta: Meta = { title: 'Foundations', parameters: { surface: 'white' } };
export default meta;
type S = StoryObj;

const groups: [string, [string, string, string?][]][] = [
  ['Brand', [['--navy-900', 'Navy · sidebar, primary button'], ['--navy-950', 'Overlay header'], ['--blue-500', 'Accent · active nav, tabs'], ['--blue-600', 'Overlay confirm action'], ['--blue-400', 'Link / chart primary'], ['--indigo-700', 'Indigo']]],
  ['Status (as in Figma)', [['--green-500', 'Success'], ['--red-500', 'Error / negative'], ['--yellow-400', 'Warning pill'], ['--amber-500', 'Warning text'], ['--gray-250', 'Neutral pill'], ['--red-600', 'Destructive button'], ['--purple-600', 'Purple']]],
  ['Text', [['--text-strong', 'Page H1'], ['--text-heading', 'Top-bar title, stat values'], ['--text-primary', 'Body, table cells'], ['--text-ink', 'Inputs'], ['--text-secondary', 'Secondary'], ['--text-muted', 'Muted (AA)'], ['--text-label', 'Stat labels (AA)'], ['--text-table-head', 'Table heads']]],
  ['Surfaces & borders', [['--bg-page', 'Page background'], ['--bg-surface', 'Cards'], ['--bg-subtle', 'Subtle fill'], ['--bg-hover', 'Row hover'], ['--border-default', 'Inputs, dividers'], ['--border-strong', 'Outline buttons'], ['--border-soft', 'Cards, top bar']]],
  ['Charts', [['--chart-1', 'Series 1'], ['--chart-2', 'Series 2'], ['--chart-3', 'Series 3'], ['--chart-4', 'Series 4'], ['--chart-5', 'Series 5'], ['--chart-6', 'Series 6']]],
];

function Swatch({ v, label }: { v: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = React.useState('');
  React.useEffect(() => { if (ref.current) setHex(getComputedStyle(ref.current).getPropertyValue(v).trim()); });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div ref={ref} style={{ height: 64, borderRadius: 8, background: `var(${v})`, border: '1px solid var(--border-default)' }} />
      <div><div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-ink)' }}>{label}</div><code style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v}</code><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{hex}</div></div>
    </div>
  );
}

export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <p className="ae-muted" style={{ margin: 0, fontSize: 14 }}>Switch the Theme toolbar to see dark-mode values. Components only reference semantic tokens.</p>
      {groups.map(([g, list]) => (
        <section key={g}>
          <h3 className="ae-h3" style={{ marginBottom: 14 }}>{g}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>{list.map(([v, l]) => <Swatch key={v} v={v} label={l} />)}</div>
        </section>
      ))}
    </div>
  ),
};

const type: [string, React.CSSProperties, string][] = [
  ['AEMSP', { fontFamily: 'var(--font-display)', fontSize: 33, fontWeight: 400 }, 'Logo · LINE Seed JP Regular 33'],
  ['Good Morning, User', { fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text-strong)' }, 'Page H1 · LINE Seed JP Bold 30'],
  ['Page Title', { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)' }, 'Top-bar title · LINE Seed JP Bold 20'],
  ['Create Role', { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400 }, 'Overlay title · LINE Seed JP Regular 24'],
  ['3,232', { fontSize: 30, fontWeight: 700, color: 'var(--text-heading)' }, 'Stat value · Inter Bold 30'],
  ['Card title', { fontSize: 20, fontWeight: 600 }, 'Card title · Inter Semi Bold 20'],
  ['Subtext / information', { fontSize: 15, fontWeight: 500, color: 'var(--text-strong)' }, 'Page subtext · Inter Medium 15'],
  ['Partner Centre', { fontSize: 15 }, 'Nav & breadcrumb · Inter Regular 15'],
  ['Con Tent · Button', { fontSize: 13, fontWeight: 500 }, 'UI text · Inter Medium 13 (buttons Semi Bold)'],
  ['Mon  Tue  Wed', { fontSize: 12, color: 'var(--chart-axis)' }, 'Chart axis · Inter Regular 12'],
  ['TITLE · AMOUNT USED', { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-table-head)' }, 'Table head / stat label · Inter Semi Bold 11 caps'],
];
export const Typography: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {type.map(([t, st, d]) => (
        <div key={d} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ color: 'var(--text-primary)', ...st, ...(t === 'AEMSP' ? { background: 'var(--navy-900)', color: '#fff', padding: '8px 14px', borderRadius: 6, width: 'fit-content' } : {}) }}>{t}</div>
          <div className="ae-muted" style={{ fontSize: 12 }}>{d}</div>
        </div>
      ))}
    </div>
  ),
};

export const SpacingRadiusShadow: S = {
  name: 'Spacing, radius & shadow',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <section><h3 className="ae-h3" style={{ marginBottom: 14 }}>Spacing</h3>
        {[4, 5, 8, 10, 12, 16, 18, 20, 30, 80].map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <code style={{ width: 90, fontSize: 12 }}>--space-{i + 1}</code><span style={{ width: n * 3, height: 14, background: 'var(--blue-500)', borderRadius: 3, opacity: .7 }} /><span className="ae-muted">{n}px</span>
          </div>))}
        <p className="ae-muted">Common: 10px between stat cards, 20px between page sections, 18px card padding, 80px page gutter.</p>
      </section>
      <section><h3 className="ae-h3" style={{ marginBottom: 14 }}>Radius</h3>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[['sm', 4, 'Checkbox'], ['md', 5, 'Cards, buttons'], ['lg', 8, 'Dropdowns'], ['xl', 10, 'Inputs, nav, menus'], ['pill', 30, 'Status pills']].map(([k, v, u]) => (
            <div key={k as string} style={{ textAlign: 'center' }}><div style={{ width: 96, height: 64, borderRadius: v as number, background: 'var(--bg-surface)', border: '2px solid var(--navy-900)' }} /><code style={{ fontSize: 12 }}>--radius-{k}</code><div className="ae-muted" style={{ fontSize: 12 }}>{v}px · {u}</div></div>))}
        </div>
      </section>
      <section><h3 className="ae-h3" style={{ marginBottom: 14 }}>Shadow</h3>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', background: 'var(--bg-page)', padding: 28, borderRadius: 8 }}>
          {[['card', 'Cards & stat cards'], ['bar', 'Toolbars & tables'], ['pop', 'Menus & popovers'], ['modal', 'Modals & panels']].map(([k, u]) => (
            <div key={k} style={{ textAlign: 'center' }}><div style={{ width: 140, height: 80, borderRadius: 5, background: 'var(--bg-surface)', boxShadow: `var(--shadow-${k})` }} /><code style={{ fontSize: 12 }}>--shadow-{k}</code><div className="ae-muted" style={{ fontSize: 12 }}>{u}</div></div>))}
        </div>
      </section>
    </div>
  ),
};

export const Icons: S = {
  render: () => (
    <div>
      <p className="ae-muted" style={{ marginTop: 0, fontSize: 14 }}>Navigation and top-bar icons are the exact Iconify icons from the Figma file. Everything else uses Lucide. Use <code>{'<Icon name="…" />'}</code>; 18px in nav and buttons, 20px in the top bar, 25px in stat tiles.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
        {iconNames.map((n) => (
          <div key={n} style={{ border: '1px solid var(--border-default)', borderRadius: 8, padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--text-ink)' }}>
            <Icon name={n} size={22} /><span style={{ fontSize: 12, fontWeight: 600 }}>{n}</span><span className="ae-muted" style={{ fontSize: 10 }}>{iconSource(n)}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
