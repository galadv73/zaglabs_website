import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import ZagLabsLogo from '@/components/ZagLabsLogo';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { key: 'nav.about', id: 'about' },
  { key: 'nav.technologies', id: 'technologies' },
  { key: 'nav.products', id: 'products' },
  { key: 'nav.culture', id: 'culture' },
  { key: 'nav.careers', id: 'careers' },
  { key: 'nav.contact', id: 'contact' },
];

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for the section currently in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const sections = ['hero', ...navItems.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const go = (id: string) => {
    if (!isHome) {
      setMobileMenuOpen(false);
      navigate('/');
      window.setTimeout(() => scrollToSection(`#${id}`), 300);
      return;
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      window.setTimeout(() => scrollToSection(`#${id}`), 250);
      return;
    }
    scrollToSection(`#${id}`);
  };

  // Over the dark hero the header uses the dark palette so text stays legible
  const overHero = isHome && !scrolled && !mobileMenuOpen;

  return (
    <>
      <motion.header
        className={cn('fixed inset-x-0 top-0 z-50 transition-[padding] duration-500', scrolled ? 'pt-3' : 'pt-0', overHero && 'dark')}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500',
              scrolled
                ? 'h-14 rounded-full glass pl-4 pr-1.5 shadow-lg shadow-black/5 sm:pl-5 sm:pr-2'
                : 'h-20 border border-transparent px-0'
            )}
          >
            <button
              type="button"
              onClick={() => (isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/'))}
              className="flex items-center"
              aria-label="ZagLabs home"
            >
              <ZagLabsLogo className="h-6 w-auto sm:h-7" />
            </button>

            {/* Desktop navigation with sliding active pill */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-secondary"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t(item.key)}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
                className="flex h-10 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
                aria-label="Switch language"
              >
                <Globe className="hidden h-4 w-4 text-muted-foreground min-[360px]:block" />
                {language.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={() => go('contact')}
                className="hidden xl:inline-flex items-center gap-1 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
              >
                {t('hero.cta.contact')}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={t('nav.menu')}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[3px] origin-left bg-brand-gradient"
          style={{ scaleX: progress }}
        />
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-grid mask-radial opacity-60" aria-hidden />
            <nav className="relative flex h-full flex-col justify-center gap-2 px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className="group flex items-baseline gap-4 py-2 text-left"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <span
                    className={cn(
                      'font-display text-4xl font-bold transition-colors',
                      active === item.id ? 'text-gradient' : 'text-foreground group-hover:text-primary'
                    )}
                  >
                    {t(item.key)}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
