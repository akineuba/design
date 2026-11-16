import { NavLink, useNavigate } from 'react-router-dom';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { ComponentType, SVGProps } from 'react';
import { LucideActivityIcon, LucideAwardIcon, LucideChartLineIcon, Menu, MenuTrigger, PeopleIcon, cn } from '@ds';
import chevronDown from '../assets/shared/chevron-down.svg';
import { Logo } from './Logo';
import { SiteButtonLink } from './SiteButton';
import { ThemeToggle } from './ThemeToggle';

/**
 * The Features menu lists this site's four features, in the layout of Figma `feature-list-card` (364:8564): icon,
 * title, one-line description, plus a "Learn more" cue. Each item scrolls to its card on the homepage.
 * Icons are design-system glyphs (currentColor), so they follow the theme; `stroke` evens out the 16px lucide and
 * 24px vuesax drawings at the 24px display size (about 1.5px).
 */
export const FEATURE_LINKS: { id: string; title: string; body: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; stroke: number }[] = [
  { id: 'contact-management', title: 'Contact Management', body: 'Profiles and contact lists in one place', Icon: PeopleIcon, stroke: 1.5 },
  { id: 'deal-management', title: 'Deal Management', body: 'Pipelines, stages and deal ownership', Icon: LucideChartLineIcon, stroke: 1 },
  { id: 'activities-reporting', title: 'Activities & Reporting', body: 'Activity timelines and exportable reports', Icon: LucideActivityIcon, stroke: 1 },
  { id: 'budget-targets', title: 'Budget & Targets', body: 'Plan budgets and track team targets', Icon: LucideAwardIcon, stroke: 1 },
];

const navLink = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xs text-body transition-colors hover:text-site-red focus-visible:outline-none focus-visible:shadow-focus',
    isActive ? 'font-semibold text-site-red' : 'text-text-black',
  );

/** Marketing header (Figma `Header` instance 691:4901). Sticky, with the theme toggle at the far right. */
export function SiteHeader() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border-module-header bg-surface-default shadow-site-header">
      <div className="relative flex items-center gap-20 px-50 py-2.5">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <nav aria-label="Main" className="flex w-site-nav items-center justify-between">
            <NavLink to="/" end className={navLink}>
              Home
            </NavLink>
            <Menu>
              <MenuTrigger className="group flex items-center gap-1.25 rounded-xs text-body text-text-black hover:text-site-red focus-visible:outline-none focus-visible:shadow-focus">
                Features
                <img src={chevronDown} alt="" className="size-4 -scale-y-100 transition-transform duration-base ease-standard group-data-[state=open]:scale-y-100" />
              </MenuTrigger>
              <RadixMenu.Portal>
                <RadixMenu.Content
                  align="start"
                  sideOffset={16}
                  className="z-50 flex w-site-menu flex-col gap-6 rounded-md bg-surface-default p-8 shadow-site-menu focus-visible:outline-none data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in"
                >
                  {FEATURE_LINKS.map((f, i) => (
                    <RadixMenu.Item
                      key={f.id}
                      onSelect={() => navigate(`/#${f.id}`)}
                      style={{ animationDelay: `${40 + i * 30}ms` }}
                      className="group/item -m-2 flex animate-value-in cursor-pointer items-start gap-2.5 rounded-md p-2 outline-none transition-colors duration-fast data-[highlighted]:bg-surface-subtle"
                    >
                      <f.Icon aria-hidden="true" strokeWidth={f.stroke} className="size-6 shrink-0 text-site-menu-title" />
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="text-label leading-site-22 text-site-menu-title">{f.title}</span>
                        <span className="text-body-sm leading-site-18 text-site-menu-text">{f.body}</span>
                        <span className="flex items-center gap-1 text-label-sm text-site-red">
                          Learn more
                          <span aria-hidden="true" className="transition-transform duration-base ease-standard group-data-[highlighted]/item:translate-x-1">→</span>
                        </span>
                      </span>
                    </RadixMenu.Item>
                  ))}
                </RadixMenu.Content>
              </RadixMenu.Portal>
            </Menu>
            <NavLink to="/pricing" className={navLink}>
              Pricing
            </NavLink>
            <NavLink to="/contact" className={navLink}>
              Contact Us
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <SiteButtonLink to="/pricing" variant="header">
              Get Started
            </SiteButtonLink>
            <SiteButtonLink to="/checkout/account" variant="header-outline">
              Sign In
            </SiteButtonLink>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
