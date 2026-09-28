import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, Smartphone, Brain, Workflow, Shield, GitBranch } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

const TechnologiesSection = () => {
  const { t } = useLanguage();

  const technologies = [
    { icon: Cloud, key: 'tech.cloud', color: 'from-blue-500/20 to-cyan-500/20' },
    { icon: Smartphone, key: 'tech.web', color: 'from-violet-500/20 to-purple-500/20' },
    { icon: Brain, key: 'tech.ai', color: 'from-primary/20 to-accent/20' },
    { icon: Workflow, key: 'tech.automation', color: 'from-emerald-500/20 to-teal-500/20' },
    { icon: Shield, key: 'tech.security', color: 'from-amber-500/20 to-orange-500/20' },
    { icon: GitBranch, key: 'tech.devops', color: 'from-rose-500/20 to-pink-500/20' },
  ];

  return (
    <section id="technologies" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollAnimationWrapper className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2">{t('tech.title')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('tech.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('tech.description')}
          </p>
        </ScrollAnimationWrapper>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            const delayIndex = ((index % 3) + 1) as 1 | 2 | 3;
            return (
              <ScrollAnimationWrapper
                key={tech.key}
                delay={delayIndex}
                className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/20 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(tech.key)}
                  </h3>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
