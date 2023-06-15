import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges tailwind-merge and clsx
function clsxMerge(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export default clsxMerge;
