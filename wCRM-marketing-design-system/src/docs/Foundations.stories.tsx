import type { Meta, StoryObj } from '@storybook/react';
import { Foundations } from './Foundations';

const meta = {
  title: 'Overview/Foundations',
  component: Foundations,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'canvas' }, controls: { disable: true } },
} satisfies Meta<typeof Foundations>;

export default meta;

export const Overview: StoryObj<typeof meta> = {};
