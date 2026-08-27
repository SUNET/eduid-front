// react-router v8 is ESM-only and its SSR modules reference `import.meta.hot`,
// which is invalid once babel-jest transpiles to CJS for Jest. This tiny plugin
// rewrites any `import.meta` to an empty object (so `import.meta.hot` is just
// `undefined`). Applied under test only; the webpack build handles it natively.
function neutralizeImportMeta({ types: t }) {
  return {
    name: "neutralize-import-meta",
    visitor: {
      MetaProperty(path) {
        path.replaceWith(t.objectExpression([]));
      },
    },
  };
}

module.exports = function babelConfig(api) {
  api.cache(false);
  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    ...(process.env.NODE_ENV === "test" ? [neutralizeImportMeta] : []),
  ];

  return {
    presets,
    plugins,
  };
};
