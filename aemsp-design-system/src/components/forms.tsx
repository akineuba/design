import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Icon, IconName } from './Icon';
import { cx, Button } from './primitives';

/* ---------- popover helper ---------- */
export function usePopover(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return { open, setOpen, ref };
}

/* ---------- Field wrapper ---------- */
export interface FieldProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  hint?: React.ReactNode;
  error?: string;
  success?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
  counter?: string;
}
export function Field({ label, required, optional, hint, error, success, id, className, children, counter }: FieldProps) {
  return (
    <div className={cx('ae-field', className)}>
      {label && (
        <label className="ae-label" htmlFor={id}>
          {label}
          {required && <span className="ae-label__req" aria-hidden>*</span>}
          {optional && <span className="ae-label__opt">(optional)</span>}
        </label>
      )}
      {children}
      {(error || success || hint || counter) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          {error ? <span className="ae-hint ae-hint--error" id={id && `${id}-msg`}><Icon name="error" size={14} />{error}</span>
            : success ? <span className="ae-hint ae-hint--success" id={id && `${id}-msg`}><Icon name="check-circle" size={14} />{success}</span>
            : hint ? <span className="ae-hint" id={id && `${id}-msg`}>{hint}</span> : <span />}
          {counter && <span className="ae-counter">{counter}</span>}
        </div>
      )}
    </div>
  );
}

/* ---------- Input ---------- */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  success?: string;
  icon?: IconName;
  prefix?: string;
  suffix?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md';
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}
export function Input({ label, hint, error, success, icon, prefix, suffix, loading, size = 'md', optional, required, disabled, readOnly, multiline, rows = 4, id, className, maxLength, value, defaultValue, onChange, ...rest }: InputProps) {
  const auto = useId();
  const iid = id ?? auto;
  const [len, setLen] = useState(String(value ?? defaultValue ?? '').length);
  const common = {
    id: iid, className: 'ae-control__input', disabled, readOnly, required, maxLength, value, defaultValue,
    'aria-invalid': !!error || undefined, 'aria-describedby': error || hint || success ? `${iid}-msg` : undefined,
    onChange: (e: React.ChangeEvent<any>) => { setLen(e.target.value.length); onChange?.(e); },
  };
  return (
    <Field label={label} hint={hint} error={error} success={success} id={iid} required={required} optional={optional} className={className}
      counter={multiline && maxLength ? `${len}/${maxLength}` : undefined}>
      <div className={cx('ae-control', size === 'sm' && 'ae-control--sm', error && 'ae-control--error', success && 'ae-control--success', disabled && 'ae-control--disabled', readOnly && 'ae-control--readonly')}>
        {prefix && <span className="ae-control__prefix">{prefix}</span>}
        {icon && <span className="ae-control__adorn"><Icon name={icon} size={18} /></span>}
        {multiline ? <textarea rows={rows} {...common} {...(rest as any)} /> : <input {...common} {...rest} />}
        {(suffix || loading || success || readOnly) && (
          <span className="ae-control__adorn ae-control__adorn--end">
            {loading && <Icon name="refresh" size={16} className="ae-spin" />}
            {success && !loading && <Icon name="check-circle" size={16} style={{ color: 'var(--green-500)' }} />}
            {readOnly && <Icon name="lock" size={15} />}
            {suffix}
          </span>
        )}
      </div>
    </Field>
  );
}

export function SearchInput({ placeholder = 'Search…', value, onChange, width = 280 }: { placeholder?: string; value?: string; onChange?: (v: string) => void; width?: number | string }) {
  const [v, setV] = useState(value ?? '');
  return (
    <div className="ae-control ae-search" style={{ width }}>
      <span className="ae-control__adorn"><Icon name="search" size={16} /></span>
      <input className="ae-control__input" placeholder={placeholder} value={v} aria-label={placeholder}
        onChange={(e) => { setV(e.target.value); onChange?.(e.target.value); }} />
      {v && <button type="button" className="ae-tag__x" style={{ marginRight: 10 }} onClick={() => { setV(''); onChange?.(''); }} aria-label="Clear search"><Icon name="close" size={14} /></button>}
    </div>
  );
}

