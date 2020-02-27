export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export const CODE_FOR_CONFIG = "CODE_FOR_CONFIG";
export const POST_CODE_FAIL = "POST_RESET_PASSWORD_RESET_CONFIG_FAIL";
export const POST_CODE_SUCCESS = "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS";

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

// this action triggers an error (catch(error) in the saga, see init_saga.js)
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

// resetting the password, after sending the emailed code
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