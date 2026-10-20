import { clsx, type ClassValue } from 'clsx';

/** Joins class names. Kept as a single helper so components never concatenate strings by hand. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
