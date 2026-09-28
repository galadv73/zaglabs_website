import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Zap, Cpu, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

import getlinkedImg from '@/assets/products/getlinked-screenshot.png';
import affiliatemanagerImg from '@/assets/products/affiliatemanager-screenshot.png';
import octotoolsImg from '@/assets/products/octotools-screenshot.png';
import happyofficeImg from '@/assets/products/happyoffice-screenshot.png';
import aroundzImg from '@/assets/products/aroundz-screenshot.png';
import skilliImg from '@/assets/products/skilli-screenshot.png';
import vibbiImg from '@/assets/products/vibbi-screenshot.png';
import aaccImg from '@/assets/products/aacc-screenshot.png';

interface Product {
  nameKey: string;
  descKey: string;
  image: string;
  url?: string;
}

const ProductsSection = () => {
  const { t } = useLanguage();
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const approaches = [
    { icon: Users, titleKey: 'products.approach.dedicated', descKey: 'products.approach.dedicated.desc' },
    { icon: Zap, titleKey: 'products.approach.agile', descKey: 'products.approach.agile.desc' },
    { icon: Cpu, titleKey: 'products.approach.ai', descKey: 'products.approach.ai.desc' },
  ];

  const products: Product[] = [
    { nameKey: 'products.getlinked.name', descKey: 'products.getlinked.desc', image: getlinkedImg },
    { nameKey: 'products.affiliatemanager.name', descKey: 'products.affiliatemanager.desc', image: affiliatemanagerImg, url: 'https://affiliatemanager.ai' },
    { nameKey: 'products.octotools.name', descKey: 'products.octotools.desc', image: octotoolsImg, url: 'https://octotools.io' },
    { nameKey: 'products.happyoffice.name', descKey: 'products.happyoffice.desc', image: happyofficeImg, url: 'https://happyoffice.space' },
    { nameKey: 'products.aroundz.name', descKey: 'products.aroundz.desc', image: aroundzImg, url: 'https://www.aroundz.me/' },
    { nameKey: 'products.skilli.name', descKey: 'products.skilli.desc', image: skilliImg, url: 'https://www.skilli.app/' },
    { nameKey: 'products.vibbi.name', descKey: 'products.vibbi.desc', image: vibbiImg, url: 'https://www.vibbi.world/' },
    { nameKey: 'products.aacc.name', descKey: 'products.aacc.desc', image: aaccImg, url: 'https://www.aacc.software/' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="products" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary mb-2">{t('products.title')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('products.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Approach Cards */}
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            className="text-xl font-semibold text-foreground text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('products.approach.title')}
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {approaches.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.titleKey}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative p-8 rounded-2xl bg-background border border-border group hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-300"
                >
                  {/* Number badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-muted-foreground">
                    {t(item.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Our Products */}
        <div className="mt-20 max-w-5xl mx-auto">
          <motion.h3 
            className="text-xl font-semibold text-foreground text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('products.our')}
          </motion.h3>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
          {products.map((product) => {
              const productName = t(product.nameKey);
              const productDesc = t(product.descKey);
              const isExpanded = expandedProduct === product.nameKey;

              const handleMobileToggle = () => {
                setExpandedProduct(isExpanded ? null : product.nameKey);
              };

              const CardInner = (
                <>
                  <div className="aspect-video relative overflow-hidden bg-muted/40">
                    <motion.img
                      src={product.image}
                      alt={productName}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/90 to-transparent"
                    />
                  </div>
                  <div className="p-5 bg-background">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-foreground text-base">
                        {productName}
                      </span>
                      {product.url && (
                        <motion.div
                          className="shrink-0"
                          whileHover={{ x: 2 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.div>
                      )}
                    </div>
                    <p 
                      className={`mt-2 text-sm text-muted-foreground transition-all duration-300 ${
                        isExpanded ? '' : 'line-clamp-2 group-hover:line-clamp-none'
                      }`}
                    >
                      {productDesc}
                    </p>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={product.nameKey}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMobileToggle}
                >
                  {product.url ? (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        // On mobile, first tap expands; second tap follows link
                        if (window.innerWidth < 1024 && !isExpanded) {
                          e.preventDefault();
                        }
                      }}
                      className="block group relative overflow-hidden rounded-2xl bg-background border border-border ring-1 ring-border/50 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
                    >
                      {CardInner}
                    </a>
                  ) : (
                    <div className="block group relative overflow-hidden rounded-2xl bg-background border border-border ring-1 ring-border/50 cursor-pointer">
                      {CardInner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
