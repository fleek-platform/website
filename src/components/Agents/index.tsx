import settings from '@base/settings.json';
import Section from './components/Section';
import { CardsList } from './components/Card';
import { SmallCardsList } from './components/SmallCard';
import {
  customizeCards,
  heroCards,
  manageCards,
  pricingCards,
} from './data/cards';
import CustomizeAgentsImage from './images/background/customize-agents.png';
import GrowingTeamsImage from './images/background/growing-teams.png';
import { PricingCardsList } from './components/PricingCard';
import { faqs, type FaqData } from './data/faq';

import type { AccordionItem } from '@components/Accordion';
import Accordion from '@components/Accordion';

const faqsToAccordionItems = (faqs: FaqData[]): AccordionItem[] =>
  faqs.map((faq) => ({ label: faq.label, contentElements: [faq.content] }));

const AboutModule = {
  Hero: () => (
    // Caption text above
    <Section
      title={settings.agentsPage.hero.title}
      isHero
      textCenter
      subTitle={settings.agentsPage.hero.subTitle}
    >
      <div>CTA buttons here</div>
      <CardsList cards={heroCards} />
    </Section>
  ),
  Customize: () => (
    <Section
      title={settings.agentsPage.customize.title}
      subTitle={settings.agentsPage.customize.subTitle}
      image={CustomizeAgentsImage.src}
    >
      <SmallCardsList cards={customizeCards} />
    </Section>
  ),
  Manage: () => (
    <Section
      title={settings.agentsPage.growing.title}
      subTitle={settings.agentsPage.growing.subTitle}
      imageReverse
      image={GrowingTeamsImage.src}
    >
      <SmallCardsList cards={manageCards} />
    </Section>
  ),
  Pricing: () => (
    <Section title={settings.agentsPage.pricing.title} textCenter wide>
      <PricingCardsList cards={pricingCards} />
    </Section>
  ),
  Faq: () => (
    <Section
      title={settings.agentsPage.faq.title}
      subTitle={settings.agentsPage.faq.subTitle}
      className="pb-108 md:pb-144"
    >
      <Accordion
        items={faqsToAccordionItems(faqs)}
        headerClassName="!text-[1.8rem] font-medium text-gray-dark-12"
      />
    </Section>
  ),
};

export default AboutModule;
