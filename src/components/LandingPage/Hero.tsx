import settings from '@base/settings.json';
import { Announcement } from '../Announcement';
import { Button } from '../Button';
import { Text } from './Text';
import { BlurFade } from './BlurFade';
import {
  IoHeartOutline,
  IoLaptopOutline,
  IoShirtOutline,
  IoAirplaneOutline,
  IoHappyOutline,
  IoHeadsetOutline,
  IoPawOutline,
} from 'react-icons/io5';
import { ChatToAIAgentDeploy } from '@components/ChatToAIAgentDeploy';
import type { IconType } from 'react-icons/lib';
import { cn } from '@utils/cn';

const calculateDelay = (factor: number) => 0.25 * factor;

type Template = {
  name: string;
  icon: IconType;
  iconClass?: string;
};

const templates: Template[] = [
  {
    name: 'Tech Reviewer',
    icon: IoLaptopOutline,
    iconClass: 'text-[#768293]',
  },
  {
    name: 'Fashion Stylist',
    icon: IoShirtOutline,
    iconClass: 'text-[#D98F66]',
  },
  {
    name: 'Travel Guide',
    icon: IoAirplaneOutline,
    iconClass: 'text-[#8A75AD]',
  },
  {
    name: 'Comedian',
    icon: IoHappyOutline,
    iconClass: 'text-[#C4A06B]',
  },
  {
    name: 'Pet Enthusiast',
    icon: IoPawOutline,
    iconClass: 'text-[#759E9A]',
  },
  {
    name: 'Musician',
    icon: IoHeadsetOutline,
    iconClass: 'text-[#6E927D]',
  },
  {
    name: 'Relationship Coach',
    icon: IoHeartOutline,
    iconClass: 'text-[#C07DA5]',
  },
];

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
                  <h1 className="text-52 font-medium leading-none text-neutral-12">
                    {settings.landingPage.hero.h1}
                  </h1>
                </BlurFade>
                <BlurFade delay={calculateDelay(2)}>
                  <Text
                    variant="description"
                    as="h2"
                    className="font-inter font-normal"
                  >
                    {settings.landingPage.hero.h2}
                  </Text>
                </BlurFade>
              </div>
            </div>
            <BlurFade delay={calculateDelay(3)}>
              <ChatToAIAgentDeploy />
            </BlurFade>
          </div>
          <BlurFade delay={calculateDelay(4)}>
            <div className="mx-auto flex max-w-[600px] flex-wrap justify-center gap-12">
              {templates.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Button
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    variant="secondary-ghost"
                    size="sm"
                    className="shrink-0 gap-8"
                  >
                    <Icon className={cn('size-16', item.iconClass)} />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </BlurFade>
        </div>
      </div>
    </header>
  );
};
