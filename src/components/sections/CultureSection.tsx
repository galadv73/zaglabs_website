import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Dumbbell, Coffee, PartyPopper, GraduationCap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import Marquee from '@/components/Marquee';
import { cn } from '@/lib/utils';

import officeOverview from '@/assets/culture/office-overview.jpg';
import teamWorking from '@/assets/culture/team-working.jpg';
import developerFocus from '@/assets/culture/developer-focus.jpg';
import officeGym from '@/assets/culture/office-gym.jpg';
import gameRoom from '@/assets/culture/game-room.jpg';

const CultureSection = () => {
  const { t } = useLanguage();

  const cultureItems = [
    { icon: Building2, titleKey: 'culture.office', descKey: 'culture.office.desc' },
    { icon: Dumbbell, titleKey: 'culture.gym', descKey: 'culture.gym.desc' },
    { icon: Coffee, titleKey: 'culture.relax', descKey: 'culture.relax.desc' },
    { icon: PartyPopper, titleKey: 'culture.events', descKey: 'culture.events.desc' },
    { icon: GraduationCap, titleKey: 'culture.learning', descKey: 'culture.learning.desc' },
    { icon: Heart, titleKey: 'culture.trust', descKey: 'culture.trust.desc' },
  ];

  // Bento gallery; captions reuse the culture titles
  const gallery = [
    { src: officeOverview, captionKey: 'culture.office', className: 'col-span-2 row-span-2' },
    { src: teamWorking, captionKey: 'culture.learning', className: 'col-span-2 md:col-span-1' },
    { src: developerFocus, captionKey: 'culture.trust', className: '' },
    { src: officeGym, captionKey: 'culture.gym', className: '' },
    { src: gameRoom, captionKey: 'culture.relax', className: 'col-span-2 md:col-span-1' },
  ];

  return (
    <section id="culture" className="relative overflow-hidden bg-secondary/40 py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-dots mask-fade-y opacity-50" />
      <div className="container relative mx-auto px-6">
        <SectionHeading eyebrow={t('culture.title')} title={t('culture.subtitle')} description={t('culture.description')} />

        {/* Photo gallery */}
        <div className="mx-auto grid max-w-6xl auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4 lg:auto-rows-[230px]">
          {gallery.map((img, i) => (
            <motion.figure
              key={img.captionKey}
              className={cn('group relative overflow-hidden rounded-3xl', img.className)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={img.src}
                alt={t(img.captionKey)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 right-4 translate-y-2 font-display text-lg font-semibold text-white opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {t(img.captionKey)}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Perks */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cultureItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-background sm:p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm ring-1 ring-border transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="mb-1 font-display text-lg font-bold text-foreground">{t(item.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(item.descKey)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Values ticker */}
      <div className="relative -mx-[2%] mt-20 w-[104%] -rotate-1 bg-foreground py-4 text-background">
        <Marquee>
          {cultureItems.map((item) => (
            <span key={item.titleKey} className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight">
              {t(item.titleKey)}
              <span className="text-gradient">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CultureSection;
