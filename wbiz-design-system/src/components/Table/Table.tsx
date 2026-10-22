import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx';
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, SearchIcon, SortArrowIcon } from '../../icons';
import { Checkbox } from '../Checkbox';
import { ActionMenu, type ActionMenuItem } from '../ActionMenu';

/* ------------------------------------------------------------------------------------------------
 * Primitives. Figma: the accounting tables (Customers 191:3274, Bills 4183:23454, Chart of Accounts
 * 1871:19163). Header row 44px on surface-page, Inter 12 fg-muted, 24/12 padding. Body rows 44px,
 * Inter 14 fg-muted (the first column in fg-ink), 16/12 padding, 1px line-subtle dividers.
 * ---------------------------------------------------------------------------------------------- */

export type TableAlign = 'left' | 'center' | 'right';
export type TableDensity = 'default' | 'comfortable';
const alignClass: Record<TableAlign, string> = { left: 'text-left', center: 'text-center', right: 'text-right' };
const justifyClass: Record<TableAlign, string> = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };

const DensityCtx = createContext<TableDensity>('default');

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** default: 44px rows (accounting). comfortable: 54px rows (new features). */
  density?: TableDensity;
}

/** Scroll container + table. Wide tables scroll horizontally inside the card instead of the page. */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { density = 'default', className, ...rest },
  ref,
) {
  return (
    <DensityCtx.Provider value={density}>
      <div className="relative w-full overflow-x-auto">
        <table ref={ref} className={cx('w-full border-collapse font-sans', className)} {...rest} />
      </div>
    </DensityCtx.Provider>
  );
});

export function TableHead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cx('bg-surface-page', className)} {...rest} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row: ticked in the selection column, or open in a side panel. */
  selected?: boolean;
  /** Adds hover feedback and a pointer for clickable rows. */
  interactive?: boolean;
}

export function TableRow({ selected, interactive, className, ...rest }: TableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cx(
        'border-b border-line-subtle bg-surface',
        interactive && 'cursor-pointer hover:bg-surface-page',
        selected && 'bg-primary-subtle hover:bg-primary-subtle',
        className,
      )}
      {...rest}
    />
  );
}

export type SortDirection = 'asc' | 'desc';

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  /** Current sort on this column. Pass `onSort` to make the header a sort button. */
  sort?: SortDirection | null;
  onSort?: () => void;
  /** 8px side padding, matching compact cells. */
  compact?: boolean;
}

/** Column header. Sortable headers show the arrow from Figma (Name, Company, Email on Customers). */
export function TableHeaderCell({ align = 'left', sort, onSort, compact = false, className, children, ...rest }: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      aria-sort={onSort ? (sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : 'none') : undefined}
      className={cx(
        'h-row-head whitespace-nowrap border-b border-line-subtle py-3 text-xs font-medium text-fg-muted',
        compact ? 'px-1.5 first:pl-4 last:pr-4' : 'px-4 first:pl-6 last:pr-6',
        alignClass[align],
        className,
      )}
      {...rest}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className={cx(
            'inline-flex items-center gap-1 rounded-sm hover:text-fg focus-visible:outline-none focus-visible:shadow-focus',
            justifyClass[align],
            sort && 'text-fg',
          )}
        >
          {children}
          <span className={cx('size-icon-sm transition-transform', sort === 'asc' && 'rotate-180', !sort && 'opacity-60')} aria-hidden>
            <SortArrowIcon />
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  /** strong: dark medium text for the record's name. link: primary text for drill-down values. */
  emphasis?: 'none' | 'strong' | 'link';
  /** 6px vertical padding instead of 12px, for cells holding a 32px control (kebab, small button). */
  tight?: boolean;
  /** 8px side padding instead of 16px, for editable grids with many columns (invoice lines). */
  compact?: boolean;
}

const emphasisClass = { none: 'text-fg-muted', strong: 'font-medium text-fg-ink', link: 'text-primary' };

export function TableCell({ align = 'left', emphasis = 'none', tight = false, compact = false, className, ...rest }: TableCellProps) {
  const density = useContext(DensityCtx);
  return (
    <td
      className={cx(
        'whitespace-nowrap text-sm',
        compact ? 'px-1.5 first:pl-4 last:pr-4' : 'px-4 first:pl-6 last:pr-6',
        tight ? 'py-1.5' : 'py-3',
        density === 'comfortable' ? 'h-row-comfortable' : 'h-row',
        emphasisClass[emphasis],
        alignClass[align],
        className,
      )}
      {...rest}
    />
  );
}

