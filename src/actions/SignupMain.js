export const GET_CODE_STATUS = "GET_CODE_STATUS";
export const GET_CODE_STATUS_FAIL = "GET_CODE_STATUS_FAIL";
export const APP_LOADED = "APP_LOADED";
export const APP_LOADING = "APP_LOADING";
export const APP_FETCHING = "APP_FETCHING";

export const GET_SIGNUP_CONFIG = "GET_SIGNUP_CONFIG";
export const GET_SIGNUP_CONFIG_SUCCESS = "GET_JSCONFIG_SIGNUP_CONFIG_SUCCESS";
export const GET_SIGNUP_CONFIG_FAIL = "GET_SIGNUP_CONFIG_FAIL";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";
export const SPIN = "SPIN";

export function spin() {
  return {
    type: SPIN
  };
}

export function getCodeStatus(code) {
  return {
    type: GET_CODE_STATUS,
    payload: {
      code: code
    }
  };
}

export function getCodeStatusFail(err) {
  return {
    type: GET_CODE_STATUS_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

export function appLoading() {
  return {
    type: APP_LOADING
  };
}

export function appFetching() {
  return {
    type: APP_FETCHING
  };
}

export function getSignupConfig() {
  return {
    type: GET_SIGNUP_CONFIG
  };
}

export function getSignupConfigFail(err) {
  return {
    type: GET_SIGNUP_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function newCsrfToken(token) {
  return {
    type: NEW_CSRF_TOKEN,
    payload: {
      csrf_token: token
    }
  };
}
