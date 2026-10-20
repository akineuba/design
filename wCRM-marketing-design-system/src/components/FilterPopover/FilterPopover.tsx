import * as RadixPopover from '@radix-ui/react-popover';
import { useMemo, useState, type ReactNode } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { cn } from '../../utils/cn';
import { focusFirstField } from '../../utils/focus';

export interface FilterPopoverProps {
  /** Element that opens the panel, usually an `IconButton` or a `Button` with a filter icon. */
  trigger: ReactNode;
  title?: string;
  /** Filter controls: `FilterCheckboxList`, `Select`s, date inputs… */
  children: ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  applyLabel?: string;
  clearLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** `sm` is the compact checkbox panel (240px); `md` fits stacked selects (≈ 400px). */
  size?: 'sm' | 'md';
  align?: 'start' | 'center' | 'end';
}

/**
 * Filter dropdown anchored to a toolbar button. Figma: `filter-popup` (checkbox list with Clear All / Apply),
 * `filters` (stacked selects with Apply) and `dropdown-panel` (searchable checkbox list).
 */
export function FilterPopover({
  trigger,
  title = 'Filters',
  children,
  onApply,
  onClear,
  applyLabel = 'Apply',
  clearLabel = 'Clear all',
  open,
  onOpenChange,
  size = 'sm',
  align = 'end',
}: FilterPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = (o: boolean) => {
    setInternalOpen(o);
    onOpenChange?.(o);
  };

  return (
    <RadixPopover.Root open={isOpen} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          sideOffset={6}
          onOpenAutoFocus={focusFirstField}
          className={cn(
            'z-50 flex flex-col gap-3 rounded-md border border-border-default bg-surface-default p-3.5 shadow-md',
            'focus-visible:outline-none data-[state=open]:animate-pop-in',
            size === 'sm' ? 'w-popover' : 'w-modal-sm',
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-heading-2 text-text-primary">{title}</h2>
            <RadixPopover.Close
              aria-label="Close filters"
              className="inline-flex size-8 items-center justify-center rounded-sm text-text-primary hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </RadixPopover.Close>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
          <div className="flex gap-3 border-t border-border-default pt-3">
            {onClear && (
              <Button variant="secondary" size="sm" fullWidth onClick={onClear}>
                {clearLabel}
              </Button>
            )}
            <Button
              size="sm"
              fullWidth
              onClick={() => {
                onApply?.();
                setOpen(false);
              }}
            >
              {applyLabel}
            </Button>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterCheckboxListProps {
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
  /** Adds a search field above the list (Figma `dropdown-panel`, "Search accounts..."). */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Accessible name for the group, e.g. "Accounts". */
  label: string;
}

export function FilterCheckboxList({ options, value, onChange, searchable, searchPlaceholder = 'Search…', label }: FilterCheckboxListProps) {
  const [query, setQuery] = useState('');
  const shown = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query],
  );
  const toggle = (v: string, checked: boolean) => onChange(checked ? [...value, v] : value.filter((x) => x !== v));

  return (
    <div className="flex flex-col gap-2">
      {searchable && (
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={`Search ${label.toLowerCase()}`}
          className="h-control-md rounded-md border border-border-default px-3 text-body-sm text-text-primary outline-none placeholder:text-text-placeholder focus:border-accent-navy focus:shadow-focus"
        />
      )}
      <div role="group" aria-label={label} className="flex max-h-menu-max-height flex-col gap-0.5 overflow-y-auto">
        {shown.map((o) => (
          <Checkbox
            key={o.value}
            className="py-1.5"
            label={o.label}
            checked={value.includes(o.value)}
            onCheckedChange={(c) => toggle(o.value, c === true)}
          />
        ))}
        {shown.length === 0 && <p className="py-2 text-body-sm text-text-secondary">No matches for “{query}”.</p>}
      </div>
    </div>
  );
}