export interface TableSectionRowProps {
  /** Group name, e.g. "Assets" on the Trial balance. */
  label: ReactNode;
  colSpan: number;
  /** Pass both to make the section collapsible. */
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

/** Full-width group header inside a table body. Figma: "Assest" / "Liability" rows on Trial balance (845:8824). */
export function TableSectionRow({ label, colSpan, expanded, onToggle, className }: TableSectionRowProps) {
  const density = useContext(DensityCtx);
  return (
    <tr className={cx('bg-surface', className)}>
      <td colSpan={colSpan} className={cx('px-6 py-3 text-sm font-medium text-fg-ink', density === 'comfortable' ? 'h-row-comfortable' : 'h-row')}>
        {onToggle ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={onToggle}
            className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:shadow-focus"
          >
            <span className={cx('size-icon text-icon transition-transform', !expanded && 'rotate-180')} aria-hidden><ChevronUpIcon /></span>
            {label}
          </button>
        ) : (
          label
        )}
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Card chrome: container, toolbar, footer.
 * ---------------------------------------------------------------------------------------------- */

/** White card with a 1px line-subtle border and 10px radius that holds a toolbar, table and footer. */
export function TableCard({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  // No overflow-hidden: toolbar popups (Filters, Customize Columns) must be able to extend past the card.
  return <div className={cx('w-full min-w-0 rounded-xl border border-line-subtle bg-surface', className)} {...rest} />;
}

/**
 * Row above the table. Figma: search and Filters on the left; Export, Bulk Upload, Settings,
 * Customize Columns and Add New on the right. 24/20 padding. Wraps on narrow screens.
 */
export function TableToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle px-6 py-5', className)}
      {...rest}
    />
  );
}

/** Keeps toolbar controls together on one side of the toolbar. */
export function TableToolbarGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex flex-wrap items-center gap-2', className)} {...rest} />;
}

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Accessible name; the visible placeholder is not a label. */
  'aria-label': string;
}

/** 40px search box used in table toolbars. Figma: Search (Customers 191:3274), 203px wide, 8px radius. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { className, ...rest },
  ref,
) {
  return (
    <label
      className={cx(
        'flex h-control-md w-search max-w-full items-center gap-2 rounded-lg border border-line bg-surface px-4',
        'focus-within:border-primary focus-within:shadow-focus',
        className,
      )}
    >
      <span className="inline-flex size-icon shrink-0 text-icon">
        <SearchIcon />
      </span>
      <input
        ref={ref}
        type="search"
        className="h-full min-w-0 flex-1 bg-transparent font-sans text-sm text-fg-ink outline-none placeholder:text-fg-placeholder"
        {...rest}
      />
    </label>
  );
});

export interface TableFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Summary next to the pagination, e.g. "Showing 1 of 1 entries". */
  summary?: ReactNode;
}

