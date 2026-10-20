import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { AddCircleIcon, CheckIcon, ChevronDownIcon } from '../../icons';

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
  /** Extra row at the bottom of the menu, e.g. "Add New" (Figma: customer popup, accounting). */
  menuAction?: { label: string; onSelect: () => void };
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
}

const heights: Record<SelectSize, string> = { sm: 'h-control-sm px-3', md: 'h-control-md px-3.5', lg: 'h-control-lg px-3.5' };

/**
 * Dropdown select. Figma: dropdown-inner (new features, 7092:1508) for the closed field and the
 * customer "popup" (accounting, 5184:46439) for the open menu. Keyboard: arrows, Home/End, Enter,
 * Space and Escape, following the WAI-ARIA select-only combobox pattern.
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
  id,
  name,
  className,
  'aria-label': ariaLabel,
}: SelectProps) {
  const autoId = useId();
  const baseId = id ?? `wbiz-select-${autoId}`;
  const listId = `${baseId}-listbox`;
  const messageId = `${baseId}-message`;
  const [inner, setInner] = useState<string | null>(defaultValue);
  const selected = value !== undefined ? value : inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const enabled = useMemo(() => options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0), [options]);
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

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
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
        <span id={`${baseId}-label`} className="font-sans text-xs font-medium text-fg-muted">
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
          <ul id={listId} role="listbox" aria-labelledby={label ? `${baseId}-label` : undefined} className="max-h-menu overflow-y-auto py-1.5">
            {options.map((o, i) => {
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
          </ul>
          {menuAction && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setOpen(false); menuAction.onSelect(); }}
              className="flex w-full items-center gap-2.5 border-t border-line-subtle px-3 py-2 font-sans text-sm text-primary hover:bg-primary-tint focus-visible:outline-none focus-visible:bg-primary-tint"
            >
              <span className="size-icon shrink-0"><AddCircleIcon /></span>
              {menuAction.label}
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
