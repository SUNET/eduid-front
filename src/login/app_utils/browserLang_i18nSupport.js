import initStore from "../app_init/initStore";
import { updateIntl } from "react-intl-redux";

// i18n
const checkTranslationSupport = () => {
  //check browser language
  let browserLanguage = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  // only use the first two characters to get the langugae code
  browserLanguage = browserLanguage.substring(0, 2);

  // get the languages we have provided translations for
  const translatedLanguages = AVAILABLE_LANGUAGES.map(lang => lang[0]);
  // if translation exists for the browser language pass it to the components
  if (translatedLanguages.includes(browserLanguage)) {
    initStore.dispatch(
      updateIntl({
        locale: browserLanguage,
        messages: LOCALIZED_MESSAGES[translatedLanguages]
      })
    );
  }
};

export default checkTranslationSupport;
