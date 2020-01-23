//export const APP_FETCHING = "APP_FETCHING";
export const APP_LOADED = "APP_LOADED";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export const GET_LOGIN_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const GET_LOGIN_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";
export const GET_LOGIN_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";


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
