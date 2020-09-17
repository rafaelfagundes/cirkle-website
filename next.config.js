// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");

const DEV = {
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/pre_populate.js");
    }

    return config;
  },
};

const PROD = withPWA({
  pwa: {
    dest: "public",
  },
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/pre_populate.js");
    }

    return config;
  },
});

module.exports = process.env.NODE_ENV === "development" ? DEV : PROD;
