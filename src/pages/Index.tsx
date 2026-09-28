import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechnologiesSection from '@/components/sections/TechnologiesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import CultureSection from '@/components/sections/CultureSection';
import CareersSection from '@/components/sections/CareersSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <ProductsSection />
        <CultureSection />
        <CareersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
