import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollAnimationWrapper className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2">{t('contact.title')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('contact.subtitle')}
          </h2>
        </ScrollAnimationWrapper>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <ScrollAnimationWrapper className="rounded-2xl overflow-hidden border border-border bg-secondary/30 aspect-video lg:aspect-auto lg:h-full min-h-[300px] w-full max-w-full">
              <div className="w-full h-full min-h-[300px] overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=3%20Petko%20Y.%20Todorov%20Street%2C%205000%20Veliko%20Tarnovo%2C%20Bulgaria&z=16&output=embed"
                  className="w-full h-full min-h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZAGLabs Office Location"
                />
              </div>
            </ScrollAnimationWrapper>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Address Card */}
              <ScrollAnimationWrapper delay={1} className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Office</h3>
                    <p className="text-muted-foreground">{t('contact.address')}</p>
                    <p className="text-muted-foreground">{t('contact.city')}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>

              {/* Email Card */}
              <ScrollAnimationWrapper delay={2} className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
                    <a href="mailto:info@zaglabs.io" className="text-primary hover:underline">
                      info@zaglabs.io
                    </a>
                  </div>
                </div>
              </ScrollAnimationWrapper>

              {/* LinkedIn Card */}
              <ScrollAnimationWrapper delay={3} className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/company/z-a-g-labs-ltd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Z.A.G Labs LTD
                    </a>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
