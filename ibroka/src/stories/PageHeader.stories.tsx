import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { PlusIcon } from '../icons';
import { figma } from '../docs/links';

const meta = { title: 'Components/PageHeader', component: PageHeader, args: { title: 'Policies', description: 'Every policy you have placed, with its insurer and renewal date.' }, parameters: { layout: 'padded', design: { type: 'figma', url: figma('14:672') } } } satisfies Meta<typeof PageHeader>;
export default meta;
type S = StoryObj<typeof meta>;
export const TitleAndSubtext: S = {};
export const WithAction: S = { args: { actions: <Button leadingIcon={<PlusIcon />}>Add policy</Button> } };
export const WithBackLink: S = { args: { title: 'POL-2026-00975', description: 'Kestrel Oil & Gas Ltd · All Risk', back: { label: 'Policies' } } };
