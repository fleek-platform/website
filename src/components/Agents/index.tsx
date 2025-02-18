import settings from '@base/settings.json';
import Section from './components/Section';
import { CardsList } from './components/Card';
import { heroCards } from './data/cards';

const AboutModule = {
  Hero: () => (
    // Caption text above
    <Section
      title={settings.agentsPage.hero.title}
      isHero
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
    >
      <div>Buttons here</div>
    </Section>
  ),
  Manage: () => (
    <Section
      title={settings.agentsPage.manage.title}
      subTitle={settings.agentsPage.manage.subTitle}
    >
      <div>Buttons here</div>
    </Section>
  ),
  Pricing: () => (
    <Section title={settings.agentsPage.pricing.title}>
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
