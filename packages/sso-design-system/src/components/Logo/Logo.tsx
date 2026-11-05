import ssoLogo from '../../assets/logo-sso-portal.png';
import wordmark from '../../assets/logo-wbizmanager.png';
import mark from '../../assets/logo-mark.png';
import { cx } from '../../utils/cx';

export type LogoVariant = 'sso' | 'wordmark' | 'mark';

export interface LogoProps {
  /**
   * `sso` is the signed-in portal lockup (wBizManager + "SSO Portal").
   * `wordmark` is the public wBizManager logo used before sign-in.
   * `mark` is the symbol alone, for the collapsed sidebar.
   */
  variant?: LogoVariant;
  /** Rendered height in px. Width follows the artwork's ratio. */
  height?: number;
  className?: string;
}

const SOURCES: Record<LogoVariant, { src: string; alt: string; defaultHeight: number }> = {
  sso: { src: ssoLogo, alt: 'wBizManager SSO Portal', defaultHeight: 38 },
  wordmark: { src: wordmark, alt: 'wBizManager', defaultHeight: 40 },
  mark: { src: mark, alt: 'wBizManager', defaultHeight: 32 },
};

export function Logo({ variant = 'sso', height, className }: LogoProps) {
  const { src, alt, defaultHeight } = SOURCES[variant];
  return (
    <img
      className={cx('sso-logo', className)}
      src={src}
      alt={alt}
      style={{ height: height ?? defaultHeight }}
    />
  );
}
