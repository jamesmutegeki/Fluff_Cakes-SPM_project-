import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-berry', className)}>
      {children}
    </p>
  );
}
