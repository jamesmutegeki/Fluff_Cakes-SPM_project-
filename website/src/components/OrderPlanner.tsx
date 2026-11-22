import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import { BadgeCheck, ClipboardCopy, MessageCircle } from 'lucide-react';
import type { SiteContent } from '../lib/content';
import { cn } from '../lib/cn';
import Eyebrow from './Eyebrow';

const inputClass =
  'w-full rounded-2xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa-deep outline-none transition focus:border-berry focus:ring-2 focus:ring-berry/20';

const occasions = [
  'Birthday',
  'Wedding',
  'Anniversary',
  'Graduation',
  'Baby shower',
  'Office / church event',
  'Just because',
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/70">
        {label}
      </span>
      {children}
    </label>
  );
}

interface OrderForm {
  name: string;
  occasion: string;
  item: string;
  flavour: string;
  date: string;
  guests: string;
  method: string;
  notes: string;
}

export default function OrderPlanner({ content }: { content: SiteContent }) {
  const [form, setForm] = useState<OrderForm>({
    name: '',
    occasion: 'Birthday',
    item: '',
    flavour: content.flavours[0]?.name ?? 'Dark chocolate',
    date: '',
    guests: '',
    method: 'Pick-up',
    notes: '',
  });
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedRef, setSavedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const set =
    (key: keyof OrderForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const today = new Date().toISOString().split('T')[0];

  const message = useMemo(
    () =>
      [
        "Hello Fluff Cakes! I'd like to place an order enquiry.",
        '',
        `Name: ${form.name || '—'}`,
        `Occasion: ${form.occasion}`,
        `Cake / package: ${form.item || 'Not sure yet — please advise'}`,
        `Flavour: ${form.flavour}`,
        `Needed on: ${form.date || '—'}`,
        `Guests: ${form.guests || '—'}`,
        `Pick-up or delivery: ${form.method}`,
        `Design notes / allergies: ${form.notes || '—'}`,
        '',
        'Please share a quote and availability. Thank you!',
      ].join('\n'),
    [form]
  );

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const saveRequest = async (silent = false): Promise<string | null> => {
    if (!form.name.trim()) {
      if (!silent) setFormError('Please add your first name so we know who the cake is for.');
      return null;
    }
    setFormError(null);
    if (!silent) setSaving(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Save failed');
      }
      const row = await res.json();
      setSavedRef(row.ref);
      return row.ref as string;
    } catch (err) {
      console.error('Save enquiry error:', err);
      if (!silent)
        setFormError('We could not save your request just now — you can still send it on WhatsApp.');
      return null;
    } finally {
      if (!silent) setSaving(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-white/70 p-6 sm:grid-cols-2 md:p-8"
      >
        <Field label="Your first name">
          <input
            className={inputClass}
            value={form.name}
            onChange={set('name')}
            placeholder="e.g. Grace"
            autoComplete="given-name"
          />
        </Field>
        <Field label="Occasion">
          <select className={inputClass} value={form.occasion} onChange={set('occasion')}>
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Cake or package">
          <select className={inputClass} value={form.item} onChange={set('item')}>
            <option value="">Not sure yet</option>
            <optgroup label="Packages">
              {content.packages.map((p) => (
                <option key={p.name}>{p.name} package</option>
              ))}
            </optgroup>
            <optgroup label="Menu">
              {content.cakes.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </optgroup>
          </select>
        </Field>
        <Field label="Flavour">
          <select className={inputClass} value={form.flavour} onChange={set('flavour')}>
            {content.flavours.map((f) => (
              <option key={f.id}>{f.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Date needed">
          <input type="date" min={today} className={inputClass} value={form.date} onChange={set('date')} />
        </Field>
        <Field label="Number of guests">
          <input
            type="number"
            min={1}
            className={inputClass}
            value={form.guests}
            onChange={set('guests')}
            placeholder="e.g. 20"
          />
        </Field>
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/70">
            Pick-up or delivery
          </span>
          <div className="flex gap-3">
            {['Pick-up', 'Delivery'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForm((f) => ({ ...f, method: m }))}
                aria-pressed={form.method === m}
                className={cn(
                  'flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                  form.method === m
                    ? 'border-berry bg-berry text-white'
                    : 'border-cocoa/20 text-cocoa hover:border-berry'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Field label="Design ideas, message on cake, allergies">
            <textarea
              rows={4}
              className={inputClass}
              value={form.notes}
              onChange={set('notes')}
              placeholder="Colours, theme, 'Happy Birthday Mum', nut allergy…"
            />
          </Field>
        </div>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[2rem] bg-cocoa p-6 text-cream md:p-8">
          <Eyebrow className="text-blush">Your order summary</Eyebrow>
          <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-cocoa-deep/60 p-4 font-sans text-sm leading-relaxed text-cream/90">
            {message}
          </pre>
          {savedRef && (
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-cream">
              <BadgeCheck className="h-4 w-4 shrink-0 text-blush" aria-hidden="true" />
              Saved to our order book — reference <span className="font-semibold">{savedRef}</span>.
              Quote it when you message us.
            </p>
          )}
          {formError && (
            <p className="mt-4 rounded-2xl bg-berry/30 px-4 py-3 text-sm text-cream" role="alert">
              {formError}
            </p>
          )}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                void saveRequest(true);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-berry px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-berry-deep"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send on WhatsApp
            </a>
            <button
              onClick={copyMessage}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-cocoa-deep transition-colors hover:bg-white"
            >
              <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
              {copied ? 'Copied ✓' : 'Copy message'}
            </button>
          </div>
          <button
            onClick={() => void saveRequest()}
            disabled={saving}
            className="mt-3 w-full rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving…' : savedRef ? 'Update saved request' : 'Save request to our order book'}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-cream/60">
            Your request is saved to the Fluff Cakes order book so we never lose it, and WhatsApp
            opens so you can send it to our chat too.
          </p>
        </div>
      </div>
    </div>
  );
}
