import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, Smartphone, Brain, Workflow, Shield, GitBranch, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import SpotlightCard from '@/components/SpotlightCard';
import { cn } from '@/lib/utils';

interface Tech {
  icon: LucideIcon;
  key: string;
  span: string;
  featured?: boolean;
  wide?: boolean;
}

// Bento layout: AI is the hero tile
const technologies: Tech[] = [
  { icon: Brain, key: 'tech.ai', span: 'sm:col-span-2 md:row-span-2', featured: true },
  { icon: Cloud, key: 'tech.cloud', span: '' },
  { icon: Smartphone, key: 'tech.web', span: '' },
  { icon: Workflow, key: 'tech.automation', span: '' },
  { icon: Shield, key: 'tech.security', span: '' },
  { icon: GitBranch, key: 'tech.devops', span: 'sm:col-span-2 md:col-span-1 lg:col-span-4', wide: true },
];

/** Animated neural-net illustration for the featured AI tile. */
const NeuralArt = () => {
  const layers = [
    [40, 100, 160],
    [25, 70, 115, 160],
    [55, 130],
  ];
  const xs = [40, 170, 300];
  const edges: [number, number, number, number][] = [];
  layers.forEach((ys, li) => {
    if (li === layers.length - 1) return;
    ys.forEach((y1) => layers[li + 1].forEach((y2) => edges.push([xs[li], y1, xs[li + 1], y2])));
  });

  return (
    <svg viewBox="0 0 340 190" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="nn-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(var(--brand-1))" />
          <stop offset="100%" stopColor="hsl(var(--brand-3))" />
        </linearGradient>
      </defs>
      {edges.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--border))" strokeWidth="1" />
          <motion.line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#nn-grad)"
            strokeWidth="1.6"
            strokeDasharray="6 200"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -206 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: (i % 7) * 0.3 }}
          />
        </g>
      ))}
      {layers.map((ys, li) =>
        ys.map((y) => (
          <motion.circle
            key={`${li}-${y}`}
            cx={xs[li]}
            cy={y}
            r="7"
            fill="hsl(var(--card))"
            stroke="url(#nn-grad)"
            strokeWidth="2"
            animate={{ r: [7, 8.5, 7] }}
            transition={{ duration: 2, repeat: Infinity, delay: (li + y / 100) * 0.4 }}
          />
        ))
      )}
    </svg>
  );
};

const TechnologiesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="technologies" className="relative overflow-hidden bg-secondary/40 py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-grid mask-radial opacity-50" />
      <div className="container relative mx-auto px-6">
        <SectionHeading eyebrow={t('tech.title')} title={t('tech.subtitle')} description={t('tech.description')} />

        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 sm:gap-5 md:auto-rows-[minmax(170px,auto)] md:grid-cols-3 lg:grid-cols-4">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.key}
                className={cn(tech.span)}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <SpotlightCard className="h-full">
                  <div className={cn('flex h-full flex-row items-start gap-4 p-5 md:flex-col md:gap-0 md:p-7', tech.featured && 'lg:p-9', tech.wide && 'lg:flex-row lg:items-center lg:gap-6')}>
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 md:mb-6 md:h-12 md:w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                        tech.featured ? 'bg-brand-gradient text-white shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary',
                        tech.wide && 'lg:mb-0'
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className={cn('font-bold text-foreground', tech.featured ? 'text-xl md:text-2xl lg:text-3xl' : 'text-base sm:text-lg')}>
                        {t(tech.key)}
                      </h3>
                      <p className={cn('mt-1 text-muted-foreground md:mt-2', tech.featured ? 'max-w-md text-sm md:text-base' : 'text-sm')}>
                        {t(`${tech.key}.desc`)}
                      </p>
                    </div>
                    {tech.featured && (
                      <div className="mt-auto hidden pt-6 md:block md:h-56">
                        <NeuralArt />
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
