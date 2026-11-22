import { Clock, MapPin, Truck } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import OrderPlanner from '../components/OrderPlanner';
import FaqAccordion from '../components/FaqAccordion';
import Reveal from '../components/Reveal';
import { PageError, PageLoader } from '../components/Loader';
import { useContent } from '../lib/content';

export default function Order() {
  const { content, loading, error, refetch } = useContent();

  if (loading) return <PageLoader />;
  if (error || !content)
    return <PageError message={error ?? 'Content is unavailable right now.'} onRetry={refetch} />;

  return (
    <>
      <PageHero
        eyebrow="Order info & FAQ"
        title={
          <>
            Ordering is <em className="text-berry">easy</em> and friendly.
          </>
        }
        sub="Everything you need to know about lead times, deposits, delivery and how to get your cake — plus a planner to build your request."
        img="/images/table2.jpg"
        imgAlt="Dessert table with assorted cakes and pastries"
      />

      {/* Process + practical info */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <Reveal>
          <SectionHeading eyebrow="The process" title="From enquiry to enjoying" />
          <ol className="mt-8 space-y-5">
            {content.processSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-berry font-display text-lg text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-cocoa/75">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={120} className="space-y-6">
          <div className="rounded-[2rem] bg-sage-deep p-7 text-cream">
            <h3 className="font-display text-2xl">Minimum lead times</h3>
            <ul className="mt-4 divide-y divide-cream/20 text-sm">
              {content.leadTimes.map((lt) => (
                <li key={lt.label} className="flex justify-between gap-3 py-3">
                  <span>{lt.label}</span>
                  <span className="font-semibold text-blush">{lt.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-cocoa/15 bg-white/70 p-7">
            <h3 className="font-display text-2xl">Pick-up &amp; delivery</h3>
            <ul className="mt-4 space-y-3 text-sm text-cocoa/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry" aria-hidden="true" />
                <span>
                  <b>Pick-up</b> from our kitchen — exact location shared on confirmation.
                </span>
              </li>
              <li className="flex gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-berry" aria-hidden="true" />
                <span>
                  <b>Delivery</b> within town from UGX 10,000, priced by distance.
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-berry" aria-hidden="true" />
                <span>
                  <b>Hours</b> Mon–Fri 8:00–18:00, Sat 8:00–16:00.
                </span>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Planner */}
      <section id="planner" className="bg-cream-2/70 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Order planner"
              title="Build your cake request"
              sub="Fill in the details and we'll turn them into a ready-to-send message."
            />
          </Reveal>
          <div className="mt-10">
            <OrderPlanner content={content} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.7fr_1.3fr] md:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            sub="Can't find what you need? Send us a message through the planner and we'll gladly help."
          />
          <img
            src="/images/floral.jpg"
            alt="Pink and white floral cupcakes"
            loading="lazy"
            className="blob mt-8 hidden aspect-square w-full max-w-xs object-cover md:block"
          />
        </Reveal>
        <Reveal delay={100}>
          <FaqAccordion faqs={content.faqs} />
        </Reveal>
      </section>
    </>
  );
}
