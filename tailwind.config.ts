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
        primary: "#3D8361",
        secondary: "#1C6758",
        light: "#EEF2E6",
        dark: "#0f0d26",
        accent: "#646FD4",
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
