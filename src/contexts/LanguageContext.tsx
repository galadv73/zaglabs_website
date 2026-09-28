import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bg';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.technologies': 'Technologies',
    'nav.products': 'Products',
    'nav.culture': 'Culture',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.tagline': 'Building Intelligent Software',
    'hero.subtitle': 'with Modern Technologies and AI',
    'hero.description': 'Z.A.G Labs LTD delivers innovative software solutions from Bulgaria to the world. We combine engineering excellence with cutting-edge AI technologies and tools to build products that matter.',
    'hero.cta.products': 'Our Products',
    'hero.cta.contact': 'Contact Us',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Engineering Excellence from Bulgaria',
    'about.p1': 'Z.A.G Labs LTD is a Bulgarian software company serving as an engineering powerhouse behind innovative software products. Based in Bulgaria, we bring together talented engineers, designers, and problem-solvers.',
    'about.p2': 'We specialize in end-to-end software development — from initial concept to long-term support. Our expertise spans cloud-native architectures, AI integration, and building scalable systems that serve businesses worldwide.',
    'about.p3': 'What sets us apart is our unique blend of engineering rigor, creative thinking, and deep business understanding. We don\'t just write code — we build solutions.',
    'about.value.innovation': 'Innovation',
    'about.value.innovation.desc': 'Pushing boundaries',
    'about.value.quality': 'Quality',
    'about.value.quality.desc': 'Excellence in craft',
    'about.value.partnership': 'Partnership',
    'about.value.partnership.desc': 'Growing together',
    
    // Technologies
    'tech.title': 'Technologies & AI',
    'tech.subtitle': 'Engineering Excellence at Scale',
    'tech.description': 'We actively integrate AI tools and modern development practices across all our projects, ensuring our solutions are future-ready and efficient.',
    'tech.cloud': 'Cloud-Native Architectures',
    'tech.web': 'Web & Mobile Development',
    'tech.ai': 'AI & Machine Learning',
    'tech.automation': 'Automation & Data Systems',
    'tech.security': 'Secure & Scalable Systems',
    'tech.devops': 'DevOps & CI/CD',
    
    // Products
    'products.title': 'Product Lines',
    'products.subtitle': 'Building Tomorrow\'s Solutions',
    'products.description': 'Z.A.G Labs LTD develops and maintains multiple product lines with dedicated teams, agile methodologies, and AI-ready architecture. Each product is crafted with care and engineered for longevity.',
    'products.approach.title': 'Our Approach',
    'products.approach.dedicated': 'Dedicated Teams',
    'products.approach.dedicated.desc': 'Each product line has focused teams ensuring deep expertise',
    'products.approach.agile': 'Agile Methodologies',
    'products.approach.agile.desc': 'Iterative development with continuous improvement',
    'products.approach.ai': 'AI-Ready Architecture',
    'products.approach.ai.desc': 'Built to leverage the latest in artificial intelligence',
    'products.our': 'Our Products',
    'products.getlinked.name': 'Affiliate Tracking Technology',
    'products.getlinked.desc': 'A performance-driven affiliate network that connects advertisers and publishers through smart tracking, transparent deals, and real results—no fluff, just growth.',
    'products.affiliatemanager.name': 'Affiliate Manager AI',
    'products.affiliatemanager.desc': 'An AI-powered affiliate manager that listens, engages, and converts leads across Telegram like a real human—at scale and under your control. 🤖',
    'products.octotools.name': 'OctoTools',
    'products.octotools.desc': 'An AI-powered intelligence suite that tracks top crypto wallets, KoLs, and on-chain signals to help you spot opportunities before the crowd. 🐙',
    'products.happyoffice.name': 'HappyOffice',
    'products.happyoffice.desc': 'The social infrastructure for modern teams that turns engagement into measurable culture—keeping people visible, connected, and thriving. 😊',
    'products.aroundz.name': 'AroundZ.Me',
    'products.aroundz.desc': 'A trusted local marketplace where people can request help, earn nearby, offer services, and trade securely with verified people in their community.',
    'products.skilli.name': 'Skilli',
    'products.skilli.desc': 'A personal AI teacher that creates custom learning paths and bite-sized lessons that fit into your daily schedule while remembering your progress.',
    'products.vibbi.name': 'Vibbi',
    'products.vibbi.desc': 'An animated AI companion for Windows that talks, remembers, and helps with everyday tasks while growing alongside you.',
    'products.aacc.name': 'AI Agent Control Center',
    'products.aacc.desc': 'A local-first Windows app that independently monitors AI coding agents, tracking processes, file changes, and network activity for a transparent audit trail.',
    
    // Culture
    'culture.title': 'Our Culture',
    'culture.subtitle': 'Where Great People Do Great Work',
    'culture.description': 'We believe that the best software is built by happy, healthy, and inspired people. Our culture is built on respect, trust, and continuous learning.',
    'culture.office': 'Modern Office',
    'culture.office.desc': 'Spacious, light-filled workspace designed for focus and collaboration',
    'culture.gym': 'On-Site Gym',
    'culture.gym.desc': 'Stay active with our fully-equipped fitness area',
    'culture.relax': 'Relax Zones',
    'culture.relax.desc': 'Comfortable spaces for breaks, games, and casual conversations',
    'culture.events': 'Team Events',
    'culture.events.desc': 'Regular team building, celebrations, and happy hours',
    'culture.learning': 'Learning & Growth',
    'culture.learning.desc': 'Continuous learning opportunities and knowledge sharing',
    'culture.trust': 'Respect & Trust',
    'culture.trust.desc': 'A foundation of mutual respect and transparent communication',
    
    // Careers
    'careers.title': 'Careers',
    'careers.subtitle': 'Join Our Team',
    'careers.description': 'We\'re always looking for talented individuals who share our passion for building exceptional software. If you\'re ready to work on challenging problems with a supportive team, we\'d love to hear from you.',
    'careers.cta': 'Open Positions',
    
    // Contact
    'contact.title': 'Location & Contact',
    'contact.subtitle': 'Get in Touch',
    'contact.address': '3 Petko Y. Todorov Street',
    'contact.city': 'Veliko Tarnovo 5000, Bulgaria',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  bg: {
    // Navigation
    'nav.about': 'За Нас',
    'nav.technologies': 'Технологии',
    'nav.products': 'Продукти',
    'nav.culture': 'Култура',
    'nav.careers': 'Кариери',
    'nav.contact': 'Контакт',
    
    // Hero
    'hero.tagline': 'Създаваме Интелигентен Софтуер',
    'hero.subtitle': 'с Модерни Технологии и AI',
    'hero.description': 'Z.A.G Labs LTD доставя иновативни софтуерни решения от България за целия свят. Съчетаваме инженерно съвършенство с най-съвременни AI технологии и инструменти за създаване на продукти, които имат значение.',
    'hero.cta.products': 'Нашите Продукти',
    'hero.cta.contact': 'Свържете се с нас',
    
    // About
    'about.title': 'За Нас',
    'about.subtitle': 'Инженерно Съвършенство от България',
    'about.p1': 'Z.A.G Labs LTD е българска софтуерна компания, служеща като инженерна движеща сила зад иновативни софтуерни продукти. Базирани в България, ние обединяваме талантливи инженери, дизайнери и решаващи проблеми.',
    'about.p2': 'Специализирани сме в цялостна разработка на софтуер — от първоначална концепция до дългосрочна поддръжка. Нашата експертиза обхваща cloud-native архитектури, AI интеграция и изграждане на мащабируеми системи.',
    'about.p3': 'Това, което ни отличава, е уникалното съчетание на инженерна прецизност, креативно мислене и дълбоко бизнес разбиране. Ние не просто пишем код — ние изграждаме решения.',
    'about.value.innovation': 'Иновация',
    'about.value.innovation.desc': 'Разширяваме границите',
    'about.value.quality': 'Качество',
    'about.value.quality.desc': 'Съвършенство в занаята',
    'about.value.partnership': 'Партньорство',
    'about.value.partnership.desc': 'Растем заедно',
    
    // Technologies
    'tech.title': 'Технологии и AI',
    'tech.subtitle': 'Инженерно Съвършенство в Мащаб',
    'tech.description': 'Активно интегрираме AI инструменти и модерни практики за разработка във всички наши проекти, гарантирайки, че нашите решения са готови за бъдещето.',
    'tech.cloud': 'Cloud-Native Архитектури',
    'tech.web': 'Уеб и Мобилна Разработка',
    'tech.ai': 'AI и Машинно Обучение',
    'tech.automation': 'Автоматизация и Данни',
    'tech.security': 'Сигурни и Мащабируеми Системи',
    'tech.devops': 'DevOps и CI/CD',
    
    // Products
    'products.title': 'Продуктови Линии',
    'products.subtitle': 'Създаваме Решенията на Утре',
    'products.description': 'Z.A.G Labs LTD разработва и поддържа множество продуктови линии с отдадени екипи, agile методологии и AI-готова архитектура. Всеки продукт е създаден с внимание и проектиран за дълготрайност.',
    'products.approach.title': 'Нашият Подход',
    'products.approach.dedicated': 'Отдадени Екипи',
    'products.approach.dedicated.desc': 'Всяка продуктова линия има фокусирани екипи с дълбока експертиза',
    'products.approach.agile': 'Agile Методологии',
    'products.approach.agile.desc': 'Итеративна разработка с непрекъснато подобрение',
    'products.approach.ai': 'AI-Готова Архитектура',
    'products.approach.ai.desc': 'Изградено за използване на най-новото в AI',
    'products.our': 'Нашите Продукти',
    'products.getlinked.name': 'Технология за Проследяване на Афилиейти',
    'products.getlinked.desc': 'Партньорска мрежа, ориентирана към резултати, която свързва рекламодатели и издатели чрез интелигентно проследяване, прозрачни сделки и реални резултати — без излишни приказки, само растеж.',
    'products.affiliatemanager.name': 'Affiliate Manager AI',
    'products.affiliatemanager.desc': 'AI-базиран мениджър на афилиейти, който слуша, ангажира и конвертира потенциални клиенти в Telegram като истински човек — в мащаб и под ваш контрол. 🤖',
    'products.octotools.name': 'OctoTools',
    'products.octotools.desc': 'AI-базиран разузнавателен пакет, който проследява топ крипто портфейли, KoLs и on-chain сигнали, за да ви помогне да откриете възможности преди тълпата. 🐙',
    'products.happyoffice.name': 'HappyOffice',
    'products.happyoffice.desc': 'Социалната инфраструктура за модерни екипи, която превръща ангажираността в измерима култура — хората остават видими, свързани и вдъхновени. 😊',
    'products.aroundz.name': 'AroundZ.Me',
    'products.aroundz.desc': 'Доверена местна платформа, където хората могат да поискат помощ, да печелят наблизо, да предлагат услуги и да търгуват сигурно с проверени членове на общността.',
    'products.skilli.name': 'Skilli',
    'products.skilli.desc': 'Личен AI учител, който създава индивидуални учебни планове и кратки уроци, вписващи се в ежедневието ви, и помни напредъка ви.',
    'products.vibbi.name': 'Vibbi',
    'products.vibbi.desc': 'Анимиран AI спътник за Windows, който разговаря, помни и помага с ежедневни задачи, докато се развива заедно с вас.',
    'products.aacc.name': 'AI Agent Control Center',
    'products.aacc.desc': 'Локално приложение за Windows, което независимо наблюдава AI агенти за програмиране и проследява процеси, файлови промени и мрежова активност за пълна прозрачност.',
    
    // Culture
    'culture.title': 'Нашата Култура',
    'culture.subtitle': 'Където Страхотни Хора Правят Страхотни Неща',
    'culture.description': 'Вярваме, че най-добрият софтуер се създава от щастливи, здрави и вдъхновени хора. Нашата култура е изградена на уважение, доверие и непрекъснато учене.',
    'culture.office': 'Модерен Офис',
    'culture.office.desc': 'Просторно, светло работно пространство, проектирано за фокус и сътрудничество',
    'culture.gym': 'Фитнес Зала',
    'culture.gym.desc': 'Останете активни с нашата напълно оборудвана фитнес зона',
    'culture.relax': 'Зони за Отдих',
    'culture.relax.desc': 'Комфортни пространства за почивки, игри и разговори',
    'culture.events': 'Екипни Събития',
    'culture.events.desc': 'Редовни team building мероприятия и празненства',
    'culture.learning': 'Учене и Растеж',
    'culture.learning.desc': 'Възможности за непрекъснато учене и споделяне на знания',
    'culture.trust': 'Уважение и Доверие',
    'culture.trust.desc': 'Основа от взаимно уважение и прозрачна комуникация',
    
    // Careers
    'careers.title': 'Кариери',
    'careers.subtitle': 'Присъединете се към Нас',
    'careers.description': 'Винаги търсим талантливи хора, които споделят нашата страст към създаването на изключителен софтуер. Ако сте готови да работите по предизвикателни проблеми с подкрепящ екип, ще се радваме да се свържем.',
    'careers.cta': 'Отворени Позиции',
    
    // Contact
    'contact.title': 'Локация и Контакт',
    'contact.subtitle': 'Свържете се с нас',
    'contact.address': 'ул. „Петко Ю. Тодоров" 3',
    'contact.city': 'Велико Търново 5000, България',
    'contact.email': 'Имейл',
    'contact.phone': 'Телефон',
    
    // Footer
    'footer.rights': 'Всички права запазени.',
    
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
