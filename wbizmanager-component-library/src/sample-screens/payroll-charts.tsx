// Story-only charts for the Payroll Dashboard pattern. The library has no chart component yet, so these
// are small SVG charts built from tokens: series colours `chart-1..3` (validated for colour-blind
// separation and contrast in light and dark), recessive `line-subtle` grid, `fg-muted` axis text.
// Each has a legend, a hover/focus tooltip and a screen-reader table of the same numbers.
import { useState, type KeyboardEvent } from 'react';
import { cx } from '../utils/cx';

export interface ChartSeries {
  key: string;
  name: string;
  /** Token class set for the series: stroke for lines, fill for bars, bg for the legend swatch. */
  tone: 'chart-1' | 'chart-2' | 'chart-3';
}

export interface ChartPoint {
  label: string;
  values: Record<string, number>;
}

interface ChartProps {
  title: string;
  series: ChartSeries[];
  data: ChartPoint[];
  format: (n: number) => string;
  className?: string;
}

const stroke = { 'chart-1': 'stroke-chart-1', 'chart-2': 'stroke-chart-2', 'chart-3': 'stroke-chart-3' };
const fill = { 'chart-1': 'fill-chart-1', 'chart-2': 'fill-chart-2', 'chart-3': 'fill-chart-3' };
const swatch = { 'chart-1': 'bg-chart-1', 'chart-2': 'bg-chart-2', 'chart-3': 'bg-chart-3' };

