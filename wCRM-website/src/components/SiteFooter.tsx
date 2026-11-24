import { Link } from 'react-router-dom';
import logoGrey from '../assets/shared/wragby-logo-grey.png';
import linkedin from '../assets/shared/social-linkedin.svg';
import instagram from '../assets/shared/social-instagram.svg';
import facebook from '../assets/shared/social-facebook.svg';
import twitter from '../assets/shared/social-twitter.svg';
import youtube from '../assets/shared/social-youtube.svg';
import mail from '../assets/shared/mail.svg';
import phone from '../assets/shared/phone.svg';
import location from '../assets/shared/location.svg';

/** Platform links for the social row. Point these at Wragby's own profiles when they are confirmed. */
const SOCIAL = [
  { label: 'LinkedIn', icon: linkedin, href: 'https://www.linkedin.com/' },
  { label: 'Instagram', icon: instagram, href: 'https://www.instagram.com/' },
  { label: 'Facebook', icon: facebook, href: 'https://www.facebook.com/' },
  { label: 'X (Twitter)', icon: twitter, href: 'https://x.com/' },
  { label: 'YouTube', icon: youtube, href: 'https://www.youtube.com/' },
];

const QUICK_LINKS = [
  { label: 'Features', to: '/#features' },
  { label: 'Testimonials', to: '/#why-choose-us' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact Us', to: '/contact' },
];

/*
 * Column headings are drawn white on the white footer in Figma (349:6041, 349:6047, 349:6057), so they are
 * invisible but still take up a row. They keep that space here and stay readable to screen readers.
 */
const columnHeading = 'font-instrument text-label text-surface-default';
const quietLink = 'rounded-xs transition-colors hover:text-site-red focus-visible:outline-none focus-visible:shadow-focus';

/** Site footer (Figma `Footer-Outer`, 691:5239). Below the `lg` breakpoint (not in Figma) the columns stack. */
export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-10 bg-surface-default px-5 py-14 lg:gap-15 lg:px-50 lg:py-20">
      <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-0">
        <div className="flex flex-col gap-5 lg:w-site-footer-brand">
          <img src={logoGrey} alt="Wragby" className="h-10 w-logo-w object-cover" />
          <p className="font-instrument text-body-sm leading-site-20 text-text-tertiary">
            wCRM is built to help enterprises manage end-to-end customer lifecycles and streamline operational workflows,
          </p>
          <ul className="flex gap-3">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-8 items-center justify-center rounded-full bg-text-tertiary transition-colors hover:bg-site-red focus-visible:outline-none focus-visible:shadow-focus"
                >
                  <img src={s.icon} alt="" className="size-3.5 p-px" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-quick-links" className="flex flex-col gap-4 whitespace-nowrap">
          <h2 id="footer-quick-links" className={columnHeading}>Quick Links</h2>
          {QUICK_LINKS.map((l) => (
            <Link key={l.label} to={l.to} className={`font-instrument text-body-sm text-text-tertiary ${quietLink}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <h2 className={columnHeading}>Contact Us</h2>
          <a href="mailto:info@wragbysolutions.com" className={`flex items-center gap-1 font-figtree text-body text-text-tertiary ${quietLink}`}>
            <img src={mail} alt="" className="size-3.5" />
            info@wragbysolutions.com
          </a>
          <a href="tel:+2342017006320" className={`flex items-center gap-1 font-figtree text-body text-text-tertiary ${quietLink}`}>
            <img src={phone} alt="" className="size-3.5" />
            +2342017006320
          </a>
        </div>

        <div className="flex flex-col gap-4 lg:w-site-footer-address">
          <h2 className={columnHeading}>Addresses</h2>
          <address className="flex gap-2.5 not-italic">
            <img src={location} alt="" className="size-5 shrink-0" />
            <span className="flex flex-col gap-0.5 font-figtree text-body">
              <span className="text-text-faint">Lagos</span>
              <span className="leading-site-18 text-text-tertiary">Plot 21A Olubunmi Rotimi Street, off Abike Sulaiman St, Lekki Phase 1, Lagos 106104, Nigeria</span>
            </span>
          </address>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-3 border-t border-border-default pt-6 text-caption text-text-icon-strong lg:flex-row lg:whitespace-nowrap">
        <p>© 2026 wCRM. All rights reserved. Licensed to Wragby Business Solutions and Technologies Limited.</p>
        <p className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms &amp; Conditions</span>
        </p>
      </div>
    </footer>
  );
}
