import type { Preview } from '@storybook/react';
import type { PropsWithChildren } from 'react';
import { Controls, Description, DocsContainer, Primary, Stories, Subtitle, Title, type DocsContainerProps } from '@storybook/blocks';
import '../src/styles/index.css';
import './instruction-note.css';
import { InstructionNote } from './InstructionNote';
import { ThemeToggle, applyTheme, docsThemes, listenForTheme, useTheme } from './theme';

listenForTheme();

/** Docs pages follow the theme too, with one toggle per page (not one per embedded story). */
function ThemedDocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  const theme = useTheme();
  return (
    <DocsContainer context={context} theme={docsThemes[theme]}>
      {children}
      <ThemeToggle />
    </DocsContainer>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Light or dark tokens',
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
      applyTheme(context.globals.theme);
      return (
        <>
          <Story />
          {context.viewMode === 'story' && <ThemeToggle />}
        </>
      );
    },
  ],
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
      container: ThemedDocsContainer,
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
