import type { Meta, StoryObj } from '@storybook/react';
import logo from '../assets/wragby-logo.png';
import { Foundations } from './Foundations';

const meta = {
  title: 'Foundations/Overview',
  component: Foundations,
  args: { logoSrc: logo },
  parameters: { layout: 'fullscreen', backgrounds: { default: 'canvas' }, controls: { disable: true } },
} satisfies Meta<typeof Foundations>;

export default meta;

export const Overview: StoryObj<typeof meta> = {};
