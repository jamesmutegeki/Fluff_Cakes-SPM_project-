import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

export default function PageHero({
  eyebrow,
  title,
  sub,
  img,
  imgAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  img: string;
  imgAlt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-2 via-cream to-blush/60">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cocoa-deep md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-cocoa/80">{sub}</p>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="blob absolute -inset-4 bg-berry/15" />
          <img
            src={img}
            alt={imgAlt}
            className="blob-2 relative aspect-square w-full object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
