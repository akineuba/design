import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story, ctx) =>
      ctx.parameters.layout === 'fullscreen' ? (
        <Story />
      ) : (
        <div className="sso-root">
          <Story />
        </div>
      ),
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#FCFCFD' },
        { name: 'surface', value: '#FFFFFF' },
      ],
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Patterns', 'Pages'],
      },
    },
  },
};
export default preview;
