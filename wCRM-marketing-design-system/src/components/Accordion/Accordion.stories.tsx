import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Switch } from '../Switch';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: { type: 'single', collapsible: true },
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Figma: drawer form sections (`Component 15/16/17`, "Social Media Information", 808:6625) and notification preference rows (`pref-row-4`, 1529:9554) with a toggle and chevron.' } },
  },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FormSections: Story = {
  render: () => (
    <div className="w-drawer">
      <Accordion type="multiple" defaultValue={['social']}>
        <AccordionItem value="social" title="Social Media Information">
          <Input label="Website" placeholder="e.g. www.example.com" />
          <Input label="Facebook" placeholder="Facebook profile link" />
          <Input label="LinkedIn" placeholder="LinkedIn profile link" />
        </AccordionItem>
        <AccordionItem value="birthday" title="Birthday settings">
          <Input label="Birthday" placeholder="DD/MM" helperText="Day and month required; year optional." />
        </AccordionItem>
        <AccordionItem value="address" title="Preferred address">
          <Input label="Address" placeholder="Street, city" />
        </AccordionItem>
        <AccordionItem value="locked" title="Integrations (admin only)" disabled>
          <p>Hidden</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

function PreferenceRows() {
  const [on, setOn] = useState({ social: true, publishing: false });
  return (
    <div className="w-page max-w-full">
      <Accordion type="single" collapsible variant="card" defaultValue="social">
        <AccordionItem
          value="social"
          title="Social interactions"
          description="Get notified about new conversations, interactions and follower changes."
          actions={<Switch aria-label="Social interactions notifications" checked={on.social} onCheckedChange={(c) => setOn((s) => ({ ...s, social: c }))} />}
        >
          <p className="text-label-sm text-text-primary">Included accounts</p>
          <div className="flex flex-col gap-3 pl-3">
            <Checkbox label="Facebook Page" defaultChecked />
            <Checkbox label="Instagram Business" defaultChecked />
            <Checkbox label="LinkedIn Company" defaultChecked />
            <Checkbox label="X Account" />
            <Checkbox label="YouTube Channel" />
          </div>
        </AccordionItem>
        <AccordionItem
          value="publishing"
          title="Publishing results"
          description="Know when a scheduled post is published or fails."
          actions={<Switch aria-label="Publishing results notifications" checked={on.publishing} onCheckedChange={(c) => setOn((s) => ({ ...s, publishing: c }))} />}
        >
          <Checkbox label="Only failures" />
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export const PreferenceCards: Story = { render: () => <PreferenceRows /> };

export const Collapsed: Story = {
  render: () => (
    <div className="w-drawer">
      <Accordion type="single" collapsible>
        <AccordionItem value="a" title="Social Media Information"><p>Content</p></AccordionItem>
        <AccordionItem value="b" title="Birthday settings"><p>Content</p></AccordionItem>
      </Accordion>
    </div>
  ),
};
