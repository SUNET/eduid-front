export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";
export const GET_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";

// FROM BACKEND:
// consequences of FAIL are defined here (in _actions)
export const FROM_BACKEND_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";
// consequences of SUCESS is defined in _reducer
export const FROM_BACKEND_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";

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
    type: FROM_BACKEND_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

