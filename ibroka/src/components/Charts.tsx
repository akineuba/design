import { useId, useState, type ReactNode } from 'react';
import {
  Area,
  AreaChart as RAreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RRadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts';
import { SegmentedControl } from './SegmentedControl';
import { BarChartIcon, ListViewIcon } from '../icons';

/** Categorical order. Assign in this order, never cycled; a 6th series folds into "Other". */
export const SERIES_COLORS = ['var(--ib-color-chart-1)', 'var(--ib-color-chart-2)', 'var(--ib-color-chart-3)', 'var(--ib-color-chart-4)', 'var(--ib-color-chart-5)'];

export interface Series {
  key: string;
  label: string;
  /** Index into SERIES_COLORS. Fix it per entity so filters never repaint the survivors. */
  color?: number;
}

type Row = Record<string, string | number>;

interface ChartBase {
  data: Row[];
  /** Key of the category / x value in each row. */
  xKey: string;
  series: Series[];
  /** Formats values in tooltips, axis and table (formatMoneyShort for money). */
  format?: (v: number) => string;
  height?: number;
  /** Required: describes the chart for screen readers. */
  'aria-label': string;
}

const axisTick = { fill: 'var(--ib-color-chart-axis)', fontSize: 11, fontFamily: 'inherit' };
const colorOf = (s: Series, i: number) => SERIES_COLORS[(s.color ?? i) % SERIES_COLORS.length];
const fmt = (f?: (v: number) => string) => (v: number) => (f ? f(v) : v.toLocaleString('en-NG'));

function ChartTooltip({ active, payload, label, format, series }: TooltipProps<number, string> & { format: (v: number) => string; series: Series[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[140px] rounded-md border border-line-subtle bg-surface px-3 py-2 text-12 shadow-pop">
      <p className="mb-1 font-semibold text-fg-strong">{label}</p>
      {payload.map((p) => {
        const s = series.find((x) => x.key === p.dataKey);
        return (
          <p key={String(p.dataKey)} className="flex items-center justify-between gap-4 text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: p.color }} aria-hidden />
              {s?.label ?? p.name}
            </span>
            <span className="font-semibold tabular-nums text-fg-strong">{format(Number(p.value))}</span>
          </p>
        );
      })}
    </div>
  );
}

/** Legend for 2+ series. Text stays in text colours; the swatch carries identity. */
export function ChartLegend({ series }: { series: Series[] }) {
  if (series.length < 2) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-12 text-fg-muted">
      {series.map((s, i) => (
        <li key={s.key} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: colorOf(s, i) }} aria-hidden />
          {s.label}
        </li>
      ))}
    </ul>
  );
}

