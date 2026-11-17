import type { Preview } from '@storybook/react';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import theme from './theme';
import '../src/styles/index.css';
import './instruction-note.css';
import './dark-docs.css';
import { InstructionNote } from './InstructionNote';
import { addons } from '@storybook/preview-api';

const applyTheme = (globals?: Record<string, unknown>) => {
  document.documentElement.dataset.theme = globals?.theme === 'dark' ? 'dark' : 'light';
};

// MDX pages (Introduction, UI Rules) render no story, so no decorator runs for them: follow the global directly.
try {
  const channel = addons.getChannel();
  channel.on('setGlobals', ({ globals }) => applyTheme(globals));
  channel.on('globalsUpdated', ({ globals }) => applyTheme(globals));
} catch {
  // No channel (e.g. tests); the decorator below still applies the theme per story.
}

const preview: Preview = {
  // The light / dark switch lives on the right of the toolbar (manager.tsx). It sets this global, and the
  // decorator puts data-theme on the preview <html>, exactly as a consuming app does.
  globalTypes: {
    theme: { description: 'Colour theme (light | dark)' },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      applyTheme(context.globals);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst', matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'surface',
      values: [
        // CSS variables, so the backgrounds follow the theme toolbar.
        { name: 'surface', value: 'var(--color-surface-default)' },
        { name: 'canvas', value: 'var(--color-surface-canvas)' },
      ],
    },
    options: { storySort: { order: ['Introduction', 'UI Rules', 'Foundations', 'Components', 'Mobile', 'Patterns'] } },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    docs: {
      theme,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <InstructionNote />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
  tags: ['autodocs'],
};

export default preview;
