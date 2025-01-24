import settings from '@base/settings.json';
import Section from './Section';

const AboutModule = {
  Hero: () => (
    <Section title={settings.affiliatesPage.hero.title}>
      <div className="">Hero section</div>
    </Section>
  ),
  WhyBecome: () => (
    <Section title={settings.affiliatesPage.whyBecome.title}>
      <div className="">WhyBecome section</div>
    </Section>
  ),
  WhoCanJoin: () => (
    <Section title={settings.affiliatesPage.whoCanJoin.title}>
      <div className="">WhoCanJoin section</div>
    </Section>
  ),
  HowItWorks: () => (
    <Section title={settings.affiliatesPage.howItWorks.title}>
      <div className="">HowItWorks section</div>
    </Section>
  ),
  Faq: () => (
    <Section title={settings.affiliatesPage.faq.title}>
      <div className="">Faq section</div>
    </Section>
  ),
};

export default AboutModule;
