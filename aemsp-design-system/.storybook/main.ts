import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag', defaultName: 'Docs' },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
};
export default config;
