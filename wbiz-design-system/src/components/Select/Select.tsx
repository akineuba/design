import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldLabelClass } from '../../utils/field-label';
import { AddCircleIcon, CheckIcon, ChevronDownIcon, SearchIcon } from '../../icons';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  options: SelectOption[];
  /** Controlled value. Use with `onChange`. */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  size?: SelectSize;
  /**
   * "Add New" row at the bottom of the menu (Figma: customer popup, accounting). Open a centred
   * `Modal` from `onSelect` so the user can create the value without leaving the screen; it receives
   * the current search text to prefill the new record's name.
   */
  menuAction?: { label: string; onSelect: (query: string) => void };
  /** Search box at the top of the menu. On by default: every dropdown is searchable (see ui-rules). */
  searchable?: boolean;
  searchPlaceholder?: string;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
}

const heights: Record<SelectSize, string> = { sm: 'h-control-sm px-3', md: 'h-control-md px-3.5', lg: 'h-control-lg px-3.5' };

/**
 * Dropdown select. Figma: dropdown-inner (new features, 7092:1508) for the closed field and the
 * customer "popup" (accounting, 5184:46439) for the open menu. The menu opens with a search box
 * (derived; the Figma menu has none) and an optional "Add New" row. Keyboard: arrows, Home/End, Enter,
 * Space and Escape; typing goes to the search box.
 */
