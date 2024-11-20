import { Button } from '@components/Button';
import settings from '@base/settings.json';

import ContentBox from './ContentBox';
import Section from './Section';

import HeroBackground from './images/circles.webp';
import VisionIcon from './images/vision-icon.svg';
import MissionIcon from './images/mission-icon.svg';
import GithubIcon from './images/github-icon.svg';
import GlobeBackground from './images/globe.webp';
import ArrowUpright from './images/arrow-up-right.svg';
import { useGetRepos } from 'Services/Github/api';

const AboutModule = {
  Hero: () => (
    <Section
      title={settings.aboutPage.hero.title}
      subText={settings.aboutPage.hero.subText}
      backgroundElement={
        <img
          src={HeroBackground.src}
          alt="Hero background image"
          className="z-0 absolute -left-[4vw] -right-[4vw] top-[50%] h-full max-h-[228px] w-[108vw] max-w-none -translate-y-1/2 transform object-cover"
        />
      }
    >
      <div className="mt-[76px] flex w-full flex-row gap-[16px]">
        {settings.aboutPage.hero.content.map((item, index) => {
          let icon;
          switch (item.icon) {
            case 'mission':
              icon = MissionIcon;
              break;
            case 'vision':
              icon = VisionIcon;
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
                  className="pb-[16px]"
                />
              )}
              <h4 className="font-sans text-[38px] font-semibold text-white">
                {item.title}
              </h4>
              <p className="font-plex-sans text-[16px] leading-[24px] text-neutral-11">
                {item.text}
              </p>
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
      align="left"
      backgroundElement={
        <img
          src={GlobeBackground.src}
          alt="Hero background image"
          className="z-0 absolute -right-[50px] left-auto h-full object-cover"
        />
      }
    />
  ),

  WhyChoose: () => (
    <Section
      title={settings.aboutPage.why_choose.title}
      subText={settings.aboutPage.why_choose.subText}
      align="right"
      backgroundElement={
        <img
          src={GlobeBackground.src}
          alt="Hero background image"
          className="z-0 absolute h-full object-cover"
        />
      }
    />
  ),

  OpenSourceCore: () => {
    const {
      data: repos,
      error,
      loading,
    } = useGetRepos(
      settings.aboutPage.open_source.repos.map((repo) => repo.url),
    );

    return (
      <Section
        title={settings.aboutPage.open_source.title}
        subText={settings.aboutPage.open_source.subText}
      >
        <div className="mt-[20px] flex w-full flex-row gap-[16px]">
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
                    <span className="text-neutral-8 ml-2 text-[12px] leading-[22px]">
                      + more
                    </span>
                  )}
                </div>
              }
            >
              <Button
                variant="secondary-ghost"
                className="absolute right-[16px] top-[16px]"
                size="sm"
              >
                <a
                  aria-label={settings.aboutPage.call_to_action.button}
                  href={repo.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex w-full flex-row"
                >
                  View repo <img src={ArrowUpright.src} alt="" />
                </a>
              </Button>
              <img
                src={GithubIcon.src}
                alt="Github icon"
                className="mb-[16px]"
              />
              <h4 className="mb-[12px] font-plex-sans text-[20px] font-semibold capitalize leading-[28px] text-neutral-11">
                {repo.name}
              </h4>
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
      <Button variant="primary" className="mt-[45px] w-full p-[16px]">
        <a
          aria-label={settings.aboutPage.call_to_action.button}
          href="https://app.fleek.xyz/"
          rel="noopener noreferrer"
          target="_blank"
          className="w-full"
        >
          {settings.aboutPage.call_to_action.button}
        </a>
      </Button>
    </Section>
  ),
};

export default AboutModule;
