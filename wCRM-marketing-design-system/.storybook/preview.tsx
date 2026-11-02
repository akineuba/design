import type { Preview } from '@storybook/react';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import theme from './theme';
import '../src/styles/index.css';
import './instruction-note.css';
import './dark-docs.css';
import { InstructionNote } from './InstructionNote';

const preview: Preview = {
  // Toolbar switch for the light / dark token sets. It sets data-theme on the preview <html>, which is
  // exactly what a consuming app does, so stories and docs pages render the real dark variables.
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme === 'dark' ? 'dark' : 'light';
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
