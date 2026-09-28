import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import JobApplicationModal from '@/components/JobApplicationModal';
import teamWorking from '@/assets/culture/team-working.jpg';

const CareersSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section id="careers" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-5 py-16 text-center sm:rounded-[2.5rem] shadow-2xl shadow-primary/20 sm:px-16 sm:py-20 lg:py-28"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Photo background with brand overlay */}
          <motion.img
            src={teamWorking}
            alt=""
            aria-hidden
            style={{ y: bgY, scale: 1.3 }}
            className="absolute inset-0 -z-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[hsl(200_80%_12%/0.94)] via-[hsl(210_60%_10%/0.88)] to-[hsl(258_60%_22%/0.9)]" />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial [--foreground:0_0%_100%]" />
          <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[hsl(var(--brand-1)/0.4)] blur-3xl animate-aurora" />
          <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[hsl(var(--brand-3)/0.35)] blur-3xl animate-aurora [animation-delay:-8s]" />

          <div className="relative">
            <motion.div
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur"
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Briefcase className="h-8 w-8 text-white" />
            </motion.div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-200/90">{t('careers.title')}</p>
            <h2 className="mb-6 text-[2.25rem] font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{t('careers.subtitle')}</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/75">{t('careers.description')}</p>

            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-white px-7 text-base sm:px-8 font-semibold text-slate-900 shadow-[0_0_50px_-10px_rgba(255,255,255,0.7)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('careers.cta')}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <JobApplicationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default CareersSection;
