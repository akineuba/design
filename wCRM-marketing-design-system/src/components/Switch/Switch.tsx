import * as RadixSwitch from '@radix-ui/react-switch';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { ToggleOffIcon, ToggleOnBoldIcon } from '../../icons';
import { cn } from '../../utils/cn';

/**
 * - default: `toggle-switch` 42×22, r11, p2; on #05D38A, off #9CA3AF; 18px white thumb, no shadow
 * - channel: 38×22 red-on switch in the mobile campaign channel card (on #F32135)
 * - icon: the vuesax toggle-on (bold) / toggle-off (linear) 32px glyphs in #292D32 used on mobile V2-sections preference rows
 */
export type SwitchAppearance = 'default' | 'channel' | 'icon';

/**
 * Label/description styles for the rows that hold a switch.
 * - default: 13/600 #111827 + 12 #64748B
 * - settings: Organisation toggle row, Roboto SemiBold 14 #111827 + Roboto 12 #9CA3AF
 * - preference: pref-row header, Roboto SemiBold 14 #111827 + Roboto 12 #4B5563
 * - composer: post settings toggle rows, Inter Semi Bold 14 #2B3674 + 12 #A3AED0
 * - mobile: V2-sections preference row, Roboto Medium 14 #1E2238 + Roboto 11/140% #8F9BBA
 * - sheet: bottom-sheet "Default toggle" row, Roboto 12 #151A33
 */
export type SwitchLabelStyle = 'default' | 'settings' | 'preference' | 'composer' | 'mobile' | 'sheet';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: ReactNode;
  description?: ReactNode;
  /** Put the switch after the text, as in the notification preference rows. */
  labelPosition?: 'start' | 'end';
  appearance?: SwitchAppearance;
  labelStyle?: SwitchLabelStyle;
}

const labelStyles: Record<SwitchLabelStyle, { label: string; description: string; gap: string }> = {
  default: { label: 'text-label-sm text-text-strong', description: 'text-caption text-text-secondary', gap: 'gap-1' },
  settings: { label: 'font-data text-label text-text-strong', description: 'font-data text-caption text-text-hint', gap: 'gap-1' },
  preference: { label: 'font-data text-label text-text-strong', description: 'font-data text-caption text-text-icon-strong', gap: 'gap-1' },
  composer: { label: 'text-label text-accent-navy-hover', description: 'text-caption text-text-muted', gap: 'gap-1' },
  mobile: { label: 'font-data text-body font-medium text-text-primary', description: 'font-data text-caption-sm leading-140 text-mobile-caption', gap: 'gap-0.5' },
  sheet: { label: 'font-data text-caption text-mobile-text', description: 'font-data text-caption-xs text-mobile-text-secondary', gap: 'gap-0.5' },
};

const roots: Record<SwitchAppearance, string> = {
  default: 'h-switch-height w-switch-width rounded-full p-0.5 bg-status-toggle-off data-[state=checked]:bg-status-success',
  channel: 'h-switch-height w-switch-width-sm rounded-full p-0.5 bg-status-toggle-off data-[state=checked]:bg-mobile-brand',
  icon: 'size-8 justify-center rounded-sm text-mobile-icon',
};

const thumbs: Record<Exclude<SwitchAppearance, 'icon'>, string> = {
  default: 'data-[state=checked]:translate-x-5',
  channel: 'data-[state=checked]:translate-x-4',
};

/** On/off control for settings that apply immediately. */
export const Switch = forwardRef<ElementRef<typeof RadixSwitch.Root>, SwitchProps>(function Switch(
  { label, description, labelPosition = 'end', appearance = 'default', labelStyle = 'default', id, className, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const switchId = id ?? `switch-${autoId}`;
  const l = labelStyles[labelStyle];
  const control = (
    <RadixSwitch.Root
      ref={ref}
      id={switchId}
      disabled={disabled}
      data-appearance={appearance}
      className={cn(
        'group inline-flex shrink-0 items-center transition-colors duration-fast ease-standard',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        roots[appearance],
        !label && className,
      )}
      {...rest}
    >
      {appearance === 'icon' ? (
        <>
          <ToggleOnBoldIcon className="hidden size-8 group-data-[state=checked]:block" />
          <ToggleOffIcon className="block size-8 group-data-[state=checked]:hidden" strokeWidth={1.5} />
        </>
      ) : (
        <RadixSwitch.Thumb className={cn('block size-switch-thumb rounded-full bg-surface-default transition-transform duration-fast ease-standard', thumbs[appearance])} />
      )}
    </RadixSwitch.Root>
  );
  if (!label) return control;
  return (
    <div className={cn('flex items-start gap-3', labelPosition === 'start' && 'flex-row-reverse justify-between', className)}>
      {control}
      <span className={cn('flex flex-col', l.gap)}>
        <label htmlFor={switchId} className={cn(l.label, disabled && 'opacity-60')}>{label}</label>
        {description && <span className={l.description}>{description}</span>}
      </span>
    </div>
  );
});
