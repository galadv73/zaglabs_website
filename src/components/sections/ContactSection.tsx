import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Linkedin, ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import ContactModal from '@/components/ContactModal';

const ContactSection = () => {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const channels = [
    { icon: MapPin, label: t('contact.office'), value: `${t('contact.address')}, ${t('contact.city')}`, href: 'https://maps.google.com/?q=3+Petko+Y.+Todorov+Street,+5000+Veliko+Tarnovo,+Bulgaria' },
    { icon: Mail, label: t('contact.email'), value: 'info@zaglabs.io', href: 'mailto:info@zaglabs.io' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Z.A.G Labs LTD', href: 'https://www.linkedin.com/company/z-a-g-labs-ltd' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-secondary/40 py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-grid mask-radial opacity-40" />
      <div className="container relative mx-auto px-6">
        <SectionHeading eyebrow={t('contact.title')} title={t('contact.subtitle')} />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          {/* CTA + channels */}
          <motion.div
            className="flex min-w-0 flex-col gap-4 lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-xl shadow-primary/20">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
              <Send className="mb-5 h-8 w-8" />
              <h3 className="mb-3 text-2xl font-bold">{t('contact.cta')}</h3>
              <p className="mb-6 text-white/85">{t('contact.cta.desc')}</p>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
              >
                {t('hero.cta.contact')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="gradient-border group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                    <span className="block truncate font-medium text-foreground">{c.value}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              );
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            className="gradient-border relative min-h-[360px] min-w-0 overflow-hidden rounded-3xl p-2 lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              src="https://maps.google.com/maps?q=3%20Petko%20Y.%20Todorov%20Street%2C%205000%20Veliko%20Tarnovo%2C%20Bulgaria&z=16&output=embed"
              className="h-full min-h-[344px] w-full rounded-2xl grayscale-[40%] transition-[filter] duration-500 hover:grayscale-0 dark:invert-[0.9] dark:hue-rotate-180"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZAGLabs Office Location"
            />
          </motion.div>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  );
};

export default ContactSection;
