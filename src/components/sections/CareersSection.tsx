import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import JobApplicationModal from '@/components/JobApplicationModal';

const CareersSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="careers" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper className="max-w-4xl mx-auto">
          <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-8">
                <Briefcase className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                {t('careers.title')}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-4">
                {t('careers.subtitle')}
              </p>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10">
                {t('careers.description')}
              </p>
              
              <Button 
                size="lg" 
                variant="secondary"
                className="group text-primary hover:text-primary"
                onClick={() => setIsModalOpen(true)}
              >
                {t('careers.cta')}
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>

      <JobApplicationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  );
};

export default CareersSection;
