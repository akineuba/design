import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
  title: 'Marketing/Home page',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj<typeof HomePage> = {};