/** Footer row. Figma: right-aligned "Showing … entries", page buttons and the "Page" jump field. */
export function TableFooter({ summary, className, children, ...rest }: TableFooterProps) {
  return (
    <div className={cx('flex flex-wrap items-center justify-end gap-6 rounded-b-xl bg-surface px-6 py-2.5', className)} {...rest}>
      <p className="font-sans text-xs text-fg-faint">{summary}</p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Pagination. Figma (Number tabs on accounting tables): 30px page buttons with 4px radius, the active
 * one primary with white text; chevrons either side; then "Page" and a number field to jump.
 * ---------------------------------------------------------------------------------------------- */

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Show the "Page [n]" jump field. Default true. */
  showJump?: boolean;
  className?: string;
}

function pageList(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  const out: Array<number | 'gap'> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

const pageBtn =
  'inline-flex size-page-btn items-center justify-center rounded-sm font-sans text-sm transition-colors ' +
  'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled';

export function Pagination({ page, pageCount, onPageChange, showJump = true, className }: PaginationProps) {
  const count = Math.max(pageCount, 1);
  const pages = pageList(page, count);
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), count));
  return (
    <nav aria-label="Pagination" className={cx('flex flex-wrap items-center gap-6', className)}>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Previous page" className={cx(pageBtn, 'text-fg-muted hover:bg-surface-muted')} disabled={page <= 1} onClick={() => go(page - 1)}>
          <span className="size-icon-sm"><ChevronLeftIcon /></span>
        </button>
        {pages.map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} className="px-1 font-sans text-sm text-fg-muted" aria-hidden>…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => go(p)}
              className={cx(pageBtn, p === page ? 'bg-primary text-fg-inverse' : 'text-fg-muted hover:bg-surface-muted')}
            >
              {p}
            </button>
          ),
        )}
        <button type="button" aria-label="Next page" className={cx(pageBtn, 'text-fg-muted hover:bg-surface-muted')} disabled={page >= count} onClick={() => go(page + 1)}>
          <span className="size-icon-sm"><ChevronRightIcon /></span>
        </button>
      </div>
      {showJump && (
        <label className="flex items-center gap-2 font-sans text-xs text-fg-muted">
          Page
          <input
            type="number"
            min={1}
            max={count}
            value={page}
            onChange={(e) => { const n = Number(e.target.value); if (n) go(n); }}
            className="h-page-btn w-control-lg rounded-sm border border-line-subtle bg-surface px-2 font-sans text-sm text-fg-ink focus-visible:outline-none focus-visible:shadow-focus"
          />
        </label>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------------------------------------
 * DataTable: column-driven table built from the primitives. Adds selection, sorting, row actions,
 * expandable tree rows (Chart of Accounts), column visibility, loading and empty states.
 * ---------------------------------------------------------------------------------------------- */

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  /** Cell content. Defaults to `row[key]`. */
  render?: (row: Row) => ReactNode;
  align?: TableAlign;
  /** strong: the record's name. link: drill-down values in primary. */
  emphasis?: TableCellProps['emphasis'];
  /** Shows the sort arrow and makes the header clickable. Sorting itself is up to the caller. */
  sortable?: boolean;
  /** Extra classes for this column's cells. */
  className?: string;
}

export interface DataTableSort {
  key: string;
  direction: SortDirection;
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowId: (row: Row) => string;
  /** Keys of the columns to show, in any order. Defaults to all. Pair with `ColumnCustomizer`. */
  visibleColumns?: string[];
  density?: TableDensity;
  /** Adds a checkbox column with "select all" in the header. */
  selectable?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  sort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  /** Items for the kebab menu in the trailing "Actions" column. */
  rowActions?: (row: Row) => ActionMenuItem[];
  /** Label for the actions column header. Figma uses "Actions" and "Action". */
  actionsHeader?: string;
  /** Child rows, for hierarchies like the Chart of Accounts. The first column is indented per level. */
  getRowChildren?: (row: Row) => Row[] | undefined;
  /** Tree rows open on first render. Defaults to all. */
  defaultExpandedIds?: string[];
  /** Shows skeleton rows instead of data. */
  loading?: boolean;
  loadingRows?: number;
  /** Shown when there are no rows and not loading. */
  empty?: ReactNode;
  onRowClick?: (row: Row) => void;
  /** Highlights one row, e.g. the record open in a side panel. */
  activeRowId?: string;
  /** Accessible table caption (visually hidden). */
  caption?: string;
}

const indentClass = ['pl-0', 'pl-4', 'pl-8', 'pl-12'];

export function DataTable<Row>({
  columns,
  rows,
  getRowId,
  visibleColumns,
  density = 'default',
  selectable = false,
  selectedIds = [],
  onSelectedIdsChange,
  sort = null,
  onSortChange,
  rowActions,
  actionsHeader = 'Actions',
  getRowChildren,
  defaultExpandedIds,
  loading = false,
  loadingRows = 4,
  empty = 'No records yet.',
  onRowClick,
  activeRowId,
  caption,
}: DataTableProps<Row>) {
  const cols = visibleColumns ? columns.filter((c) => visibleColumns.includes(c.key)) : columns;
  const span = cols.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);

  // Tree: flatten visible rows with their depth.
  const allParentIds = useMemo(() => {
    if (!getRowChildren) return [];
    const ids: string[] = [];
    const walk = (list: Row[]) => list.forEach((r) => { const k = getRowChildren(r); if (k?.length) { ids.push(getRowId(r)); walk(k); } });
    walk(rows);
    return ids;
  }, [rows, getRowChildren, getRowId]);
  const [expanded, setExpanded] = useState<string[] | null>(defaultExpandedIds ?? null);
  const openIds = expanded ?? allParentIds;
  const flat: Array<{ row: Row; depth: number; hasChildren: boolean }> = [];
  const walk = (list: Row[], depth: number) =>
    list.forEach((row) => {
      const kids = getRowChildren?.(row);
      flat.push({ row, depth, hasChildren: !!kids?.length });
      if (kids?.length && openIds.includes(getRowId(row))) walk(kids, depth + 1);
    });
  walk(rows, 0);
  const toggleRow = (id: string) =>
    setExpanded(openIds.includes(id) ? openIds.filter((x) => x !== id) : [...openIds, id]);

  const ids = flat.map((f) => getRowId(f.row));
  const selectedCount = ids.filter((id) => selectedIds.includes(id)).length;
  const allSelected = ids.length > 0 && selectedCount === ids.length;
  const setSelected = (next: string[]) => onSelectedIdsChange?.(next);

  const nextSort = (key: string): DataTableSort | null =>
    sort?.key !== key ? { key, direction: 'desc' } : sort.direction === 'desc' ? { key, direction: 'asc' } : null;

  return (
    <Table density={density} aria-busy={loading || undefined}>
      {caption && <caption className="sr-only">{caption}</caption>}
      <TableHead>
        <tr>
          {selectable && (
            <TableHeaderCell className="w-checkbox">
              <Checkbox
                aria-label={allSelected ? 'Deselect all rows' : 'Select all rows'}
                checked={allSelected}
                indeterminate={selectedCount > 0 && !allSelected}
                onChange={() => setSelected(allSelected ? selectedIds.filter((id) => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])])}
              />
            </TableHeaderCell>
          )}
          {cols.map((c) => (
            <TableHeaderCell
              key={c.key}
              align={c.align}
              className={c.className}
              sort={sort?.key === c.key ? sort.direction : null}
              onSort={c.sortable && onSortChange ? () => onSortChange(nextSort(c.key)) : undefined}
            >
              {c.header}
            </TableHeaderCell>
          ))}
          {rowActions && <TableHeaderCell align="center">{actionsHeader}</TableHeaderCell>}
        </tr>
      </TableHead>
      <TableBody>
        {loading ? (
          Array.from({ length: loadingRows }, (_, i) => (
            <TableRow key={`sk-${i}`}>
              {Array.from({ length: span }, (_, j) => (
                <TableCell key={j}>
                  <span className="block h-3 w-full animate-pulse rounded-sm bg-surface-muted" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : flat.length === 0 ? (
          <tr>
            <td colSpan={span} className="px-6 py-12 text-center font-sans text-sm text-fg-muted">
              {empty}
            </td>
          </tr>
        ) : (
          flat.map(({ row, depth, hasChildren }) => {
            const id = getRowId(row);
            const isSelected = selectedIds.includes(id);
            const isOpen = openIds.includes(id);
            return (
              <TableRow
                key={id}
                interactive={Boolean(onRowClick)}
                selected={isSelected || activeRowId === id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {selectable && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <span className="flex">
                      <Checkbox
                        aria-label={`Select row ${id}`}
                        checked={isSelected}
                        onChange={() => setSelected(isSelected ? selectedIds.filter((x) => x !== id) : [...selectedIds, id])}
                      />
                    </span>
                  </TableCell>
                )}
                {cols.map((c, ci) => {
                  const content = c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '');
                  const tree = getRowChildren && ci === 0;
                  return (
                    <TableCell key={c.key} align={c.align} emphasis={c.emphasis} className={c.className}>
                      {tree ? (
                        <span className={cx('flex items-center gap-2', indentClass[Math.min(depth, 3)])}>
                          {hasChildren ? (
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-label={isOpen ? 'Collapse' : 'Expand'}
                              onClick={(e) => { e.stopPropagation(); toggleRow(id); }}
                              className="inline-flex size-icon shrink-0 items-center justify-center rounded-sm text-icon focus-visible:outline-none focus-visible:shadow-focus"
                            >
                              <span className={cx('size-icon transition-transform', !isOpen && 'rotate-180')}><ChevronUpIcon /></span>
                            </button>
                          ) : (
                            <span className="size-icon shrink-0" aria-hidden />
                          )}
                          {content}
                        </span>
                      ) : (
                        content
                      )}
                    </TableCell>
                  );
                })}
                {rowActions && (
                  <TableCell align="center" tight onClick={(e) => e.stopPropagation()}>
                    {rowActions(row).length > 0 && <span className="flex justify-center"><ActionMenu label={`Actions for ${id}`} items={rowActions(row)} /></span>}
                  </TableCell>
                )}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
