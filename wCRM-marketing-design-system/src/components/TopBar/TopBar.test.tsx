import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('shows the greeting, title and user initials', () => {
    render(<TopBar greeting="Hi Akinola" title="Settings - Social Media" userName="Akinola Ebuka" />);
    expect(screen.getByText('Hi Akinola')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Settings - Social Media' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Account: Akinola Ebuka' })).toHaveTextContent('AE');
  });

  it('labels the bell by unread state and hides the dot when there is nothing unread', () => {
    const { rerender } = render(<TopBar title="T" userName="A B" hasUnreadNotifications />);
    const unread = screen.getByRole('button', { name: 'Notifications (unread)' });
    expect(unread.className).not.toContain('[&_path:last-child]:hidden');
    rerender(<TopBar title="T" userName="A B" />);
    expect(screen.getByRole('button', { name: 'Notifications' }).className).toContain('[&_path:last-child]:hidden');
  });

  it('wires the menu and theme controls', async () => {
    const onMenuClick = vi.fn();
    const onThemeToggle = vi.fn();
    render(
      <TopBar title="T" userName="A B" sidebarOpen sidebarId="nav" theme="dark" onMenuClick={onMenuClick} onThemeToggle={onThemeToggle} />,
    );
    const menu = screen.getByRole('button', { name: 'Close navigation' });
    expect(menu).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveAttribute('aria-controls', 'nav');
    await userEvent.click(menu);
    expect(onMenuClick).toHaveBeenCalledOnce();

    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(toggle);
    expect(onThemeToggle).toHaveBeenCalledOnce();
  });
});
