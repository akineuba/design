import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import {
  AddIcon,
  BiCloudUploadIcon,
  CopyOutlineIcon,
  LucideArrowLeftIcon,
  LucideKeyIcon,
  LucideMailIcon,
  LucidePencilIcon,
  LucidePencilMdIcon,
  LucidePhoneIcon,
  LucidePlusIcon,
  LucideRefreshCwIcon,
  NimbusHistoryIcon,
  PhExportLightIcon,
  SiAiEditIcon,
  SmsStarOutlineIcon,
  TrashOutlineIcon,
} from '../../icons';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const variants: ButtonVariant[] = [
  'primary', 'submit', 'secondary', 'accent-outline', 'navy', 'outline', 'outline-strong', 'toolbar', 'toolbar-muted', 'neutral',
  'brand-outline', 'danger', 'danger-outline', 'warning', 'warning-bright', 'purple-outline', 'ai', 'ghost', 'link',
  'mobile-primary', 'mobile-outline', 'mobile-ghost',
];
const sizes: ButtonSize[] = ['xs', 'settings-xs', 'compact', 'sm', 'toolbar', 'builder', 'profile', 'template', 'banner', 'md', 'settings', 'drawer', 'lg', 'ai', 'mobile', 'mobile-sections'];

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Create Contact', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  parameters: {
    ...design('817-9054'),
    docs: {
      description: {
        component:
          'Every button drawn on the page: r8 (r6 on the 36px `compact` post-details actions), Inter Semi Bold 14 labels (Medium 14 on Upload / Export, ' +
          'Roboto Semi Bold 13 on mobile), heights 30 / 31 / 36 / 37 / 38 / 39 / 40 / 41 / 44 / 48. Variants are named by where Figma uses them; ' +
          '`danger` is kept for existing callers and renders the brand-red outline.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toolbar "Create Contact" (`create-button`): 37px, p10/16, #EE1F2F, 12px plus. */
export const Primary: Story = { args: { size: 'toolbar', leadingIcon: <LucidePlusIcon />, iconSize: 12 }, parameters: design('817-9054') };

/** Social posts toolbar "New Post": 40px primary with the 12px plus. */
export const PrimaryMd: Story = { args: { children: 'New Post', leadingIcon: <LucidePlusIcon />, iconSize: 12 }, parameters: design('1088-13045') };

/** Full-width drawer submit ("Create", `assign-task-button`): 41px, p12/24, #EF2D38. */
export const DrawerSubmit: Story = {
  args: { variant: 'submit', size: 'drawer', fullWidth: true, children: 'Create' },
  decorators: [(S) => <div className="w-drawer-content"><S /></div>],
  parameters: design('808-6090'),
};

/** Publishing card actions: navy outline "Save as Draft" + primary "Send Now", 41px, p12/24, gap 30. */
export const Secondary: Story = {
  render: (args) => (
    <div className="flex gap-7.5">
      <Button {...args} variant="secondary" size="drawer">Save as Draft</Button>
      <Button {...args} variant="primary" size="drawer">Send Now</Button>
    </div>
  ),
  parameters: design('1066-9141'),
};

/** Settings "Connection History": #3D5A98 outline, 37px, 16px icon. */
export const AccentOutline: Story = { args: { variant: 'accent-outline', size: 'toolbar', children: 'Connection History', leadingIcon: <NimbusHistoryIcon /> }, parameters: design('1224-25718') };

/** Email "Send or Schedule": solid navy "Select Excluded List (Optional)", 37px, p10/18. */
export const Navy: Story = { args: { variant: 'navy', size: 'builder', children: 'Select Excluded List (Optional)' }, parameters: design('1536-10189') };

/** Draft banner "Discard draft": neutral outline, Semi Bold #1E2238, 39px. */
export const Outline: Story = { args: { variant: 'outline', size: 'banner', children: 'Discard draft' }, parameters: design('2549-65622') };

/** Toolbar "Upload": Medium 14 #3B414D, 37px, bi:cloud-upload 16. */
export const ToolbarUpload: Story = { args: { variant: 'toolbar', size: 'toolbar', children: 'Upload', leadingIcon: <BiCloudUploadIcon /> }, parameters: design('817-9253') };

/** Toolbar "Export": Medium 14 #64748B, 40px, ph:export-light 20. */
export const ToolbarExport: Story = { args: { variant: 'toolbar-muted', size: 'md', children: 'Export', leadingIcon: <PhExportLightIcon />, iconSize: 20 }, parameters: design('830-570') };

/** Organisation logo actions: "Upload New Image" primary + "Remove" neutral, 31px, Roboto Semi Bold 13. */
export const SettingsXs: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} size="settings-xs">Upload New Image</Button>
      <Button {...args} size="settings-xs" variant="neutral">Remove</Button>
    </div>
  ),
  parameters: design('1206-24298'),
};

