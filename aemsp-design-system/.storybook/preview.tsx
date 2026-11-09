import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/components.css';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme ?? 'light';
      useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
      document.documentElement.dataset.theme = theme;
      const full = ctx.parameters.layout === 'fullscreen';
      return (
        <div className="ae-root" style={{ background: full ? 'var(--bg-page)' : ctx.parameters.surface === 'white' ? 'var(--bg-surface)' : 'var(--bg-page)', padding: full ? 0 : 24, minHeight: full ? '100vh' : undefined, borderRadius: full ? 0 : 8 }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i }, expanded: true },
    options: {
      storySort: {
        order: ['Introduction', 'UI Rules', 'Foundations', ['Colors', 'Typography', 'Spacing, radius & shadow', 'Icons'], 'Components', 'AEMSP', 'Patterns', ['Pages']],
      },
    },
    docs: { toc: true },
    a11y: { test: 'todo' },
  },
};
export default preview;
