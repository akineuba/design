// Demo account menu shared by the UserMenu stories and the sample-screen shell.
import { HelpIcon, KeyIcon, SettingIcon, UserIcon, WalletIcon } from '../icons';
import type { UserMenuProps } from '../components/UserMenu';

const noop = () => {};

export const demoUserMenu: UserMenuProps = {
  name: 'Ada Obi',
  email: 'ada.obi@example.com',
  role: 'Super User',
  session: { endsAt: '16:01', remaining: '3h 36m left', progress: 0.9 },
  groups: [
    [
      { id: 'profile', label: 'View profile', icon: <UserIcon />, onSelect: noop },
      { id: 'account', label: 'Manage account', icon: <WalletIcon />, external: true, onSelect: noop },
      { id: 'password', label: 'Change password', icon: <KeyIcon />, onSelect: noop },
      { id: 'settings', label: 'Settings', icon: <SettingIcon />, onSelect: noop },
    ],
    [{ id: 'help', label: 'Help & support', icon: <HelpIcon />, onSelect: noop }],
  ],
  onLogOut: noop,
};