/* ---------- Select ---------- */
export interface Option { value: string; label: string; hint?: string; icon?: IconName; }
export interface SelectProps {
  label?: string; options: Option[]; value?: string; onChange?: (v: string) => void; placeholder?: string;
  required?: boolean; optional?: boolean; error?: string; hint?: string; disabled?: boolean; searchable?: boolean;
  onAddNew?: (query: string) => void; addNewLabel?: string; size?: 'sm' | 'md'; defaultOpen?: boolean;
}
export function Select({ label, options, value, onChange, placeholder = 'Select…', required, optional, error, hint, disabled, searchable = true, onAddNew, addNewLabel = 'Add new', size = 'md', defaultOpen }: SelectProps) {
  const id = useId();
  const pop = usePopover(defaultOpen);
  const [sel, setSel] = useState(value);
  const [q, setQ] = useState('');
  useEffect(() => setSel(value), [value]);
  const current = options.find((o) => o.value === sel);
  const list = useMemo(() => options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())), [options, q]);
  return (
    <Field label={label} required={required} optional={optional} error={error} hint={hint} id={id}>
      <div className="ae-pop-anchor" ref={pop.ref} style={{ display: 'flex', width: '100%' }}>
        <button id={id} type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={pop.open}
          className={cx('ae-control ae-select', size === 'sm' && 'ae-control--sm', error && 'ae-control--error', disabled && 'ae-control--disabled')}
          onClick={() => pop.setOpen(!pop.open)}>
          {current?.icon && <span className="ae-control__adorn"><Icon name={current.icon} size={16} /></span>}
          <span className={cx('ae-select__value', !current && 'ae-select__value--ph')}>{current?.label ?? placeholder}</span>
          <Icon name="chevron-down" size={16} style={{ color: 'var(--text-muted)' }} />
        </button>
        {pop.open && (
          <div className="ae-pop ae-select-pop" role="listbox">
            {searchable && (
              <div className="ae-select-pop__search">
                <div className="ae-control ae-search"><span className="ae-control__adorn"><Icon name="search" size={15} /></span>
                  <input autoFocus className="ae-control__input" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search options" /></div>
              </div>
            )}
            {list.map((o) => (
              <button key={o.value} type="button" role="option" aria-selected={o.value === sel} className="ae-menu-item" data-active={o.value === sel}
                onClick={() => { setSel(o.value); onChange?.(o.value); pop.setOpen(false); setQ(''); }}>
                {o.icon && <Icon name={o.icon} size={16} />}
                <span style={{ display: 'flex', flexDirection: 'column' }}>{o.label}{o.hint && <span className="ae-muted" style={{ fontSize: 12, fontWeight: 400 }}>{o.hint}</span>}</span>
                {o.value === sel && <span className="ae-menu-item__check"><Icon name="check" size={16} /></span>}
              </button>
            ))}
            {!list.length && <div className="ae-muted" style={{ padding: '10px' }}>No matches for “{q}”</div>}
            {onAddNew && (<><div className="ae-menu-sep" />
              <button type="button" className="ae-menu-item ae-select-add" onClick={() => { onAddNew(q); pop.setOpen(false); }}>
                <Icon name="plus" size={16} />{q ? `${addNewLabel} “${q}”` : addNewLabel}
              </button></>)}
          </div>
        )}
      </div>
    </Field>
  );
}

