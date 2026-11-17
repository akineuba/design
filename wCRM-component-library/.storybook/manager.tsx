// The manager bundle uses the classic JSX transform, so React must be in scope.
import React from 'react';
import { addons, types, useGlobals } from '@storybook/manager-api';
import { MoonIcon, SunIcon } from '@storybook/icons';
import { styled } from '@storybook/theming';
import tokens from '../tokens/tokens.json';
import theme from './theme';

addons.setConfig({ theme, sidebar: { showRoots: true } });

/*
 * Dark mode switch on the right-hand side of the Storybook toolbar, shown on story and docs pages.
 * It drives the `theme` global, which preview.tsx turns into data-theme on the preview <html>.
 * The manager theme needs literal colours, so they are read from the token source.
 */
const c = tokens.color;
const dark = (group: keyof typeof c, name: string) => (c[group] as Record<string, { value: string; dark?: string }>)[name].dark!;

const Switch = styled.button<{ checked: boolean }>(({ checked }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 28,
  margin: '0 8px',
  padding: '0 4px 0 10px',
  border: `1px solid ${checked ? dark('border', 'strong') : c.border.default.value}`,
  borderRadius: 999,
  background: checked ? dark('surface', 'default') : c.surface.default.value,
  color: checked ? dark('text', 'primary') : c.text.primary.value,
  font: `600 12px/1 ${tokens.font.family.sans.value}`,
  cursor: 'pointer',
  transition: 'background-color 150ms, border-color 150ms, color 150ms',
  '&:focus-visible': { outline: 'none', boxShadow: tokens.shadow.focus.value },
}));

const Track = styled.span<{ checked: boolean }>(({ checked }) => ({
  position: 'relative',
  display: 'inline-block',
  width: 36,
  height: 20,
  borderRadius: 999,
  background: checked ? c.action.secondary.dark : c.status['toggle-off'].value,
  transition: 'background-color 150ms',
}));

const Thumb = styled.span<{ checked: boolean }>(({ checked }) => ({
  position: 'absolute',
  top: 2,
  left: checked ? 18 : 2,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  borderRadius: 999,
  background: c.text.inverse.value,
  color: checked ? c.action.secondary.dark : c.status.warning.value,
  transition: 'left 150ms',
  '& svg': { width: 10, height: 10 },
}));

function ThemeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const isDark = globals.theme === 'dark';
  return (
    <Switch
      type="button"
      role="switch"
      aria-checked={isDark}
      checked={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => updateGlobals({ theme: isDark ? 'light' : 'dark' })}
    >
      Dark mode
      <Track checked={isDark} aria-hidden="true">
        <Thumb checked={isDark}>{isDark ? <MoonIcon /> : <SunIcon />}</Thumb>
      </Track>
    </Switch>
  );
}

addons.register('wcrm/theme-toggle', () => {
  addons.add('wcrm/theme-toggle/tool', {
    type: types.TOOLEXTRA,
    title: 'Dark mode',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <ThemeToggle />,
  });
});
