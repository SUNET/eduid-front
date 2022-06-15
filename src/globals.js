import { messages } from "login/translation/messages";

/* This hard-coded list of languages is needed to offer the user the choice of switching to any
 * of these languages.
 *
 * TypeScript this as const _available_languages = AVAILABLE_LANGUAGES as { [key: string]: string }
 * */
export const AVAILABLE_LANGUAGES = {
  en: "English",
  sv: "Svenska",
};

export const LOCALIZED_MESSAGES = messages;

export const SIGNUP_CONFIG_URL = "/services/jsconfig/signup/config";
export const SIGNUP_BASE_PATH = "/register";
export const SIGNUP_SERVICE_URL = "/services/signup/";

export const DASHBOARD_CONFIG_URL = "/services/jsconfig/config";

export const ERRORS_CONFIG_URL = "/services/jsconfig/errors/config";

export const TOKEN_SERVICE_URL = "/services/authn/login";

// login
export const EDUID_COOKIE_NAME = "sessid";
export const LOGIN_CONFIG_URL = "/services/jsconfig/login/config";
export const PASSWORD_SERVICE_URL = "/services/reset-password";
//export const GROUP_MGMT_URL = "/services/group-management"
