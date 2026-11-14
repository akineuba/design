import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'iBroka Design System',
    brandImage: './ibroka-logo.svg',
    brandTarget: '_self',
    colorPrimary: '#247A75',
    colorSecondary: '#247A75',
    fontBase: "'Instrument Sans', system-ui, sans-serif",
    appBg: '#FBFCFE',
    appBorderColor: '#E2E8F0',
    appBorderRadius: 10,
    textColor: '#3B3B3B',
    barSelectedColor: '#247A75',
  }),
  sidebar: { showRoots: true },
});
