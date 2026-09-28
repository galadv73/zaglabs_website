import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

// Fade up animation for content blocks
interface FadeUpProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export const FadeUp = forwardRef<HTMLDivElement, FadeUpProps>(
  ({ children, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
FadeUp.displayName = 'FadeUp';

// Scale on hover for interactive cards
interface ScaleOnHoverProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  scale?: number;
}

export const ScaleOnHover = forwardRef<HTMLDivElement, ScaleOnHoverProps>(
  ({ children, scale = 1.02, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
ScaleOnHover.displayName = 'ScaleOnHover';

// Stagger children animations
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, staggerDelay = 0.1, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
StaggerContainer.displayName = 'StaggerContainer';

// Stagger item for use inside StaggerContainer
interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
StaggerItem.displayName = 'StaggerItem';

// Pulse animation for attention-grabbing elements
interface PulseProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const Pulse = forwardRef<HTMLDivElement, PulseProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
Pulse.displayName = 'Pulse';

// Slide in from side
interface SlideInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, direction = 'left', delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
SlideIn.displayName = 'SlideIn';

// Button with tap feedback
interface TapButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
}

export const TapButton = forwardRef<HTMLButtonElement, TapButtonProps>(
  ({ children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  )
);
TapButton.displayName = 'TapButton';