/** Preview card "Reset": 30px, Inter Semi Bold 12, refresh 14. */
export const Xs: Story = { args: { size: 'xs', children: 'Reset', leadingIcon: <LucideRefreshCwIcon /> }, parameters: design('1503-5141') };

/** Settings "Save changes": 40px, p12/20, Roboto Semi Bold 14. */
export const SettingsSave: Story = { args: { size: 'settings', children: 'Save changes' }, parameters: design('1248-26576') };

/** Insert Smart Field modal footer: neutral "Cancel" (#667085) + "Insert", 36px. */
export const ModalActions: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="neutral" size="sm" family="roboto">Cancel</Button>
      <Button {...args} size="sm" family="roboto">Insert</Button>
    </div>
  ),
  parameters: design('1175-22676'),
};

/** AI panel "Rewrite with AI": #EE1F2F outline, Semi Bold 14, 37px. */
export const BrandOutline: Story = { args: { variant: 'brand-outline', size: 'toolbar', children: 'Rewrite with AI' }, parameters: design('1069-9228') };

/** Email builder "Use Template": brand outline, Medium 14, 38px, gap 5, 18px icon. */
export const UseTemplate: Story = { args: { variant: 'brand-outline', size: 'template', children: 'Use Template', leadingIcon: <SmsStarOutlineIcon /> }, parameters: design('1535-9937') };

/** Email builder header "Save Draft" + "Review & Send": 37px, p10/18. */
export const Builder: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="secondary" size="builder">Save Draft</Button>
      <Button {...args} size="builder">Review &amp; Send</Button>
    </div>
  ),
  parameters: design('1535-9937'),
};

/** Profile header: "Reset Password" brand outline (Geist 13) + "Edit" warning-bright fill, 37px, 14px icons. */
export const Profile: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="brand-outline" size="profile" family="geist" leadingIcon={<LucideKeyIcon />}>Reset Password</Button>
      <Button {...args} variant="warning-bright" size="profile" leadingIcon={<LucidePencilMdIcon />}>Edit</Button>
    </div>
  ),
  parameters: design('1287-29991'),
};

/** Post details actions: purple "Clone" + red "Delete" outlines, 36px, r6, Medium 13, 14px icons. */
export const Compact: Story = {
  render: (args) => (
    <div className="flex w-drawer-content gap-6">
      <Button {...args} variant="purple-outline" size="compact" fullWidth leadingIcon={<CopyOutlineIcon />}>Clone</Button>
      <Button {...args} variant="brand-outline" size="compact" fullWidth leadingIcon={<TrashOutlineIcon />}>Delete</Button>
    </div>
  ),
  parameters: design('1049-6808'),
};

/** "Compose with AI": #EE1F2F → #F172FF gradient, 48px, p12/24, 24px icon. */
export const ComposeWithAI: Story = { args: { variant: 'ai', size: 'ai', children: 'Compose with AI', leadingIcon: <SiAiEditIcon strokeWidth={1.5} /> }, parameters: design('1525-8388') };

/** Detail page "Back": text-only link, arrow-left 16, Inter Regular 14 #EE1F2F, gap 8. */
export const BackLink: Story = { args: { variant: 'link', children: 'Back', leadingIcon: <LucideArrowLeftIcon /> }, parameters: design('898-3442') };

/** Mobile V2-flow sticky actions: full-width primary (#F32135) + ghost "Save as draft", Roboto Semi Bold 13, gap 6. */
export const MobilePrimary: Story = {
  render: (args) => (
    <div className="flex w-mobile-content flex-col gap-1.5">
      <Button {...args} variant="mobile-primary" size="mobile" fullWidth>Create contact</Button>
      <Button {...args} variant="mobile-ghost" size="mobile" fullWidth>Save as draft</Button>
    </div>
  ),
  parameters: design('1926-25081'),
};

/** Mobile V2 contact actions: outline "Call" / "Email" + primary "Edit" with 17px icons. */
export const MobileWithIcons: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} variant="mobile-outline" size="mobile" leadingIcon={<LucidePhoneIcon strokeWidth={1.8} />}>Call</Button>
      <Button {...args} variant="mobile-outline" size="mobile" leadingIcon={<LucideMailIcon strokeWidth={1.8} />}>Email</Button>
      <Button {...args} variant="mobile-primary" size="mobile" leadingIcon={<LucidePencilIcon strokeWidth={1.8} />}>Edit</Button>
    </div>
  ),
  parameters: design('1926-25109'),
};

