export const APP_LOADED = "APP_LOADED";
// export const APP_FETCHING = "APP_FETCHING"
export const GET_ACTIONS_CONFIG = "GET_ACTIONS_CONFIG";
export const GET_ACTIONS_CONFIG_SUCCESS = "GET_ACTIONS_CONFIG_SUCCESS";
export const GET_ACTIONS_CONFIG_FAIL = "GET_ACTIONS_CONFIG_FAIL";
export const POST_ACTIONS_ACTION = "POST_ACTIONS_ACTION";
export const POST_ACTIONS_ACTION_SUCCESS = "POST_ACTIONS_POST_ACTION_SUCCESS";
export const POST_ACTIONS_ACTION_FAIL = "POST_ACTIONS_POST_ACTION_FAIL";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";
export const REDIRECT = "REDIRECT";
export const RETRY = "RETRY";


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

export function getConfig() {
  return {
    type: GET_ACTIONS_CONFIG
  };
}

export function getConfigSuccess(config) {
  return {
    type: GET_ACTIONS_CONFIG_SUCCESS,
    error: false,
    payload: {
      ...config
    }
  };
}

export function getConfigFail(err) {
  return {
    type: GET_ACTIONS_CONFIG_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

export function postAction() {
  return {
    type: POST_ACTIONS_ACTION
  };
}

export function postActionFail(err) {
  return {
    type: POST_ACTIONS_ACTION_FAIL,
    error: true,
    payload: {
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

export function redirect(path) {
  return {
    type: REDIRECT,
    payload: {
      path: path
    }
  };
}

export function retry() {
  return {
    type: RETRY
  };
}
