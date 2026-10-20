import * as RadixSwitch from '@radix-ui/react-switch';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: ReactNode;
  description?: ReactNode;
  /** Put the switch after the text, as in the notification preference rows. */
  labelPosition?: 'start' | 'end';
}

/** On/off control (Figma `toggle-switch`, 42 × 22, success green when on). Use for settings that apply immediately. */
export const Switch = forwardRef<ElementRef<typeof RadixSwitch.Root>, SwitchProps>(function Switch(
  { label, description, labelPosition = 'end', id, className, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const switchId = id ?? `switch-${autoId}`;
  const control = (
    <RadixSwitch.Root
      ref={ref}
      id={switchId}
      disabled={disabled}
      className={cn(
        'inline-flex h-switch-height w-switch-width shrink-0 items-center rounded-full p-0.5 transition-colors duration-fast ease-standard',
        'bg-status-toggle-off data-[state=checked]:bg-status-success',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !label && className,
      )}
      {...rest}
    >
      <RadixSwitch.Thumb className="block size-switch-thumb rounded-full bg-surface-default shadow-sm transition-transform duration-fast ease-standard data-[state=checked]:translate-x-5" />
    </RadixSwitch.Root>
  );
  if (!label) return control;
  return (
    <div className={cn('flex items-start gap-3', labelPosition === 'start' && 'flex-row-reverse justify-between', className)}>
      {control}
      <span className="flex flex-col gap-1">
        <label htmlFor={switchId} className={cn('text-label-sm', disabled ? 'text-text-muted' : 'text-text-strong')}>{label}</label>
        {description && <span className="text-caption text-text-secondary">{description}</span>}
      </span>
    </div>
  );
});