/** Mobile sheet actions: two 170px buttons, outline + primary. */
export const MobileSheetActions: Story = {
  render: (args) => (
    <div className="flex gap-2.5">
      <Button {...args} variant="mobile-outline" size="mobile" className="w-mobile-half">Reset</Button>
      <Button {...args} variant="mobile-primary" size="mobile" className="w-mobile-half" leadingIcon={<AddIcon strokeWidth={1.5} />}>Show 42 contacts</Button>
    </div>
  ),
  parameters: design('1926-24920'),
};

/** Mobile V1 buttons: #EE1F2F primary, #E2E8F0 outline, ghost, 44px Roboto 13. */
export const MobileV1: Story = {
  render: (args) => (
    <div className="flex w-mobile-content flex-col gap-1.5">
      <Button {...args} size="mobile" fullWidth>Save contact</Button>
      <Button {...args} variant="outline" size="mobile" fullWidth>Cancel</Button>
      <Button {...args} variant="ghost" size="mobile" fullWidth>Save as draft</Button>
    </div>
  ),
  parameters: design('1918-22905'),
};

/** Mobile V2-sections: primary and #CBD5E1 outline, Roboto Semi Bold 14. */
export const MobileSections: Story = {
  render: (args) => (
    <div className="flex w-mobile-content flex-col gap-2.5">
      <Button {...args} size="mobile-sections" fullWidth>Save changes</Button>
      <Button {...args} variant="outline-strong" size="mobile-sections" fullWidth>Cancel</Button>
    </div>
  ),
  parameters: design('1931-24592'),
};

/** Mobile sections "Delete workspace permanently": #FFF0F1 fill + #EE1F2F outline. */
export const DangerOutline: Story = {
  args: { variant: 'danger-outline', size: 'mobile-sections', fullWidth: true, children: 'Delete workspace permanently' },
  decorators: [(S) => <div className="w-mobile-content"><S /></div>],
  parameters: design('1931-25568'),
};

/** Mobile Audience bulk bar: warning "Edit" (#DF9B17, Inter Semi Bold 13) + primary "Delete", 170×44. */
export const Warning: Story = {
  render: (args) => (
    <div className="flex gap-2.5">
      <Button {...args} variant="warning" size="mobile" family="inter" className="w-mobile-half" leadingIcon={<LucidePencilIcon />} iconSize={14}>Edit</Button>
      <Button {...args} size="mobile" family="inter" className="w-mobile-half" leadingIcon={<TrashOutlineIcon />} iconSize={14}>Delete</Button>
    </div>
  ),
  parameters: design('1933-14633'),
};

/** Disabled (derived, not drawn): sunken fill, muted label for every boxed variant. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </div>
  ),
};

/** Loading (derived): keeps width and colour, shows a spinner and blocks repeat submits. */
export const Loading: Story = {
  args: { loading: true, children: 'Send invitation' },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** Every variant at its Figma size, plus disabled and loading, for review against Figma. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const sizeFor: Partial<Record<ButtonVariant, ButtonSize>> = {
      submit: 'drawer', secondary: 'drawer', navy: 'builder', outline: 'banner', toolbar: 'toolbar', 'toolbar-muted': 'md', neutral: 'settings-xs',
      'purple-outline': 'compact', 'danger-outline': 'mobile-sections', 'outline-strong': 'mobile-sections', warning: 'mobile', 'warning-bright': 'profile',
      ai: 'ai', 'mobile-primary': 'mobile', 'mobile-outline': 'mobile', 'mobile-ghost': 'mobile',
    };
    return (
      <div className="grid grid-cols-4 items-center gap-x-6 gap-y-3">
        <span />
        {['Default', 'Disabled', 'Loading'].map((h) => (
          <span key={h} className="text-overline text-text-secondary">{h}</span>
        ))}
        {variants.map((v) => (
          <div key={v} className="contents">
            <span className="text-label-sm text-text-primary">{v}</span>
            <Button variant={v} size={sizeFor[v] ?? 'toolbar'}>Get started</Button>
            <Button variant={v} size={sizeFor[v] ?? 'toolbar'} disabled>Get started</Button>
            <Button variant={v} size={sizeFor[v] ?? 'toolbar'} loading>Get started</Button>
          </div>
        ))}
      </div>
    );
  },
};

/** Every size with the primary variant. */
export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((s) => (
        <Button key={s} size={s} variant={s === 'ai' ? 'ai' : 'primary'}>{s}</Button>
      ))}
    </div>
  ),
};
