export const APP_LOADED = "APP_LOADED";
// export const APP_FETCHING = "APP_FETCHING";
export const GET_SIGNUP_CONFIG = "GET_SIGNUP_CONFIG";
export const GET_SIGNUP_CONFIG_SUCCESS = "GET_JSCONFIG_SIGNUP_CONFIG_SUCCESS";
export const GET_SIGNUP_CONFIG_FAIL = "GET_SIGNUP_CONFIG_FAIL";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";


export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

//export function appFetching() {
  //return {
    //type: APP_FETCHING
  //};
//}

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
