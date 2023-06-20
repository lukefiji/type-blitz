import cn from '@/utils/cn';
import { forwardRef } from 'react';

const Cursor = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className={cn([
          'absolute left-0 top-0 z-10 hidden w-0.5 bg-gray-800 opacity-50',
          'duration-100 ease-out',
        ])}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

export default Cursor;
