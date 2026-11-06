import type { Preview } from '@storybook/react';
import type { PropsWithChildren } from 'react';
import { Controls, Description, DocsContainer, Primary, Stories, Subtitle, Title, useOf, type DocsContainerProps } from '@storybook/blocks';
import '../src/styles/index.css';
import './instruction-note.css';
import { InstructionNote } from './InstructionNote';
import { ThemeToggle, applyTheme, docsThemes, listenForTheme, useTheme } from './theme';

listenForTheme();

// The floating light/dark toggle appears on Components pages only. Patterns switch theme from
// their top bar; every page can also use the toolbar's Theme menu.
const isComponent = (title?: string) => !!title?.startsWith('Components/');

/** Docs pages follow the theme too. */
function ThemedDocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  const theme = useTheme();
  return (
    <DocsContainer context={context} theme={docsThemes[theme]}>
      {children}
    </DocsContainer>
  );
}

/** One toggle per component Docs page (not one per embedded story). */
function DocsThemeToggle() {
  const { preparedMeta } = useOf('meta', ['meta']);
  return isComponent(preparedMeta.title) ? <ThemeToggle placement="page" /> : null;
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
      if (context.viewMode !== 'story' || !isComponent(context.title)) return <Story />;
      // The toggle sits in a 48px strip above the story so it never covers the story's own
      // top-right controls (toolbars, page actions).
      return (
        <div className="pt-12">
          <Story />
          <ThemeToggle />
        </div>
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
          <DocsThemeToggle />
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
