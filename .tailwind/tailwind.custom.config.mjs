import createSpacingPlugin from "./tailwind.plugin.spacing";
import gridPlugin from "./tailwind.plugin.grid";
import safelist from "./tailwind.safelist";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";

export default function (usePx) {
 const { plugin: spacingPlugin } = createSpacingPlugin(usePx);

 const generateSizes = (noUnits) => {
    const max = 128;
    const sizes = {};
    for (let i = 1; i <= max; i++) {
      if (noUnits) {
        sizes[i] = i.toString();
      } else {
        sizes[i] = usePx ? `${i}px` : `${i / 10}rem`;
      }
    }
    return sizes;
 };

 const aspectRatioSizes = () => {
    const max = 32;
    const sizes = {};
    for (let i = 1; i <= max; i++) {
      sizes[i] = i.toString();
    }
    return sizes;
 };

 return {
    safelist,
    theme: {
      container: {
        center: true,
      },
      fontFamily: {
        sans: ["sans-serif"],
        serif: ["serif"],
      },
      aspectRatio: aspectRatioSizes(),
      borderRadius: {
        none: "0",
        full: "9999px",
        ...generateSizes(),
      },
      borderWidth: {
        DEFAULT: usePx ? "1px" : "0.1rem",
        0: "0",
        ...generateSizes(),
      },
      fontSize: {
        ...generateSizes(),
      },
      letterSpacing: {
        ...generateSizes(),
      },
      zIndex: {
        ...generateSizes(true),
      },
      extend: {
        boxShadow: {
          sm: "0px 1px 1px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.12)",
          soft: "0px 1px 1px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.12)",
          dark: "0px 2px 8px 0px rgba(26, 26, 26, 0.25)",
          'glow': '0 0 15px 5px rgba(255, 255, 255, 0.6)',
        },
        lineHeight: generateSizes(),
        keyframes: {
          blur: {
            "0%": { filter: "blur(20px)" },
            "100%": { filter: "blur(0)" },
          },
          rock: {
            "0%": {
              transform: "rotate(-9deg)",
            },
            "50%": {
              transform: "rotate(-8deg)",
            },
            "100%": {
              transform: "rotate(-9deg)",
            },
          },
          'fade-in': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          'fade-in-down': {
            '0%': { transform: 'translateY(2%)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
        animation: {
          "blur-out": "blur 0.6s ease-out",
          "rock": "rock 1.2s infinite",
          'fade-in': 'fade-in 100ms ease-out',
          'fade-in-down': 'fade-in-down 120ms ease-out',
        },
      },
    },
    plugins: [gridPlugin, spacingPlugin, aspectRatioPlugin],
 };
}
