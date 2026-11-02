import type { Meta, StoryObj } from '@storybook/react';
import { StageProgress, type Stage } from '../components/StageProgress';

const policy: Stage[] = [
  { id: 'draft', label: 'Draft', state: 'done', meta: 'Ada Obi · 2 Oct 2026' },
  { id: 'quoted', label: 'Quoted', state: 'done', meta: 'Harbor General · 5 Oct 2026' },
  { id: 'approval', label: 'Approval', state: 'current', meta: 'Waiting on Kunle Ade' },
  { id: 'active', label: 'Active', state: 'upcoming' },
];
const meta = { title: 'Components/StageProgress', component: StageProgress, args: { stages: policy, 'aria-label': 'Policy progress' }, decorators: [(S) => <div className="w-[720px]"><S /></div>] } satisfies Meta<typeof StageProgress>;
export default meta;
type S = StoryObj<typeof meta>;
export const PolicyInApproval: S = {};
export const NotStarted: S = { args: { stages: policy.map((s, i) => ({ ...s, meta: undefined, state: i === 0 ? 'current' : 'upcoming' })) } };
export const AllComplete: S = { args: { stages: policy.map((s) => ({ ...s, state: 'done' })) } };
export const SentBack: S = {
  args: {
    stages: [
      policy[0],
      { ...policy[1], state: 'sent-back', reason: 'Rate too low for this risk. Re-quote at 2.5%.', meta: 'Kunle Ade · 7 Oct 2026' },
      { ...policy[2], state: 'upcoming', meta: undefined },
      policy[3],
    ],
  },
};
/** Claim trail, vertical, in a side panel or claim page. */
export const ClaimTrail: S = {
  args: {
    orientation: 'vertical',
    'aria-label': 'Claim progress',
    stages: [
      { id: 'r', label: 'Reported', state: 'done', meta: 'Chidi Okafor · 12 Oct 2026' },
      { id: 'd', label: 'Documents received', state: 'done', meta: 'Police report, 4 photos · 13 Oct' },
      { id: 'u', label: 'Under review by insurer', state: 'current', meta: 'Lagoon Mutual · loss adjuster assigned' },
      { id: 'a', label: 'Approved', state: 'upcoming' },
      { id: 's', label: 'Settled', state: 'upcoming' },
    ],
  },
  decorators: [(S) => <div className="w-[360px]"><S /></div>],
};