export function Select({
  options,
  value,
  defaultValue = null,
  onChange,
  label,
  placeholder = 'Select an option',
  hint,
  error,
  required,
  disabled,
  size = 'md',
  menuAction,
  searchable = true,
  searchPlaceholder = 'Search',
  id,
  name,
  className,
  'aria-label': ariaLabel,
}: SelectProps) {
  const labelClass = useFieldLabelClass();
  const autoId = useId();
  const baseId = id ?? `wbiz-select-${autoId}`;
  const listId = `${baseId}-listbox`;
  const messageId = `${baseId}-message`;
  const [inner, setInner] = useState<string | null>(defaultValue);
  const selected = value !== undefined ? value : inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () => options.map((o, i) => (!q || o.label.toLowerCase().includes(q) ? i : -1)).filter((i) => i >= 0),
    [options, q],
  );
  const enabled = useMemo(() => visible.filter((i) => !options[i].disabled), [visible, options]);
  const selectedOption = options.find((o) => o.value === selected);
  const message = error ?? hint;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
    if (!open) setQuery('');
  }, [open, searchable]);

  // Keep the highlighted option inside the filtered list.
  useEffect(() => {
    if (open && !enabled.includes(active)) setActive(enabled[0] ?? -1);
  }, [open, enabled, active]);

  const openMenu = () => {
    if (disabled) return;
    const idx = options.findIndex((o) => o.value === selected);
    setActive(idx >= 0 ? idx : enabled[0] ?? -1);
    setOpen(true);
  };

  const commit = (i: number) => {
    const opt = options[i];
    if (!opt || opt.disabled) return;
    if (value === undefined) setInner(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const move = (dir: 1 | -1) => {
    if (!enabled.length) return;
    const pos = enabled.indexOf(active);
    const next = pos === -1 ? enabled[0] : enabled[(pos + dir + enabled.length) % enabled.length];
    setActive(next);
  };

  const close = () => { setOpen(false); triggerRef.current?.focus(); };

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'ArrowUp': e.preventDefault(); move(-1); break;
      case 'Enter': e.preventDefault(); if (active >= 0) commit(active); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'Tab': setOpen(false); break;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (searchable && !open && e.key.length === 1 && e.key !== ' ' && !e.metaKey && !e.ctrlKey) {
      // Typing on the closed field opens it and starts a search.
      e.preventDefault();
      setQuery(e.key);
      openMenu();
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        open ? move(1) : openMenu();
        break;
      case 'ArrowUp':
        e.preventDefault();
        open ? move(-1) : openMenu();
        break;
      case 'Home':
        if (open) { e.preventDefault(); setActive(enabled[0] ?? -1); }
        break;
      case 'End':
        if (open) { e.preventDefault(); setActive(enabled[enabled.length - 1] ?? -1); }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        open ? commit(active) : openMenu();
        break;
      case 'Escape':
        if (open) { e.preventDefault(); setOpen(false); }
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  const fieldState = disabled
    ? 'cursor-not-allowed border-line-subtle bg-surface-muted text-fg-disabled'
    : error
      ? 'border-error bg-surface focus-visible:shadow-focus-error'
      : open
        ? 'border-primary bg-surface shadow-focus'
        : 'border-line bg-surface hover:border-line-strong focus-visible:border-primary focus-visible:shadow-focus';

  return (
    <div ref={rootRef} className={cx('relative flex w-full flex-col gap-1', className)}>
      {label && (
        <span id={`${baseId}-label`} className={labelClass}>
          {label}
          {required && <span className="ml-0.5 text-error" aria-hidden>*</span>}
        </span>
      )}
      <button
        ref={triggerRef}
        id={baseId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={label ? `${baseId}-label ${baseId}` : undefined}
        aria-label={label ? undefined : ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={message ? messageId : undefined}
        aria-activedescendant={open && active >= 0 ? `${baseId}-opt-${active}` : undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cx(
          'flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border text-left font-sans text-sm outline-none transition-[border-color,box-shadow] duration-150',
          heights[size],
          fieldState,
        )}
      >
        <span className={cx('truncate', selectedOption ? (disabled ? 'text-fg-disabled' : 'text-fg-strong') : 'text-fg-placeholder')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={cx('size-icon-sm shrink-0 text-icon-muted transition-transform duration-150', open && 'rotate-180')}>
          <ChevronDownIcon />
        </span>
      </button>
      {name && <input type="hidden" name={name} value={selected ?? ''} />}

      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full min-w-menu overflow-hidden rounded-lg border border-line bg-surface shadow-md">
          {searchable && (
            <label className="flex items-center gap-2 border-b border-line-subtle px-3 py-2">
              <span className="size-icon-sm shrink-0 text-icon-muted" aria-hidden><SearchIcon /></span>
              <input
                ref={searchRef}
                type="text"
                role="searchbox"
                aria-label={`Search ${typeof label === 'string' ? label.replace(/:$/, '') : ariaLabel ?? 'options'}`}
                aria-controls={listId}
                aria-activedescendant={active >= 0 ? `${baseId}-opt-${active}` : undefined}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent font-sans text-sm text-fg-strong outline-none placeholder:text-fg-placeholder"
              />
            </label>
          )}
          <ul id={listId} role="listbox" aria-labelledby={label ? `${baseId}-label` : undefined} className="max-h-menu overflow-y-auto py-1.5">
            {visible.map((i) => {
              const o = options[i];
              const isSel = o.value === selected;
              return (
                <li
                  key={o.value}
                  id={`${baseId}-opt-${i}`}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={o.disabled || undefined}
                  onMouseEnter={() => !o.disabled && setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(i)}
                  className={cx(
                    'flex cursor-pointer items-center justify-between gap-2 px-3 py-2 font-sans text-sm',
                    o.disabled ? 'cursor-not-allowed text-fg-disabled' : isSel ? 'font-medium text-primary' : 'text-fg-muted',
                    i === active && !o.disabled && 'bg-surface-muted',
                  )}
                >
                  <span className="truncate">{o.label}</span>
                  {isSel && <span className="size-icon-sm shrink-0"><CheckIcon /></span>}
                </li>
              );
            })}
            {visible.length === 0 && (
              <li role="presentation" className="px-3 py-2 font-sans text-sm text-fg-muted">No matches for "{query.trim()}"</li>
            )}
          </ul>
          {menuAction && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                // Focus the field first so the quick-add modal returns focus here when it closes.
                const text = query.trim();
                setOpen(false);
                triggerRef.current?.focus();
                menuAction.onSelect(text);
              }}
              className="flex w-full items-center gap-2.5 border-t border-line-subtle px-3 py-2 font-sans text-sm text-primary hover:bg-primary-tint focus-visible:outline-none focus-visible:bg-primary-tint"
            >
              <span className="size-icon shrink-0"><AddCircleIcon /></span>
              {query.trim() && visible.length === 0 ? `${menuAction.label}: "${query.trim()}"` : menuAction.label}
            </button>
          )}
        </div>
      )}

      {message && (
        <p id={messageId} className={cx('font-sans text-sm', error ? 'text-error' : 'text-fg-muted')}>
          {message}
        </p>
      )}
    </div>
  );
}
