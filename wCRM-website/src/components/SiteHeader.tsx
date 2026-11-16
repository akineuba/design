import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuContent, MenuItem, MenuTrigger, cn } from '@ds';
import chevronDown from '../assets/shared/chevron-down.svg';
import { Logo } from './Logo';
import { SiteButtonLink } from './SiteButton';
import { ThemeToggle } from './ThemeToggle';

/** Sections of the homepage features grid, listed under "Features". */
export const FEATURE_LINKS = [
  { id: 'contact-management', label: 'Contact Management' },
  { id: 'deal-management', label: 'Deal Management' },
  { id: 'activities-reporting', label: 'Activities & Reporting' },
  { id: 'budget-targets', label: 'Budget & Targets' },
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
                <img src={chevronDown} alt="" className="size-4 -scale-y-100 transition-transform group-data-[state=open]:scale-y-100" />
              </MenuTrigger>
              <MenuContent align="start" sideOffset={12}>
                {FEATURE_LINKS.map((f) => (
                  <MenuItem key={f.id} onSelect={() => navigate(`/#${f.id}`)}>
                    {f.label}
                  </MenuItem>
                ))}
              </MenuContent>
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
