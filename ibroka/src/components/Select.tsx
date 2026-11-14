import { useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { Field, controlBase, controlBorder, controlHeight, useFieldSize } from './Field';
import { CaretDownIcon, CheckIcon, PlusIcon, SearchIcon } from '../icons';

export interface SelectOption {
  value: string;
  label: string;
  /** Second line, e.g. an insurer's code or a client's email. */
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: ReactNode;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** On by default: every dropdown is searchable (UI rule 1). Turn off for under ~6 fixed options. */
  searchable?: boolean;
  /**
   * Shows "Add New …" at the bottom of the list. Call it to open a quick-add modal; when it saves,
   * add the option and set it as the value so the user carries on (UI rule 1).
   */
  onAddNew?: (searchText: string) => void;
  addNewLabel?: string;
  size?: 'form' | 'filter';
  className?: string;
  /** Start open (documentation only). */
  defaultOpen?: boolean;
}

/** Searchable dropdown with an optional "Add New" row. Keyboard: arrows, Enter, Escape, type to search. */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select',
  hint,
  error,
  required,
  disabled,
  searchable = true,
  onAddNew,
  addNewLabel = 'Add New',
  size,
  className,
  defaultOpen,
}: SelectProps) {
  const ctx = useFieldSize();
  const s = size ?? ctx;
  const { open, setOpen, close, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultOpen);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query],
  );
  const rows = filtered.length + (onAddNew ? 1 : 0);

  const choose = (o: SelectOption) => {
    if (o.disabled) return;
    onChange?.(o.value);
    setQuery('');
    close();
  };
  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setActive(Math.max(0, filtered.findIndex((o) => o.value === value)));
    setTimeout(() => searchRef.current?.focus(), 0);
  };
  const onKey = (e: KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(rows - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active < filtered.length) choose(filtered[active]);
      else if (onAddNew) {
        onAddNew(query);
        close(false);
      }
    } else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <div ref={rootRef} className="relative" onKeyDown={onKey}>
          <button
            ref={triggerRef}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={required || undefined}
            disabled={disabled}
            onClick={() => (open ? close() : openList())}
            className={cx(controlBase, controlHeight(s), controlBorder(invalid, false), 'flex items-center justify-between gap-2 text-left', open && 'border-brand')}
          >
            <span className={cx('truncate', !selected && 'text-fg-placeholder')}>{selected?.label ?? placeholder}</span>
            <span className={cx('size-icon-sm shrink-0 text-fg-muted transition-transform', open && 'rotate-180')} aria-hidden>
              <CaretDownIcon />
            </span>
          </button>
          {open && (
            <div className="absolute left-0 right-0 z-30 mt-1 animate-fade-in overflow-hidden rounded-md border border-line-subtle bg-surface shadow-pop">
              {searchable && (
                <div className="flex items-center gap-2 border-b border-line-subtle px-3">
                  <span className="size-icon-sm text-fg-muted" aria-hidden>
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(0);
                    }}
                    placeholder="Search"
                    aria-label="Search options"
                    aria-controls={listId}
                    aria-activedescendant={`${listId}-${active}`}
                    className="h-control-sm w-full bg-transparent text-13 text-fg-strong placeholder:text-fg-placeholder focus:outline-none"
                  />
                </div>
              )}
              <ul id={listId} role="listbox" tabIndex={-1} className={cx("max-h-60 overflow-y-auto", onAddNew ? "pt-1" : "py-1")}>
                {filtered.length === 0 && <li className="px-4 py-2.5 text-13 text-fg-muted">No matches for "{query}"</li>}
                {filtered.map((o, i) => {
                  const isSel = o.value === value;
                  return (
                    <li
                      key={o.value}
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={isSel}
                      aria-disabled={o.disabled || undefined}
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => choose(o)}
                      className={cx(
                        'flex cursor-pointer items-center justify-between gap-2 px-4 py-2 text-13',
                        o.disabled ? 'cursor-not-allowed text-fg-disabled' : 'text-fg-strong',
                        i === active && !o.disabled && 'bg-surface-muted',
                        isSel && 'font-semibold text-primary',
                      )}
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{o.label}</span>
                        {o.description && <span className="truncate text-12 font-normal text-fg-muted">{o.description}</span>}
                      </span>
                      {isSel && (
                        <span className="size-icon-sm shrink-0" aria-hidden>
                          <CheckIcon />
                        </span>
                      )}
                    </li>
                  );
                })}
                {onAddNew && (
                  <li
                    id={`${listId}-${filtered.length}`}
                    role="option"
                    aria-selected={false}
                    onMouseEnter={() => setActive(filtered.length)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onAddNew(query);
                      close(false);
                    }}
                    className={cx(
                      'sticky bottom-0 mt-1 flex cursor-pointer items-center gap-2 border-t border-line-subtle bg-surface px-4 py-2.5 text-13 font-semibold text-primary',
                      active === filtered.length && 'bg-surface-muted',
                    )}
                  >
                    <span className="size-icon-sm" aria-hidden>
                      <PlusIcon />
                    </span>
                    {addNewLabel}
                    {query && <span className="truncate font-normal">"{query}"</span>}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </Field>
  );
}