// Plot geometry in SVG units; the SVG scales to its container width.
const W = 640;
const H = 260;
const PAD = { left: 52, right: 12, top: 12, bottom: 26 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

/** Four "nice" gridline values from 0 to just above the maximum. */
function ticks(max: number) {
  const raw = max / 4 || 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  return [0, 1, 2, 3, 4].map((i) => i * step);
}

export function ChartLegend({ series }: { series: ChartSeries[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-4 font-sans text-xs text-fg-muted" aria-hidden>
      {series.map((s) => (
        <li key={s.key} className="flex items-center gap-1.5">
          <span className={cx('h-0.5 w-3 rounded-full', swatch[s.tone])} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}

function Tooltip({ point, series, format, x }: { point: ChartPoint; series: ChartSeries[]; format: (n: number) => string; x: number }) {
  // x is the hovered column's centre as a fraction of the width; flip the box near the right edge.
  const right = x > 0.7;
  return (
    <div
      role="status"
      className={cx(
        'pointer-events-none absolute top-0 z-10 flex min-w-action-menu flex-col gap-1 rounded-lg border border-line-subtle bg-surface px-3 py-2 font-sans text-xs shadow-md',
        right ? '-translate-x-full' : '',
      )}
      style={{ left: `calc(${x * 100}% ${right ? '- var(--wbiz-space-3)' : '+ var(--wbiz-space-3)'})` }}
    >
      <span className="font-semibold text-fg-strong">{point.label}</span>
      {series.map((s) => (
        <span key={s.key} className="flex items-center justify-between gap-4 text-fg-muted">
          <span className="flex items-center gap-1.5 whitespace-nowrap"><span className={cx('size-2 rounded-full', swatch[s.tone])} />{s.name}</span>
          <span className="font-medium text-fg-strong">{format(point.values[s.key] ?? 0)}</span>
        </span>
      ))}
    </div>
  );
}

function ScreenReaderTable({ title, series, data, format }: ChartProps) {
  return (
    <table className="sr-only">
      <caption>{title}</caption>
      <thead><tr><th scope="col">Month</th>{series.map((s) => <th key={s.key} scope="col">{s.name}</th>)}</tr></thead>
      <tbody>{data.map((d) => <tr key={d.label}><th scope="row">{d.label}</th>{series.map((s) => <td key={s.key}>{format(d.values[s.key] ?? 0)}</td>)}</tr>)}</tbody>
    </table>
  );
}

/** Shared hover/keyboard state: the hovered column index, or null. */
function useActive(count: number) {
  const [active, setActive] = useState<number | null>(null);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    setActive((a) => (a === null ? 0 : Math.max(0, Math.min(count - 1, a + (e.key === 'ArrowRight' ? 1 : -1)))));
  };
  return { active, setActive, onKeyDown };
}

function Axes({ max, labels, format, xAt }: { max: number; labels: string[]; format: (n: number) => string; xAt: (i: number) => number }) {
  const t = ticks(max);
  const top = t[t.length - 1];
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH;
  return (
    <g aria-hidden>
      {t.map((v) => (
        <g key={v}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} className="stroke-line-subtle" strokeWidth={1} />
          <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" className="fill-fg-muted font-sans text-2xs">{format(v)}</text>
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={l} x={xAt(i)} y={H - 8} textAnchor="middle" className="fill-fg-muted font-sans text-2xs">{l}</text>
      ))}
    </g>
  );
}

/** Line chart: one 2px line per series, crosshair and markers on hover. */
export function LineChart({ title, series, data, format, className }: ChartProps) {
  const { active, setActive, onKeyDown } = useActive(data.length);
  const max = Math.max(1, ...data.flatMap((d) => series.map((s) => d.values[s.key] ?? 0)));
  const top = ticks(max)[4];
  const xAt = (i: number) => PAD.left + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const yAt = (v: number) => PAD.top + plotH - (v / top) * plotH;
  const path = (key: string) => data.map((d, i) => `${i ? 'L' : 'M'}${xAt(i)},${yAt(d.values[key] ?? 0)}`).join(' ');
  const band = plotW / Math.max(1, data.length - 1);
  return (
    <div className={cx('relative', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full outline-hidden focus-visible:shadow-focus"
        role="img"
        aria-label={`${title}. Use the left and right arrow keys to read each month.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={() => setActive(null)}
        onMouseLeave={() => setActive(null)}
      >
        <Axes max={max} labels={data.map((d) => d.label)} format={format} xAt={xAt} />
        {active !== null && <line x1={xAt(active)} x2={xAt(active)} y1={PAD.top} y2={PAD.top + plotH} className="stroke-line" strokeWidth={1} />}
        {series.map((s) => (
          <path key={s.key} d={path(s.key)} fill="none" className={stroke[s.tone]} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {active !== null && series.map((s) => (
          <circle key={s.key} cx={xAt(active)} cy={yAt(data[active].values[s.key] ?? 0)} r={4} className={cx(fill[s.tone], 'stroke-surface')} strokeWidth={2} />
        ))}
        {data.map((d, i) => (
          <rect key={d.label} x={xAt(i) - band / 2} y={PAD.top} width={band} height={plotH} fill="transparent" onMouseEnter={() => setActive(i)} />
        ))}
      </svg>
      {active !== null && <Tooltip point={data[active]} series={series} format={format} x={xAt(active) / W} />}
      <ScreenReaderTable title={title} series={series} data={data} format={format} />
    </div>
  );
}

/** Grouped bar chart: thin bars with a 2px gap, 4px rounded tops on the baseline, hover per month. */
export function BarChart({ title, series, data, format, className }: ChartProps) {
  const { active, setActive, onKeyDown } = useActive(data.length);
  const max = Math.max(1, ...data.flatMap((d) => series.map((s) => d.values[s.key] ?? 0)));
  const top = ticks(max)[4];
  const slot = plotW / data.length;
  const barW = Math.min(14, (slot * 0.6 - (series.length - 1) * 2) / series.length);
  const groupW = barW * series.length + (series.length - 1) * 2;
  const xAt = (i: number) => PAD.left + slot * i + slot / 2;
  const base = PAD.top + plotH;
  return (
    <div className={cx('relative', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full outline-hidden focus-visible:shadow-focus"
        role="img"
        aria-label={`${title}. Use the left and right arrow keys to read each month.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={() => setActive(null)}
        onMouseLeave={() => setActive(null)}
      >
        <Axes max={max} labels={data.map((d) => d.label)} format={format} xAt={xAt} />
        {data.map((d, i) => (
          <g key={d.label} className={cx('transition-opacity', active !== null && active !== i && 'opacity-40')}>
            {series.map((s, j) => {
              const v = d.values[s.key] ?? 0;
              const h = Math.max(0, (v / top) * plotH);
              const x = xAt(i) - groupW / 2 + j * (barW + 2);
              const r = Math.min(4, h, barW / 2);
              // Rounded top corners only; the bar sits square on the baseline.
              const p = `M${x},${base} V${base - h + r} Q${x},${base - h} ${x + r},${base - h} H${x + barW - r} Q${x + barW},${base - h} ${x + barW},${base - h + r} V${base} Z`;
              return h > 0 ? <path key={s.key} d={p} className={fill[s.tone]} /> : null;
            })}
          </g>
        ))}
        {data.map((d, i) => (
          <rect key={d.label} x={PAD.left + slot * i} y={PAD.top} width={slot} height={plotH} fill="transparent" onMouseEnter={() => setActive(i)} />
        ))}
      </svg>
      {active !== null && <Tooltip point={data[active]} series={series} format={format} x={xAt(active) / W} />}
      <ScreenReaderTable title={title} series={series} data={data} format={format} />
    </div>
  );
}
