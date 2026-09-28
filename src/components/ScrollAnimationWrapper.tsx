import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
}

export const ScrollAnimationWrapper = ({
  children,
  className,
  delay,
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'scroll-animate',
        isVisible && 'is-visible',
        delay && `scroll-animate-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
};
