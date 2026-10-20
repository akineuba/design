import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon } from '../../icons';
import { Accordion, AccordionItem } from '../Accordion';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: DrawerContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 720 }, description: { component: 'Figma: `new contact` (808:6024), `create user` (1823:7659) and `email config` drawers. 462px, right edge, scrolling body, sticky footer.' } },
  },
  args: { title: 'Drawer' },
} satisfies Meta<typeof DrawerContent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CreateContact: Story = {
  render: () => (
    <div className="p-6">
      <Drawer defaultOpen>
        <DrawerTrigger asChild><Button leadingIcon={<PlusIcon />}>Create contact</Button></DrawerTrigger>
        <DrawerContent
          title="Create contact"
          footer={<><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose><Button>Create contact</Button></>}
        >
          <div className="grid grid-cols-2 gap-4">
            <Input label="First name" placeholder="Enter first name" required />
            <Input label="Last name" placeholder="Enter last name" required />
          </div>
          <Input label="Email address" placeholder="name@company.com" required />
          <Select label="Company" placeholder="Select a company" options={[{ value: 'tech', label: 'Technologia' }, { value: 'cash', label: 'Cash Drive' }]} />
          <Accordion type="multiple">
            <AccordionItem value="social" title="Social Media Information">
              <Input label="Website" placeholder="e.g. www.example.com" />
            </AccordionItem>
            <AccordionItem value="birthday" title="Birthday settings">
              <Input label="Birthday" placeholder="DD/MM" />
            </AccordionItem>
          </Accordion>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};
