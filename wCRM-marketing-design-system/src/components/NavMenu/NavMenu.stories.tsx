import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavMenu, type NavMenuSection, type NavMenuSettings } from './NavMenu';
import { businessSections, businessSettings, marketingSections, marketingSettings } from './NavMenu.fixtures';

const meta = {
  title: 'Components/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Desktop sidebar navigation. Figma: marketing sidebar instance `1514:7196` (217px, 40px items, red 2×21 active bar on `#F0F4FA`). ' +
          'The Settings group uses the product reference: chevron caret and Semi Bold sub-items with right chevrons, above Log Out.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen min-h-mobile-frame bg-surface-canvas">
        <Story />
      </div>
    ),
  ],
  args: { sections: marketingSections },
} satisfies Meta<typeof NavMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

function Interactive({ sections, settings, initial }: { sections: NavMenuSection[]; settings: NavMenuSettings; initial: string }) {
  const [active, setActive] = useState(initial);
  return (
    <NavMenu
      sections={sections}
      settings={settings}
      activeId={active}
      onNavigate={(item) => setActive(item.id)}
      onLogout={() => {}}
    />
  );
}

/** Figma marketing sidebar with Settings › Social Media active. Click any item to move the active state. */
export const Marketing: Story = {
  render: () => <Interactive sections={marketingSections} settings={marketingSettings} initial="settings-social" />,
};

/** Business Development reference: Dashboard active, Reports and Settings open. */
export const BusinessDevelopment: Story = {
  render: () => <Interactive sections={businessSections} settings={businessSettings} initial="dashboard" />,
};
