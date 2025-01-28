import settings from '@base/settings.json';
import { FaChevronRight } from 'react-icons/fa6';
import { Announcement } from '../Announcement';
import { Button } from '../Button';
import { Target } from '@components/Link';
import { Text } from './Text';
import { BlurFade } from './BlurFade';

const calculateDelay = (factor: number) => 0.25 * factor;

export const Hero = () => {
  return (
    <header className="relative mx-auto w-full max-w-[1048px] px-24">
      <div className="pointer-events-none absolute -left-320 -top-1/2 -z-1 h-800 w-800 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.85),transparent)] sm:-left-304 sm:-top-240 sm:h-400" />
      <section className="flex flex-col justify-center gap-24 pt-64">
        {settings.site.announcementMarquee.visible && (
          <BlurFade delay={calculateDelay(0)} className="w-fit">
            <Announcement variant="content" />
          </BlurFade>
        )}
        <section className="flex max-w-800 flex-col gap-24 pt-12">
          <BlurFade delay={calculateDelay(1)}>
            <Text as="h1">{settings.landingPage.hero.h1}</Text>
          </BlurFade>
          <BlurFade delay={calculateDelay(2)}>
            <Text variant="description" as="h2">
              {settings.landingPage.hero.h2}
            </Text>
          </BlurFade>
          <div className="flex items-center gap-12">
            <BlurFade delay={calculateDelay(3)}>
              <Button href="/eliza/">
                {settings.landingPage.hero.primaryCta}
              </Button>
            </BlurFade>
            <BlurFade delay={calculateDelay(3.5)}>
              <Button variant="ghost" href="/docs/">
                {settings.landingPage.hero.secondaryCta}
                <FaChevronRight className="size-12" />
              </Button>
            </BlurFade>
          </div>
        </section>
        <div className="relative h-[400px]  lg:h-[730px]">
          <BlurFade delay={calculateDelay(6.5)}>
            <div className="pointer-events-none absolute -top-152 left-[12%] h-496 w-608 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.85),transparent)]"></div>
          </BlurFade>
          <div className="absolute inset-0 -left-[4%] top-60 h-400 w-[540px] origin-top-left overflow-hidden rounded-14 border border-r-0 border-gray-dark-3 bg-gray-dark-1/50 transition-all [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0))] [transform:rotateX(35deg)_rotateY(7deg)_rotate(-14.337deg)] md:w-[800px] lg:-left-[11%] lg:top-108 lg:h-[800px] lg:w-[1200px] xl:w-[1300px] 2xl:-left-[20%] 2xl:w-[1452px]">
            <BlurFade delay={calculateDelay(6)}>
              <picture>
                <source
                  srcSet={settings.landingPage.hero.imageMobile}
                  media="(max-width: 600px)"
                />
                <img
                  src={settings.landingPage.hero.imageDesktop}
                  alt="Fleek dashboard"
                  width="100%"
                  height="100%"
                />
              </picture>
            </BlurFade>
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-400 bg-gradient-to-l from-black via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </header>
  );
};
