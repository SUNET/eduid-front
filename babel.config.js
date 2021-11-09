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
      "react-intl",
      {
        messagesDir: "./src/login/translation",
        enforceDescriptions: false,
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
