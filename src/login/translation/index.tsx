import { formattedMessages } from "./messageIndex";
import { AVAILABLE_LANGUAGES } from "globals";
import { Dispatch } from "redux";
import { updateIntl } from "reducers/Internationalisation";
import { messages as untypedMessages } from "login/translation/messages";

const messages = untypedMessages as unknown as { [key: string]: { [key: string]: string } };

export const UNKNOWN_MESSAGE = "UNKNOWN MESSAGE ID";

export const translate = (messageId: string): JSX.Element | string => {
  // TODO: type casting, remove once messageIndex is typescript'd
  const formatted = formattedMessages as unknown as { [key: string]: JSX.Element };

  if (formatted[messageId] !== undefined) {
    // return blob with a props object containing the id and defaultMessage (actual message string)
    return formatted[messageId];
  }
  return `${UNKNOWN_MESSAGE} (${messageId})`;
};

/**
 * Get the language from the browser and initialise locale with the best match
 * @param dispatch The current apps dispatch
 */
export function setupLanguage(dispatch: Dispatch) {
  const language = navigator.languages ? navigator.languages[0] : navigator.language;
  const supported = AVAILABLE_LANGUAGES.map((lang) => lang[0]);

  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    if (messages[lang_code]) {
      dispatch(
        updateIntl({
          locale: lang_code,
          messages: messages[lang_code],
        })
      );
    }
  }
}
