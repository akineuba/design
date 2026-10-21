import { createContext, useContext } from 'react';

/**
 * Field label style. `compact` is the new features style (Inter Medium 12, fg-muted). `form` is the
 * accounting side-panel style (Roboto 14, black, e.g. "First Name: *"). SidePanel and FilterBar
 * provide `form`, so Input and Select inside them match those screens without extra props.
 */
export type FieldLabelStyle = 'compact' | 'form';

export const FieldLabelContext = createContext<FieldLabelStyle>('compact');
export const useFieldLabelClass = () =>
  useContext(FieldLabelContext) === 'form' ? 'font-data text-sm text-fg-black' : 'font-sans text-xs font-medium text-fg-muted';
