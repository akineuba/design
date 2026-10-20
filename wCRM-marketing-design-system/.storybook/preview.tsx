import type { Preview } from '@storybook/react';
import theme from './theme';
import tokens from '../tokens/tokens.json';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: tokens.color.surface.default.value },
        { name: 'canvas', value: tokens.color.surface.canvas.value },
      ],
    },
    docs: { theme },
    options: { storySort: { order: ['Overview', ['Foundations', 'Getting started'], 'Components'] } },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
  },
};

export default preview;
