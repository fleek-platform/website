import settings from '@base/settings.json';
import { FaChevronRight } from 'react-icons/fa6';
import { Announcement } from '../Announcement';
import { Button } from '../Button';
import { Target } from '@components/Link';
import { Text } from './Text';
import { BlurFade } from './BlurFade';
import { useAuthStore } from '@fleek-platform/login-button';
import { IoMdArrowForward } from 'react-icons/io';

const calculateDelay = (factor: number) => 0.25 * factor;

export const Hero = () => {
  const { isLoggedIn, triggerLoginModal } = useAuthStore();

  const onDeployAgentCTA = () => {
    if (!isLoggedIn) {
      typeof triggerLoginModal === 'function' &&
      triggerLoginModal(true);

      return;
    }

    window.location.href = import.meta.env.PUBLIC_UI_AGENTS_APP_URL;
  }
  
  return (
    <header className="relative mx-auto w-full max-w-[1048px] px-24">
      <div className="pointer-events-none absolute -left-320 -top-1/2 -z-1 h-800 w-800 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.85),transparent)] sm:-left-304 sm:-top-240 sm:h-400" />
      <div className="flex flex-col justify-center pt-64 text-center">
        <div className="flex flex-col gap-48">
          <div className="flex flex-col gap-36">
            <div className="flex flex-col gap-24 self-center">
              {settings.site.announcementMarquee.visible && (
                <BlurFade
                  delay={calculateDelay(0)}
                  className="w-fit max-w-full self-center"
                >
                  <Announcement variant="content" />
                </BlurFade>
              )}
              <div className="flex max-w-800 flex-col gap-24 pt-12">
                <BlurFade delay={calculateDelay(1)}>
                  <Text as="h1">{settings.landingPage.hero.h1}</Text>
                </BlurFade>
                <BlurFade delay={calculateDelay(2)}>
                  <Text variant="description" as="h2">
                    {settings.landingPage.hero.h2}
                  </Text>
                </BlurFade>
              </div>
            </div>
            <BlurFade delay={calculateDelay(3)}>
              <textarea
                className="h-[168px] w-full max-w-[700px] resize-none self-center rounded-8 border border-neutral-6 bg-neutral-2 p-12 text-14 placeholder:text-neutral-8"
                placeholder="What do you want your AI agent to do?"
              />
            </BlurFade>
          </div>
          <div className="mx-auto flex max-w-[600px] flex-wrap justify-center gap-12">
            {Array.from({ length: 7 }).map((item, index) => (
              <Button
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                variant="secondary-ghost"
                size="sm"
                className="shrink-0 rounded-full"
              >
                Data Detective
                <IoMdArrowForward className="size-16" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
