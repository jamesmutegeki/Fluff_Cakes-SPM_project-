import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import Eyebrow from './Eyebrow';

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: 'left' | 'center';
  light?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <Eyebrow className={light ? 'text-blush' : undefined}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          'mt-3 font-display text-4xl leading-[1.1] md:text-5xl',
          light ? 'text-cream' : 'text-cocoa-deep'
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn('mt-4 text-base leading-relaxed', light ? 'text-cream/80' : 'text-cocoa/80')}>
          {sub}
        </p>
      )}
    </div>
  );
}
