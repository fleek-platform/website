import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { shuffle } from 'lodash-es';
import { Text } from './Text';
import { Badge } from './Badge';
import { IoExtensionPuzzle } from 'react-icons/io5';

const integrations = [
  '/images/integrations/apple.png',
  '/images/integrations/discord.png',
  '/images/integrations/reddit.png',
  '/images/integrations/x.png',
  '/images/integrations/twitch.png',
  '/images/integrations/facebook.png',
  '/images/integrations/slack.png',
  '/images/integrations/telegram.png',
  '/images/integrations/instagram.png',
  '/images/integrations/tiktok.png',
  '/images/integrations/snapchat.png',
  '/images/integrations/whatsapp.png',
  '/images/integrations/wechat.png',
];
const shuffled1 = shuffle(integrations);

export const Integrations = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftScroll = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <div className="mx-auto flex flex-col items-center py-48 text-center sm:py-[75px]">
      <Badge>
        <span>🎛</span> Integrations
      </Badge>
      <Text className="max-w-[600px] pt-24 font-plex-sans text-[38px] font-normal">
        Let your social influencer hang out everywhere humans do
      </Text>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        Whether your agent is a virtual influencer or a personal assistant, use
        custom integrations and MCP support to boost their effectiveness.
      </p>

      <div
        ref={ref}
        className="relative mt-48 w-full max-w-[1200px] overflow-hidden"
      >
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-r from-neutral-1 to-transparent md:block" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-l from-neutral-1 to-transparent md:block" />

        <motion.div style={{ x: leftScroll }} className="flex gap-24">
          {shuffled1.map((item) => (
            <img
              key={item}
              src={item}
              alt=""
              className="size-[82px] shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
