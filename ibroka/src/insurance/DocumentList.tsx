import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { formatDate } from '../lib/money';
import { DocumentIcon, DownloadIcon, PdfIcon, ViewIcon } from '../icons';

export interface PolicyDocument {
  id: string;
  name: string;
  /** "Policy schedule", "Debit note", "Certificate", "KYC". */
  kind: string;
  uploadedAt: Date | string;
  uploadedBy?: string;
  sizeKb?: number;
}

export interface DocumentListProps {
  documents: PolicyDocument[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  /** Shown when there are no documents, usually an Upload button. */
  emptyAction?: ReactNode;
  className?: string;
}

/** Documents attached to a policy, client or claim: schedule, debit note, certificate, KYC. */
export function DocumentList({ documents, onView, onDownload, emptyAction, className }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className={cx('flex flex-col items-center gap-3 rounded-lg border border-dashed border-line-strong px-6 py-8 text-center', className)}>
        <p className="text-13 text-fg-muted">No documents yet.</p>
        {emptyAction}
      </div>
    );
  }
  return (
    <ul className={cx('flex flex-col divide-y divide-[var(--ib-color-line-row)] rounded-lg border border-line-subtle bg-surface', className)}>
      {documents.map((d) => {
        const pdf = d.name.toLowerCase().endsWith('.pdf');
        return (
          <li key={d.id} className="flex items-center gap-3 px-4 py-3">
            <span className={cx('size-6 shrink-0', pdf ? 'text-danger' : 'text-fg-muted')} aria-hidden>
              {pdf ? <PdfIcon /> : <DocumentIcon />}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-13 font-medium text-fg-strong">{d.name}</span>
              <span className="truncate text-12 text-fg-muted">
                {d.kind} · {formatDate(d.uploadedAt)}
                {d.uploadedBy && ` · ${d.uploadedBy}`}
                {d.sizeKb && ` · ${d.sizeKb > 1024 ? `${(d.sizeKb / 1024).toFixed(1)} MB` : `${d.sizeKb} KB`}`}
              </span>
            </div>
            <div className="flex shrink-0 gap-1">
              {onView && (
                <button type="button" aria-label={`View ${d.name}`} onClick={() => onView(d.id)} className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted hover:text-fg-strong ib-focus">
                  <span className="size-icon-sm">
                    <ViewIcon />
                  </span>
                </button>
              )}
              {onDownload && (
                <button type="button" aria-label={`Download ${d.name}`} onClick={() => onDownload(d.id)} className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted hover:text-fg-strong ib-focus">
                  <span className="size-icon-sm">
                    <DownloadIcon />
                  </span>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
