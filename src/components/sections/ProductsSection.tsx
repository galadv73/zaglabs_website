import { MouseEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Zap, Cpu, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { products, Product } from '@/data/products';

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { t } = useLanguage();
  const name = t(product.nameKey);

  // Subtle 3D tilt + glare that follows the cursor
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${glareX} ${glareY}, hsl(var(--brand-1) / 0.16), transparent 40%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const body = (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="gradient-border group relative h-full overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/15"
    >
      <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Screenshot in browser chrome */}
      <div className="relative m-3 mb-0 overflow-hidden rounded-2xl border border-border/70 bg-muted/40">
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/70 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          {product.url && (
            <span className="ml-2 truncate text-[10px] text-muted-foreground">
              {product.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </span>
          )}
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          {product.url && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{t(product.descKey)}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {product.url ? (
        <a href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('products.visit')} ${name}`} className="block h-full">
          {body}
        </a>
      ) : (
        body
      )}
    </motion.div>
  );
};

const ProductsSection = () => {
  const { t } = useLanguage();

  const approaches = [
    { icon: Users, titleKey: 'products.approach.dedicated', descKey: 'products.approach.dedicated.desc' },
    { icon: Zap, titleKey: 'products.approach.agile', descKey: 'products.approach.agile.desc' },
    { icon: Cpu, titleKey: 'products.approach.ai', descKey: 'products.approach.ai.desc' },
  ];

  return (
    <section id="products" className="relative overflow-hidden py-24 lg:py-36">
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[hsl(var(--brand-3)/0.08)] blur-3xl" />
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow={t('products.title')} title={t('products.subtitle')} description={t('products.description')} />

        {/* Approach — three connected steps */}
        <div className="relative mx-auto mb-24 max-w-5xl">
          <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t('products.approach.title')}
          </p>
          <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            <motion.div
              aria-hidden
              className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px origin-left bg-brand-gradient md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {approaches.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.titleKey}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                >
                  <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-lg ring-1 ring-border">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="mb-2 font-display text-lg font-bold text-foreground">{t(item.titleKey)}</h4>
                  <p className="mx-auto max-w-xs text-sm text-muted-foreground">{t(item.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-5">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{t('products.our')}</h3>
            <span className="font-display text-sm text-muted-foreground">
              <span className="text-gradient text-2xl font-bold">{String(products.length).padStart(2, '0')}</span> {t('products.count')}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
