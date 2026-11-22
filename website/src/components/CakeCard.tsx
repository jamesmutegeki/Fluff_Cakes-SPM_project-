import { Link } from 'react-router-dom';
import type { Cake } from '../lib/content';
import { ugx } from '../lib/format';
import ArrowIcon from './ArrowIcon';

export default function CakeCard({ cake }: { cake: Cake }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-cocoa/10 bg-white/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(90,58,39,0.45)]">
      <div className="relative aspect-[4/3.2] overflow-hidden bg-cream-2">
        <img
          src={cake.image}
          alt={`${cake.name} — ${cake.description}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {cake.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-berry px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
            {cake.tag}
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa backdrop-blur">
          {cake.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-cocoa-deep">{cake.name}</h3>
        <p className="mt-1.5 min-h-[2.8rem] text-sm leading-relaxed text-cocoa/75">
          {cake.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-cocoa/10 pt-4">
          <p className="font-display text-lg text-berry">
            {cake.from_price && (
              <span className="mr-1 font-sans text-xs font-medium text-cocoa/60">from</span>
            )}
            {ugx(cake.price)}
          </p>
          <Link
            to="/order"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cocoa transition-colors hover:text-berry"
          >
            Order <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
