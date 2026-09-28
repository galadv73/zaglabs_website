import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import ZagLabsLogo from '@/components/ZagLabsLogo';
import ContactModal from '@/components/ContactModal';
import { scrollToSection } from '@/lib/scroll';

const sectionLinks = ['about', 'technologies', 'products', 'culture', 'careers', 'contact'];

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    if (location.pathname === '/') {
      scrollToSection(`#${id}`);
    } else {
      navigate('/');
      window.setTimeout(() => scrollToSection(`#${id}`), 300);
    }
  };

  const companyLinks = [
    { label: language === 'bg' ? 'Общи условия' : 'Terms and Conditions', href: '/terms' },
    { label: language === 'bg' ? 'Политика за поверителност' : 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pt-20">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <ZagLabsLogo className="mb-5 h-8 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t('footer.tagline')}</p>
            <a
              href="https://www.linkedin.com/company/z-a-g-labs-ltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-transparent hover:bg-brand-gradient hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.explore')}</h4>
            <ul className="space-y-3 text-sm">
              {sectionLinks.map((id) => (
                <li key={id}>
                  <button type="button" onClick={() => goToSection(id)} className="text-muted-foreground transition-colors hover:text-primary">
                    {t(`nav.${id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => setIsContactModalOpen(true)} className="text-muted-foreground transition-colors hover:text-primary">
                  {language === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.getInTouch')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {t('contact.address')}
                  <br />
                  {t('contact.city')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@zaglabs.io" className="transition-colors hover:text-primary">
                  info@zaglabs.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border py-8 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <span>
            © {currentYear} Z.A.G Labs LTD. {t('footer.rights')}
          </span>
          <span>Veliko Tarnovo · Bulgaria · EU</span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none text-center font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-foreground/[0.04]">
        ZAGLABS
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </footer>
  );
};

export default Footer;
