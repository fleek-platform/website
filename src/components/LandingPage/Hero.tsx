import settings from '@base/settings.json';
import { Announcement } from '../Announcement';
import { Button } from '../Button';
import { Text } from './Text';
import { BlurFade } from './BlurFade';
import { IoMdArrowForward } from 'react-icons/io';
import { ChatToAIAgentDeploy } from '@components/ChatToAIAgentDeploy';

const calculateDelay = (factor: number) => 0.25 * factor;

const personagenEndpoint = import.meta.env.PUBLIC_GENERATE_ENDPOINT;
const agentsAppUrl = import.meta.env.PUBLIC_UI_AGENTS_APP_URL;

export const Hero = () => {
  return (
    <header className="relative mx-auto w-full max-w-[1048px] px-24 pt-42 sm:pt-80">
      <div className="flex flex-col justify-center pt-64 text-center">
        <div className="flex flex-col gap-48">
          <div className="flex flex-col gap-36">
            <div className="flex flex-col gap-24">
              {settings.site.announcementMarquee.visible && (
                <BlurFade
                  delay={calculateDelay(0)}
                  className="w-fit max-w-full self-center"
                >
                  <Announcement variant="content" />
                </BlurFade>
              )}
              <div className="flex max-w-800 flex-col gap-24 self-center pt-12">
                <BlurFade delay={calculateDelay(1)}>
                  <h1 className="font-sans text-52 font-semibold leading-none text-neutral-12">
                    {settings.landingPage.hero.h1}
                  </h1>
                </BlurFade>
                <BlurFade delay={calculateDelay(2)}>
                  <Text variant="description" as="h2">
                    {settings.landingPage.hero.h2}
                  </Text>
                </BlurFade>
              </div>
            </div>
            <BlurFade delay={calculateDelay(3)}>
              <CreateAgentTextarea />
            </BlurFade>
          </div>
          <BlurFade delay={calculateDelay(4)}>
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
          </BlurFade>
        </div>
      </div>
    </header>
  );
};

export const CreateAgentTextarea = () => {
  return (
    <>
      <ChatToAIAgentDeploy
        personagenEndpoint={personagenEndpoint}
        agentsAppUrl={agentsAppUrl}
      />  
    </>
  );
};
