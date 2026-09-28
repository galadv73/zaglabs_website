import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

const SectionHeading = ({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) => (
  <motion.div
    className={cn('max-w-2xl mb-14 lg:mb-16', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="eyebrow mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {eyebrow}
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-5">{title}</h2>
    {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
  </motion.div>
);

export default SectionHeading;
