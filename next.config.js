// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");

const DEV = {
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    SHOW_CHAT: false,
  },
};

const PROD = withPWA({
  pwa: {
    dest: "public",
  },
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    SHOW_CHAT: true,
  },
});

module.exports = process.env.NODE_ENV === "development" ? DEV : PROD;
