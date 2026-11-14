import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { ClaimIcon, PlusIcon, SearchIcon } from '../icons';
import { figma } from '../docs/links';

const meta = { title: 'Components/EmptyState', component: EmptyState, parameters: { design: { type: 'figma', url: figma('3:511') } }, decorators: [(S) => <div className="w-[560px] rounded-xl bg-surface shadow-card"><S /></div>] } satisfies Meta<typeof EmptyState>;
export default meta;
type S = StoryObj<typeof meta>;
export const NothingYet: S = { args: { title: 'No policies yet', description: 'Policies you place for clients appear here with their insurer and renewal date.', action: <Button leadingIcon={<PlusIcon />}>Add policy</Button> } };
export const NoResults: S = { args: { icon: <SearchIcon />, title: 'No policies match “Kestrel motor”', description: 'Check the spelling or clear the filters.', action: <Button variant="outline">Clear filters</Button> } };
export const Compact: S = { args: { compact: true, icon: <ClaimIcon />, title: 'No open claims' } };
