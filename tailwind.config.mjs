import tailwindCustomConfig from './.tailwind/tailwind.custom.config';
import tailwindPluginTypography from './.tailwind/tailwind.plugin.typography';

export default {
  mode: 'jit',
	presets: [tailwindCustomConfig],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'container': 'calc(50vh + 6rem)',
      },
      fontFamily: {
        sans: ["AtypDisplay"],
        "plex-sans": ["IBM Plex Sans"],
        "plex-mono": ["IBM Plex Mono"],
        // System Fonts as used by GitHub
        system: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-white":
          "radial-gradient(175.06% 72.56% at 7.67% 30.36%, #D6D6D6 0%, #FFF 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "fleek-gradient":
          "linear-gradient(144deg, #121212 0%, rgba(24, 24, 24, 0.50) 100%)",
        "button-gradient":
          "linear-gradient(173deg, #2B2B2B 10.21%, #000 96.21%)",
        "card-border-gradient":
          "linear-gradient(180deg, rgba(75,75,75,0.7987788865546218) 0%, rgba(75,75,75,0.2049413515406162) 100%)",
        "brand-rainbow":
          "linear-gradient(315deg, #FFE702 7.28%, #FF3DCF 33.33%, #14BCDF 66.15%, #49F0A1 85.42%, #49E34B 100%)",
        "footer-gradient":
          "linear-gradient(135deg, rgba(23, 23, 23, 0.40) 0%, rgba(23, 23, 23, 0.30) 100%)",
        "gradient-grey":
          "linear-gradient(180deg, rgba(75, 75, 75, 0.8) 0%, rgba(75, 75, 75, 0.2) 100%)",
      },
      spacing: {
        "80vh": "80vh",
      },
      colors: {
        title: "#F1F1F1",
        bodytype: "#B6B6B6",
        yellow: "#FFE629",
        red: "#E80000",
        "black-transparent": "rgba(204, 204, 204, 0.04)",
        "ui-fleek-black": "#151718",
        "glass": "rgb(75, 75, 75, 0.8)",
        "ui-light-grey": "#14120B",
        "ui-mid-grey": "#3A3A3A",
        "ui-dark-grey": "#4B4B4B",
        "ui-black": "#121212",
        "ui-white": "#f1f1f1",
        "ui-status-operational": "#0F0",
        "ui-mid-black":"#CCCCCC0A",
        "ui-mid-white":"#313538",
        "ui-faded-black": "#1F1F1F",
        "ui-green": "#113123",
        "ui-faded-green": "#4CC38A",
        "ui-light-green": "#133929",
        "ui-faded-gray": "#ECEDEE",

        "gray-dark-1": "#111111",
        "gray-dark-2": "#191919",
        "gray-dark-3": "#222222",
        "gray-dark-4": "#2A2A2A",
        "gray-dark-5": "#313131",
        "gray-dark-6": "#3A3A3A",
        "gray-dark-7": "#484848",
        "gray-dark-8": "#606060",
        "gray-dark-9": "#606060",
        "gray-dark-10": "#7B7B7B",
        "gray-dark-11": "#B4B4B4",
        "gray-dark-12": "#EEEEEE",
        "gray-dark-13": "#9BA1A6",

        "yellow-dark-1": "#14120B",
        "yellow-dark-2": "#1B180F",
        "yellow-dark-3": "#2D2305",
        "yellow-dark-4": "#362B00",
        "yellow-dark-5": "#433500",
        "yellow-dark-6": "#524202",
        "yellow-dark-7": "#665417",
        "yellow-dark-8": "#836A21",
        "yellow-dark-9": "#FFE629",
        "yellow-dark-10": "#FFFF57",
        "yellow-dark-11": "#F5E147",
        "yellow-dark-12": "#F6EEB4",
      },
      animation: {
        float: "float 5s cubic-bezier(0.5,50,0.6,-50) infinite",
        'reverse-spin': 'reverse-spin 1s linear infinite'
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0.5px)" },
        },
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
      },
    },
  },
  plugins: [tailwindPluginTypography],
}
