import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('defaults to a primary md button of type="button"', () => {
    render(<Button>Create contact</Button>);
    const btn = screen.getByRole('button', { name: 'Create contact' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveAttribute('data-variant', 'primary');
    expect(btn).toHaveAttribute('data-size', 'md');
  });

  it('blocks clicks and announces progress while loading', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
