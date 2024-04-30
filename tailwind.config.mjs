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
        yellow: "#FFEC43",
        "black-transparent": "rgba(204, 204, 204, 0.04)",
        "ui-fleek-black": "#151718",
        "glass": "rgb(75, 75, 75, 0.8)",
        "ui-light-grey": "#CCCCCC",
        "ui-mid-grey": "#8c8c8c",
        "ui-dark-grey": "#4B4B4B",
        "ui-black": "#1b1b1b",
        "ui-white": "#f1f1f1",
        "ui-status-operational": "#0F0",
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
