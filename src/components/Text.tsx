import { useRef, createElement } from 'react';
import clsx from 'clsx';

type TextStyle =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'xl'
  | 'l'
  | 'm-strong'
  | 'm'
  | 'm-mid'
  | 's'
  //   | "xs"
  //   | "caption-text-m"
  //   | "caption-text-s"
  | 'caption-l'
  | 'caption-m'
  | 'caption-s'
  | 'caption-xs'
  | 'caption-text'
  | 'btn-action'
  | 'btn-xs'
  | 'btn-s'
  | 'btn-l'
  | 'btn-l-mid'
  | 'nav-m'
  | 'nav-m-mid'
  | 'nav-item';

interface Props {
  as?: keyof HTMLElementTagNameMap;
  style?: TextStyle;
  className?: string;
  glowEffect?: boolean;
}

const textStyles: Record<TextStyle, string> = {
  h1: 'font-sans text-40 font-medium leading-[100%] lg:text-[12rem]',
  h2: 'font-sans text-40 font-medium leading-[100%] lg:text-[9.5rem]',
  h3: 'font-sans text-40 font-medium leading-[100%] lg:text-[7.6rem]',
  h4: 'font-sans text-39 font-medium leading-[100%] lg:text-[6.1rem]',
  h5: 'font-sans text-20 md:text-25 2xl:text-39 font-medium leading-[100%]',
  xl: 'text-16 font-plex-sans font-normal leading-[150%] lg:text-25',
  l: 'text-16 font-plex-sans leading-[150%] lg:text-20',
  m: 'text-13 font-plex-sans leading-[150%] lg:text-16',
  'm-mid': 'text-13 font-plex-sans leading-[150%] lg:text-14 xl:text-16',
  'm-strong': 'font-plex-sans text-16 leading-[150%] font-medium',
  s: 'font-plex-sans text-10 font-medium leading-[150%] lg:text-13 lg:font-normal',
  'caption-l':
    'font-plex-sans text-16 tracking-[0.32rem] font-medium leading-[150%] uppercase lg:tracking-[0.4rem] lg:text-20',
  'caption-m':
    'font-plex-sans text-16 font-medium leading-[150%] tracking-[0.32rem] uppercase',
  'caption-s':
    'font-plex-sans text-13 font-medium leading-[150%] tracking-[0.256rem] uppercase',
  'caption-xs':
    'font-plex-sans text-10 font-normal leading-[150%] tracking-[0.02725rem] uppercase',
  'caption-text':
    'font-plex-sans text-10 font-medium leading-[150%] lg:text-13',
  'nav-m':
    'font-plex-sans text-16 uppercase leading-[150%] tracking-[0.064rem]',
  'nav-m-mid':
    'font-plex-sans text-16 font-normal leading-[150%] tracking-[0.064rem]',
  'nav-item': 'font-plex-sans text-16 leading-[150%] tracking-[0.064rem]',
  'btn-action':
    'font-plex-sans text-16 font-medium leading-[150%] tracking-[0.09rem] uppercase',
  'btn-xs':
    'font-plex-sans text-13 font-normal leading-[150%] tracking-[0.032rem] uppercase',
  'btn-s':
    'font-plex-sans text-13 font-normal leading-[150%] tracking-[0.096rem] uppercase',
  'btn-l':
    'font-plex-sans lg:text-16 font-normal leading-[150%] tracking-[0.0rem]',

  'btn-l-mid':
    'font-plex-sans lg:text-14 font-normal leading-[150%] tracking-[0.0rem]',
};

const Text: React.FC<React.PropsWithChildren<Props>> = ({
  as: tagName = 'div',
  style = 'l',
  className = '',
  children,
  glowEffect = false,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);

  return createElement(
    tagName,
    {
      ref: wrapperRef,
      className: clsx(textStyles[style], className, { relative: glowEffect }),
    },
    children,
  );
};

export default Text;
