import plugin from "tailwindcss/plugin";

// define typography here so intellisense completion works
export default plugin(({ addComponents }) => {
 addComponents({
    ".typo-h1": {
      "@apply font-sans text-[12rem] font-medium leading-[100%]":
        {},
    },
    ".typo-h2": {
      "@apply font-sans text-[9rem] font-medium leading-[100%]":
        {},
    },
    ".typo-h4": {
      "@apply font-sans text-[6.1rem] font-medium leading-[100%]": {},
    },
    ".typo-h5": {
      "@apply font-sans text-39 font-medium leading-[100%]": {},
    },
    ".typo-l": {
      "@apply font-plex-sans text-20 leading-[150%]": {},
    },
    ".typo-xl": {
      "@apply font-plex-sans text-25 font-normal leading-[150%]": {},
    },
    ".typo-xl-bold": {
      "@apply font-plex-sans text-25 font-bold leading-[150%]": {},
    },
    ".typo-m": {
      "@apply font-plex-sans text-16 leading-[150%]": {},
    },
    ".typo-m-normal": {
      "@apply font-plex-sans text-16 font-normal leading-[150%] text-gray-dark-12": {},
    },
    ".typo-m-strong": {
      "@apply font-plex-sans text-16 font-medium leading-[150%]": {},
    },
    ".typo-s": {
      "@apply font-plex-sans text-13 font-normal leading-[150%]": {},
    },
    ".typo-caption-l": {
      "@apply font-plex-sans text-20 font-medium uppercase leading-[150%] tracking-[0.4rem]":
        {},
    },
    ".typo-caption-m": {
      "@apply font-plex-sans text-16 font-medium uppercase leading-[150%] tracking-[0.32rem]":
        {},
    },
    ".typo-caption-s": {
      "@apply font-plex-sans text-13 font-medium uppercase leading-[150%] tracking-[0.256rem]":
        {},
    },
    ".typo-caption-s-normal": {
      "@apply font-plex-sans text-15 leading-[150%] tracking-[0.256rem]":
        {},
    },
    ".typo-caption-xs": {
      "@apply font-plex-sans text-10 font-normal uppercase leading-[150%] tracking-[0.02725rem]":
        {},
    },
    ".typo-caption-text": {
      "@apply font-plex-sans text-13 font-medium leading-[150%]": {},
    },
    ".typo-nav-m": {
      "@apply font-plex-sans text-16 uppercase leading-[150%] tracking-[0.064rem]":
        {},
    },
    ".typo-btn-action": {
      "@apply font-plex-sans text-16 font-medium uppercase leading-[150%] tracking-[0.09rem]":
        {},
    },
    ".typo-btn-cap": {
      "@apply font-plex-sans text-16 font-normal leading-[150%] tracking-[0.0rem]":
        {},
    },
    ".typo-btn-xs": {
      "@apply font-plex-sans text-13 font-normal uppercase leading-[150%] tracking-[0.032rem]":
        {},
    },
    ".typo-btn-xxs": {
      "@apply font-plex-sans text-13 font-thin leading-[150%] tracking-[0.032rem]":
        {},
    },
    ".typo-btn-s": {
      "@apply font-plex-sans text-13 font-normal uppercase leading-[150%] tracking-[0.096rem]":
        {},
    },
    ".typo-btn-s-normal": {
      "@apply font-plex-sans text-13 font-normal leading-[150%] tracking-[0.096rem]":
        {},
    },
    ".typo-btn-l": {
      "@apply font-plex-sans text-16 font-medium uppercase leading-[150%] tracking-[0.192rem]":
        {},
    },
    ".typo-btn-l-mid": {
      "@apply font-plex-sans text-16 font-medium leading-[150%] tracking-[0.192rem]":
        {},
    },
 });
});
