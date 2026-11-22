import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import ArrowIcon from './ArrowIcon';

const variants = {
  primary: 'bg-cocoa text-cream hover:bg-cocoa-deep',
  berry: 'bg-berry text-white hover:bg-berry-deep',
  outline: 'border border-cocoa/40 text-cocoa-deep hover:border-cocoa hover:bg-cocoa/5',
  light: 'bg-cream text-berry-deep hover:bg-white',
} as const;

export type LinkButtonVariant = keyof typeof variants;

export default function LinkButton({
  to,
  children,
  variant = 'primary',
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: LinkButtonVariant;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300',
        variants[variant],
        className
      )}
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
