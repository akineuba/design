import { useId } from 'react';
import { usePopover } from '../lib/usePopover';
import { ColumnsIcon } from '../icons';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

export interface ColumnOption {
  id: string;
  label: string;
  /** The record-name column can't be hidden (UI rule 24). */
  locked?: boolean;
}

export interface ColumnCustomizerProps {
  columns: ColumnOption[];
  visible: string[];
  onChange: (visible: string[]) => void;
  onReset?: () => void;
  defaultOpen?: boolean;
}

/** "Columns" button with a checklist of columns. On every report and every table with more than ~6 columns. */
export function ColumnCustomizer({ columns, visible, onChange, onReset, defaultOpen }: ColumnCustomizerProps) {
  const { open, toggle, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultOpen);
  const id = useId();
  const set = new Set(visible);
  return (
    <div ref={rootRef} className="relative">
      <Button ref={triggerRef} variant="outline" leadingIcon={<ColumnsIcon />} aria-expanded={open} aria-controls={id} onClick={toggle}>
        Columns
      </Button>
      {open && (
        <div id={id} role="dialog" aria-label="Customize columns" className="absolute right-0 z-30 mt-2 w-64 animate-fade-in rounded-lg border border-line-subtle bg-surface shadow-pop">
          <p className="border-b border-line-subtle px-4 py-3 text-13 font-semibold text-fg-strong">Show columns</p>
          <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto p-3">
            {columns.map((c) => (
              <li key={c.id} className="rounded-md px-1.5 py-1.5 hover:bg-surface-muted">
                <Checkbox
                  label={c.locked ? `${c.label} (always shown)` : c.label}
                  checked={c.locked || set.has(c.id)}
                  disabled={c.locked}
                  onChange={(e) => onChange(e.target.checked ? [...visible, c.id] : visible.filter((v) => v !== c.id))}
                />
              </li>
            ))}
          </ul>
          {onReset && (
            <div className="border-t border-line-subtle px-4 py-2.5">
              <Button size="sm" variant="tertiary" onClick={onReset}>
                Reset to default
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
