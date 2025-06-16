import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full h-xsmall px-[10px] text-caption1 font-bold',
        className,
      )}
    >
      {children}
    </span>
  );
}
