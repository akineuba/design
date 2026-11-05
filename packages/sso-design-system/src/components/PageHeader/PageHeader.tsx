import type { ReactNode } from 'react';

export interface PageHeaderProps {
  /** Blue uppercase label naming the area (e.g. SETTINGS, ACCESS CONTROL). Signature SSO pattern. */
  eyebrow?: string;
  title: ReactNode;
  /** Inline marker after the title, e.g. <Tag>3 / 3 used</Tag>. */
  badge?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, badge, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="sso-page-header">
      <div className="sso-page-header__text">
        {eyebrow && <p className="sso-eyebrow">{eyebrow}</p>}
        <div className="sso-page-header__title-row">
          <h1 className="sso-page-header__title">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="sso-page-header__subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="sso-page-header__actions">{actions}</div>}
    </header>
  );
}
