import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/Logo';
import { figma } from '../docs/links';

const meta = { title: 'Components/Logo', component: Logo, parameters: { design: { type: 'figma', url: figma('22:3016') } } } satisfies Meta<typeof Logo>;
export default meta;
type S = StoryObj<typeof meta>;
export const Full: S = {};
export const Mark: S = { args: { variant: 'mark' }, parameters: { design: { type: 'figma', url: figma('22:3193') } } };
export const Large: S = { args: { height: 72 } };
export const Inverse: S = { args: { inverse: true }, render: (a) => <div className="rounded-lg bg-secondary p-4"><Logo {...a} /></div> };
