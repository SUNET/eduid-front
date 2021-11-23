const manageTranslations = require("react-intl-translations-manager").default;

manageTranslations({
  messagesDirectory: "./src/login/translation",
  translationsDirectory: "./src/login/translation/languages",
  languages: ["en", "sv"], // any language you need
  jsonOptions: {
    trailingNewline: true,
  },
});
