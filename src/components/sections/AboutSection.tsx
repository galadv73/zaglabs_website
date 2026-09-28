import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Target, Handshake, MapPin, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import aboutBulgariaImage from '@/assets/about-bulgaria.jpg';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AboutSection = () => {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const badgeY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const values = [
    { icon: Lightbulb, titleKey: 'about.value.innovation', descKey: 'about.value.innovation.desc' },
    { icon: Target, titleKey: 'about.value.quality', descKey: 'about.value.quality.desc' },
    { icon: Handshake, titleKey: 'about.value.partnership', descKey: 'about.value.partnership.desc' },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots mask-fade-y opacity-60" />
      <div aria-hidden className="absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[hsl(var(--brand-1)/0.12)] blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <motion.div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10 sm:aspect-[4/3] lg:aspect-[4/5]">
              <motion.img
                src={aboutBulgariaImage}
                alt="Engineering excellence from Bulgaria"
                style={{ y: imageY, scale: 1.18 }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating glass badges */}
            <motion.div
              style={{ y: badgeY }}
              className="glass absolute -right-4 top-10 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-right-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Veliko Tarnovo</p>
                <p className="text-muted-foreground">Bulgaria · EU</p>
              </div>
            </motion.div>
            <motion.div
              className="glass absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-left-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-foreground">AI-first</p>
                <p className="text-muted-foreground">{t('hero.stat.ai')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={t('about.title')} title={t('about.subtitle')} align="left" className="mb-8 lg:mb-8" />

            <motion.div
              className="space-y-5 text-lg leading-relaxed text-muted-foreground"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.p variants={itemVariants}>{t('about.p1')}</motion.p>
              <motion.p variants={itemVariants}>{t('about.p2')}</motion.p>
              <motion.p variants={itemVariants} className="border-l-2 border-primary/40 pl-4 font-medium text-foreground">
                {t('about.p3')}
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            >
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.titleKey}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="gradient-border group rounded-2xl p-5 transition-shadow hover:shadow-xl hover:shadow-primary/10"
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-display text-lg font-bold text-foreground">{t(value.titleKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
