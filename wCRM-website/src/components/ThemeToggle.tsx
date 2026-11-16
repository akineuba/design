import { useEffect, useState } from 'react';
import sun from '../assets/shared/sun.svg';

const STORAGE_KEY = 'wcrm-site-theme';

/** Light / dark switch (Figma `light`, 349:6007). Sets data-theme on <html>, which every token follows. */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? saved === 'dark' : document.documentElement.dataset.theme === 'dark';
    } catch {
      return document.documentElement.dataset.theme === 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      /* storage unavailable (private mode, sandboxed preview): the theme still applies for this visit */
    }
  }, [dark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={() => {
        // Cross-fade every colour for one slow beat (see html.theme-fade in index.css).
        const root = document.documentElement;
        root.classList.add('theme-fade');
        window.setTimeout(() => root.classList.remove('theme-fade'), 360);
        setDark((d) => !d);
      }}
      className="absolute right-5.75 top-4 flex items-center justify-center rounded-full bg-surface-toggle p-2 transition-colors hover:bg-border-strong focus-visible:outline-none focus-visible:shadow-focus"
    >
      <img src={sun} alt="" className={`size-3 transition-transform duration-site-slow ease-standard ${dark ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
}
