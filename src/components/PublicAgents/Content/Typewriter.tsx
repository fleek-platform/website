import { animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Loading } from './Loading';
import { sleep } from '../sleep';

export const Typewriter: React.FC<{ text: string }> = ({ text }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (hasLoaded) return;

    const startTyping = async () => {
      await sleep(2000);
      setHasLoaded(true);
    };

    startTyping();
  }, [hasLoaded]);

  useEffect(() => {
    if (!ref.current || !text || !hasLoaded) return;

    const nodes = Array.from(ref.current.children) as HTMLElement[];
    nodes.forEach((char, i) => {
      animate(char, { opacity: [0, 1] }, { delay: i * 0.009, duration: 0.2 });
    });
  }, [text, hasLoaded]);

  const splitGraphemes = (text: string): string[] => {
    if ('Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return text.split('');
  };

  if (!hasLoaded) return <Loading />;

  return (
    <p
      className="whitespace-pre-wrap font-medium leading-16 text-neutral-12"
      ref={ref}
    >
      {splitGraphemes(text).map((char, i) => (
        <span
          key={`${i}: ${char}`}
          style={{
            opacity: 0,
            display: 'inline-block',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  );
};
