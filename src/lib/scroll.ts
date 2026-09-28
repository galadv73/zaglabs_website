/** Smooth-scroll to an in-page anchor, leaving room for the fixed header. */
export const scrollToSection = (href: string) => {
  const selector = href.startsWith('#') ? href : `#${href}`;
  const element = document.querySelector(selector);
  if (!element) return;

  const headerEl = document.querySelector('header');
  const headerOffset = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0;
  const elementTop = (element as HTMLElement).getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top: Math.max(0, elementTop - headerOffset + 1), behavior: 'smooth' });
};
