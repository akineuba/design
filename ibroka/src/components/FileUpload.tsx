import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon, CloudUploadIcon, FileIcon, PdfIcon } from '../icons';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  /** 0-100 while uploading. */
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  label?: ReactNode;
  /** "PDF, JPG or PNG, up to 10 MB". */
  hint?: string;
  accept?: string;
  multiple?: boolean;
  files: UploadedFile[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

const kb = (n: number) => (n > 1_048_576 ? `${(n / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/** Drop zone plus file list. Policy documents, KYC files, claim evidence. */
export function FileUpload({ label, hint = 'PDF, JPG or PNG, up to 10 MB', accept, multiple = true, files, onAdd, onRemove, disabled }: FileUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const [over, setOver] = useState(false);
  const drop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (!disabled) onAdd(Array.from(e.dataTransfer.files));
  };
  return (
    <div className="flex flex-col gap-2.5">
      {label && <span className="text-13 font-medium text-fg-strong">{label}:</span>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={drop}
        className={cx(
          'flex flex-col items-center gap-2 rounded-lg border-2 border-dashed px-6 py-7 text-center transition-colors',
          disabled ? 'border-line bg-surface-muted' : over ? 'border-brand bg-brand-subtle' : 'border-line-strong bg-surface',
        )}
      >
        <span className={cx('size-8', disabled ? 'text-fg-disabled' : 'text-primary')} aria-hidden>
          <CloudUploadIcon />
        </span>
        <p className={cx('text-13', disabled ? 'text-fg-muted' : 'text-fg-strong')}>
          Drag files here or{' '}
          <button type="button" disabled={disabled} onClick={() => input.current?.click()} className="rounded font-semibold text-primary underline ib-focus disabled:text-fg-disabled">
            browse
          </button>
        </p>
        <p id={`${id}-hint`} className="text-12 text-fg-muted">
          {hint}
        </p>
        <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-label={typeof label === 'string' ? `Upload ${label}` : 'Upload files'} accept={accept} multiple={multiple} aria-describedby={`${id}-hint`} onChange={(e) => onAdd(Array.from(e.target.files ?? []))} />
      </div>
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f) => (
            <li key={f.id} className={cx('flex items-center gap-3 rounded-md border px-3 py-2.5', f.error ? 'border-danger bg-danger-subtle' : 'border-line-subtle bg-surface')}>
              <span className={cx('size-icon shrink-0', f.name.toLowerCase().endsWith('.pdf') ? 'text-danger' : 'text-fg-muted')} aria-hidden>
                {f.name.toLowerCase().endsWith('.pdf') ? <PdfIcon /> : <FileIcon />}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex justify-between gap-2 text-13">
                  <span className="truncate font-medium text-fg-strong">{f.name}</span>
                  <span className="shrink-0 text-fg-muted">{f.error ? '' : f.progress !== undefined && f.progress < 100 ? `${f.progress}%` : kb(f.size)}</span>
                </div>
                {f.error ? (
                  <span className="text-12 text-danger">{f.error}</span>
                ) : (
                  f.progress !== undefined &&
                  f.progress < 100 && (
                    <span className="h-1 overflow-hidden rounded-full bg-surface-track" role="progressbar" aria-valuenow={f.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Uploading ${f.name}`}>
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${f.progress}%` }} />
                    </span>
                  )
                )}
              </div>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => onRemove(f.id)} className="inline-flex size-7 shrink-0 items-center justify-center rounded text-fg-muted hover:bg-surface-muted ib-focus">
                <span className="size-icon-sm">
                  <CloseIcon />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
