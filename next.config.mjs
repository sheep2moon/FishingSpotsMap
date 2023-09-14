await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["react-leaflet-cluster", "leaflet"],
  images: {
    domains: [
      "fishery-spots.s3.eu-central-1.amazonaws.com",
      "cdn.discordapp.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
