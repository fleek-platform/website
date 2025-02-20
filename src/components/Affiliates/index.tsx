import settings from '@base/settings.json';
import { Button } from '@components/Button';
import { Target } from '@components/Link';
import Section from './components/Section';
import { CardsList } from './components/Card';
import { howItWorksCards, whoCanJoinCards, whyBecomeCards } from './data/cards';

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
      isHero
      subTitle={settings.affiliatesPage.hero.subTitle}
    >
      <Button
        variant="primary"
        className="inline-flex h-44 w-full  min-w-[320px] max-w-[350px] rounded-6 px-32"
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
    <Section
      title={settings.affiliatesPage.whyBecome.title}
      subTitle={settings.affiliatesPage.whyBecome.subTitle}
    >
      <CardsList cards={whyBecomeCards} />
    </Section>
  ),
  WhoCanJoin: () => (
    <Section
      title={settings.affiliatesPage.whoCanJoin.title}
      subTitle={settings.affiliatesPage.whoCanJoin.subTitle}
    >
      <CardsList cards={whoCanJoinCards} hasFourColumns />
    </Section>
  ),
  HowItWorks: () => (
    <Section title={settings.affiliatesPage.howItWorks.title}>
      <CardsList cards={howItWorksCards} hasFourColumns />
    </Section>
  ),
  Faq: () => (
    <Section title={settings.affiliatesPage.faq.title}>
      <div className="">Faq section</div>
    </Section>
  ),
};

export default AboutModule;
