import { useEffect, useState } from 'react';
import sun from '../assets/shared/sun.svg';

const STORAGE_KEY = 'wcrm-site-theme';

/** Light / dark switch (Figma `light`, 349:6007). Sets data-theme on <html>, which every token follows. */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={() => setDark((d) => !d)}
      className="absolute right-5.75 top-4 flex items-center justify-center rounded-full bg-surface-toggle p-2 transition-colors hover:bg-border-strong focus-visible:outline-none focus-visible:shadow-focus"
    >
      <img src={sun} alt="" className="size-3" />
    </button>
  );
}
