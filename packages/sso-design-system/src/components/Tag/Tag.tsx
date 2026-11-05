import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface TagProps {
  children: ReactNode;
  /** `primary` is the uppercase marker (e.g. PRIMARY, 3 / 3 USED). `neutral` is grey. */
  tone?: 'primary' | 'neutral';
  className?: string;
}

/** Small uppercase marker that labels an object, not its state. For state use StatusPill. */
export function Tag({ children, tone = 'primary', className }: TagProps) {
  return <span className={cx('sso-tag', `sso-tag--${tone}`, className)}>{children}</span>;
}

export interface ChipProps {
  children: ReactNode;
  /** `feature` shows a leading check (plan features). `removable` shows an × (assigned roles). */
  kind?: 'feature' | 'removable' | 'plain';
  onRemove?: () => void;
  className?: string;
}

export function Chip({ children, kind = 'plain', onRemove, className }: ChipProps) {
  return (
    <span className={cx('sso-chip', `sso-chip--${kind}`, className)}>
      {kind === 'feature' && <Check aria-hidden strokeWidth={2.5} />}
      {children}
      {kind === 'removable' && (
        <button type="button" className="sso-chip__remove" onClick={onRemove} aria-label={`Remove ${String(children)}`}>
          <X aria-hidden strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}
