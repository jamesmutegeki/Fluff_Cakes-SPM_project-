import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import LinkButton from '../components/LinkButton';
import CakeCard from '../components/CakeCard';
import Reveal from '../components/Reveal';
import { PageError, PageLoader } from '../components/Loader';
import { useContent } from '../lib/content';
import { ugx } from '../lib/format';
import { cn } from '../lib/cn';

export default function MenuPage() {
  const { content, loading, error, refetch } = useContent();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const param = searchParams.get('category');
    if (param && content?.filterCategories.includes(param)) setFilter(param);
  }, [searchParams, content]);

  if (loading) return <PageLoader />;
  if (error || !content)
    return <PageError message={error ?? 'Content is unavailable right now.'} onRetry={refetch} />;

  const cakes = filter === 'All' ? content.cakes : content.cakes.filter((c) => c.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Cake menu & packages"
        title={
          <>
            Something <em className="text-berry">delicious</em> for every occasion.
          </>
        }
        sub="Pick a ready-made favourite or choose a package and make it your own. All cakes are baked fresh to order."
        img="/images/layered.jpg"
        imgAlt="Layered chocolate cake with dripping ganache"
      />

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our cakes"
            title="The Fluff menu"
            sub="Prices are indicative starting prices and may vary with size and design."
          />
        </Reveal>
        <div
          className="mt-8 flex flex-wrap gap-2.5"
          role="tablist"
          aria-label="Filter cakes by category"
        >
          {['All', ...content.filterCategories].map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-semibold transition-all',
                filter === cat
                  ? 'border-berry bg-berry text-white'
                  : 'border-cocoa/25 text-cocoa hover:border-berry hover:text-berry'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
        <p className="mt-6 text-sm text-cocoa/60">
          Showing {cakes.length} of {content.cakes.length} items.
        </p>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-cocoa py-20 text-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              light
              align="center"
              eyebrow="Cake packages"
              title="Choose your size"
              sub="Three simple packages that cover most celebrations. Mix and match flavours and add extras below."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-[2rem] p-8',
                    pkg.featured
                      ? 'bg-cream text-cocoa-deep md:-translate-y-4'
                      : 'border border-cream/20 bg-cocoa-deep/40'
                  )}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-berry px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-3xl">{pkg.name}</h3>
                  <p className={cn('mt-1 text-sm', pkg.featured ? 'text-cocoa/70' : 'text-cream/70')}>
                    {pkg.size} · serves {pkg.serves}
                  </p>
                  <p
                    className={cn(
                      'mt-6 font-display text-4xl',
                      pkg.featured ? 'text-berry' : 'text-blush'
                    )}
                  >
                    {pkg.from_price && (
                      <span className="mr-1.5 font-sans text-sm font-medium opacity-70">from</span>
                    )}
                    {ugx(pkg.price)}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check
                          className={cn(
                            'mt-0.5 h-4 w-4 shrink-0',
                            pkg.featured ? 'text-berry' : 'text-blush'
                          )}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/order"
                    className={cn(
                      'mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors',
                      pkg.featured
                        ? 'bg-berry text-white hover:bg-berry-deep'
                        : 'bg-cream text-cocoa-deep hover:bg-white'
                    )}
                  >
                    Choose {pkg.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flavours & extras */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <Eyebrow>Flavours</Eyebrow>
          <h2 className="mt-3 font-display text-4xl text-cocoa-deep">Pick your sponge</h2>
          <p className="mt-3 text-cocoa/75">
            Any flavour works with any package. Pair with buttercream, ganache or fresh cream.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {content.flavours.map((f) => (
              <span
                key={f.id}
                className="rounded-full border border-cocoa/20 bg-white/60 px-4 py-2 text-sm text-cocoa-deep"
              >
                {f.name}
              </span>
            ))}
          </div>
          <img
            src="/images/blue.jpg"
            alt="Chocolate cupcakes with blue frosting and silver sprinkles"
            loading="lazy"
            className="mt-8 aspect-[16/10] w-full rounded-[2rem] object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <Eyebrow>Extras</Eyebrow>
          <h2 className="mt-3 font-display text-4xl text-cocoa-deep">Add-ons</h2>
          <p className="mt-3 text-cocoa/75">Little extras that make your cake unmistakably yours.</p>
          <ul className="mt-6 divide-y divide-cocoa/15 rounded-3xl border border-cocoa/15 bg-white/60">
            {content.addons.map((addon) => (
              <li
                key={addon.id}
                className="flex items-center justify-between gap-4 px-6 py-4 text-sm"
              >
                <span className="font-medium text-cocoa-deep">{addon.name}</span>
                <span className="font-display text-base text-berry">{addon.price_label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-3xl bg-blush/60 p-6">
            <p className="font-display text-xl text-cocoa-deep">Dreaming of something different?</p>
            <p className="mt-1 text-sm text-cocoa/75">
              Tell us your idea and we'll design a one-of-a-kind cake.
            </p>
            <LinkButton to="/order" variant="berry" className="mt-4">
              Request a custom cake
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
