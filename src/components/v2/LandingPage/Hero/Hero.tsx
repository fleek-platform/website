import settings from '@base/settings.json';
import { FaChevronRight } from 'react-icons/fa6';
import { Announcement } from '../../Announcement/Announcement';
import { Button } from '../../Button/Button';
import { Target } from '@components/Link';
import { BlurFade } from '../../BlurFade/BlurFade';

export const Hero = () => {
  const calculateDelay = (factor: number) => 0.25 * factor;

  return (
    <header className="relative">
      <div className="pointer-events-none absolute -left-1/2 -top-1/2 -z-1 h-400 w-400 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.85),transparent)] sm:-left-304 sm:-top-240 sm:w-800"></div>
      <section className="flex flex-col justify-center gap-24 pt-64">
        <BlurFade delay={calculateDelay(0)} className="w-fit">
          <Announcement variant="content" />
        </BlurFade>
        <section className="flex max-w-800 flex-col gap-24">
          <BlurFade delay={calculateDelay(1)}>
            <h1 className="text-balance font-sans text-36 font-semibold leading-tight -tracking-2 text-gray-dark-12 sm:text-52">
              {settings.landingPage.hero.h1}
            </h1>
          </BlurFade>
          <BlurFade delay={calculateDelay(2)}>
            <h2 className="text-balance font-plex-sans text-18 font-medium text-gray-dark-11">
              {settings.landingPage.hero.h2}
            </h2>
          </BlurFade>
          <div className="flex items-center gap-12">
            <BlurFade delay={calculateDelay(3)}>
              <Button
                href="https://app.fleek.xyz"
                rel="noopener noreferrer"
                target={Target.Blank}
              >
                {settings.landingPage.hero.primaryCta}
              </Button>
            </BlurFade>
            <BlurFade delay={calculateDelay(3.5)}>
              <Button variant="ghost" href="/docs">
                {settings.landingPage.hero.secondaryCta}
                <FaChevronRight className="size-12" />
              </Button>
            </BlurFade>
          </div>
        </section>
        <div className="relative h-[520px] lg:h-[720px]">
          <BlurFade delay={calculateDelay(6.5)}>
            <div className="pointer-events-none absolute -top-152 left-[12%] h-496 w-608 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.85),transparent)]"></div>
          </BlurFade>
          <div className="absolute inset-0 -left-[4%] top-60 h-608 w-[1000px] origin-top-left overflow-hidden rounded-14 border border-r-0 border-gray-dark-3 bg-gray-dark-1/50 transition-all [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0))] [transform:rotateX(35deg)_rotateY(7deg)_rotate(-14.337deg)] lg:-left-[11%] lg:top-108 lg:h-[800px] lg:w-[1200px] xl:w-[1300px] 2xl:-left-[20%] 2xl:w-[1452px]">
            <BlurFade delay={calculateDelay(6)}>
              <img
                src={settings.landingPage.hero.image}
                alt="Fleek hero image"
              />
            </BlurFade>
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-400 bg-gradient-to-l from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>
    </header>
  );
};
