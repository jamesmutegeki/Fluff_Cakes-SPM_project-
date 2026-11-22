import { Hand, Heart, HeartHandshake, Palette, Sparkles, Wheat, type LucideIcon } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import LinkButton from '../components/LinkButton';
import Reveal from '../components/Reveal';
import { PageError, PageLoader } from '../components/Loader';
import { useContent } from '../lib/content';

const promiseIcons: Record<string, LucideIcon> = {
  wheat: Wheat,
  hand: Hand,
  palette: Palette,
  handshake: HeartHandshake,
};

export default function About() {
  const { content, loading, error, refetch } = useContent();

  if (loading) return <PageLoader />;
  if (error || !content)
    return <PageError message={error ?? 'Content is unavailable right now.'} onRetry={refetch} />;

  return (
    <>
      <PageHero
        eyebrow="About Fluff Cakes"
        title={
          <>
            A little bakery with a <em className="text-berry">big heart.</em>
          </>
        }
        sub="Fluff Cakes is a home-grown cake studio dedicated to turning birthdays, weddings and everyday wins into sweet memories."
        img="/images/baker2.jpg"
        imgAlt="A baker spreading icing on a cake on a stand"
      />

      {/* Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-3 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl">
            It started with one cake and a simple dream.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-cocoa/80">
            <p>
              What began as baking for family and friends quickly grew by word of mouth. Neighbours
              asked for birthday cakes, then wedding tiers, then boxes of cupcakes for the office.
            </p>
            <p>
              Today Fluff Cakes is led by our Founder &amp; Head Baker, who still tastes every
              flavour before it reaches a customer. We believe a cake should look beautiful, taste
              even better and feel like a hug.
            </p>
            <p>
              This website brings everything in one place — our menu, packages, schedule and how to
              order — so you never need to scroll through old chats or flyers again.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton to="/menu" variant="primary">
              See what we bake
            </LinkButton>
            <LinkButton to="/order" variant="outline">
              How to order
            </LinkButton>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/baker3.jpg"
              alt="Pastry chef pouring chocolate over a cake"
              loading="lazy"
              className="mt-10 aspect-[3/4] w-full rounded-[2rem] object-cover"
            />
            <img
              src="/images/layered.jpg"
              alt="Layered chocolate cake with ganache"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-[2rem] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-berry px-6 py-3 text-center font-script text-2xl text-white shadow-lg">
            baked with love
            <Heart className="h-5 w-5" fill="currentColor" aria-hidden="true" />
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-sage-deep text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:px-8">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center md:border-r md:border-cream/20 md:last:border-0"
            >
              <p className="font-display text-5xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Baking promise */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow="What we stand for" title="Our baking promise" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.promise.map((item, i) => {
            const Icon = promiseIcons[item.icon] ?? Sparkles;
            return (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-cocoa/10 bg-white/60 p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush text-berry">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa/75">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-2/70 py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="From idea to table" title="How a Fluff cake is made" />
          </Reveal>
          <ol className="mt-12 space-y-0">
            {content.aboutSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <li className="flex gap-6 border-t border-cocoa/15 py-6 last:border-b">
                  <span className="font-display text-4xl text-berry">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{step.title}</h3>
                    <p className="mt-1 text-cocoa/75">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <SectionHeading eyebrow="Gallery" title="A taste of our work" />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {content.gallery.map((img, i) => (
            <Reveal key={img} delay={(i % 4) * 70}>
              <img
                src={img}
                alt="Fluff Cakes creation"
                loading="lazy"
                className={`w-full rounded-3xl object-cover transition-transform duration-500 hover:scale-[1.03] ${
                  i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
