import settings from '@base/settings.json';
import Section from './Section';
import { Button } from '@components/Button';
import { Target } from '@components/Link';

const AboutModule = {
  Hero: () => (
    <Section
      title={
        <>
          {settings.affiliatesPage.hero.titleWhite}
          <span className="bg-gradient-to-r from-yellow-dark-9 to-yellow-dark-12 bg-clip-text text-transparent">
            {settings.affiliatesPage.hero.titleYellow}
          </span>
        </>
      }
      isH1Title
      subTitle={settings.affiliatesPage.hero.subTitle}
    >
      <Button
        variant="primary"
        className="inline-flex h-44 w-full max-w-[350px] rounded-6 px-32"
        aria-label={settings.affiliatesPage.hero.ctaText}
        href="https://app.fleek.xyz/"
        rel="noopener noreferrer"
        target={Target.Blank}
      >
        {settings.affiliatesPage.hero.ctaText}
      </Button>
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
