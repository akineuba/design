import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/Avatar';
import { figma } from '../docs/links';

const meta = { title: 'Components/Avatar', component: Avatar, args: { name: 'Chidi Okafor' }, parameters: { design: { type: 'figma', url: figma('14:1061') } } } satisfies Meta<typeof Avatar>;
export default meta;
type S = StoryObj<typeof meta>;
export const Initials: S = {};
export const WithLabel: S = { args: { name: 'Ada Obi', label: 'Ada Obi', sublabel: 'ada.obi@ibroka.example', size: 'md' } };
export const Neutral: S = { args: { name: 'System user', tone: 'neutral' } };
export const SingleName: S = { args: { name: 'Admin' } };
export const Sizes: S = { render: (a) => <div className="flex items-center gap-3"><Avatar {...a} /><Avatar {...a} size="md" /></div> };
