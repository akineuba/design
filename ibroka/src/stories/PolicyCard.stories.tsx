import type { Meta, StoryObj } from '@storybook/react';
import { PolicyCard } from '../insurance/PolicyCard';
import { ActionMenu } from '../components/ActionMenu';
import { POLICIES, TODAY } from './demo-data';
import { figma } from '../docs/links';

const p = POLICIES[0];
const meta = { title: 'Insurance/PolicyCard', component: PolicyCard, args: { ...p, today: TODAY, onOpen: () => {}, actions: <ActionMenu aria-label={`Actions for ${p.policyNo}`} items={[{ label: 'View', onSelect: () => {} }, { label: 'Renew', onSelect: () => {}, tone: 'positive' }]} /> }, parameters: { design: { type: 'figma', url: figma('15:1457') } }, decorators: [(S) => <div className="w-[330px]"><S /></div>] } satisfies Meta<typeof PolicyCard>;
export default meta;
type S = StoryObj<typeof meta>;
export const Expiring: S = {};
export const Active: S = { args: { ...POLICIES[1] } };
export const Expired: S = { args: { ...POLICIES[2] } };
export const Selected: S = { args: { selected: true } };
/** Grid view behind the list/grid toggle. */
export const Grid: S = {
  decorators: [(S) => <div className="w-[1029px]"><S /></div>],
  render: () => (
    <div className="grid grid-cols-3 gap-5">
      {POLICIES.slice(0, 6).map((x) => (
        <PolicyCard key={x.id} {...x} today={TODAY} onOpen={() => {}} />
      ))}
    </div>
  ),
};
