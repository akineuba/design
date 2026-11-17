import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('links the label to the input', () => {
    render(<Input label="Work email" />);
    expect(screen.getByLabelText('Work email')).toBeInTheDocument();
  });

  it('describes the field with helper text', () => {
    render(<Input label="Work email" helperText="Use your business email address." />);
    expect(screen.getByLabelText('Work email')).toHaveAccessibleDescription('Use your business email address.');
  });

  it('marks the field invalid and shows the error instead of helper text', () => {
    render(<Input label="Work email" helperText="Helper" error="Enter a valid email address." />);
    const input = screen.getByLabelText('Work email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email address.');
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('shows a required marker hidden from assistive tech', () => {
    render(<Input label="Work email" required />);
    expect(screen.getByLabelText(/Work email/)).toBeRequired();
  });
});
