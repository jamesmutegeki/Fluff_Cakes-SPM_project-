import { useState } from 'react';
import type { Faq } from '../lib/content';
import { cn } from '../lib/cn';

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-cocoa/15 rounded-[2rem] border border-cocoa/15 bg-white/70">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.id}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${faq.id}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg text-cocoa-deep md:px-8"
              >
                {faq.question}
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-berry/40 text-berry transition-transform duration-300',
                    isOpen && 'rotate-45 bg-berry text-white'
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-${faq.id}`}
              className={cn(
                'grid transition-all duration-300',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-cocoa/80 md:px-8">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
