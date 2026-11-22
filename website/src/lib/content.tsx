import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  from_price: boolean;
  category: string;
  image: string;
  tag: string | null;
  bestseller: boolean;
  sort: number;
}

export interface CakePackage {
  id: number;
  name: string;
  price: number;
  from_price: boolean;
  serves: string;
  size: string;
  features: string[];
  featured: boolean;
  sort: number;
}

export interface Addon {
  id: number;
  name: string;
  price_label: string;
  sort: number;
}

export interface Flavour {
  id: number;
  name: string;
  sort: number;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  sort: number;
}

export interface Step {
  n: string;
  title: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PromiseItem {
  title: string;
  text: string;
  icon: string;
}

export interface NamedStep {
  title: string;
  text: string;
}

export interface LeadTime {
  label: string;
  time: string;
}

export interface CategoryCardItem {
  label: string;
  image: string;
  filter: string;
}

export interface SiteContent {
  cakes: Cake[];
  packages: CakePackage[];
  addons: Addon[];
  flavours: Flavour[];
  faqs: Faq[];
  testimonials: Testimonial[];
  marquee: string[];
  steps: Step[];
  stats: Stat[];
  promise: PromiseItem[];
  processSteps: NamedStep[];
  aboutSteps: NamedStep[];
  leadTimes: LeadTime[];
  categories: CategoryCardItem[];
  gallery: string[];
  filterCategories: string[];
}

interface ContentState {
  content: SiteContent | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ContentContext = createContext<ContentState>({
  content: null,
  loading: true,
  error: null,
  refetch: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = (await res.json()) as SiteContent;
      setContent(data);
    } catch (err) {
      console.error('Content fetch error:', err);
      setError(
        'We could not load the Fluff Cakes menu and content. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, refetch: load }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
