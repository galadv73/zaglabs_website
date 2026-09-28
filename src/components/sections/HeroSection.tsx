import { Fragment, useState, MouseEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import NetworkCanvas from '@/components/NetworkCanvas';
import BrowserFrame from '@/components/BrowserFrame';
import Marquee from '@/components/Marquee';
import { motion, useMotionValue, useSpring, useTransform, useScroll, Variants } from 'framer-motion';
import { products, productById } from '@/data/products';
import { scrollToSection } from '@/lib/scroll';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Mouse-driven parallax for the floating screenshots
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const backX = useTransform(sx, (v) => v * -18);
  const backY = useTransform(sy, (v) => v * -14);
  const frontX = useTransform(sx, (v) => v * 26);
  const frontY = useTransform(sy, (v) => v * 20);
  const rotateY = useTransform(sx, (v) => v * 6);
  const rotateX = useTransform(sy, (v) => v * -6);

  // Content drifts up and fades as the hero scrolls away
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const words = t('hero.tagline').split(' ');
  const stats = [
    { value: `${products.length}`, label: t('hero.stat.products') },
    { value: '100%', label: t('hero.stat.ai') },
    { value: 'EU', label: t('hero.stat.eu') },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="dark relative isolate flex min-h-screen flex-col overflow-hidden bg-[hsl(222_47%_5%)] text-foreground"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[hsl(var(--brand-1)/0.35)] blur-[120px] animate-aurora" />
        <div className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[hsl(var(--brand-3)/0.3)] blur-[120px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-[hsl(var(--brand-2)/0.25)] blur-[120px] animate-aurora [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
        <NetworkCanvas className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[hsl(222_47%_5%)]" />
      </div>

      <div className="container relative mx-auto flex flex-1 items-center px-6 pb-16 pt-28 lg:pt-24">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ y: contentY, opacity: contentOpacity }}
            className="text-center lg:text-left"
          >
            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur sm:mb-8 sm:px-4 sm:py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
              </span>
              <span className="text-xs font-medium text-white/80 sm:text-sm">{t('hero.badge')}</span>
            </motion.div>

            <h1 className="mb-5 text-[2.5rem] font-bold leading-[1.05] text-white sm:text-6xl xl:text-7xl">
              {words.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                  {i < words.length - 1 && ' '}
                </Fragment>
              ))}
            </h1>

            <motion.p variants={item} className="mb-7 font-display text-2xl font-semibold sm:text-3xl xl:text-4xl">
              <span className="text-gradient animate-gradient-x">{t('hero.subtitle')}</span>
            </motion.p>

            <motion.p variants={item} className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/65 lg:mx-0">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={item} className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
              <motion.button
                type="button"
                onClick={() => scrollToSection('#products')}
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-7 font-semibold text-slate-900 shadow-[0_0_40px_-8px_hsl(var(--brand-1))]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t('hero.cta.products')}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles className="h-4 w-4 text-teal-300" />
                {t('hero.cta.contact')}
              </motion.button>
            </motion.div>

            <motion.dl variants={item} className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:mt-14 sm:gap-6 sm:pt-8 lg:mx-0">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-white/55 sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </motion.dl>

            {/* Compact screenshot showcase for phones and tablets */}
            <motion.div variants={item} aria-hidden className="relative mx-auto mt-12 h-[230px] w-full max-w-md sm:h-[330px] sm:max-w-xl lg:hidden">
              <div className="absolute right-0 top-0 w-[74%] animate-float [animation-delay:-2s]">
                <BrowserFrame
                  src={productById('octotools').image}
                  alt=""
                  url={productById('octotools').url}
                  imgClassName="aspect-[16/10]"
                  className="border-white/10 opacity-70 shadow-2xl shadow-black/50"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[74%] animate-float">
                <BrowserFrame
                  src={productById('happyoffice').image}
                  alt=""
                  url={productById('happyoffice').url}
                  imgClassName="aspect-[16/10]"
                  className="border-white/15 shadow-2xl shadow-[hsl(var(--brand-1)/0.35)]"
                />
              </div>
              <div className="absolute -bottom-3 right-1 w-[30%] animate-float [animation-delay:-4s]">
                <BrowserFrame
                  src={productById('skilli').image}
                  alt=""
                  imgClassName="aspect-[9/12]"
                  className="border-white/15 shadow-2xl shadow-[hsl(var(--brand-3)/0.4)]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating product screenshots */}
          <motion.div
            className="relative hidden h-[520px] lg:block [perspective:1400px]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
              <motion.div style={{ x: backX, y: backY }} className="absolute right-0 top-0 w-[72%]">
                <div className="animate-float [animation-delay:-2s]">
                  <BrowserFrame
                    src={productById('octotools').image}
                    alt="OctoTools"
                    url={productById('octotools').url}
                    eager
                    imgClassName="aspect-[16/10]"
                    className="border-white/10 opacity-70 shadow-2xl shadow-black/50"
                  />
                </div>
              </motion.div>
              <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-6 left-0 w-[70%]">
                <div className="animate-float">
                  <BrowserFrame
                    src={productById('happyoffice').image}
                    alt="HappyOffice"
                    url={productById('happyoffice').url}
                    eager
                    imgClassName="aspect-[16/10]"
                    className="border-white/15 shadow-2xl shadow-[hsl(var(--brand-1)/0.35)]"
                  />
                </div>
              </motion.div>
              <motion.div style={{ x: frontX, y: backY }} className="absolute bottom-0 right-2 w-[34%]">
                <div className="animate-float [animation-delay:-4s]">
                  <BrowserFrame
                    src={productById('skilli').image}
                    alt="Skilli"
                    eager
                    imgClassName="aspect-[9/12]"
                    className="border-white/15 shadow-2xl shadow-[hsl(var(--brand-3)/0.4)]"
                  />
                </div>
              </motion.div>
              {/* Decorative ring */}
              <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 animate-spin-slow" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Product ticker */}
      <div className="relative border-t border-white/10 bg-white/[0.02] py-5 backdrop-blur-sm">
        <Marquee>
          {products.map((p) => (
            <span key={p.id} className="mx-8 flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              {t(p.nameKey)}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label={t('nav.about')}
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:text-white lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.button>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  );
};

export default HeroSection;
