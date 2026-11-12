import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { businessSections, businessSettings } from './Sidebar.fixtures';

describe('Sidebar', () => {
  it('marks the active page and calls onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<Sidebar sections={businessSections} activeId="dashboard" onNavigate={onNavigate} />);
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Deals' }));
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'deals' }), expect.anything());
  });

  it('opens a group that holds the active page and toggles groups', async () => {
    render(<Sidebar sections={businessSections} activeId="report-birthdays" />);
    const reports = screen.getByRole('button', { name: 'Reports' });
    expect(reports).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Birthdays' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(reports);
    expect(reports).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Birthdays' })).toBeNull();
  });

  it('renders the Settings dropdown and Log Out', async () => {
    const onLogout = vi.fn();
    render(<Sidebar sections={businessSections} settings={{ ...businessSettings, defaultOpen: false }} onLogout={onLogout} />);
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
    render(<Sidebar sections={[{ id: 's', items: [{ id: 'home', label: 'Home', href: '/home' }] }]} activeId="home" />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });
});
