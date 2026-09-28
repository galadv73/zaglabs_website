import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

const TermsAndConditions = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Terms and Conditions',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: `By accessing and using the Z.A.G Labs website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.`
        },
        {
          title: '2. Services Description',
          content: `Z.A.G Labs LTD provides software development services, including but not limited to web applications, mobile applications, AI-powered solutions, and custom software development. Our services are subject to availability and may be modified or discontinued at any time without prior notice.`
        },
        {
          title: '3. Intellectual Property Rights',
          content: `All content, trademarks, logos, and intellectual property displayed on this website are the property of Z.A.G Labs LTD or its licensors. You may not reproduce, distribute, modify, or create derivative works from any content without our express written consent. Upon full payment for custom development services, intellectual property rights for the deliverables will be transferred to the client as specified in the respective service agreement.`
        },
        {
          title: '4. User Responsibilities',
          content: `You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You must not attempt to gain unauthorized access to our systems, interfere with the proper functioning of our services, or transmit any harmful code or malware.`
        },
        {
          title: '5. Project Engagements',
          content: `All project engagements are subject to separate service agreements that outline the scope, timeline, deliverables, and payment terms. These Terms and Conditions apply in addition to any project-specific agreements. In case of conflict, the project-specific agreement shall prevail.`
        },
        {
          title: '6. Payment Terms',
          content: `Payment terms are specified in individual service agreements. Unless otherwise agreed, invoices are due within 14 days of receipt. Late payments may incur interest charges. We reserve the right to suspend services for overdue accounts.`
        },
        {
          title: '7. Confidentiality',
          content: `Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of business. This obligation survives the termination of any service agreement.`
        },
        {
          title: '8. Limitation of Liability',
          content: `To the maximum extent permitted by law, Z.A.G Labs LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities. Our total liability for any claims arising from our services shall not exceed the fees paid by you for the specific service giving rise to the claim.`
        },
        {
          title: '9. Warranty Disclaimer',
          content: `Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or completely secure. Any warranties provided for specific deliverables will be outlined in the respective service agreement.`
        },
        {
          title: '10. Termination',
          content: `We reserve the right to terminate or suspend access to our services at any time, with or without cause, and with or without notice. Upon termination, all provisions of these Terms that by their nature should survive will remain in effect.`
        },
        {
          title: '11. Governing Law',
          content: `These Terms and Conditions are governed by and construed in accordance with the laws of Bulgaria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Sofia, Bulgaria.`
        },
        {
          title: '12. Changes to Terms',
          content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.`
        },
        {
          title: '13. Contact Information',
          content: `If you have any questions about these Terms and Conditions, please contact us at:\n\nZ.A.G Labs LTD\n3 Petko Y. Todorov Street\nVeliko Tarnovo 5000, Bulgaria\nEmail: info@zaglabs.io`
        }
      ]
    },
    bg: {
      title: 'Общи условия',
      lastUpdated: 'Последна актуализация: Януари 2026',
      sections: [
        {
          title: '1. Приемане на условията',
          content: `С достъпа и използването на уебсайта и услугите на Z.A.G Labs, вие потвърждавате, че сте прочели, разбрали и се съгласявате да бъдете обвързани с тези Общи условия. Ако не сте съгласни с която и да е част от тези условия, не трябва да използвате нашите услуги.`
        },
        {
          title: '2. Описание на услугите',
          content: `Z.A.G Labs LTD предоставя услуги за разработка на софтуер, включително, но не само, уеб приложения, мобилни приложения, AI решения и разработка на персонализиран софтуер. Нашите услуги са предмет на наличност и могат да бъдат модифицирани или прекратени по всяко време без предварително известие.`
        },
        {
          title: '3. Права на интелектуална собственост',
          content: `Цялото съдържание, търговски марки, лога и интелектуална собственост, показани на този уебсайт, са собственост на Z.A.G Labs LTD или неговите лицензодатели. Не можете да възпроизвеждате, разпространявате, модифицирате или създавате производни произведения от каквото и да е съдържание без нашето изрично писмено съгласие. При пълно заплащане за персонализирани услуги за разработка, правата на интелектуална собственост върху резултатите ще бъдат прехвърлени на клиента, както е посочено в съответния договор за услуги.`
        },
        {
          title: '4. Отговорности на потребителя',
          content: `Съгласявате се да използвате нашите услуги само за законни цели и в съответствие с тези Условия. Вие сте отговорни за поддържането на поверителността на всички идентификационни данни за акаунта и за всички дейности, които се извършват под вашия акаунт. Не трябва да се опитвате да получите неоторизиран достъп до нашите системи, да пречите на правилното функциониране на нашите услуги или да предавате вреден код или злонамерен софтуер.`
        },
        {
          title: '5. Проектни ангажименти',
          content: `Всички проектни ангажименти са предмет на отделни договори за услуги, които очертават обхвата, сроковете, резултатите и условията за плащане. Тези Общи условия се прилагат в допълнение към всички специфични за проекта споразумения. В случай на конфликт, специфичното за проекта споразумение има предимство.`
        },
        {
          title: '6. Условия за плащане',
          content: `Условията за плащане са посочени в индивидуалните договори за услуги. Освен ако не е уговорено друго, фактурите се дължат в рамките на 14 дни от получаването. Закъснелите плащания могат да доведат до начисляване на лихва. Запазваме си правото да спрем услугите за просрочени сметки.`
        },
        {
          title: '7. Поверителност',
          content: `И двете страни се съгласяват да поддържат поверителността на всяка патентована или чувствителна информация, споделена по време на бизнес отношенията. Това задължение продължава и след прекратяването на всеки договор за услуги.`
        },
        {
          title: '8. Ограничаване на отговорността',
          content: `До максималната степен, разрешена от закона, Z.A.G Labs LTD не носи отговорност за косвени, случайни, специални, последващи или наказателни щети, включително, но не само, загуба на печалби, данни или бизнес възможности. Нашата обща отговорност за всички претенции, произтичащи от нашите услуги, не трябва да надвишава таксите, платени от вас за конкретната услуга, пораждаща претенцията.`
        },
        {
          title: '9. Отказ от гаранция',
          content: `Нашите услуги се предоставят "както са" без гаранции от какъвто и да е вид, изрични или подразбиращи се. Ние не гарантираме, че нашите услуги ще бъдат непрекъснати, без грешки или напълно сигурни. Всички гаранции, предоставени за конкретни резултати, ще бъдат описани в съответния договор за услуги.`
        },
        {
          title: '10. Прекратяване',
          content: `Запазваме си правото да прекратим или спрем достъпа до нашите услуги по всяко време, с или без причина и с или без предизвестие. При прекратяване, всички разпоредби на тези Условия, които по своето естество трябва да останат в сила, ще продължат да действат.`
        },
        {
          title: '11. Приложимо право',
          content: `Тези Общи условия се уреждат и тълкуват в съответствие със законите на България. Всички спорове, произтичащи от тези условия, са предмет на изключителната юрисдикция на съдилищата в София, България.`
        },
        {
          title: '12. Промени в условията',
          content: `Запазваме си правото да модифицираме тези Общи условия по всяко време. Промените влизат в сила незабавно след публикуването им на нашия уебсайт. Продължаващото използване на нашите услуги след всякакви промени представлява приемане на новите условия.`
        },
        {
          title: '13. Информация за контакт',
          content: `Ако имате въпроси относно тези Общи условия, моля свържете се с нас на:\n\nZ.A.G Labs LTD\nул. „Петко Ю. Тодоров" 3\nВелико Търново 5000, България\nИмейл: info@zaglabs.io`
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

export default TermsAndConditions;
