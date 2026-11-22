import { cn } from '../lib/cn';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 48 48"
        className={cn('h-9 w-9', light ? 'text-cream' : 'text-berry')}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 24c0-8 6-13 14-13s14 5 14 13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M8 24h32l-3.5 16a3 3 0 0 1-3 2.3h-19a3 3 0 0 1-3-2.3L8 24Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 28l1.5 11M24 28v11M32 28l-1.5 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="8" r="3" fill="currentColor" />
      </svg>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[1.45rem] font-medium',
            light ? 'text-cream' : 'text-cocoa-deep'
          )}
        >
          Fluff Cakes
        </span>
        <span
          className={cn(
            'mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.28em]',
            light ? 'text-cream/70' : 'text-cocoa/70'
          )}
        >
          Freshly baked · Always
        </span>
      </span>
    </span>
  );
}
