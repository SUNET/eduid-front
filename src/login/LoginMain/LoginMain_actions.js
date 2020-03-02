//export const APP_FETCHING = "APP_FETCHING";
export const APP_LOADED = "APP_LOADED";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export const GET_LOGIN_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const GET_LOGIN_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";
export const GET_LOGIN_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";

export const CODE_FOR_CONFIG = "CODE_FOR_CONFIG";
export const POST_CODE_FAIL = "POST_RESET_PASSWORD_RESET_CONFIG_FAIL";
export const POST_CODE_SUCCESS = "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS";


export function appLoaded() {
  return {
    type: APP_LOADED
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

//export function appFetching() {
  //return {
    //type: APP_FETCHING
  //};
//}

export function getLoginConfig() {
  return {
    type: GET_LOGIN_CONFIG
  };
}

export function getLoginConfigFail(err) {
  return {
    type: GET_LOGIN_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

// resetting the password, the user has already provided an email address
// and has been sent an email with a URL with a code in it. Here we send the code from
// the URL to the centraL store, and also trigger the saga that will fetch
// configuration data for the user corresponding to the code.
export function getConfigFromCode(code) {
  return {
    type: CODE_FOR_CONFIG,
    payload: {
      code: code
    }
  };
}

export function postCodeFail(err) {
  return {
    type: POST_CODE_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}
