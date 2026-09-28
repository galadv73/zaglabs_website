import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Introduction',
          content: `Z.A.G Labs LTD ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our website or use our services.`
        },
        {
          title: '2. Information We Collect',
          content: `We may collect information about you in various ways, including:

Personal Data: When you contact us or submit forms on our website, we may collect personally identifiable information such as your name, email address, phone number, company name, and job title.

Usage Data: We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.

Cookies and Tracking Technologies: We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`
        },
        {
          title: '3. How We Use Your Information',
          content: `We use the information we collect for various purposes, including:

• To provide, maintain, and improve our services
• To respond to your inquiries and fulfill your requests
• To send you technical notices, updates, and administrative messages
• To communicate with you about products, services, and events
• To monitor and analyze trends, usage, and activities
• To detect, investigate, and prevent fraudulent transactions and other illegal activities
• To personalize and improve your experience
• To comply with legal obligations`
        },
        {
          title: '4. Information Sharing and Disclosure',
          content: `We may share your information in the following circumstances:

Service Providers: We may share your information with third-party vendors and service providers who perform services on our behalf, such as hosting, analytics, and email delivery.

Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.

Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.

With Your Consent: We may share your information for any other purpose with your consent.`
        },
        {
          title: '5. Data Security',
          content: `We implement appropriate technical and organizational security measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`
        },
        {
          title: '6. Data Retention',
          content: `We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.`
        },
        {
          title: '7. Your Data Protection Rights',
          content: `Depending on your location, you may have the following rights regarding your personal data:

• The right to access – You have the right to request copies of your personal data.
• The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
• The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
• The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
• The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
• The right to data portability – You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.`
        },
        {
          title: '8. International Data Transfers',
          content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside Bulgaria and choose to provide information to us, please note that we transfer the data to Bulgaria and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`
        },
        {
          title: '9. Children\'s Privacy',
          content: `Our services are not intended for individuals under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If we become aware that we have collected personal data from a child under 16 without verification of parental consent, we take steps to remove that information from our servers.`
        },
        {
          title: '10. Third-Party Links',
          content: `Our website may contain links to third-party websites and services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the privacy policies of any third-party sites you visit.`
        },
        {
          title: '11. Updates to This Privacy Policy',
          content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`
        },
        {
          title: '12. Contact Us',
          content: `If you have any questions about this Privacy Policy or our data practices, please contact us at:

Z.A.G Labs LTD
3 Petko Y. Todorov Street
Veliko Tarnovo 5000, Bulgaria
Email: info@zaglabs.io

For EU residents, you also have the right to lodge a complaint with your local data protection authority.`
        }
      ]
    },
    bg: {
      title: 'Политика за поверителност',
      lastUpdated: 'Последна актуализация: Януари 2026',
      sections: [
        {
          title: '1. Въведение',
          content: `Z.A.G Labs LTD ("ние", "нашият" или "нас") се ангажира да защитава вашата поверителност. Тази Политика за поверителност обяснява как събираме, използваме, разкриваме и защитаваме вашата информация, когато посещавате нашия уебсайт или използвате нашите услуги. Моля, прочетете внимателно тази политика. Ако не сте съгласни с условията на тази политика за поверителност, моля, не осъществявайте достъп до нашия уебсайт и не използвайте нашите услуги.`
        },
        {
          title: '2. Информация, която събираме',
          content: `Можем да събираме информация за вас по различни начини, включително:

Лични данни: Когато се свържете с нас или изпратите формуляри на нашия уебсайт, можем да събираме лична информация като вашето име, имейл адрес, телефонен номер, име на компания и длъжност.

Данни за използване: Ние автоматично събираме определена информация, когато посещавате нашия уебсайт, включително вашия IP адрес, тип на браузъра, операционна система, препращащи URL адреси, времена на достъп и прегледани страници.

Бисквитки и технологии за проследяване: Използваме бисквитки и подобни технологии за проследяване на активността на нашия уебсайт и съхраняване на определена информация. Можете да инструктирате браузъра си да откаже всички бисквитки или да покаже, когато се изпраща бисквитка.`
        },
        {
          title: '3. Как използваме вашата информация',
          content: `Използваме събраната информация за различни цели, включително:

• За предоставяне, поддържане и подобряване на нашите услуги
• За отговаряне на вашите запитвания и изпълнение на вашите заявки
• За изпращане на технически известия, актуализации и административни съобщения
• За комуникация с вас относно продукти, услуги и събития
• За наблюдение и анализ на тенденции, използване и дейности
• За откриване, разследване и предотвратяване на измамни транзакции и други незаконни дейности
• За персонализиране и подобряване на вашето изживяване
• За спазване на законови задължения`
        },
        {
          title: '4. Споделяне и разкриване на информация',
          content: `Можем да споделяме вашата информация при следните обстоятелства:

Доставчици на услуги: Можем да споделяме вашата информация с доставчици и партньори от трети страни, които извършват услуги от наше име, като хостинг, анализи и доставка на имейли.

Законови изисквания: Можем да разкрием вашата информация, ако това се изисква от закона или в отговор на валидни искания от публични органи.

Бизнес прехвърляния: В случай на сливане, придобиване или продажба на всички или част от нашите активи, вашата информация може да бъде прехвърлена като част от тази транзакция.

С ваше съгласие: Можем да споделяме вашата информация за всяка друга цел с ваше съгласие.`
        },
        {
          title: '5. Сигурност на данните',
          content: `Прилагаме подходящи технически и организационни мерки за сигурност, за да защитим сигурността на вашата лична информация. Моля, имайте предвид, че никой метод за предаване по интернет или метод за електронно съхранение не е 100% сигурен. Въпреки че се стремим да използваме търговски приемливи средства за защита на вашата лична информация, не можем да гарантираме нейната абсолютна сигурност.`
        },
        {
          title: '6. Съхранение на данни',
          content: `Ще запазим вашата лична информация само толкова дълго, колкото е необходимо за целите, изложени в тази Политика за поверителност. Ще запазим и използваме вашата информация до степента, необходима за спазване на нашите законови задължения, разрешаване на спорове и прилагане на нашите политики.`
        },
        {
          title: '7. Вашите права за защита на данни',
          content: `В зависимост от вашето местоположение, може да имате следните права относно вашите лични данни:

• Право на достъп – Имате право да поискате копия на вашите лични данни.
• Право на коригиране – Имате право да поискате коригиране на информация, която смятате за неточна, или попълване на информация, която смятате за непълна.
• Право на изтриване – Имате право да поискате изтриване на вашите лични данни при определени условия.
• Право на ограничаване на обработването – Имате право да поискате ограничаване на обработването на вашите лични данни при определени условия.
• Право на възражение срещу обработването – Имате право да възразите срещу обработването на вашите лични данни при определени условия.
• Право на преносимост на данни – Имате право да поискате прехвърляне на данните, които сме събрали, на друга организация или директно на вас при определени условия.`
        },
        {
          title: '8. Международни прехвърляния на данни',
          content: `Вашата информация може да бъде прехвърлена и поддържана на компютри, разположени извън вашата държава, провинция, страна или друга правителствена юрисдикция, където законите за защита на данните могат да се различават от тези на вашата юрисдикция. Ако се намирате извън България и изберете да ни предоставите информация, моля, имайте предвид, че прехвърляме данните в България и ги обработваме там. Вашето съгласие с тази Политика за поверителност, последвано от вашето подаване на такава информация, представлява вашето съгласие за това прехвърляне.`
        },
        {
          title: '9. Поверителност на децата',
          content: `Нашите услуги не са предназначени за лица под 16 години. Ние не събираме съзнателно лична информация от деца под 16 години. Ако разберем, че сме събрали лични данни от дете под 16 години без проверка на родителско съгласие, предприемаме стъпки за премахване на тази информация от нашите сървъри.`
        },
        {
          title: '10. Връзки към трети страни',
          content: `Нашият уебсайт може да съдържа връзки към уебсайтове и услуги на трети страни, които не са притежавани или контролирани от нас. Ние нямаме контрол и не поемаме отговорност за съдържанието, политиките за поверителност или практиките на уебсайтове или услуги на трети страни. Насърчаваме ви да прегледате политиките за поверителност на всички сайтове на трети страни, които посещавате.`
        },
        {
          title: '11. Актуализации на тази политика за поверителност',
          content: `Можем да актуализираме нашата Политика за поверителност от време на време. Ще ви уведомим за всички промени, като публикуваме новата Политика за поверителност на тази страница и актуализираме датата на "Последна актуализация" в горната част на тази политика. Съветваме ви периодично да преглеждате тази Политика за поверителност за всякакви промени. Промените в тази Политика за поверителност влизат в сила, когато бъдат публикувани на тази страница.`
        },
        {
          title: '12. Свържете се с нас',
          content: `Ако имате въпроси относно тази Политика за поверителност или нашите практики за данни, моля, свържете се с нас на:

Z.A.G Labs LTD
ул. „Петко Ю. Тодоров" 3
Велико Търново 5000, България
Имейл: info@zaglabs.io

За жители на ЕС имате право да подадете жалба до местния орган за защита на данните.`
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {currentContent.title}
            </h1>
            <p className="text-muted-foreground mb-12">
              {currentContent.lastUpdated}
            </p>

            <div className="space-y-8">
              {currentContent.sections.map((section, index) => (
                <ScrollAnimationWrapper key={index} delay={1}>
                  <section className="prose prose-gray dark:prose-invert max-w-none">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  </section>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
