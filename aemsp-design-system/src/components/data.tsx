import React, { useMemo, useState } from 'react';
import { Icon, IconName } from './Icon';
import { Button, cx, Skeleton } from './primitives';
import { Checkbox, FilterDropdown, Option, SearchInput, usePopover } from './forms';
import { Tag } from './primitives';

/* =============== Empty state =============== */
export function EmptyState({ icon = 'inbox', title, text, actions, compact }: { icon?: IconName; title: string; text?: string; actions?: React.ReactNode; compact?: boolean }) {
  return (
    <div className={cx('ae-empty', compact && 'ae-empty--compact')}>
      <span className="ae-empty__art"><Icon name={icon} size={compact ? 22 : 28} /></span>
      <div style={compact ? { flex: 1 } : { display: 'contents' }}>
        <p className="ae-empty__title">{title}</p>
        {text && <p className="ae-empty__text">{text}</p>}
      </div>
      {actions && <div className="ae-empty__actions">{actions}</div>}
    </div>
  );
}

/* =============== Table =============== */
export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  align?: 'left' | 'right';
  width?: number | string;
  truncate?: boolean;
}

export interface TableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  selectable?: boolean;
  defaultSelected?: string[];
  loading?: boolean;
  empty?: React.ReactNode;
  rowActions?: (row: T) => React.ReactNode;
  bulkActions?: (selected: string[], clear: () => void) => React.ReactNode;
  pagination?: { page?: number; pageSize?: number; total: number };
  compact?: boolean;
  onRowClick?: (row: T) => void;
  title?: React.ReactNode;
  headerActions?: React.ReactNode;
  bare?: boolean;
}

