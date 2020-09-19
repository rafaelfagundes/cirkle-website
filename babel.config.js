module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = [];

  if (process.env.NODE_ENV === "production") {
    presets.push("next/babel");
    plugins.push([
      "styled-components",
      { ssr: true, displayName: false, minify: true },
    ]);
  } else if (process.env.NODE_ENV === "development") {
    presets.push("next/babel");
    plugins.push([
      "styled-components",
      { ssr: true, displayName: true, minify: true },
    ]);
  } else {
    presets.push("next/babel");
    plugins.push([
      "styled-components",
      { ssr: true, displayName: true, minify: false },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
