import type { Preview } from '@storybook/react';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import '../src/styles/index.css';
import './instruction-note.css';
import { InstructionNote } from './InstructionNote';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: 'var(--wbiz-color-surface-page)' },
        { name: 'surface', value: 'var(--wbiz-color-surface)' },
      ],
    },
    options: { storySort: { order: ['Introduction', 'UI Rules', 'Foundations', 'Components', 'Patterns'] } },
    docs: {
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
