import { createContext, forwardRef, useContext, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { LucideCheckIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { RadioMark } from '../Radio';

/**
 * Card style, named by where Figma draws it.
 * - modal: "Move To New Audience" picker (1446:32230 selected / 1446:32237), 60px, p12 g20 r12; selected #FFF1F2 + #FECACA,
 *   24px round check indicator
 * - sheet: mobile select sheet option (1933:13986 / selected 1933:13999), 50px, p12 r8, 18px radio
 * - channel: mobile campaign channel card (1926:27205), 62px, p13 g11 r12, 36px icon circle and a trailing control
 * - platform: connect-social platform card (1238:26211), 62px, p16 g16 r10, 30px logo
 */
export type OptionCardAppearance = 'modal' | 'sheet' | 'channel' | 'platform';

interface GroupCtx {
  name: string;
  value: string;
  onChange: (v: string) => void;
  appearance: OptionCardAppearance;
}
const Ctx = createContext<GroupCtx | null>(null);

export interface OptionCardGroupProps {
  'aria-label': string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  appearance?: OptionCardAppearance;
  className?: string;
  children: ReactNode;
}

const groupGap: Record<OptionCardAppearance, string> = { modal: 'gap-3', sheet: 'gap-2', channel: 'gap-2.25', platform: 'gap-3' };

/** Single-choice list of option cards. Built on native radios: Tab enters the group, arrow keys move the selection. */
export function OptionCardGroup({ value, defaultValue, onValueChange, name, appearance = 'modal', className, children, ...rest }: OptionCardGroupProps) {
  const auto = useId();
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;
  return (
    <Ctx.Provider
      value={{
        name: name ?? `option-${auto}`,
        value: current,
        onChange: (v) => {
          if (value === undefined) setInner(v);
          onValueChange?.(v);
        },
        appearance,
      }}
    >
      <div role="radiogroup" aria-label={rest['aria-label']} className={cn('flex flex-col', groupGap[appearance], className)}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export interface OptionCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'title'> {
  value: string;
  /** Option name ("Microsoft Creator Hub", "Email"). */
  title: ReactNode;
  /** Second line: member count, channel note or connection status. */
  description?: ReactNode;
  /** Leading icon (channel: glyph inside the 36px circle) or logo (platform: 30px). */
  icon?: ReactNode;
  appearance?: OptionCardAppearance;
  /** Selected state when used outside a group. */
  selected?: boolean;
  /**
   * Trailing control instead of the radio, e.g. the channel card's red Switch. The card then is not a radio itself;
   * pass `selected` to draw the #FFC8CF selected border.
   */
  control?: ReactNode;
}

const frame: Record<OptionCardAppearance, { base: string; idle: string; selected: string }> = {
  modal: { base: 'gap-5 rounded-lg p-3', idle: 'border-border-modal bg-surface-default', selected: 'border-border-danger-subtle bg-status-danger-subtle' },
  sheet: { base: 'h-12.5 justify-between rounded-md p-3', idle: 'border-mobile-border bg-surface-default', selected: 'border-mobile-brand bg-brand-primary-subtle' },
  channel: { base: 'gap-2.75 rounded-lg p-3.25', idle: 'border-mobile-border bg-surface-default', selected: 'border-mobile-selected-border bg-surface-default' },
  platform: { base: 'gap-4 rounded-callout p-4', idle: 'border-border-default bg-surface-default', selected: 'border-brand-primary bg-surface-default' },
};

const titles: Record<OptionCardAppearance, { idle: string; selected: string; description: string; gap: string }> = {
  modal: { idle: 'text-label text-text-strong', selected: 'text-label text-brand-primary', description: 'text-caption text-text-secondary', gap: 'gap-0.5' },
  sheet: { idle: 'font-data text-caption font-semibold text-mobile-text', selected: 'font-data text-caption font-semibold text-mobile-text', description: 'font-data text-caption-xs text-mobile-text-secondary', gap: 'gap-0.5' },
  channel: { idle: 'font-data text-caption font-bold text-mobile-text', selected: 'font-data text-caption font-bold text-mobile-text', description: 'font-data text-caption-xs text-mobile-text-secondary', gap: 'gap-0.5' },
  platform: { idle: 'font-instrument text-label text-text-strong', selected: 'font-instrument text-label text-text-strong', description: 'font-instrument text-caption-sm text-text-icon-strong', gap: 'gap-0.5' },
};

function Indicator({ appearance, checked }: { appearance: OptionCardAppearance; checked: boolean }) {
  if (appearance === 'modal') {
    return (
      <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full', checked ? 'bg-brand-primary text-text-inverse' : 'border border-border-neutral bg-surface-default')}>
        {checked && <LucideCheckIcon className="size-3.5" />}
      </span>
    );
  }
  if (appearance === 'sheet') return <RadioMark appearance="sheet" checked={checked} />;
  if (appearance === 'platform') return <RadioMark appearance="default" checked={checked} />;
  return null;
}

/** A selectable card: a radio option in an `OptionCardGroup`, or a card with its own trailing `control`. */
export const OptionCard = forwardRef<HTMLInputElement, OptionCardProps>(function OptionCard(
  { value, title, description, icon, appearance: appearanceProp, selected, control, className, disabled, id, onChange, ...rest },
  ref,
) {
  const group = useContext(Ctx);
  const auto = useId();
  const inputId = id ?? `option-card-${auto}`;
  const appearance = appearanceProp ?? group?.appearance ?? 'modal';
  const checked = group ? group.value === value : Boolean(selected);
  const f = frame[appearance];
  const t = titles[appearance];

  const body = (
    <>
      {icon && appearance === 'channel' && (
        <span className="flex size-avatar-36 shrink-0 items-center justify-center rounded-full bg-brand-primary-subtle text-brand-primary [&>svg]:size-4.5">{icon}</span>
      )}
      {icon && appearance === 'platform' && <span className="flex size-7.5 shrink-0 items-center justify-center [&>svg]:size-7.5">{icon}</span>}
      <span className={cn('flex min-w-0 flex-1 flex-col', t.gap)}>
        <span className={checked ? t.selected : t.idle}>{title}</span>
        {description && <span className={t.description}>{description}</span>}
      </span>
    </>
  );

  if (control) {
    return (
      <div className={cn('flex items-center border', f.base, checked ? f.selected : f.idle, className)} data-selected={checked || undefined}>
        {body}
        <span className="shrink-0">{control}</span>
      </div>
    );
  }

  return (
    <label
      htmlFor={inputId}
      data-selected={checked || undefined}
      className={cn(
        'flex items-center border transition-colors duration-fast ease-standard has-[:focus-visible]:shadow-focus',
        f.base,
        checked ? f.selected : f.idle,
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="sr-only"
        value={value}
        name={group?.name ?? rest.name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e);
          if (e.target.checked) group?.onChange(value);
        }}
        {...rest}
      />
      {body}
      <Indicator appearance={appearance} checked={checked} />
    </label>
  );
});
