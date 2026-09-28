import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'zaglabs-cookie-consent';

type ConsentStatus = 'accepted' | 'declined' | null;

const CookieConsent = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  const content = {
    en: {
      title: 'Cookie Preferences',
      description: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      declineOptional: 'Essential Only',
      learnMore: 'Learn more in our',
      privacyPolicy: 'Privacy Policy',
    },
    bg: {
      title: 'Настройки за бисквитки',
      description: 'Използваме бисквитки, за да подобрим вашето сърфиране, да анализираме трафика на сайта и да персонализираме съдържанието. С натискане на "Приеми всички" вие се съгласявате с използването на бисквитки.',
      acceptAll: 'Приеми всички',
      declineOptional: 'Само задължителни',
      learnMore: 'Научете повече в нашата',
      privacyPolicy: 'Политика за поверителност',
    }
  };

  const t = content[language];

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-4xl px-0 sm:px-8">
        <div className="relative bg-background border border-border rounded-2xl shadow-2xl shadow-black/10 p-4 sm:p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={() => handleConsent('declined')}
            className="absolute top-2 right-2 p-2.5 rounded-full hover:bg-muted transition-colors sm:top-3 sm:right-3"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
            {/* Icon & Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 sm:mb-3 pr-8">
                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-base sm:text-lg">
                  {t.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.description}{' '}
                <span className="inline-flex items-center gap-1">
                  {t.learnMore}{' '}
                  <Link 
                    to="/privacy" 
                    className="text-primary hover:underline font-medium"
                  >
                    {t.privacyPolicy}
                  </Link>
                  .
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-3 sm:shrink-0">
              <Button
                variant="outline"
                onClick={() => handleConsent('declined')}
                className="flex-1 sm:flex-none"
              >
                {t.declineOptional}
              </Button>
              <Button
                onClick={() => handleConsent('accepted')}
                className="flex-1 sm:flex-none"
              >
                {t.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
