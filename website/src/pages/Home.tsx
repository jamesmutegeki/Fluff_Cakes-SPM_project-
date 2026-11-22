import { Link } from 'react-router-dom';
import { CakeSlice, Sparkle, Sparkles, Star } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import SectionHeading from '../components/SectionHeading';
import LinkButton from '../components/LinkButton';
import ArrowIcon from '../components/ArrowIcon';
import CakeCard from '../components/CakeCard';
import Reveal from '../components/Reveal';
import { PageError, PageLoader } from '../components/Loader';
import { useContent } from '../lib/content';

export default function Home() {
  const { content, loading, error, refetch } = useContent();

  if (loading) return <PageLoader />;
  if (error || !content)
    return <PageError message={error ?? 'Content is unavailable right now.'} onRetry={refetch} />;

  const bestsellers = content.cakes.filter((c) => c.bestseller);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-2 to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-24 md:pt-20">
          <div className="relative z-10">
            <Eyebrow>Premium cakes &amp; desserts</Eyebrow>
            <h1 className="mt-5 font-display text-[3.2rem] font-medium leading-[1.02] text-cocoa-deep sm:text-6xl lg:text-7xl">
              Life is <em className="text-berry">sweeter</em>
              <br />
              with Fluff.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa/80">
              Handcrafted birthday, wedding and celebration cakes — baked fresh to order with the
              finest ingredients to make your special moments even more memorable.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to="/order" variant="berry">
                Order a cake
              </LinkButton>
              <LinkButton to="/menu" variant="outline">
                View cake menu
              </LinkButton>
            </div>
            <ul className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-cocoa/15 pt-6">
              {[
                ['Fresh ingredients', 'Always natural'],
                ['Made with love', 'In every bite'],
                ['Custom cakes', 'For every occasion'],
              ].map(([title, sub]) => (
                <li key={title}>
                  <p className="text-sm font-semibold text-cocoa-deep">{title}</p>
                  <p className="text-xs text-cocoa/65">{sub}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="blob absolute -inset-3 rotate-6 bg-berry" />
            <div className="blob-2 absolute -inset-1 -rotate-3 bg-cream" />
            <img
              src="/images/hero.jpg"
              alt="Chocolate drip cake topped with nuts on a white cake stand"
              className="blob relative aspect-[4/4.4] w-full object-cover shadow-2xl"
            />
            <span className="absolute -right-1 top-6 rotate-6 font-script text-3xl leading-tight text-berry-deep md:-right-6">
              Good food,
              <br />
              happy moments
            </span>
            <div className="absolute -left-3 bottom-10 flex h-28 w-28 items-center justify-center rounded-full bg-cream shadow-lg md:-left-8 md:h-32 md:w-32">
              <svg
                viewBox="0 0 120 120"
                className="spin-slow absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <path id="circ" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                </defs>
                <text fontSize="11.5" letterSpacing="3.2" fill="#a8133e" fontWeight="600">
                  <textPath href="#circ">BAKED FRESH • FRESH INGREDIENTS •</textPath>
                </text>
              </svg>
              <CakeSlice className="h-8 w-8 text-berry" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Marquee ribbon */}
        <div className="overflow-hidden border-y border-cocoa/10 bg-cocoa py-3.5 text-cream">
          <div className="marquee flex w-max gap-10 whitespace-nowrap">
            {[...content.marquee, ...content.marquee, ...content.marquee, ...content.marquee].map(
              (item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em]"
                >
                  {item}
                  <Sparkle className="h-4 w-4 text-blush" fill="currentColor" aria-hidden="true" />
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Shop by category" title="Find your perfect cake" />
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-berry"
          >
            View full menu <ArrowIcon />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {content.categories.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 70}>
              <Link
                to={`/menu?category=${encodeURIComponent(cat.filter)}`}
                className="group block overflow-hidden rounded-3xl border border-cocoa/10 bg-white/60"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-cocoa-deep">
                  {cat.label}
                  <ArrowIcon className="text-berry transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-cream-2/70 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Our bestsellers"
              title="Popular cakes"
              sub="Customer favourites that never go out of style. Prices are indicative and confirmed when you order."
            />
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-berry"
            >
              See all cakes <ArrowIcon />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((cake, i) => (
              <Reveal key={cake.id} delay={i * 80}>
                <CakeCard cake={cake} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="relative overflow-hidden bg-sage-deep text-cream">
        <div className="mx-auto grid max-w-7xl items-center md:grid-cols-2">
          <img
            src="/images/baker.jpg"
            alt="A baker decorating a cake with icing in the Fluff Cakes kitchen"
            loading="lazy"
            className="h-80 w-full object-cover md:h-full md:min-h-[480px]"
          />
          <Reveal className="px-5 py-14 md:px-16">
            <Eyebrow className="text-blush">Our story</Eyebrow>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Baked with <em className="text-blush">passion</em>,<br />
              made for you.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream/85">
              Fluff Cakes started with a simple dream — to create cakes that bring joy, celebrate
              milestones and make life's special moments sweeter. Every cake is baked in small
              batches and decorated by hand.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ['Premium quality', 'Only the finest ingredients'],
                ['Creative designs', 'Made to match your occasion'],
                ['Made with love', 'Straight from our kitchen to your table'],
              ].map(([title, sub]) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/40 text-blush">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="text-sm text-cream/70">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
            <LinkButton to="/about" variant="light" className="mt-9">
              Read our story
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* How ordering works */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Simple as 1-2-3-4"
            title="How ordering works"
            sub="No accounts, no carts — just a friendly conversation and a beautiful cake."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="h-full rounded-3xl border border-cocoa/10 bg-white/60 p-7">
                <span className="font-display text-5xl text-berry/25">{step.n}</span>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/75">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blush/50 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="What our customers say" title="Sweet words" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <figure className="h-full rounded-3xl bg-cream p-7 shadow-sm">
                  <p className="flex gap-1 text-berry" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                    ))}
                  </p>
                  <blockquote className="mt-4 font-display text-lg leading-relaxed text-cocoa-deep">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-cocoa/70">
                    <span className="font-semibold text-cocoa-deep">{t.name}</span> · {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-berry px-8 py-16 text-center text-cream md:py-20">
            <div className="blob absolute -left-16 -top-20 h-64 w-64 bg-berry-deep/60" />
            <div className="blob-2 absolute -bottom-24 -right-10 h-72 w-72 bg-berry-deep/60" />
            <div className="relative">
              <p className="font-script text-3xl text-blush">intense. rich. unforgettable.</p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
                Let's make your moment special.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton to="/order" variant="light">
                  Start your order
                </LinkButton>
                <LinkButton
                  to="/menu"
                  variant="outline"
                  className="border-cream/50 text-cream hover:border-cream hover:bg-cream/10"
                >
                  Browse packages
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
