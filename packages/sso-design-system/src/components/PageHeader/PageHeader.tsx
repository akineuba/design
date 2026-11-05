import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export interface PageHeaderProps {
  title: ReactNode;
  /** Inline marker after the title, e.g. <Tag>3 / 3 used</Tag>. */
  badge?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional back link above the title, e.g. { label: 'Tenants', href: '#tenants' }. */
  back?: { label: string; href?: string; onClick?: () => void };
}

/** Page title block. Same anatomy as the ERP: 28px bold title, 14px muted subtitle, actions right. */
export function PageHeader({ title, badge, subtitle, actions, back }: PageHeaderProps) {
  return (
    <header className="sso-page-header">
      {back && (
        <a
          className="sso-page-header__back"
          href={back.href ?? '#'}
          onClick={(e) => { if (back.onClick) { e.preventDefault(); back.onClick(); } }}
        >
          <ArrowLeft aria-hidden />
          {back.label}
        </a>
      )}
      <div className="sso-page-header__row">
        <div className="sso-page-header__text">
          <div className="sso-page-header__title-row">
            <h1 className="sso-page-header__title">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="sso-page-header__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="sso-page-header__actions">{actions}</div>}
      </div>
    </header>
  );
}
