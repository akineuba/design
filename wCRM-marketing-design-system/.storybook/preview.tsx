import type { Preview } from '@storybook/react';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import theme from './theme';
import tokens from '../tokens/tokens.json';
import '../src/styles/index.css';
import './instruction-note.css';
import { InstructionNote } from './InstructionNote';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst', matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: tokens.color.surface.default.value },
        { name: 'canvas', value: tokens.color.surface.canvas.value },
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
