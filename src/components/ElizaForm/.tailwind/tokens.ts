import tailwindAnimate from 'tailwindcss-animate';

const elzColors = {
  'elz-white': '#FFF',
  'elz-black': '#000',

  'elz-neutral-1': '#111111',
  'elz-neutral-2': '#191919',
  'elz-neutral-3': '#222222',
  'elz-neutral-4': '#2A2A2A',
  'elz-neutral-5': '#313131',
  'elz-neutral-6': '#3a3a3a',
  'elz-neutral-7': '#484848',
  'elz-neutral-8': '#606060',
  'elz-neutral-11': '#B4B4B4',
  'elz-neutral-12': '#EEE',

  'elz-danger-8': '#B54548',
  'elz-danger-11': '#FF9592',
};

const elzFontFamily = {
  'elz-sans': ['AtypDisplay'],
  'elz-plex-sans': ['IBM Plex Sans'],
  'elz-plex-mono': ['IBM Plex Mono'],
};

const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
};

export { elzColors, elzFontFamily, tailwindAnimate };
