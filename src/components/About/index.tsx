import { Button } from '@components/Button';
import settings from '@base/settings.json';

import Section from './Section';
import { Target } from '@components/Link';

import HeroBackground from './images/circles.webp';
import HeroImage from './images/hero-image.svg';

import EyeIcon from './images/eye-icon.svg';
import TargetIcon from './images/target-icon.svg';
import FLKCoinIcon from './images/FLK-coin-icon.svg';

import GithubIcon from './images/github-icon.svg';
import GlobeBackground from './images/globe.webp';
import LightningBackground from './images/lightning.webp';
import ArrowUpright from './images/arrow-up-right.svg';
import ContentBox from '@components/ContentBox';
import { useGetRepos } from '@hooks/useGetRepos';

const AboutModule = {
  Hero: () => (
    <Section
      title={settings.aboutPage.hero.title}
      subText={settings.aboutPage.hero.subText}
      headerClassName="md:!max-w-[450px] lg:!max-w-[660px]"
      align="left"
      image={
        <img
          src={HeroImage.src}
          alt={'Fleek About Hero image'}
          className="absolute right-[50px] hidden max-w-none md:right-0 md:block md:max-h-[75%] md:max-w-[35vw]"
        />
      }
      gradientClassName="!-top-[70px]"
      backgroundElement={
        <img
          src={HeroBackground.src}
          alt="Hero background image"
          className="z-0 absolute -left-[4vw] -right-[4vw] bottom-[40vh] h-full max-h-[95px] w-[108vw] max-w-none md:bottom-[125px]"
        />
      }
    >
      <div className="mt-[16px] flex w-full flex-col gap-[16px] md:mt-[56px] md:flex-row">
        {settings.aboutPage.hero.content.map((item, index) => {
          let icon;
          switch (item.icon) {
            case 'mission':
              icon = TargetIcon;
              break;
            case 'open-source':
              icon = EyeIcon;
              break;
            case 'community':
              icon = FLKCoinIcon;
              break;
          }
          return (
            <ContentBox key={index}>
              {icon && (
                <img
                  src={icon.src}
                  alt={item.title}
                  width={icon.width}
                  height={icon.height}
                  className="m-auto pb-[16px]"
                />
              )}
              <h1 className="font-medium3 text-center font-sans text-[20px] leading-[20px] text-white md:text-[28px] md:leading-[28px]">
                {item.title}
              </h1>
            </ContentBox>
          );
        })}
      </div>
    </Section>
  ),

  WhyExists: () => (
    <Section
      title={settings.aboutPage.why_exists.title}
      subText={settings.aboutPage.why_exists.subText}
      headerClassName="!max-w-[545px]"
      align="left"
      image={
        <img
          src={GlobeBackground.src}
          alt="Globe background image"
          className="absolute left-auto right-0 max-h-[100%] max-w-none sm:max-h-[111%] md:max-h-[135%]"
        />
      }
    />
  ),

  WhyChoose: () => (
    <Section
      title={settings.aboutPage.why_choose.title}
      subText={settings.aboutPage.why_choose.subText}
      headerClassName="!max-w-[500px]"
      align="left"
      image={
        <img
          src={LightningBackground.src}
          alt="Lightning background image"
          className="absolute left-auto right-0 max-h-[100%] max-w-none sm:max-h-[111%] md:max-h-[140%]"
        />
      }
    />
  ),

  OpenSourceCore: () => {
    const { data: repos } = useGetRepos(
      settings.aboutPage.open_source.repos.map((repo) => repo.url),
    );

    return (
      <Section
        title={settings.aboutPage.open_source.title}
        subText={settings.aboutPage.open_source.subText}
        gradientLocation="right"
      >
        <div className="mt-[20px] flex w-full flex-col gap-[16px] md:flex-row">
          {repos.map((repo) => (
            <ContentBox
              variant="narrow"
              key={repo.html_url}
              footerComponent={
                <div className="flex">
                  {repo.contributors
                    ?.slice(0, 5)
                    .map((contributor) => (
                      <img
                        key={contributor.login}
                        height="22"
                        width="22"
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="h-22 w-22 rounded-full"
                      />
                    ))}
                  {repo.contributors && repo.contributors.length > 5 && (
                    <span className="ml-2 text-[12px] leading-[22px] text-neutral-11">
                      + more
                    </span>
                  )}
                </div>
              }
            >
              <Button
                variant="secondary-ghost"
                className="absolute right-[16px] top-[16px] flex flex-row"
                size="sm"
                aria-label={settings.aboutPage.call_to_action.button}
                href={repo.html_url}
                rel="noopener noreferrer"
                target={Target.Blank}
              >
                <span>View repo</span>
                <img src={ArrowUpright.src} height={16} width={16} alt="" />
              </Button>
              <img
                height={22}
                width={22}
                src={GithubIcon.src}
                alt="Github icon"
                className="mb-[16px]"
              />
              <p className="mb-[12px] font-plex-sans text-[20px] font-semibold capitalize leading-[28px] text-neutral-11">
                {repo.name}
              </p>
              <p className="line-clamp-2 font-plex-sans text-[16px] leading-[22px] text-neutral-11">
                {repo.description}
              </p>
            </ContentBox>
          ))}
        </div>
      </Section>
    );
  },

  CallToAction: () => (
    <Section
      title={settings.aboutPage.call_to_action.title}
      subText={settings.aboutPage.call_to_action.subText}
      className="border-b-0"
    >
      <Button
        variant="app-primary"
        className="m-auto mt-[45px] w-full max-w-[215px] p-[16px]"
        aria-label={settings.aboutPage.call_to_action.button}
        href="https://fleek.xyz"
        rel="noopener noreferrer"
        target={Target.Blank}
      >
        {settings.aboutPage.call_to_action.button}
      </Button>
    </Section>
  ),
};

export default AboutModule;
