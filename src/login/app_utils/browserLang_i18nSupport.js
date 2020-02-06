import { updateIntl } from "react-intl-redux";
// i18n
const checkTranslationSupport = () => {
  // check browser language
  const language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  console.log("this is language:", language);
  console.log("this is navigator.languages:", navigator.language);
  const supported = AVAILABLE_LANGUAGES.map(lang => lang[0]);
  // if browser language has a translation, add it to props
  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    store.dispatch(
      updateIntl({
        locale: lang_code,
        messages: LOCALIZED_MESSAGES[lang_code]
      })
    );
  }
};

export default checkTranslationSupport;
