import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
            Handcrafted cakes, cupcakes and dessert boxes, baked fresh to order for the moments that
            matter.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-blush">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
            <li>
              <Link className="hover:text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/menu">
                Cake Menu &amp; Packages
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/order">
                Order Info &amp; FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-blush">
            Kitchen hours
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
            <li className="flex justify-between gap-4">
              <span>Mon – Fri</span>
              <span>8:00 – 18:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Saturday</span>
              <span>8:00 – 16:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sunday</span>
              <span>By arrangement</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-blush">
            Ready to order?
          </h4>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Build your request with our Order Planner and send it to us on WhatsApp — we'll reply
            with a quote.
          </p>
          <Link
            to="/order"
            className="mt-5 inline-block rounded-full bg-cream px-6 py-2.5 text-sm font-semibold text-berry-deep transition-colors hover:bg-white"
          >
            Open Order Planner
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-cream/60 md:flex-row md:justify-between md:px-8">
          <p>© 2026 Fluff Cakes. All rights reserved.</p>
          <p>
            An informational website · SYE3104 Software Project Management practical, Uganda
            Christian University.
          </p>
        </div>
      </div>
    </footer>
  );
}
