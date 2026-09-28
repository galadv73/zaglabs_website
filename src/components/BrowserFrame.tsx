import { cn } from '@/lib/utils';

interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/** Product screenshot wrapped in minimal browser chrome. */
const BrowserFrame = ({ src, alt, url, className, imgClassName, eager }: BrowserFrameProps) => (
  <div className={cn('overflow-hidden rounded-xl border border-border/70 bg-card shadow-xl', className)}>
    <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/60 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      {url && (
        <span className="ml-2 truncate rounded-md bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground">
          {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
        </span>
      )}
    </div>
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className={cn('block w-full object-cover object-top', imgClassName)}
      />
    </div>
  </div>
);

export default BrowserFrame;
