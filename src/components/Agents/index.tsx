import settings from '@base/settings.json';
import Section from './components/Section';
import { CardsList, SmallCardsList } from './components/Card';
import { customizeCards, heroCards, manageCards } from './data/cards';
import CustomizeAgentsImage from './images/background/customize-agents.png';
import ManageAgentsImage from './images/background/manage-agents.png';

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
      title={settings.agentsPage.manage.title}
      subTitle={settings.agentsPage.manage.subTitle}
      imageReverse
      image={ManageAgentsImage.src}
    >
      <SmallCardsList cards={manageCards} />
    </Section>
  ),
  Pricing: () => (
    <Section title={settings.agentsPage.pricing.title} textCenter>
      <div>Custom cards here</div>
    </Section>
  ),
  Faq: () => (
    <Section title={settings.agentsPage.faq.title}>
      <div>Accordion here</div>
    </Section>
  ),
};

export default AboutModule;
