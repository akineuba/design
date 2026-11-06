import { useEffect, useState } from 'react';
import { addons } from 'storybook/internal/preview-api';
import { GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { create, themes } from 'storybook/internal/theming';
import tokens from '../tokens/tokens.json';
import { MoonIcon, SunIcon } from '../src/icons';
import { cx } from '../src/utils/cx';

// The light/dark theme lives in the Storybook global `theme`, so the toolbar, the URL
// (?globals=theme:dark) and the toggle on each page stay in step across stories and docs.
// It is applied as <html data-theme="dark">, which swaps the --wbiz-* tokens (tokens.css).

export type Theme = 'light' | 'dark';

const html = () => document.documentElement;
const normalise = (value: unknown): Theme => (value === 'dark' ? 'dark' : 'light');

export function applyTheme(theme: unknown) {
  const next = normalise(theme);
  if (html().dataset.theme !== next) html().dataset.theme = next;
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  addons.getChannel().emit(UPDATE_GLOBALS, { globals: { theme } });
}

let listening = false;
/** Follows the `theme` global when it is set on load or changed from the toolbar. */
export function listenForTheme() {
  if (listening) return;
  listening = true;
  const channel = addons.getChannel();
  const sync = ({ globals }: { globals?: Record<string, unknown> }) => applyTheme(globals?.theme);
  channel.on(SET_GLOBALS, sync);
  channel.on(GLOBALS_UPDATED, sync);
}

/** Current theme, re-rendering whenever <html data-theme> changes. */
export function useTheme(): Theme {
  const [theme, set] = useState<Theme>(() => normalise(html().dataset.theme));
  useEffect(() => {
    const observer = new MutationObserver(() => set(normalise(html().dataset.theme)));
    observer.observe(html(), { attributes: true, attributeFilter: ['data-theme'] });
    set(normalise(html().dataset.theme));
    return () => observer.disconnect();
  }, []);
  return theme;
}

/** Light/dark switch pinned to the right edge of every story and docs page. */
export function ThemeToggle() {
  const theme = useTheme();
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cx(
        'sb-unstyled fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-1.5',
        'rounded-l-xl border border-r-0 border-line bg-surface px-2 py-3 shadow-md',
        'font-sans text-2xs font-medium text-fg-muted hover:text-fg-strong',
        'focus-visible:outline-hidden focus-visible:shadow-focus',
      )}
    >
      <span className="size-icon-sm text-icon">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

// Storybook's docs chrome needs literal colours, so the dark docs theme reads the dark
// token values from tokens.json.
const dark = (group: Record<string, { value: string; dark?: string }>, key: string) => group[key].dark ?? group[key].value;
const c = tokens.color;

export const docsThemes = {
  light: themes.light,
  dark: create({
    base: 'dark',
    colorPrimary: dark(c.primary, 'DEFAULT'),
    colorSecondary: dark(c.primary, 'DEFAULT'),
    appBg: dark(c.surface, 'DEFAULT'),
    appContentBg: dark(c.surface, 'page'),
    appPreviewBg: dark(c.surface, 'page'),
    appBorderColor: dark(c.line, 'subtle'),
    textColor: dark(c.fg, 'DEFAULT'),
    textMutedColor: dark(c.fg, 'muted'),
    barBg: dark(c.surface, 'DEFAULT'),
    barTextColor: dark(c.fg, 'muted'),
    inputBg: dark(c.surface, 'muted'),
    inputBorder: dark(c.line, 'DEFAULT'),
    inputTextColor: dark(c.fg, 'strong'),
  }),
};
