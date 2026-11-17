import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StageProgress, type Stage } from './StageProgress';
import { Button } from '../Button';
import { StatusPill } from '../StatusPill';
import { SidePanelContent } from '../SidePanel';
import { CloseCircleIcon, TickCircleIcon } from '../../icons';

const approval: Stage[] = [
  { id: 'draft', label: 'Draft' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'step1', label: 'Approval (Step 1)' },
  { id: 'step2', label: 'Approval (Step 2)' },
  { id: 'posted', label: 'Posted' },
];

const meta = {
  title: 'Components/StageProgress',
  component: StageProgress,
  args: { stages: approval, currentId: 'step1', label: 'Approval progress' },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  decorators: [(Story) => <div className="w-full max-w-dialog p-4"><Story /></div>],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows where a record is in a multi-step process (approvals, recruitment, documents). Derived: there is no stage component in Figma yet, ' +
          'so this uses existing tokens and should be reviewed by design. Horizontal in record headers; vertical as an approval trail with who acted and when.',
      },
    },
  },
} satisfies Meta<typeof StageProgress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};
export const NotStarted: Story = { args: { currentId: 'draft' } };
export const AllComplete: Story = { args: { stages: approval.map((s) => ({ ...s, status: 'complete' as const })), currentId: undefined } };
export const SentBack: Story = {
  args: { currentId: 'submitted', stages: approval.map((s) => (s.id === 'step1' ? { ...s, status: 'rejected' as const } : s)) },
};

/** Approval trail inside a side panel: who acted and when. */
export const VerticalTrail: Story = {
  args: {
    orientation: 'vertical',
    currentId: 'step2',
    stages: [
      { id: 'draft', label: 'Draft created', description: 'Daniel Olabode · 10 Aug 2025, 09:12' },
      { id: 'submitted', label: 'Submitted for approval', description: 'Daniel Olabode · 10 Aug 2025, 09:30' },
      { id: 'step1', label: 'Approved (Step 1)', description: 'Amaka Nwosu · 11 Aug 2025, 14:05' },
      { id: 'step2', label: 'Awaiting approval (Step 2)', description: 'Assigned to Ada Obi' },
      { id: 'posted', label: 'Posted to ledger' },
    ],
  },
};

/** How a stage moves on: only the action for the current stage advances it; Reject sends it back. */
export const Interactive: Story = {
  render: () => {
    const [i, setI] = useState(2);
    const [rejected, setRejected] = useState<string | null>(null);
    const stages = approval.map((s) => (s.id === rejected ? { ...s, status: 'rejected' as const } : s));
    const current = approval[i];
    const done = i >= approval.length - 1;
    return (
      <SidePanelContent
        size="sm"
        title="Bill TO/IR/00136"
        className="border border-line-subtle"
        footer={
          done ? <StatusPill tone="success">Posted</StatusPill> : (
            <>
              <Button variant="outline" leadingIcon={<CloseCircleIcon />} disabled={i < 2} onClick={() => { setRejected(current.id); setI(1); }}>Reject</Button>
              <Button leadingIcon={<TickCircleIcon />} onClick={() => { setRejected(null); setI(i + 1); }}>
                {i < 2 ? 'Submit' : i === approval.length - 2 ? 'Approve & Post' : 'Approve'}
              </Button>
            </>
          )
        }
      >
        <StageProgress stages={stages} currentId={current.id} label="Approval progress" />
        <p className="font-sans text-sm text-fg-muted">
          Current stage: <strong className="text-fg-ink">{current.label}</strong>
          {rejected && <> · sent back from {approval.find((s) => s.id === rejected)?.label}</>}
        </p>
      </SidePanelContent>
    );
  },
};