export function Table<T extends { id: string }>({ columns, rows, selectable, defaultSelected = [], loading, empty, rowActions, bulkActions, pagination, compact, onRowClick, title, headerActions, bare }: TableProps<T>) {
  const [sel, setSel] = useState<string[]>(defaultSelected);
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const get = col?.sortValue ?? ((r: any) => r[sort.key]);
    return [...rows].sort((a, b) => { const x = get(a), y = get(b); const r = x < y ? -1 : x > y ? 1 : 0; return sort.dir === 'asc' ? r : -r; });
  }, [rows, sort, columns]);
  const all = rows.length > 0 && sel.length === rows.length;
  const some = sel.length > 0 && !all;
  const colCount = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);

  const table = (
    <>
      {title && <header className="ae-card__head ae-card__head--divided"><h3 className="ae-card__title" style={{ fontWeight: 500 }}>{title}</h3>{headerActions && <div className="ae-card__actions">{headerActions}</div>}</header>}
      {selectable && bulkActions && sel.length > 0 && (
        <div style={{ padding: '12px 18px 0' }}>
          <BulkActionBar count={sel.length} onClear={() => setSel([])}>{bulkActions(sel, () => setSel([]))}</BulkActionBar>
        </div>
      )}
      <div className="ae-table-scroll">
        <table className={cx('ae-table', compact && 'ae-table--compact')}>
          <thead>
            <tr>
              {selectable && <th className="ae-th--check"><Checkbox ariaLabel="Select all rows" checked={all} indeterminate={some} onChange={(c) => setSel(c ? rows.map((r) => r.id) : [])} /></th>}
              {columns.map((c) => {
                const sorted = sort?.key === c.key;
                return (
                  <th key={c.key} style={{ width: c.width }} className={cx(c.sortable && 'ae-th--sort', sorted && 'ae-th--sorted', c.align === 'right' && 'ae-td--right')}
                    aria-sort={sorted ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                    onClick={c.sortable ? () => setSort(sorted && sort!.dir === 'desc' ? null : { key: c.key, dir: sorted ? 'desc' : 'asc' }) : undefined}>
                    <span className="ae-th__inner">{c.header}{c.sortable && <Icon name={sorted ? (sort!.dir === 'asc' ? 'arrow-up' : 'arrow-down') : 'chevrons-up-down'} size={12} className="ae-th__sorticon" />}</span>
                  </th>
                );
              })}
              {rowActions && <th className="ae-td--menu">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {selectable && <td className="ae-td--check"><Skeleton w={16} h={16} r={4} /></td>}
                {columns.map((c, j) => <td key={c.key}>{j === 0 ? <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Skeleton w={35} h={35} r={99} /><Skeleton w={90} /></span> : <Skeleton w={j % 2 ? 70 : 110} />}</td>)}
                {rowActions && <td><Skeleton w={20} h={20} /></td>}
              </tr>
            )) : sorted.length === 0 ? (
              <tr><td colSpan={colCount} className="ae-table__state" style={{ height: 'auto' }}>{empty ?? <EmptyState title="Nothing here yet" text="Records you add will show up in this table." />}</td></tr>
            ) : sorted.map((r) => (
              <tr key={r.id} aria-selected={selectable ? sel.includes(r.id) : undefined} onClick={onRowClick ? () => onRowClick(r) : undefined} style={onRowClick ? { cursor: 'pointer' } : undefined}>
                {selectable && <td className="ae-td--check"><Checkbox ariaLabel={`Select row ${r.id}`} checked={sel.includes(r.id)} onChange={(c) => setSel(c ? [...sel, r.id] : sel.filter((x) => x !== r.id))} /></td>}
                {columns.map((c) => <td key={c.key} className={cx(c.truncate && 'ae-td--truncate', c.align === 'right' && 'ae-td--right ae-td--num')} title={c.truncate ? String((r as any)[c.key] ?? '') : undefined}>{c.render ? c.render(r) : (r as any)[c.key]}</td>)}
                {rowActions && <td className="ae-td--menu">{rowActions(r)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && !loading && rows.length > 0 && <Pagination {...pagination} />}
    </>
  );
  return bare ? table : <div className="ae-table-wrap">{table}</div>;
}

/* =============== Bulk action bar =============== */
export function BulkActionBar({ count, onClear, children }: { count: number; onClear?: () => void; children?: React.ReactNode }) {
  return (
    <div className="ae-bulkbar" role="region" aria-label="Bulk actions">
      <span className="ae-bulkbar__count"><span className="ae-badge ae-badge--blue">{count}</span>{count === 1 ? 'row' : 'rows'} selected</span>
      <span className="ae-bulkbar__sep" />
      <button type="button" className="ae-linkbtn" style={{ color: '#9fcfff' }} onClick={onClear}>Clear</button>
      <div className="ae-bulkbar__actions">{children}</div>
    </div>
  );
}

/* =============== Pagination =============== */
export function Pagination({ page: p0 = 1, pageSize: s0 = 10, total }: { page?: number; pageSize?: number; total: number }) {
  const [page, setPage] = useState(p0);
  const [size, setSize] = useState(s0);
  const pop = usePopover();
  const pages = Math.max(1, Math.ceil(total / size));
  const from = (page - 1) * size + 1;
  const to = Math.min(total, page * size);
  const nums = useMemo(() => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    const s = new Set([1, pages, page, page - 1, page + 1].filter((n) => n >= 1 && n <= pages));
    const arr = [...s].sort((a, b) => a - b);
    const out: (number | '…')[] = [];
    arr.forEach((n, i) => { if (i && n - (arr[i - 1] as number) > 1) out.push('…'); out.push(n); });
    return out;
  }, [page, pages]);
  return (
    <div className="ae-pagination">
      <span className="ae-pagination__info">Showing {from}–{to} of {total.toLocaleString('en-GB')} entries</span>
      <nav className="ae-pagination__nav" aria-label="Pagination">
        <div className="ae-pagination__pages">
          <button type="button" className="ae-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page"><Icon name="chevron-left" size={14} /></button>
          {nums.map((n, i) => n === '…' ? <span key={`e${i}`} className="ae-page-btn" aria-hidden>…</span> : (
            <button key={n} type="button" className="ae-page-btn" aria-current={n === page ? 'page' : undefined} onClick={() => setPage(n)}>{n}</button>
          ))}
          <button type="button" className="ae-page-btn" disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next page"><Icon name="chevron-right" size={14} /></button>
        </div>
        <div className="ae-pop-anchor" ref={pop.ref}>
          <button type="button" className="ae-page-size" aria-haspopup="listbox" aria-expanded={pop.open} onClick={() => pop.setOpen(!pop.open)}>{size} / page <Icon name="chevron-down" size={12} /></button>
          {pop.open && (
            <div className="ae-pop ae-pop--right ae-pop--up" style={{ minWidth: 120 }} role="listbox">
              {[10, 20, 50, 100].map((n) => <button key={n} type="button" className="ae-menu-item" onClick={() => { setSize(n); setPage(1); pop.setOpen(false); }}>{n} / page{n === size && <span className="ae-menu-item__check"><Icon name="check" size={15} /></span>}</button>)}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

/* =============== Toolbar & filter bar =============== */
export function Toolbar({ left, right }: { left?: React.ReactNode; right?: React.ReactNode }) {
  return <div className="ae-toolbar"><div className="ae-toolbar__group">{left}</div><div className="ae-toolbar__group">{right}</div></div>;
}

export interface FilterDef { id: string; label: string; options: Option[]; multi?: boolean; }
export function FilterBar({ filters, search = true, actions, applyMode, defaultValues = {} }: { filters: FilterDef[]; search?: boolean; actions?: React.ReactNode; applyMode?: boolean; defaultValues?: Record<string, string | string[]> }) {
  const [vals, setVals] = useState<Record<string, string | string[]>>(defaultValues);
  const [key, setKey] = useState(0);
  const active = Object.entries(vals).flatMap(([k, v]) => {
    const f = filters.find((x) => x.id === k)!;
    const arr = Array.isArray(v) ? v : v && v !== 'all' ? [v] : [];
    return arr.map((val) => ({ k, val, text: `${f.label}: ${f.options.find((o) => o.value === val)?.label}` }));
  });
  const remove = (k: string, val: string) => {
    const v = vals[k]; setVals({ ...vals, [k]: Array.isArray(v) ? v.filter((x) => x !== val) : 'all' }); setKey(key + 1);
  };
  return (
    <div className="ae-card ae-card--bar" style={{ padding: '17px 18px' }}>
      <div className="ae-filterbar">
        <div className="ae-toolbar__group" style={{ justifyContent: 'space-between' }}>
          <div className="ae-toolbar__group" key={key}>
            {search && <SearchInput placeholder="Search organisations, OEMs…" width={260} />}
            {filters.map((f) => <FilterDropdown key={f.id} label={f.label} options={f.options} multi={f.multi} value={vals[f.id]} onChange={(v) => setVals({ ...vals, [f.id]: v })} />)}
          </div>
          <div className="ae-toolbar__group">{applyMode && <Button icon="check-circle">Apply filters</Button>}{actions}</div>
        </div>
        {active.length > 0 && (
          <div className="ae-filterbar__chips">
            <span className="ae-muted" style={{ fontSize: 12, fontWeight: 600 }}>{active.length} active</span>
            {active.map((a) => <Tag key={a.k + a.val} variant="accent" onRemove={() => remove(a.k, a.val)}>{a.text}</Tag>)}
            <button type="button" className="ae-linkbtn" onClick={() => { setVals({}); setKey(key + 1); }}>Clear all</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =============== Grid card (grid view of a list) =============== */
export function GridCard({ title, sub, status, meta, selected, onSelect, actions, avatar }: { title: string; sub?: string; status?: React.ReactNode; meta: [string, React.ReactNode][]; selected?: boolean; onSelect?: (v: boolean) => void; actions?: React.ReactNode; avatar?: React.ReactNode }) {
  return (
    <article className={cx('ae-gridcard', selected && 'ae-gridcard--selected')}>
      <div className="ae-gridcard__top">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
          {onSelect && <Checkbox ariaLabel={`Select ${title}`} checked={selected} onChange={onSelect} />}
          {avatar}
          <div style={{ minWidth: 0 }}><div style={{ fontWeight: 600, color: 'var(--text-ink)', fontSize: 14 }}>{title}</div>{sub && <div className="ae-muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}</div>
        </div>
        {actions}
      </div>
      {status}
      <div className="ae-gridcard__meta">{meta.map(([k, v]) => <div key={k} className="ae-kv"><span className="ae-kv__k">{k}</span><span className="ae-kv__v">{v}</span></div>)}</div>
    </article>
  );
}
