import { Link } from 'react-router-dom';
import logo from '../assets/shared/wragby-logo.png';

/** Wragby mark + "CRM" (Figma `Header` › 349:5994). Links home. */
export function Logo() {
  return (
    <Link to="/" aria-label="wCRM home" className="relative block h-site-logo-h w-site-logo shrink-0 rounded-xs focus-visible:outline-none focus-visible:shadow-focus">
      <img src={logo} alt="Wragby" className="absolute left-0 top-0 h-site-logo-img-h w-site-logo-img object-cover" />
      <span className="absolute right-0 top-3 font-display text-site-logo-suffix text-text-strong">CRM</span>
    </Link>
  );
}