/* ---------- Filter dropdown (Figma “Selector Dropdown”) ---------- */
export function FilterDropdown({ label = 'Filter', options, value, onChange, multi, defaultOpen }: { label?: string; options: Option[]; value?: string | string[]; onChange?: (v: any) => void; multi?: boolean; defaultOpen?: boolean }) {
  const pop = usePopover(defaultOpen);
  const [sel, setSel] = useState<string[]>(Array.isArray(value) ? value : value && value !== 'all' ? [value] : []);
  const active = sel.length > 0;
  const shown = !active ? 'All' : sel.length === 1 ? options.find((o) => o.value === sel[0])?.label : `${sel.length} selected`;
  const toggle = (v: string) => {
    const next = multi ? (sel.includes(v) ? sel.filter((x) => x !== v) : [...sel, v]) : v === 'all' ? [] : [v];
    setSel(next); onChange?.(multi ? next : next[0] ?? 'all');
    if (!multi) pop.setOpen(false);
  };
  return (
    <div className="ae-pop-anchor" ref={pop.ref}>
      <button type="button" className={cx('ae-filter', active && 'ae-filter--active')} aria-haspopup="listbox" aria-expanded={pop.open} onClick={() => pop.setOpen(!pop.open)}>
        <span className="ae-filter__text"><span>{label}:</span><span className="ae-filter__value">{shown}</span></span>
        <Icon name="chevron-down" size={14} />
      </button>
      {pop.open && (
        <div className="ae-pop" role="listbox" aria-multiselectable={multi}>
          {!multi && <button type="button" className="ae-menu-item" onClick={() => toggle('all')}>All{!active && <span className="ae-menu-item__check"><Icon name="check" size={16} /></span>}</button>}
          {options.map((o) => multi ? (
            <label key={o.value} className="ae-menu-item"><Checkbox checked={sel.includes(o.value)} onChange={() => toggle(o.value)} label={o.label} /></label>
          ) : (
            <button key={o.value} type="button" className="ae-menu-item" onClick={() => toggle(o.value)}>
              {o.label}{sel.includes(o.value) && <span className="ae-menu-item__check"><Icon name="check" size={16} /></span>}
            </button>
          ))}
          {multi && active && (<><div className="ae-menu-sep" /><button type="button" className="ae-menu-item" onClick={() => { setSel([]); onChange?.([]); }}>Clear selection</button></>)}
        </div>
      )}
    </div>
  );
}

/* ---------- Checkbox / Radio / Switch ---------- */
export function Checkbox({ label, checked, defaultChecked, indeterminate, disabled, onChange, description, ariaLabel }: { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; indeterminate?: boolean; disabled?: boolean; onChange?: (c: boolean) => void; description?: string; ariaLabel?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [c, setC] = useState(!!(checked ?? defaultChecked));
  useEffect(() => { if (checked !== undefined) setC(checked); }, [checked]);
  useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label className={cx('ae-check', disabled && 'ae-check--disabled')} onClick={(e) => e.stopPropagation()}>
      <input ref={ref} type="checkbox" checked={c} disabled={disabled} aria-label={ariaLabel}
        onChange={(e) => { setC(e.target.checked); onChange?.(e.target.checked); }} />
      <span className="ae-check__box">{indeterminate ? <Icon name="minus" size={12} /> : c && <Icon name="tick" size={10} />}</span>
      {label && <span>{label}{description && <span className="ae-check__desc">{description}</span>}</span>}
    </label>
  );
}

