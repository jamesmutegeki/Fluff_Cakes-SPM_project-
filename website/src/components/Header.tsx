import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Cake Menu' },
  { to: '/order', label: 'Order Info & FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link to="/" aria-label="Fluff Cakes home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={pathname === link.to ? 'page' : undefined}
              className={cn(
                'relative py-1 text-sm font-medium transition-colors hover:text-berry',
                pathname === link.to ? 'text-cocoa-deep' : 'text-cocoa/75'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-0.5 left-0 h-[2px] bg-berry transition-all duration-300',
                  pathname === link.to ? 'w-full' : 'w-0'
                )}
              />
            </Link>
          ))}
        </nav>
        <Link
          to="/order"
          className="hidden rounded-full bg-berry px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-berry-deep md:inline-block"
        >
          Order now
        </Link>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-cocoa"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-cocoa/10 bg-cream px-5 pb-5 pt-2 md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                'block border-b border-cocoa/10 py-3.5 font-display text-xl',
                pathname === link.to ? 'text-berry' : 'text-cocoa-deep'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-berry py-3 text-center text-sm font-semibold text-white"
          >
            Order now
          </Link>
        </nav>
      )}
    </header>
  );
}
