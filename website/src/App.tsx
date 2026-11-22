import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/Menu';
import Order from './pages/Order';
import { ContentProvider } from './lib/content';

const titles: Record<string, string> = {
  '/': 'Fluff Cakes | Handcrafted Cakes & Sweet Celebrations',
  '/about': 'About | Fluff Cakes',
  '/menu': 'Cake Menu & Packages | Fluff Cakes',
  '/order': 'Order Info & FAQ | Fluff Cakes',
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? titles['/'];
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-berry focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <RouteEffects />
        <div className="flex min-h-screen flex-col">
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ContentProvider>
  );
}
