import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import ZagLabsLogo from '@/components/ZagLabsLogo';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.technologies', href: '#technologies' },
    { key: 'nav.products', href: '#products' },
    { key: 'nav.culture', href: '#culture' },
    { key: 'nav.careers', href: '#careers' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const selector = href.startsWith('#') ? href : `#${href}`;

    const doScroll = () => {
      const element = document.querySelector(selector);
      if (!element) return;

      const headerEl = document.querySelector('header');
      const headerOffset = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0;

      const elementTop = (element as HTMLElement).getBoundingClientRect().top + window.scrollY;
      const top = Math.max(0, elementTop - headerOffset - 8);

      window.scrollTo({ top, behavior: 'smooth' });
    };

    // On mobile, close the menu first (it changes header height); then scroll.
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      window.setTimeout(doScroll, 80);
      return;
    }

    doScroll();
  };

  const menuVariants: Variants = {
    hidden: { 
      opacity: 0,
      height: 0,
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ZagLabsLogo className="h-8 w-auto" />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {t(item.key)}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Theme Toggle, Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <motion.button
              onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </motion.button>

            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              className="lg:hidden py-4 border-t border-border overflow-hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors touch-manipulation"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
