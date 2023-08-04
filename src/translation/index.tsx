import { Dispatch } from "redux";
import { updateIntl } from "slices/Internationalisation";
import { messages as untypedMessages } from "translation/messages";

const messages = untypedMessages as unknown as { [key: string]: { [key: string]: string } };

export const UNKNOWN_MESSAGE = "UNKNOWN MESSAGE ID";

/**
 * Get the language from the browser and initialise locale with the best match
 * @param dispatch The current apps dispatch
 */
export function setupLanguage(dispatch: Dispatch) {
  const selectedBrowserLanguage: string = navigator.languages ? navigator.languages[0] : navigator.language;
  let lang_code = selectedBrowserLanguage.substring(0, 2); /* selectedBrowserLanguage is e.g. "en-US" */

  /* Check if there are translations for the users' language */
  if (messages[lang_code]) {
    // sets the <html lang=""> to the interface language (the full one, e.g. "en-US" and not "en")
    document.documentElement.lang = selectedBrowserLanguage;
  } else {
    /* Default language */
    lang_code = "en";
    document.documentElement.lang = "en";
  }

  dispatch(
    updateIntl({
      locale: lang_code,
      messages: messages[lang_code],
    })
  );
}
