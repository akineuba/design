import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldLabelClass } from '../../utils/field-label';
import { CloseIcon, FileIcon, UploadIcon } from '../../icons';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  /** The browser File, when the upload came from this component. */
  file?: File;
}

export interface FileUploadProps {
  label?: ReactNode;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  /** File types, as for `<input accept>`. */
  accept?: string;
  /** Largest file allowed, in MB. */
  maxSizeMb?: number;
  hint?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : n >= 1024 ? `${Math.round(n / 1024)} KB` : `${n} B`;

/**
 * Attach supporting documents: a dashed drop zone ("Drag files here or browse") and the list of
 * attached files with size and remove. Figma: attach docs / attached docs (journal, 282:6176, 308:5178).
 * Files over `maxSizeMb` are refused with a message.
 */
export function FileUpload({ label, files, onFilesChange, accept, maxSizeMb = 10, hint, disabled, className }: FileUploadProps) {
  const labelClass = useFieldLabelClass();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = (list: FileList | null) => {
    if (!list?.length) return;
    const ok: UploadedFile[] = [];
    const tooBig: string[] = [];
    Array.from(list).forEach((f) => (f.size > maxSizeMb * 1024 * 1024 ? tooBig.push(f.name) : ok.push({ id: `${f.name}-${f.size}-${f.lastModified}`, name: f.name, size: f.size, file: f })));
    setError(tooBig.length ? `${tooBig.join(', ')} ${tooBig.length === 1 ? 'is' : 'are'} larger than ${maxSizeMb} MB.` : null);
    if (ok.length) onFilesChange([...files, ...ok.filter((f) => !files.some((x) => x.id === f.id))]);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (!disabled) add(e.dataTransfer.files);
  };

  return (
    <div className={cx('flex w-full flex-col gap-2', className)}>
      {label && <span id={`${id}-label`} className={labelClass}>{label}</span>}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cx(
          'relative flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-5 text-center transition-colors',
          disabled ? 'border-line-subtle bg-surface-muted' : over ? 'border-primary bg-primary-subtle' : 'border-line bg-surface-page',
        )}
      >
        <span className="inline-flex size-control-md items-center justify-center rounded-full bg-primary-muted text-primary" aria-hidden>
          <span className="size-icon"><UploadIcon /></span>
        </span>
        <p className="font-sans text-sm text-fg">
          Drag files here or{' '}
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-focus disabled:text-fg-disabled"
          >
            browse
          </button>
        </p>
        <p className="font-sans text-xs text-fg-muted">{hint ?? `Up to ${maxSizeMb} MB per file`}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          tabIndex={-1}
          aria-labelledby={label ? `${id}-label` : undefined}
          onChange={(e) => { add(e.target.files); e.target.value = ''; }}
        />
      </div>
      {error && <p role="alert" className="font-sans text-sm text-error">{error}</p>}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Attached files">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 rounded-lg border border-line-subtle bg-surface px-3 py-2">
              <span className="size-icon shrink-0 text-icon-muted" aria-hidden><FileIcon /></span>
              <span className="min-w-0 flex-1 truncate font-sans text-sm text-fg-strong">{f.name}</span>
              <span className="shrink-0 font-sans text-xs text-fg-muted">{formatBytes(f.size)}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => onFilesChange(files.filter((x) => x.id !== f.id))}
                  className="inline-flex size-6 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted hover:text-error focus-visible:outline-none focus-visible:shadow-focus"
                >
                  <span className="size-icon-sm"><CloseIcon /></span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
