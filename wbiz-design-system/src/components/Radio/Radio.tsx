import { createContext, forwardRef, useContext, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

type GroupCtx = { name: string; value?: string; onChange?: (value: string) => void; disabled?: boolean } | null;
const Ctx = createContext<GroupCtx>(null);

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  label: ReactNode;
  value: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

/**
 * 16px radio. Figma: "Customer Type" (New Customer, 209:4142) and "Mark as Contra" (New Account,
 * 1871:19941): 1px black ring, label Inter Medium 14 black, 8px gap.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, value, disabled, className, onChange, ...rest },
  ref,
) {
  const group = useContext(Ctx);
  const isDisabled = disabled ?? group?.disabled;
  return (
    <label className={cx('inline-flex items-center gap-2 font-sans text-sm font-medium', isDisabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-black', className)}>
      <span className="relative inline-flex size-radio shrink-0">
        <input
          ref={ref}
          type="radio"
          value={value}
          disabled={isDisabled}
          name={group?.name ?? rest.name}
          checked={group ? group.value === value : rest.checked}
          onChange={(e) => {
            onChange?.(e);
            group?.onChange?.(value);
          }}
          className={cx(
            'peer size-radio shrink-0 cursor-[inherit] appearance-none rounded-full border border-fg-black bg-surface',
            'checked:border-primary focus-visible:outline-none focus-visible:shadow-focus disabled:border-line',
          )}
          {...rest}
        />
        <span className="pointer-events-none absolute inset-1 hidden rounded-full bg-primary peer-checked:block" aria-hidden />
      </span>
      {label}
    </label>
  );
});

export interface RadioGroupProps {
  /** Group label, shown above the options. */
  label?: ReactNode;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  /** Options sit side by side (Figma default) or stacked. */
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ label, required, value, onChange, name, disabled, orientation = 'horizontal', children, className }: RadioGroupProps) {
  const autoName = useId();
  const labelId = useId();
  return (
    <Ctx.Provider value={{ name: name ?? autoName, value, onChange, disabled }}>
      <div role="radiogroup" aria-labelledby={label ? labelId : undefined} aria-required={required || undefined} className={cx('flex flex-col gap-4', className)}>
        {label && (
          <span id={labelId} className="font-data text-sm text-fg-black">
            {label}
            {required && <span className="text-error" aria-hidden> *</span>}
          </span>
        )}
        <div className={cx('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-wrap')}>{children}</div>
      </div>
    </Ctx.Provider>
  );
}
