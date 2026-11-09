import React from 'react';
import {
  Area, AreaChart as RAreaChart, Bar, BarChart as RBarChart, CartesianGrid, Cell, Pie, PieChart as RPieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart as RLineChart,
} from 'recharts';

export const CHART_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)'];
const axis = { fontSize: 12, fill: 'var(--chart-axis)', fontFamily: 'Inter' };
const fmt = (v: number) => (Math.abs(v) >= 10000 ? `${+(v / 1000).toFixed(1)}k` : v.toLocaleString('en-GB'));

export interface Series { key: string; label: string; color?: string; }

function ChartTip({ active, payload, label, unit = '' }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="ae-chart-tip">
      {label !== undefined && <div className="ae-chart-tip__title">{label}</div>}
      {payload.map((p: any) => (
        <div key={p.dataKey ?? p.name} className="ae-chart-tip__row">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span className="ae-chart-legend__sw" style={{ background: p.color ?? p.payload?.fill }} />{p.name}</span>
          <b>{unit}{Number(p.value).toLocaleString('en-GB')}</b>
        </div>
      ))}
    </div>
  );
}

export function Legend({ items, list, values }: { items: { label: string; color: string }[]; list?: boolean; values?: React.ReactNode[] }) {
  return (
    <div className={`ae-chart-legend${list ? ' ae-chart-legend--list' : ''}`}>
      {items.map((it, i) => (
        <span key={it.label} className="ae-chart-legend__item">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="ae-chart-legend__sw" style={{ background: it.color }} />{it.label}</span>
          {values && <span className="ae-chart-legend__val">{values[i]}</span>}
        </span>
      ))}
    </div>
  );
}

