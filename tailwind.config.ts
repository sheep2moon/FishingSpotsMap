import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.zinc[50],
          dark: colors.zinc[900],
          ...colors.zinc,
        },
        secondary: {
          DEFAULT: colors.teal[600],
          ...colors.teal,
        },
        info: {
          DEFAULT: colors.sky[500],
          dark: colors.sky[800],
          ...colors.sky,
        },
        danger: {
          DEFAULT: colors.rose[500],
          ...colors.rose,
        },
        accent: {
          DEFAULT: colors.amber[400],
          ...colors.amber,
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        dosis: ["Dosis", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
