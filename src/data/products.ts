import getlinkedImg from '@/assets/products/getlinked-screenshot.png';
import affiliatemanagerImg from '@/assets/products/affiliatemanager-screenshot.png';
import octotoolsImg from '@/assets/products/octotools-screenshot.png';
import happyofficeImg from '@/assets/products/happyoffice-screenshot.png';
import aroundzImg from '@/assets/products/aroundz-screenshot.png';
import skilliImg from '@/assets/products/skilli-screenshot.png';
import vibbiImg from '@/assets/products/vibbi-screenshot.png';
import aaccImg from '@/assets/products/aacc-screenshot.png';

export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  image: string;
  url?: string;
}

export const products: Product[] = [
  { id: 'getlinked', nameKey: 'products.getlinked.name', descKey: 'products.getlinked.desc', image: getlinkedImg },
  { id: 'affiliatemanager', nameKey: 'products.affiliatemanager.name', descKey: 'products.affiliatemanager.desc', image: affiliatemanagerImg, url: 'https://affiliatemanager.ai' },
  { id: 'octotools', nameKey: 'products.octotools.name', descKey: 'products.octotools.desc', image: octotoolsImg, url: 'https://octotools.io' },
  { id: 'happyoffice', nameKey: 'products.happyoffice.name', descKey: 'products.happyoffice.desc', image: happyofficeImg, url: 'https://happyoffice.space' },
  { id: 'aroundz', nameKey: 'products.aroundz.name', descKey: 'products.aroundz.desc', image: aroundzImg, url: 'https://www.aroundz.me/' },
  { id: 'skilli', nameKey: 'products.skilli.name', descKey: 'products.skilli.desc', image: skilliImg, url: 'https://www.skilli.app/' },
  { id: 'vibbi', nameKey: 'products.vibbi.name', descKey: 'products.vibbi.desc', image: vibbiImg, url: 'https://www.vibbi.world/' },
  { id: 'aacc', nameKey: 'products.aacc.name', descKey: 'products.aacc.desc', image: aaccImg, url: 'https://www.aacc.software/' },
];

export const productById = (id: string) => products.find((p) => p.id === id)!;
