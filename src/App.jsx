import { useEffect, useState } from 'react';
import { businessInfo, requiredFields, weeklyHours } from './data/businessInfo';
import { isScheduleConfigured } from './utils/hours';
import { StoreClockProvider } from './components/StoreClock';
import OpeningHours from './components/OpeningHours';
import SEO from './components/SEO';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import StoreLocation from './components/StoreLocation';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MajorBrands from './components/MajorBrands';

export default function App() {
  const [category, setCategory] = useState('all');

  // One dev-only warning listing everything the owner still needs to supply.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const missing = requiredFields.filter((key) =>
      key === 'weeklyHours' ? !isScheduleConfigured(weeklyHours) : !String(businessInfo[key] || '').trim()
    );
    if (missing.length) console.warn(`[businessInfo] Not configured yet: ${missing.join(', ')}`);
  }, []);

  return (
    <StoreClockProvider>
      <SEO />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <ProductCatalog category={category} onCategoryChange={setCategory} />
        <MajorBrands/>
        <WhyChooseUs />
        <About />
        <StoreLocation />
        <OpeningHours />
        <Contact />
        <FAQ />
      </main>
      <Footer onCategorySelect={setCategory} />
    </StoreClockProvider>
  );
}
