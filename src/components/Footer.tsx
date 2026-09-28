import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import ZagLabsLogo from '@/components/ZagLabsLogo';
import ContactModal from '@/components/ContactModal';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const footerLinks = [
    { 
      label: language === 'bg' ? 'Начало' : 'Home', 
      href: '/',
      type: 'link' as const
    },
    { 
      label: language === 'bg' ? 'Общи условия' : 'Terms and Conditions', 
      href: '/terms',
      type: 'link' as const
    },
    { 
      label: language === 'bg' ? 'Политика за поверителност' : 'Privacy Policy', 
      href: '/privacy',
      type: 'link' as const
    },
    { 
      label: language === 'bg' ? 'Свържете се с нас' : 'Contact Us', 
      href: '#',
      type: 'button' as const
    },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8">
          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {footerLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                {link.type === 'button' ? (
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
                {index < footerLinks.length - 1 && (
                  <span className="text-muted-foreground/50 ml-2">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Logo, Copyright & Social */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <ZagLabsLogo className="h-7 w-auto" />
            <span className="text-sm text-muted-foreground text-center">
              © {currentYear} Z.A.G Labs LTD. {t('footer.rights')}
            </span>
            <a
              href="https://www.linkedin.com/company/z-a-g-labs-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <ContactModal 
        open={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />
    </footer>
  );
};

export default Footer;
