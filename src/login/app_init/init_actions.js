export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";
export const GET_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const GET_JSCONFIG_LOGIN_CONFIG_FAIL= "GET_JSCONFIG_LOGIN_CONFIG_FAIL";

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
export function getConfig() {
  return {
    type: GET_CONFIG
  };
}

// this action triggers an error (catch(error) in the saga, see init_saga.js)
export function getConfigFail(err) {
  return {
    type: GET_JSCONFIG_LOGIN_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

