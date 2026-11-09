import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'AEMSP Design System',
    brandTarget: '_self',
    colorPrimary: '#1f2f57',
    colorSecondary: '#299bff',
    appBg: '#f3f4f8',
    appContentBg: '#ffffff',
    appBorderColor: '#e2e8f0',
    appBorderRadius: 8,
    textColor: '#1e2238',
    barSelectedColor: '#299bff',
    fontBase: '"Inter", system-ui, sans-serif',
  }),
  sidebar: { showRoots: true },
});
