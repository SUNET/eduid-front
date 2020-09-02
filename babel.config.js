module.exports = function(api) {
  api.cache(false);
  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    [
      "react-intl",
      {
        messagesDir: "./src/login/translation",
        enforceDescriptions: false,
      },
    ],
    "transform-object-rest-spread",
    "@babel/plugin-transform-flow-strip-types",
    "react-hot-loader/babel",
    "transform-class-properties",
  ];

  return {
    presets,
    plugins
  };
};
