import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, screen, userEvent, within } from '@storybook/test';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import { ConfirmDialog, Modal, ModalClose, ModalContent, ModalTrigger } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: ModalContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 560 }, description: { component: 'Figma: `Move To New Audience - Modal` (1446:32223) and the mobile "Delete 3 contacts?" dialog. Overlay, focus trap, Esc to close, focus returns to the trigger.' } },
  },
  args: { title: 'Modal' },
} satisfies Meta<typeof ModalContent>;
export default meta;
type Story = StoryObj<typeof meta>;

const audiences = [
  { id: 'hub', name: 'Microsoft Creator Hub', count: 12 },
  { id: 'retreat', name: 'Microsoft Retreat', count: 8 },
  { id: 'webinar', name: 'Microsoft Webinar', count: 5 },
  { id: 'test', name: 'Wragby Test', count: 20 },
];

function AudiencePicker() {
  const [selected, setSelected] = useState('hub');
  return (
    <Modal defaultOpen>
      <ModalTrigger asChild><Button variant="secondary">Move to audience</Button></ModalTrigger>
      <ModalContent
        title="Move to new audience"
        footer={<><ModalClose asChild><Button variant="outline">Cancel</Button></ModalClose><Button>Move 3 contacts</Button></>}
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Audience</legend>
          {audiences.map((a) => {
            const on = selected === a.id;
            return (
              <label
                key={a.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3 transition-colors duration-fast has-[:focus-visible]:shadow-focus ${on ? 'border-border-danger-subtle bg-status-danger-subtle' : 'border-border-default hover:bg-surface-subtle'}`}
              >
                <span className="flex flex-col">
                  <span className={`text-label ${on ? 'text-brand-primary' : 'text-text-strong'}`}>{a.name}</span>
                  <span className="text-caption text-text-secondary">{a.count} contacts</span>
                </span>
                <input type="radio" name="audience" value={a.id} checked={on} onChange={() => setSelected(a.id)} className="size-5 accent-brand-primary" />
              </label>
            );
          })}
        </fieldset>
      </ModalContent>
    </Modal>
  );
}

export const Picker: Story = { render: () => <div className="p-6"><AudiencePicker /></div> };

export const FormModal: Story = {
  render: () => (
    <div className="p-6">
      <Modal defaultOpen>
        <ModalTrigger asChild><Button>New audience</Button></ModalTrigger>
        <ModalContent
          size="md"
          title="Create audience"
          description="Group contacts so you can target them in campaigns."
          footer={<><ModalClose asChild><Button variant="outline">Cancel</Button></ModalClose><Button>Create audience</Button></>}
        >
          <Input label="Audience name" placeholder="e.g. Lagos enterprise leads" required />
          <Select label="Owner" options={[{ value: 'ae', label: 'Akinola Euba' }, { value: 'sc', label: 'Sarah Chen' }]} defaultValue="ae" />
        </ModalContent>
      </Modal>
    </div>
  ),
};

export const DestructiveConfirm: Story = {
  render: () => (
    <div className="p-6">
      <ConfirmDialog
        open
        title="Delete 3 contacts?"
        description="Olumide Balogun and 2 other contacts will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {}}
      />
    </div>
  ),
};

export const ConfirmLoading: Story = {
  render: () => (
    <div className="p-6">
      <ConfirmDialog open loading title="Delete 3 contacts?" description="Removing contacts…" confirmLabel="Delete" onConfirm={() => {}} />
    </div>
  ),
};

export const OpensAndCloses: Story = {
  render: () => (
    <div className="p-6">
      <ConfirmDialog trigger={<Button variant="danger">Delete contact</Button>} title="Delete contact?" description="This cannot be undone." confirmLabel="Delete" onConfirm={() => {}} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Delete contact' });
    await userEvent.click(trigger);
    await expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveFocus();
  },
};
