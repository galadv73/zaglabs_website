import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Infinite horizontal ticker. Children are rendered twice for a seamless loop. */
const Marquee = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('group relative flex overflow-hidden mask-fade-x', className)}>
    <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
