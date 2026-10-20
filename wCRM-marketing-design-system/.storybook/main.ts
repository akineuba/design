import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Serves src/assets at the root so the manager sidebar can show the Wragby logo.
  staticDirs: [{ from: '../src/assets', to: '/' }],
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
};

export default config;