/** Table view of the same data, so no value is gated behind colour or hover. */
export function ChartTable({ data, xKey, series, format, caption }: Omit<ChartBase, 'aria-label' | 'height'> & { caption: string }) {
  const f = fmt(format);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-13">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-surface-header text-fg-muted">
            <th scope="col" className="h-row-header px-2.5 text-left font-semibold">
              {xKey === 'name' ? 'Item' : xKey.charAt(0).toUpperCase() + xKey.slice(1)}
            </th>
            {series.map((s) => (
              <th key={s.key} scope="col" className="h-row-header px-2.5 text-right font-semibold">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={String(r[xKey])} className="border-b border-line-row">
              <th scope="row" className="h-row px-2.5 text-left font-medium text-fg-strong">
                {r[xKey]}
              </th>
              {series.map((s) => (
                <td key={s.key} className="h-row px-2.5 text-right tabular-nums text-fg-strong">
                  {f(Number(r[s.key]))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Wraps a chart with legend and a Chart / Table toggle. Use inside a Card. */
export function ChartFrame({ chart, table, legend, caption }: { chart: ReactNode; table: ReactNode; legend?: ReactNode; caption: string }) {
  const [view, setView] = useState('chart');
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>{legend}</div>
        <SegmentedControl
          variant="icon"
          aria-label={`${caption}: view as`}
          value={view}
          onChange={setView}
          options={[
            { value: 'chart', label: <BarChartIcon />, 'aria-label': 'Chart' },
            { value: 'table', label: <ListViewIcon />, 'aria-label': 'Table' },
          ]}
        />
      </div>
      {view === 'chart' ? chart : table}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}

/** Change over time (premium per day, cash flow). Figma: area chart with smooth line. 2px line, 10% wash. */
export function AreaChart({ data, xKey, series, format, height = 280, ...aria }: ChartBase) {
  const f = fmt(format);
  const gid = useId().replace(/:/g, '');
  return (
    <ChartFrame
      caption={aria['aria-label']}
      legend={<ChartLegend series={series} />}
      table={<ChartTable data={data} xKey={xKey} series={series} format={format} caption={aria['aria-label']} />}
      chart={
        <div role="img" aria-label={aria['aria-label']} style={{ height }}>
          <ResponsiveContainer>
            <RAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                {series.map((s, i) => (
                  <linearGradient key={s.key} id={`${gid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colorOf(s, i)} stopOpacity={0.16} />
                    <stop offset="100%" stopColor={colorOf(s, i)} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke="var(--ib-color-chart-grid)" />
              <XAxis dataKey={xKey} tick={axisTick} tickLine={false} axisLine={{ stroke: 'var(--ib-color-chart-grid)' }} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={f} width={56} />
              <Tooltip content={<ChartTooltip format={f} series={series} />} cursor={{ stroke: 'var(--ib-color-fg-muted)', strokeWidth: 1 }} />
              {series.map((s, i) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={colorOf(s, i)}
                  strokeWidth={2}
                  fill={`url(#${gid}-${s.key})`}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--ib-color-surface)' }}
                  isAnimationActive={false}
                />
              ))}
            </RAreaChart>
          </ResponsiveContainer>
        </div>
      }
    />
  );
}

/** Compare amounts across categories or periods (income vs expense by month). Columns ≤ 24px, 4px rounded tops. */
export function BarChart({ data, xKey, series, format, height = 280, layout = 'vertical', ...aria }: ChartBase & { layout?: 'vertical' | 'horizontal' }) {
  const f = fmt(format);
  const horizontal = layout === 'horizontal';
  const h = horizontal ? Math.max(height, data.length * 36 + 24) : height;
  return (
    <ChartFrame
      caption={aria['aria-label']}
      legend={<ChartLegend series={series} />}
      table={<ChartTable data={data} xKey={xKey} series={series} format={format} caption={aria['aria-label']} />}
      chart={
        <div role="img" aria-label={aria['aria-label']} style={{ height: h }}>
          <ResponsiveContainer>
            <RBarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={{ top: 8, right: horizontal ? 24 : 8, bottom: 0, left: 0 }} barGap={2} barCategoryGap="28%">
              <CartesianGrid vertical={horizontal} horizontal={!horizontal} stroke="var(--ib-color-chart-grid)" />
              {horizontal ? (
                <>
                  <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} tickFormatter={f} />
                  <YAxis type="category" dataKey={xKey} tick={{ ...axisTick, fontSize: 13, fill: 'var(--ib-color-fg-strong)' }} tickLine={false} axisLine={false} width={150} />
                </>
              ) : (
                <>
                  <XAxis dataKey={xKey} tick={axisTick} tickLine={false} axisLine={{ stroke: 'var(--ib-color-chart-grid)' }} />
                  <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={f} width={56} />
                </>
              )}
              <Tooltip content={<ChartTooltip format={f} series={series} />} cursor={{ fill: 'var(--ib-color-surface-muted)' }} />
              {series.map((s, i) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={colorOf(s, i)}
                  maxBarSize={horizontal ? 16 : 24}
                  radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              ))}
            </RBarChart>
          </ResponsiveContainer>
        </div>
      }
    />
  );
}

/**
 * Profile across 5-8 dimensions (Figma radar, months Jan-Jun). Hard to read exact values: prefer a
 * BarChart unless the shape is the point. Always ships with the table view.
 */
export function RadarChart({ data, xKey, series, format, height = 300, ...aria }: ChartBase) {
  const f = fmt(format);
  return (
    <ChartFrame
      caption={aria['aria-label']}
      legend={<ChartLegend series={series} />}
      table={<ChartTable data={data} xKey={xKey} series={series} format={format} caption={aria['aria-label']} />}
      chart={
        <div role="img" aria-label={aria['aria-label']} style={{ height }}>
          <ResponsiveContainer>
            <RRadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="var(--ib-color-chart-grid)" />
              <PolarAngleAxis dataKey={xKey} tick={axisTick} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Tooltip content={<ChartTooltip format={f} series={series} />} />
              {series.map((s, i) => (
                <Radar key={s.key} dataKey={s.key} name={s.label} stroke={colorOf(s, i)} strokeWidth={2} fill={colorOf(s, i)} fillOpacity={0.1} dot={{ r: 4, strokeWidth: 2, stroke: 'var(--ib-color-surface)', fill: colorOf(s, i) }} isAnimationActive={false} />
              ))}
            </RRadarChart>
          </ResponsiveContainer>
        </div>
      }
    />
  );
}

