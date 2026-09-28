import { MotionConfig } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechnologiesSection from '@/components/sections/TechnologiesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import CultureSection from '@/components/sections/CultureSection';
import CareersSection from '@/components/sections/CareersSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <MotionConfig reducedMotion="user">
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
        <BackToTop />
      </div>
    </MotionConfig>
  );
};

export default Index;
