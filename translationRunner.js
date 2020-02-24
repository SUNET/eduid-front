const manageTranslations = require("react-intl-translations-manager").default;

// manageTranslations({
//   messagesDirectory: "i18n/src",
//   translationsDirectory: "i18n/l10n",
//   languages: ["en", "sv"] // any language you need
// });

// manageTranslations({
//   messagesDirectory: "./src/login/translation/translations",
// //this goes to the right place...but is empty
//   translationsDirectory: "./src/login/translation/languages",
//   languages: ["en", "sv"] // any language you need
// });

manageTranslations({
  messagesDirectory: "./src/login/translation",
  translationsDirectory: "./src/login/translation/languages",
  languages: [ "en", "sv"] // any language you need
});
