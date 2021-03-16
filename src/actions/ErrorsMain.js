export const APP_LOADED = "APP_LOADED";
export const UPDATE_AVAILABLE_LANGUAGE = "UPDATE_AVAILABLE_LANGUAGE";
export const UPDATE_AVAILABLE_LANGUAGE_FAIL = "UPDATE_AVAILABLE_LANGUAGE_FAIL";

export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

export function updateAvailableLanguage() {
  return {
    type: UPDATE_AVAILABLE_LANGUAGE
  };
}

export function updateAvailableLanguageFail(err) {
  return {
    type: UPDATE_AVAILABLE_LANGUAGE_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

