import { Dispatch } from "redux";
import type { IntlShape } from "react-intl";
import { updateIntl } from "slices/Internationalisation";
import { messages as untypedMessages } from "translation/messages";

const messages = untypedMessages as unknown as { [key: string]: { [key: string]: string } };

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

/**
 * Look up a translated message by a dynamic ID.
 *
 * babel-plugin-formatjs requires the id argument to intl.formatMessage()
 * to be a string literal so it can extract messages at compile time.
 * This helper bypasses the plugin by reading from intl.messages directly.
 */
export function dynamicMessage(intl: IntlShape, id: string): string {
  return String(intl.messages[id] ?? id);
}
