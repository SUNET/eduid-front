import { messages } from "translation/messages";

/* This hard-coded list of languages is needed to offer the user the choice of switching to any
 * of these languages.
 *
 * TypeScript this as const _available_languages = AVAILABLE_LANGUAGES as { [key: string]: string }
 * */
export const AVAILABLE_LANGUAGES: { [key: string]: string } = {
  en: "English",
  sv: "Svenska",
};

export const LOCALIZED_MESSAGES = messages as unknown as { [key: string]: { [key: string]: string } };

export const EDUID_CONFIG_URL = "/services/jsconfig/config";

// login
export const EDUID_COOKIE_NAME = "sessid";
