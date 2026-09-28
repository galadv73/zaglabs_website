import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Dumbbell, Coffee, PartyPopper, GraduationCap, Heart } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

// Import culture images
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

  const cultureImages = [
    { src: officeOverview, alt: 'Modern office space', large: true },
    { src: teamWorking, alt: 'Team collaboration' },
    { src: developerFocus, alt: 'Developer at work' },
    { src: officeGym, alt: 'Office gym' },
    { src: gameRoom, alt: 'Game room with pool and ping pong' },
  ];

  return (
    <section id="culture" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative container mx-auto px-6">
        {/* Header */}
        <ScrollAnimationWrapper className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2">{t('culture.title')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('culture.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('culture.description')}
          </p>
        </ScrollAnimationWrapper>

        {/* Culture Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cultureItems.map((item, index) => {
            const Icon = item.icon;
            const delayIndex = ((index % 3) + 1) as 1 | 2 | 3;
            return (
              <ScrollAnimationWrapper
                key={item.titleKey}
                delay={delayIndex}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>

        {/* Photo Collage */}
        <ScrollAnimationWrapper className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {/* Main large photo - Office Overview */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
              <img 
                src={cultureImages[0].src} 
                alt={cultureImages[0].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Smaller photos */}
            {cultureImages.slice(1).map((image, index) => (
              <div 
                key={index}
                className="rounded-2xl overflow-hidden relative group aspect-square"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default CultureSection;
