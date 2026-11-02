import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../icons';
import { Checkbox } from './Checkbox';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  id: string;
  header: ReactNode;
  /** Cell content. Return plain text, an Avatar, StatusPill, MoneyDisplay or link. */
  cell: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
  /** First column: dark Medium text (UI rule 22). */
  primary?: boolean;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Adds the checkbox column (Figma list screens). */
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (keys: string[]) => void;
  sort?: { id: string; dir: 'asc' | 'desc' };
  onSortChange?: (sort: { id: string; dir: 'asc' | 'desc' }) => void;
  /** ⋯ menu at the end of each row (UI rule 14). */
  rowActions?: (row: T) => ReactNode;
  loading?: boolean;
  /** What to show when there are no rows. Pass a no-results message when filters are on. */
  empty?: ReactNode;
  /** Highlight a just-saved row (UI rule 4). */
  highlightKey?: string;
  caption?: string;
  /** Keeps the first column visible while scrolling sideways (wBiz proposal B9). */
  stickyFirstColumn?: boolean;
  className?: string;
}

/**
 * Data table. Figma: 38px grey header (SemiBold 13, muted), 40px rows, 10px cell padding, 13px text,
 * checkbox column, initials avatar in the first column, status pill, ⋯ actions.
 */
export function Table<T>({
  columns,
  rows,
  rowKey,
  selectable,
  selected = [],
  onSelectedChange,
  sort,
  onSortChange,
  rowActions,
  loading,
  empty,
  highlightKey,
  caption,
  stickyFirstColumn,
  className,
}: TableProps<T>) {
  const keys = rows.map(rowKey);
  const sel = new Set(selected);
  const all = keys.length > 0 && keys.every((k) => sel.has(k));
  const some = !all && keys.some((k) => sel.has(k));
  const colCount = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const th = 'h-row-header px-2.5 text-left text-13 font-semibold text-fg-muted whitespace-nowrap bg-surface-header';
  const alignCls = (a?: string) => (a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left');
  const sticky = (i: number) => stickyFirstColumn && i === 0 && 'sticky left-0 z-10 bg-inherit';

  return (
    <div className={cx('w-full overflow-x-auto', className)}>
      <table className="w-full border-separate border-spacing-0 text-13">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-surface-header">
            {selectable && (
              <th scope="col" className={cx(th, 'w-[61px] rounded-l-[5px] text-center')}>
                <span className="inline-flex">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={all}
                    indeterminate={some}
                    onChange={() => onSelectedChange?.(all ? selected.filter((k) => !keys.includes(k)) : [...new Set([...selected, ...keys])])}
                  />
                </span>
              </th>
            )}
            {columns.map((c, i) => {
              const active = sort?.id === c.id;
              return (
                <th
                  key={c.id}
                  scope="col"
                  style={{ width: c.width }}
                  aria-sort={active ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                  className={cx(th, alignCls(c.align), sticky(i), !selectable && i === 0 && 'rounded-l-[5px]', !rowActions && i === columns.length - 1 && 'rounded-r-[5px]')}
                >
                  {c.sortable && onSortChange ? (
                    <button
                      type="button"
                      onClick={() => onSortChange({ id: c.id, dir: active && sort!.dir === 'asc' ? 'desc' : 'asc' })}
                      className={cx('inline-flex items-center gap-1 rounded ib-focus hover:text-fg-strong', active && 'text-fg-strong')}
                    >
                      {c.header}
                      <span className="size-3.5" aria-hidden>
                        {active ? sort!.dir === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon /> : <SortIcon />}
                      </span>
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
            {rowActions && (
              <th scope="col" className={cx(th, 'w-14 rounded-r-[5px]')}>
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 5 }).map((_, r) => (
              <tr key={`sk${r}`} aria-hidden>
                {Array.from({ length: colCount }).map((__, c) => (
                  <td key={c} className="h-row px-2.5">
                    <span className="block h-3 w-3/4 animate-pulse rounded bg-surface-track" />
                  </td>
                ))}
              </tr>
            ))}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={colCount}>{empty ?? <EmptyState compact title="Nothing here yet" />}</td>
            </tr>
          )}
          {!loading &&
            rows.map((row) => {
              const k = rowKey(row);
              const isSel = sel.has(k);
              return (
                <tr
                  key={k}
                  aria-selected={selectable ? isSel : undefined}
                  className={cx('group bg-surface transition-colors hover:bg-surface-muted', isSel && 'bg-brand-subtle hover:bg-brand-subtle', highlightKey === k && 'bg-brand-subtle')}
                >
                  {selectable && (
                    <td className="h-row px-2.5 text-center">
                      <span className="inline-flex">
                        <Checkbox
                          aria-label={`Select row ${k}`}
                          checked={isSel}
                          onChange={() => onSelectedChange?.(isSel ? selected.filter((x) => x !== k) : [...selected, k])}
                        />
                      </span>
                    </td>
                  )}
                  {columns.map((c, i) => (
                    <td
                      key={c.id}
                      className={cx(
                        'h-row whitespace-nowrap px-2.5',
                        alignCls(c.align),
                        c.primary ? 'font-medium text-fg-strong' : 'text-fg-strong',
                        c.align === 'right' && 'tabular-nums',
                        sticky(i),
                      )}
                    >
                      {c.cell(row)}
                    </td>
                  ))}
                  {rowActions && <td className="h-row px-2.5 text-center">{rowActions(row)}</td>}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

/** Two-line cell for figures that need context: "₦450,000" + "Overdue by 5 days" in red (UI rule 23). */
export function CellWithNote({ value, note, tone = 'muted' }: { value: ReactNode; note: ReactNode; tone?: 'muted' | 'danger' }) {
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={cx(tone === 'danger' && 'text-danger')}>{value}</span>
      <span className={cx('text-11', tone === 'danger' ? 'text-danger' : 'text-fg-muted')}>{note}</span>
    </span>
  );
}

/** Drill-down link in a cell: policy numbers, client names (UI rule 23). */
export function CellLink({ href = '#', children, onClick }: { href?: string; children: ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="rounded font-medium text-primary hover:underline ib-focus"
    >
      {children}
    </a>
  );
}
