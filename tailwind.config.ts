import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.6rem",
      },
      boxShadow: {
        smdark:
          "rgba(0, 0, 0, 0.12) 0px 2px 4px 0px, rgba(0, 0, 0, 0.32) 0px 2px 16px 0px;",
      },
      colors: {
        primary: "#025464",
        secondary: "#1C6758",
        light: "#DDE6ED",
        dark: "#0f0d26",
        accent: "#FFD95A",
      },
      screens: {
        "3xsmall": "320px",
        "2xsmall": "400px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
    },
  },
  plugins: [],
} satisfies Config;
