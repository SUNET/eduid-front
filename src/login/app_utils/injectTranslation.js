import initStore from "../app_init/initStore";
import { updateIntl } from "react-intl-redux";

// i18n
const injectTranslation = () => {
  // check if we have translation for preferred browser language
  const selectedBrowserLanguage = navigator.language;
  const translatedLanguages = AVAILABLE_LANGUAGES.map((lang) => lang[0]);
  const isTranslatedLanguage = translatedLanguages.includes(
    selectedBrowserLanguage
  );
  // check if we have translation for preferred browser language
  const browserLocale = isTranslatedLanguage ? selectedBrowserLanguage : "en";
  // sets the < html lang=""> to the interface language
  document.documentElement.lang = browserLocale;
  // set translation locale based on preferred browser lang
  // pass on only the translation of that locale
  initStore.dispatch(
    updateIntl({
      locale: browserLocale,
      messages: LOCALIZED_MESSAGES[browserLocale],
    })
  );
};

export default injectTranslation;