/** Bar chart. Bars sit on a plain grid — no grey “track” behind each bar (it read as data). */
export function BarChart({ data, xKey, series, height = 280, unit, stacked }: { data: any[]; xKey: string; series: Series[]; height?: number; unit?: string; stacked?: boolean }) {
  return (
    <div>
      {series.length > 1 && <div style={{ marginBottom: 12 }}><Legend items={series.map((s, i) => ({ label: s.label, color: s.color ?? CHART_COLORS[i] }))} /></div>}
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barCategoryGap="22%">
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis dataKey={xKey} tick={axis} axisLine={{ stroke: 'var(--chart-axis)' }} tickLine={false} interval={0} />
          <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} />
          <Tooltip cursor={{ fill: 'var(--bg-hover)' }} content={<ChartTip unit={unit} />} />
          {series.map((s, i) => (
            <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color ?? CHART_COLORS[i]} stackId={stacked ? 'a' : undefined}
              radius={stacked && i < series.length - 1 ? [0, 0, 0, 0] : [4, 4, 0, 0]} maxBarSize={44} />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HorizontalBarChart({ data, labelKey, valueKey, height, unit, color = CHART_COLORS[0] }: { data: any[]; labelKey: string; valueKey: string; height?: number; unit?: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={height ?? data.length * 40 + 20}>
      <RBarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
        <XAxis type="number" tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} />
        <YAxis type="category" dataKey={labelKey} tick={{ ...axis, fill: 'var(--text-primary)' }} axisLine={false} tickLine={false} width={130} />
        <Tooltip cursor={{ fill: 'var(--bg-hover)' }} content={<ChartTip unit={unit} />} />
        <Bar dataKey={valueKey} name="Amount" fill={color} radius={[0, 4, 4, 0]} maxBarSize={22} />
      </RBarChart>
    </ResponsiveContainer>
  );
}

export function AreaChart({ data, xKey, series, height = 280, unit }: { data: any[]; xKey: string; series: Series[]; height?: number; unit?: string }) {
  return (
    <div>
      {series.length > 1 && <div style={{ marginBottom: 12 }}><Legend items={series.map((s, i) => ({ label: s.label, color: s.color ?? CHART_COLORS[i] }))} /></div>}
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            {series.map((s, i) => (
              <linearGradient key={s.key} id={`ae-g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color ?? CHART_COLORS[i]} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color ?? CHART_COLORS[i]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis dataKey={xKey} tick={axis} axisLine={{ stroke: 'var(--chart-axis)' }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} />
          <Tooltip content={<ChartTip unit={unit} />} />
          {series.map((s, i) => (
            <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color ?? CHART_COLORS[i]} strokeWidth={2} fill={`url(#ae-g-${s.key})`} />
          ))}
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChart({ data, xKey, series, height = 260, unit }: { data: any[]; xKey: string; series: Series[]; height?: number; unit?: string }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}><Legend items={series.map((s, i) => ({ label: s.label, color: s.color ?? CHART_COLORS[i] }))} /></div>
      <ResponsiveContainer width="100%" height={height}>
        <RLineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis dataKey={xKey} tick={axis} axisLine={{ stroke: 'var(--chart-axis)' }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} />
          <Tooltip content={<ChartTip unit={unit} />} />
          {series.map((s, i) => <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color ?? CHART_COLORS[i]} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />)}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Donut — preferred over pie for part-to-whole. Max 5 slices; group the rest into “Other”. */
export function DonutChart({ data, size = 200, centerLabel, centerValue, unit = '' }: { data: { label: string; value: number; color?: string }[]; size?: number; centerLabel?: string; centerValue?: string; unit?: string }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const items = data.map((d, i) => ({ ...d, color: d.color ?? CHART_COLORS[i % CHART_COLORS.length] }));
  return (
    <div className="ae-donut-wrap">
      <div style={{ position: 'relative', width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <RPieChart>
            <Pie data={items} dataKey="value" nameKey="label" innerRadius="64%" outerRadius="100%" paddingAngle={2} stroke="none" startAngle={90} endAngle={-270}>
              {items.map((d) => <Cell key={d.label} fill={d.color} />)}
            </Pie>
            <Tooltip content={<ChartTip unit={unit} />} />
          </RPieChart>
        </ResponsiveContainer>
        <div className="ae-donut-center"><b>{centerValue ?? total.toLocaleString('en-GB')}</b>{centerLabel && <span>{centerLabel}</span>}</div>
      </div>
      <Legend list items={items} values={items.map((d) => `${Math.round((d.value / total) * 100)}%`)} />
    </div>
  );
}

/** Pie with leader-line labels, as in the Figma — every slice is labelled. */
export function PieChart({ data, height = 300, title }: { data: { label: string; value: number; color?: string }[]; height?: number; title?: string }) {
  const items = data.map((d, i) => ({ ...d, color: d.color ?? CHART_COLORS[i % CHART_COLORS.length] }));
  const RAD = Math.PI / 180;
  const label = ({ cx, cy, midAngle, outerRadius, index }: any) => {
    const r = outerRadius + 26;
    const x = cx + r * Math.cos(-midAngle * RAD); const y = cy + r * Math.sin(-midAngle * RAD);
    return <text x={x} y={y} fill="var(--chart-axis)" fontSize={12} fontFamily="Inter" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{items[index].label}</text>;
  };
  return (
    <div>
      {title && <div style={{ textAlign: 'center', fontSize: 18, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <RPieChart>
          <Pie data={items} dataKey="value" nameKey="label" outerRadius="72%" stroke="none" label={label} labelLine={{ stroke: 'var(--border-strong)' }} startAngle={90} endAngle={-270}>
            {items.map((d) => <Cell key={d.label} fill={d.color} />)}
          </Pie>
          <Tooltip content={<ChartTip />} />
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({ data, color = CHART_COLORS[0], height = 40 }: { data: number[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RAreaChart data={data.map((v, i) => ({ i, v }))} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={color} fillOpacity={0.12} isAnimationActive={false} />
      </RAreaChart>
    </ResponsiveContainer>
  );
}