export function RadioGroup({ name, options, value, onChange, direction = 'row', disabled, cards, label }: { name: string; options: (Option & { description?: string })[]; value?: string; onChange?: (v: string) => void; direction?: 'row' | 'column'; disabled?: boolean; cards?: boolean; label?: string }) {
  const [v, setV] = useState(value);
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }} disabled={disabled}>
      {label && <legend className="ae-label" style={{ marginBottom: 10, padding: 0 }}>{label}</legend>}
      <div style={{ display: 'flex', flexDirection: direction, gap: cards ? 12 : direction === 'row' ? 24 : 14, flexWrap: 'wrap' }}>
        {options.map((o) => (
          <label key={o.value} className={cx('ae-check', disabled && 'ae-check--disabled', cards && 'ae-radio-card')}>
            <input type="radio" name={name} value={o.value} checked={v === o.value} onChange={() => { setV(o.value); onChange?.(o.value); }} />
            <span className="ae-radio__dot" />
            <span>
              <span style={{ fontWeight: cards ? 600 : 400 }}>{o.label}</span>
              {o.description && <span className="ae-check__desc">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Switch({ label, checked, defaultChecked, disabled, onChange, size = 'md', description }: { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (c: boolean) => void; size?: 'sm' | 'md'; description?: string }) {
  const [c, setC] = useState(!!(checked ?? defaultChecked));
  useEffect(() => { if (checked !== undefined) setC(checked); }, [checked]);
  return (
    <label className={cx('ae-check', disabled && 'ae-check--disabled')}>
      <input type="checkbox" role="switch" checked={c} disabled={disabled} aria-checked={c} onChange={(e) => { setC(e.target.checked); onChange?.(e.target.checked); }} />
      <span className={cx('ae-switch', size === 'sm' && 'ae-switch--sm')} />
      {label && <span>{label}{description && <span className="ae-check__desc">{description}</span>}</span>}
    </label>
  );
}

/* ---------- Segmented control ---------- */
export function SegmentedControl({ options, value, onChange, label = 'View' }: { options: { value: string; label?: string; icon?: IconName }[]; value?: string; onChange?: (v: string) => void; label?: string }) {
  const [v, setV] = useState(value ?? options[0]?.value);
  return (
    <div className="ae-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="ae-seg__btn" aria-pressed={v === o.value} aria-label={o.label ?? o.value}
          title={o.label} onClick={() => { setV(o.value); onChange?.(o.value); }}>
          {o.icon && <Icon name={o.icon} size={18} />}{o.label && !o.icon && o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Date picker ---------- */
const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const fmt = (d?: Date | null) => d ? d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
const same = (a?: Date | null, b?: Date | null) => !!a && !!b && a.toDateString() === b.toDateString();

export function DatePicker({ label, value, range, defaultOpen, error, required, placeholder, hint, onChange }: { label?: string; value?: Date | [Date, Date] | null; range?: boolean; defaultOpen?: boolean; error?: string; required?: boolean; placeholder?: string; hint?: string; onChange?: (v: any) => void }) {
  const id = useId();
  const pop = usePopover(defaultOpen);
  const init = Array.isArray(value) ? value : [value ?? null, null];
  const [start, setStart] = useState<Date | null>(init[0] as Date | null);
  const [end, setEnd] = useState<Date | null>(init[1] as Date | null);
  const [view, setView] = useState(() => { const d = start ?? new Date(2026, 10, 3); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const today = new Date(2026, 10, 3);
  const days = useMemo(() => {
    const first = (view.getDay() + 6) % 7;
    const s = new Date(view); s.setDate(1 - first);
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(s); d.setDate(s.getDate() + i); return d; });
  }, [view]);
  const pick = (d: Date) => {
    if (!range) { setStart(d); onChange?.(d); pop.setOpen(false); return; }
    if (!start || end) { setStart(d); setEnd(null); }
    else if (d < start) { setEnd(start); setStart(d); }
    else { setEnd(d); onChange?.([start, d]); }
  };
  const text = range ? (start ? `${fmt(start)} – ${end ? fmt(end) : '…'}` : '') : fmt(start);
  return (
    <Field label={label} id={id} error={error} required={required} hint={hint}>
      <div className="ae-pop-anchor" ref={pop.ref} style={{ display: 'flex', width: '100%' }}>
        <button id={id} type="button" className={cx('ae-control ae-select', error && 'ae-control--error')} aria-haspopup="dialog" aria-expanded={pop.open} onClick={() => pop.setOpen(!pop.open)}>
          <span className="ae-control__adorn"><Icon name="calendar" size={17} /></span>
          <span className={cx('ae-select__value', !text && 'ae-select__value--ph')} style={{ paddingLeft: 8 }}>{text || placeholder || (range ? 'Start date – End date' : 'DD MMM YYYY')}</span>
        </button>
        {pop.open && (
          <div className="ae-pop ae-cal" role="dialog" aria-label="Choose date">
            <div className="ae-cal__head">
              <button type="button" className="ae-icon-btn" aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}><Icon name="chevron-left" size={16} /></button>
              {view.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              <button type="button" className="ae-icon-btn" aria-label="Next month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}><Icon name="chevron-right" size={16} /></button>
            </div>
            <div className="ae-cal__grid">
              {DOW.map((d) => <span key={d} className="ae-cal__dow">{d}</span>)}
              {days.map((d) => {
                const inRange = range && start && end && d > start && d < end;
                return (
                  <button key={d.toISOString()} type="button" onClick={() => pick(d)} aria-pressed={same(d, start) || same(d, end)}
                    className={cx('ae-cal__day', d.getMonth() !== view.getMonth() && 'ae-cal__day--muted', same(d, today) && 'ae-cal__day--today', (same(d, start) || same(d, end)) && 'ae-cal__day--sel', inRange && 'ae-cal__day--range')}>
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
            <div className="ae-cal__foot">
              <Button size="sm" variant="ghost" onClick={() => { setStart(null); setEnd(null); onChange?.(null); }}>Clear</Button>
              <Button size="sm" variant="outline" onClick={() => { pick(today); }}>Today</Button>
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}

/* ---------- File upload ---------- */
export interface UploadFile { name: string; size: string; progress?: number; error?: string; }
export function FileUpload({ label, files: initial = [], accept = 'PDF, PNG or JPG', maxSize = '10 MB', disabled, multiple = true }: { label?: string; files?: UploadFile[]; accept?: string; maxSize?: string; disabled?: boolean; multiple?: boolean }) {
  const [files, setFiles] = useState(initial);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const add = (list: FileList | null) => {
    if (!list) return;
    setFiles((f) => [...f, ...Array.from(list).map((x) => ({ name: x.name, size: `${(x.size / 1024 / 1024).toFixed(1)} MB`, progress: 100 }))]);
  };
  return (
    <div className="ae-field">
      {label && <span className="ae-label">{label}</span>}
      <div className={cx('ae-drop', over && 'ae-drop--over', disabled && 'ae-drop--disabled')} role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled}
        onClick={() => !disabled && input.current?.click()} onKeyDown={(e) => e.key === 'Enter' && input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); !disabled && add(e.dataTransfer.files); }}>
        <span className="ae-drop__icon"><Icon name="upload" size={22} /></span>
        <span className="ae-drop__title">Drag files here or <u>browse</u></span>
        <span className="ae-hint">{accept} · up to {maxSize} each</span>
        <input ref={input} type="file" hidden multiple={multiple} disabled={disabled} onChange={(e) => add(e.target.files)} />
      </div>
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          {files.map((f, i) => (
            <div key={f.name + i} className="ae-file">
              <span className="ae-file__icon"><Icon name="file" size={18} /></span>
              <span className="ae-file__meta">
                <span className="ae-file__name">{f.name}</span>
                {f.error ? <span className="ae-hint ae-hint--error">{f.error}</span>
                  : f.progress !== undefined && f.progress < 100
                    ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 1 }}><div className="ae-progress ae-progress--sm"><div className="ae-progress__bar" style={{ width: `${f.progress}%` }} /></div></span><span className="ae-hint">{f.progress}%</span></span>
                    : <span className="ae-hint">{f.size} · Uploaded</span>}
              </span>
              <button type="button" className="ae-kebab" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}><Icon name="trash" size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Rich text ---------- */
export function RichTextField({ label, placeholder = 'Write a note…', defaultHTML, disabled, hint }: { label?: string; placeholder?: string; defaultHTML?: string; disabled?: boolean; hint?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cmd = (c: string) => { document.execCommand(c); ref.current?.focus(); };
  const tools: [IconName, string, string][] = [['bold', 'bold', 'Bold'], ['italic', 'italic', 'Italic'], ['underline', 'underline', 'Underline'], ['list', 'insertUnorderedList', 'Bulleted list'], ['list-ordered', 'insertOrderedList', 'Numbered list']];
  return (
    <div className="ae-field">
      {label && <span className="ae-label">{label}</span>}
      <div className={cx('ae-rte', disabled && 'ae-rte--disabled')}>
        <div className="ae-rte__bar" role="toolbar" aria-label="Formatting">
          {tools.map(([icon, c, l]) => <button key={c} type="button" aria-label={l} title={l} onMouseDown={(e) => { e.preventDefault(); cmd(c); }}><Icon name={icon} size={16} /></button>)}
        </div>
        <div ref={ref} className="ae-rte__area" contentEditable={!disabled} role="textbox" aria-multiline aria-label={label ?? 'Rich text'} data-placeholder={placeholder}
          suppressContentEditableWarning dangerouslySetInnerHTML={defaultHTML ? { __html: defaultHTML } : undefined} />
      </div>
      {hint && <span className="ae-hint">{hint}</span>}
    </div>
  );
}
