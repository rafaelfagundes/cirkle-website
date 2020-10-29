/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
      config.plugins.push(new DuplicatePackageCheckerPlugin());
    }
    return config;
  },
});

module.exports = process.env.NODE_ENV === "development" ? DEV : PROD;
