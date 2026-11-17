// In tests an imported SVG is its own file name (for example "security-key-gray.svg"), unlike the other static files,
// which are all the same stub, so that a test can tell which icon a component used.
module.exports = {
  process(_sourceText, sourcePath) {
    const fileName = sourcePath.replace(/^.*[\\/]/, "");
    return { code: `module.exports = ${JSON.stringify(fileName)};` };
  },
};
