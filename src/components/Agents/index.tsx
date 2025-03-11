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
import { Button } from '@components/Button';
import { FaChevronRight } from 'react-icons/fa6';
import { NewsletterModal } from './components/NewsletterModal';

const faqsToAccordionItems = (faqs: FaqData[]): AccordionItem[] =>
  faqs.map((faq) => ({ label: faq.label, contentElements: [faq.content] }));

const AgentsModule = {
  NewsletterModal: () => <NewsletterModal />,
  Hero: () => (
    <Section
      title={settings.agentsPage.hero.title}
      subTitle={settings.agentsPage.hero.subTitle}
      isHero
      isTextCenter
    >
      <div className="mb-48 flex flex-wrap items-center justify-center gap-12 font-plex-sans md:mb-96">
        <Button href="/eliza/">{settings.agentsPage.hero.primaryCta}</Button>
        {/* <Button variant="secondary" href="#">
          {settings.agentsPage.hero.secondaryCta}
        </Button> */}
        <Button variant="ghost" href="https://api.fleek.xyz/api">
          {settings.agentsPage.hero.tertiaryCta}
          <FaChevronRight className="size-12" />
        </Button>
      </div>
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
      isImageReverse
      image={GrowingTeamsImage.src}
    >
      <SmallCardsList cards={manageCards} />
    </Section>
  ),
  Pricing: () => (
    <Section title={settings.agentsPage.pricing.title} isTextCenter isWide>
      <PricingCardsList cards={pricingCards} />
    </Section>
  ),
  Faq: () => (
    <Section
      title={settings.agentsPage.faq.title}
      subTitle={settings.agentsPage.faq.subTitle}
      className="pb-108 md:pb-144"
      isSubTitleNoBalance
    >
      <Accordion
        items={faqsToAccordionItems(faqs)}
        headerClassName="md:!text-[1.8rem] font-medium text-gray-dark-12"
      />
    </Section>
  ),
};

export default AgentsModule;
