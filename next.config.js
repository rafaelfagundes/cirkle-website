// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");

// module.exports = {
//   publicRuntimeConfig: {
//     API_ENDPOINT: process.env.API_ENDPOINT,
//   },
// };

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
});
