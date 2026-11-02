import type { Decorator, Preview } from '@storybook/react';
import { Controls, Description, Primary, Stories, Subtitle, Title, useOf } from '@storybook/blocks';
import { useEffect } from 'react';
import '../src/styles.css';
import { InstructionNote } from '../src/docs/InstructionNote';

const withTheme: Decorator = (Story, ctx) => {
  const theme = ctx.globals.theme === 'dark' ? 'dark' : 'light';
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <div data-theme={theme} className="bg-transparent font-sans text-fg-strong">
      <Story />
    </div>
  );
};

function DocsPage() {
  const resolved = useOf('meta', ['meta']);
  const title = resolved.preparedMeta.title;
  return (
    <>
      <Title />
      <Subtitle />
      <InstructionNote title={title} />
      <Description />
      <Primary />
      <Controls />
      <Stories includePrimary={false} />
    </>
  );
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    docs: { page: DocsPage, toc: false },
    options: {
      storySort: {
        order: ['Introduction', 'UI Rules', 'Foundations', 'Components', 'Insurance', 'Patterns'],
      },
    },
    a11y: { config: { rules: [{ id: 'region', enabled: false }] } },
  },
  tags: ['autodocs'],
};
export default preview;
