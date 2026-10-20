import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

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
    options: { storySort: { order: ['Introduction', 'Foundations', 'Components', 'Patterns'] } },
  },
  tags: ['autodocs'],
};

export default preview;
