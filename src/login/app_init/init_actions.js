export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export const GET_LOGIN_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const GET_LOGIN_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";
export const GET_LOGIN_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";

// token is needd to access the config
export function newCsrfToken(token) {
  return {
    type: NEW_CSRF_TOKEN,
    payload: {
      csrf_token: token
    }
  };
}

// this action triggers the saga (see login-rootSaga.js)
export function getLoginConfig() {
  return {
    type: GET_LOGIN_CONFIG
  };
}

// this action triggers an error (catch in the saga (see .js)
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
