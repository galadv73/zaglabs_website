import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Target, Handshake } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import aboutBulgariaImage from '@/assets/about-bulgaria.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const values = [
    { icon: Lightbulb, titleKey: 'about.value.innovation', descKey: 'about.value.innovation.desc', color: 'primary' },
    { icon: Target, titleKey: 'about.value.quality', descKey: 'about.value.quality.desc', color: 'accent' },
    { icon: Handshake, titleKey: 'about.value.partnership', descKey: 'about.value.partnership.desc', color: 'primary' },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <p className="text-sm font-medium text-primary mb-2">{t('about.title')}</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t('about.subtitle')}
              </h2>
            </motion.div>

            <motion.div 
              className="space-y-6 text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </motion.div>

            {/* Core Values */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border"
              variants={containerVariants}
            >
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div 
                    key={value.titleKey}
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div 
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                        value.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-foreground'
                      } mb-3`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <p className="text-base sm:text-lg font-bold text-foreground">{t(value.titleKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-accent/10 p-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="w-full h-full rounded-3xl bg-background overflow-hidden">
                <motion.img 
                  src={aboutBulgariaImage} 
                  alt="Engineering excellence from Bulgaria" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-primary/10 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-accent/10 blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
