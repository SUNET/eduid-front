module.exports = function (api) {
  api.cache(false);
  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    [
      "formatjs",
      {
        messagesDir: "./src/login/translation",
        enforceDescriptions: false,
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
        ast: true,
      },
    ],
    "@babel/plugin-transform-flow-strip-types",
    "transform-class-properties",
  ];

  return {
    presets,
    plugins,
  };
};
