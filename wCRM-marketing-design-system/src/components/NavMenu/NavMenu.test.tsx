import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavMenu } from './NavMenu';
import { businessSections, businessSettings } from './NavMenu.fixtures';

describe('NavMenu', () => {
  it('marks the active page and calls onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<NavMenu sections={businessSections} activeId="dashboard" onNavigate={onNavigate} />);
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Deals' }));
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'deals' }), expect.anything());
  });

  it('opens a group that holds the active page and toggles groups', async () => {
    const closed = businessSections.map((s) => ({ ...s, items: s.items.map((i) => ({ ...i, defaultOpen: false })) }));
    const { unmount } = render(<NavMenu sections={closed} activeId="dashboard" />);
    expect(screen.getByRole('button', { name: 'Reports' })).toHaveAttribute('aria-expanded', 'false');
    unmount();
    render(<NavMenu sections={closed} activeId="report-birthdays" />);
    const reports = screen.getByRole('button', { name: 'Reports' });
    expect(reports).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Birthdays' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(reports);
    expect(reports).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Birthdays' })).toBeNull();
  });

  it('renders the Settings dropdown and Log Out', async () => {
    const onLogout = vi.fn();
    render(<NavMenu sections={businessSections} settings={{ ...businessSettings, defaultOpen: false }} onLogout={onLogout} />);
    const settings = screen.getByRole('button', { name: 'Settings' });
    expect(settings).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById(settings.getAttribute('aria-controls')!)!.className).toContain('hidden');
    await userEvent.click(settings);
    expect(screen.getByRole('button', { name: 'Users & access' })).toBeInTheDocument();
    expect(document.getElementById(settings.getAttribute('aria-controls')!)!.className).not.toContain('hidden');
    await userEvent.click(screen.getByRole('button', { name: 'Log Out' }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it('renders links when items have an href', () => {
    render(<NavMenu sections={[{ id: 's', items: [{ id: 'home', label: 'Home', href: '/home' }] }]} activeId="home" />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });
});

describe('NavMenu settings chevrons', () => {
  it('starts closed and shows sub-item chevrons unless showChevrons is false', async () => {
    const items = [{ id: 'org', label: 'Organization' }];
    const { container, unmount } = render(<NavMenu sections={[]} settings={{ items }} />);
    const toggle = screen.getByRole('button', { name: 'Settings' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Organization' }).querySelector('svg')).not.toBeNull();
    unmount();
    render(<NavMenu sections={[]} settings={{ items, showChevrons: false, defaultOpen: true }} />);
    expect(screen.getByRole('button', { name: 'Organization' }).querySelector('svg')).toBeNull();
    expect(container).toBeTruthy();
  });
});
