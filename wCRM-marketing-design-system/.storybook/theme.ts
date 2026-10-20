import { create } from '@storybook/theming';
import tokens from '../tokens/tokens.json';

// Storybook's manager theme needs literal values, so they are read from the token source
// rather than typed in here.
const c = tokens.color;
const radius = parseInt(tokens.radius.md.value, 10);

export default create({
  base: 'light',
  brandTitle: 'wCRM Marketing · Design system',
  brandTarget: '_self',
  colorPrimary: c.brand.primary.value,
  colorSecondary: c.accent.navy.value,
  appBg: c.surface.canvas.value,
  appContentBg: c.surface.default.value,
  appPreviewBg: c.surface.canvas.value,
  appBorderColor: c.border.default.value,
  appBorderRadius: radius,
  fontBase: tokens.font.family.sans.value,
  fontCode: tokens.font.family.mono.value,
  textColor: c.text.primary.value,
  textMutedColor: c.text.secondary.value,
  barTextColor: c.text.secondary.value,
  barSelectedColor: c.brand.primary.value,
  barHoverColor: c.brand.primary.value,
  barBg: c.surface.default.value,
  inputBg: c.surface.default.value,
  inputBorder: c.border.default.value,
  inputTextColor: c.text.primary.value,
  inputBorderRadius: radius,
});
