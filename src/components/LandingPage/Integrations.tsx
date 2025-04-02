import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { shuffle } from 'lodash-es';

const integrations = [
  '/images/integrations/apple.png',
  '/images/integrations/discord.png',
  '/images/integrations/gmail.png',
  '/images/integrations/reddit.png',
  '/images/integrations/x.png',
  '/images/integrations/linear.png',
  '/images/integrations/notion.png',
  '/images/integrations/twitch.png',
  '/images/integrations/facebook.png',
  '/images/integrations/hubspot.png',
  '/images/integrations/airbnb.png',
  '/images/integrations/paypal.png',
  '/images/integrations/slack.png',
  '/images/integrations/telegram.png',
  '/images/integrations/solana.png',
  '/images/integrations/intercom.png',
  '/images/integrations/dropbox.png',
];
const shuffled1 = shuffle(integrations);
const shuffled2 = shuffle(integrations);

export const Integrations = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftScroll = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rightScroll = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="mx-auto flex flex-col items-center py-100 text-center">
      <p className="max-w-[600px] font-sans text-36 font-semibold text-neutral-12">
        Integrate with the
        <br />
        <span className="text-yellow">tools you use every day</span>
      </p>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        Whatever your agent's workflow looks like—whether it's for work or just
        personal stuff—we've got the integrations to help make it happen.
      </p>

      <div
        ref={ref}
        className="relative mt-56 w-full max-w-[1200px] overflow-hidden"
      >
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-r from-black to-transparent md:block" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-l from-black to-transparent md:block" />

        <motion.div style={{ x: leftScroll }} className="mt-56 flex gap-24">
          {shuffled1.map((item) => (
            <img key={item} src={item} alt="" className="size-60 shrink-0" />
          ))}
        </motion.div>

        <motion.div style={{ x: rightScroll }} className="mt-24 flex gap-24">
          {shuffled2.map((item) => (
            <img key={item} src={item} alt="" className="size-60 shrink-0" />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
