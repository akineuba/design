import type { CSSProperties, ReactNode } from 'react';

/** Point on a circle, angle in degrees clockwise from 12 o'clock. */
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const slice = (cx: number, cy: number, r: number, from: number, to: number) => {
  const [x0, y0] = polar(cx, cy, r, from);
  const [x1, y1] = polar(cx, cy, r, to);
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1} ${y1} Z`;
};

function ExpandIcon({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" className="absolute size-3.5 text-text-secondary" style={style} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 2h4v4M6 14H2v-4M14 2 9.5 6.5M2 14l4.5-4.5" />
    </svg>
  );
}

function ChartCard({ title, subtitle, style, children }: { title: string; subtitle: string; style: CSSProperties; children: ReactNode }) {
  return (
    <div className="absolute rounded-callout border border-border-default bg-surface-default shadow-sm" style={style}>
      <p className="absolute left-5.5 top-6 text-heading-3 text-text-primary">{title}</p>
      <p className="absolute left-5.5 top-11.5 text-caption text-text-secondary">{subtitle}</p>
      {children}
    </div>
  );
}

const Y_TICKS = ['₦120M', '₦100M', '₦80M', '₦60M', '₦40M', '₦20M', '₦0'];
/** Bars: target backdrop and achieved value, in ₦M (Figma screenshot values). */
const BARS = [
  { label: 'MSP', target: 10, achieved: 110 },
  { label: 'ISV', target: 10, achieved: 40 },
  { label: 'TMB test', target: 2.5, achieved: 2.5 },
];

/** Reports dashboard, rebuilt from the Activities & Reporting screenshot (Figma image 367, 775:4588). 1400 × 725. */
export function ActivitiesScreen() {
  // Bar plot geometry inside the right card (px): zero line, px per ₦1M, group centres.
  const zero = 559;
  const perM = 3.95;
  const centres = [163, 354, 545];
  return (
    <>
      <ChartCard title="Goal Realization" subtitle="Overall Target Progress" style={{ left: 24, top: 14, width: 666, height: 280 }}>
        <ExpandIcon style={{ left: 624, top: 28 }} />
        <svg className="absolute" style={{ left: 245, top: 82 }} width="176" height="176" viewBox="0 0 176 176">
          <circle cx="88" cy="88" r="75.5" fill="none" strokeWidth="25" className="stroke-site-chart-green" />
          <path d={slice(88, 88, 88, -24, 0)} className="fill-site-chart-target" />
          <circle cx="88" cy="88" r="63" className="fill-surface-default" />
        </svg>
        <p className="absolute w-site-donut text-center text-display text-text-primary" style={{ left: 245, top: 142 }}>110%</p>
        <p className="absolute w-site-donut text-center text-caption-xs tracking-wider text-text-secondary" style={{ left: 245, top: 180 }}>ACHIEVED</p>
      </ChartCard>

      <ChartCard title="Revenue Contribution" subtitle="Share by Business Stream" style={{ left: 24, top: 314, width: 666, height: 320 }}>
        <ExpandIcon style={{ left: 624, top: 28 }} />
        <svg className="absolute" style={{ left: 243, top: 83 }} width="180" height="180" viewBox="0 0 180 180">
          <path d={slice(90, 90, 90, 0, 252)} className="fill-site-chart-green" />
          <path d={slice(90, 90, 90, 252, 354)} className="fill-text-link-blue" />
          <path d={slice(90, 90, 90, 354, 360)} className="fill-site-amber" />
          <path d={`M90 90 L90 0 M90 90 L${polar(90, 90, 90, 252).join(' ')} M90 90 L${polar(90, 90, 90, 354).join(' ')}`} className="stroke-surface-default" strokeWidth="1.5" />
        </svg>
        <p className="absolute flex gap-4 text-caption" style={{ left: 252, top: 282 }}>
          <span className="flex items-center gap-1.5 text-site-chart-green"><span className="size-site-chart-legend rounded-full bg-site-chart-green" />MSP</span>
          <span className="flex items-center gap-1.5 text-text-link-blue"><span className="size-site-chart-legend rounded-full bg-text-link-blue" />ISV</span>
          <span className="flex items-center gap-1.5 text-site-amber"><span className="size-site-chart-legend rounded-full bg-site-amber" />TMB test</span>
        </p>
      </ChartCard>

      <ChartCard title="Target vs. Achievement" subtitle="Bullet chart: Green is actual, backdrop is target gap" style={{ left: 710, top: 14, width: 664, height: 620 }}>
        <p className="absolute flex items-center gap-4 text-caption uppercase text-text-secondary" style={{ right: 44, top: 27 }}>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-site-chart-target" />Target</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-site-chart-green" />Achieved</span>
        </p>
        <ExpandIcon style={{ left: 622, top: 28 }} />
        {Y_TICKS.map((t, i) => {
          const y = zero - (120 - i * 20) * perM;
          return (
            <div key={t} className="absolute flex items-center" style={{ left: 22, top: y - 7, width: 620 }}>
              <span className="w-10 text-right text-caption-xs text-text-secondary">{t}</span>
              <span className="ml-2 h-px flex-1 bg-border-subtle" />
            </div>
          );
        })}
        {BARS.map((b, i) => (
          <div key={b.label}>
            <span className="absolute rounded-xs bg-site-chart-target" style={{ left: centres[i] - 50, top: zero - Math.max(b.target * perM, 8), width: 100, height: Math.max(b.target * perM, 8) }} />
            <span className="absolute rounded-t-xs bg-site-chart-green" style={{ left: centres[i] - 30, top: zero - Math.max(b.achieved * perM, 10), width: 60, height: Math.max(b.achieved * perM, 10) }} />
            <span className="absolute w-16 text-center text-caption-sm leading-120 text-text-secondary" style={{ left: centres[i] - 32, top: zero + 11 }}>
              {b.label === 'TMB test' ? <>TMB<br />test</> : b.label}
            </span>
          </div>
        ))}
      </ChartCard>

      <ChartCard title="Detailed Analytics" subtitle="Performance breakdown by Business Stream — 12 months" style={{ left: 24, top: 654, width: 1350, height: 120 }}>
        <span />
      </ChartCard>
    </>
  );
}
