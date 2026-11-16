import { NavLink, useNavigate } from 'react-router-dom';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { Menu, MenuTrigger, cn } from '@ds';
import chevronDown from '../assets/shared/chevron-down.svg';
import serviceDesk from '../assets/shared/menu-service-desk.svg';
import businessDev from '../assets/shared/menu-business-dev.svg';
import marketing from '../assets/shared/menu-marketing.svg';
import orbitAi from '../assets/shared/menu-orbit-ai.svg';
import { Logo } from './Logo';
import { SiteButtonLink } from './SiteButton';
import { ThemeToggle } from './ThemeToggle';

/**
 * wCRM modules in the Features menu (Figma `feature-list-card`, 364:8564). This site is the Business Development
 * page, so that item scrolls to its features; the other modules open Contact Sales with the module named.
 */
export const MODULES = [
  { title: 'Service Desk', body: 'Resolve issues faster with smart ticketing', icon: serviceDesk, to: '/contact?module=Service%20Desk' },
  { title: 'Business Development', body: 'Turn leads into lasting partnerships', icon: businessDev, to: '/#features' },
  { title: 'Marketing', body: 'Plan, launch, and measure campaigns', icon: marketing, to: '/contact?module=Marketing' },
  { title: 'Orbit AI', body: 'Intelligent insights across your workflows', icon: orbitAi, to: '/contact?module=Orbit%20AI' },
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
                  {MODULES.map((m, i) => (
                    <RadixMenu.Item
                      key={m.title}
                      onSelect={() => navigate(m.to)}
                      style={{ animationDelay: `${40 + i * 30}ms` }}
                      className="-m-2 flex animate-value-in cursor-pointer items-start gap-2.5 rounded-md p-2 outline-none transition-colors duration-fast data-[highlighted]:bg-surface-subtle"
                    >
                      <img src={m.icon} alt="" className="site-invert-dark size-6 shrink-0" />
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="text-label leading-site-22 text-site-menu-title">{m.title}</span>
                        <span className="text-body-sm leading-site-18 text-site-menu-text">{m.body}</span>
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
