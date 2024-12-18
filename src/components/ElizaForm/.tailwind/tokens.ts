import tailwindAnimate from 'tailwindcss-animate';

const elzColors = {
  'elz-white': '#FFF',
  'elz-black': '#000',

  /* Neutral */
  'elz-neutral-0': '#000000',
  'elz-neutral-1': '#111111',
  'elz-neutral-2': '#191919',
  'elz-neutral-3': '#222222',
  'elz-neutral-4': '#2A2A2A',
  'elz-neutral-5': '#313131',
  'elz-neutral-6': '#3A3A3A',
  'elz-neutral-7': '#484848',
  'elz-neutral-8': '#606060',
  'elz-neutral-9': '#6E6E6E',
  'elz-neutral-10': '#7B7B7B',
  'elz-neutral-11': '#B4B4B4',
  'elz-neutral-12': '#EEEEEE',

  /* Accent */
  'elz-accent-1': '#14120B',
  'elz-accent-2': '#1B180F',
  'elz-accent-3': '#2D2305',
  'elz-accent-4': '#362B00',
  'elz-accent-5': '#433500',
  'elz-accent-6': '#524202',
  'elz-accent-7': '#665417',
  'elz-accent-8': '#836A21',
  'elz-accent-9': '#FFE629',
  'elz-accent-10': '#FFFF57',
  'elz-accent-11': '#F5E147',
  'elz-accent-12': '#F6EEB4',

  /* Success */
  'elz-success-1': '#0E1512',
  'elz-success-2': '#121B17',
  'elz-success-3': '#132D21',
  'elz-success-4': '#113B29',
  'elz-success-5': '#174933',
  'elz-success-6': '#20573E',
  'elz-success-7': '#28684A',
  'elz-success-8': '#2F7C57',
  'elz-success-9': '#30A46C',
  'elz-success-10': '#33B074',
  'elz-success-11': '#3DD68C',
  'elz-success-12': '#B1F1CB',

  /* Warning */
  'elz-warning-1': '#16120C',
  'elz-warning-2': '#1D180F',
  'elz-warning-3': '#302008',
  'elz-warning-4': '#3F2700',
  'elz-warning-5': '#4D3000',
  'elz-warning-6': '#5C3D05',
  'elz-warning-7': '#714F19',
  'elz-warning-8': '#8F6424',
  'elz-warning-9': '#FFC53D',
  'elz-warning-10': '#FFD60A',
  'elz-warning-11': '#FFCA16',
  'elz-warning-12': '#FFE7B3',

  /* Danger */
  'elz-danger-1': '#191111',
  'elz-danger-2': '#201314',
  'elz-danger-3': '#3B1219',
  'elz-danger-4': '#500F1C',
  'elz-danger-5': '#611623',
  'elz-danger-6': '#72232D',
  'elz-danger-7': '#8C333A',
  'elz-danger-8': '#B54548',
  'elz-danger-9': '#E5484D',
  'elz-danger-10': '#EC5D5E',
  'elz-danger-11': '#FF9592',
  'elz-danger-12': '#FFD1D9',
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
