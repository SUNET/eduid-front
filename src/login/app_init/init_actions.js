export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";
export const GET_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const POST_EMAIL = "POST_EMAIL";
export const POST_EMAIL_FAIL = "POST_EMAIL_FAIL";
export const POST_RESET_PASSWORD_RESET_CONFIG_FAIL = "POST_RESET_PASSWORD_RESET_CONFIG_FAIL";
export const GET_JSCONFIG_LOGIN_CONFIG_FAIL= "GET_JSCONFIG_LOGIN_CONFIG_FAIL";
export const POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS = "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS";
export const GET_JSCONFIG_LOGIN_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";

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

// resetting the password, after sending the emailed code
export function postEmial(email) {
  return {
    type: POST_EMAIL,
    payload: {
      email: email
    }
  };
}

export function postEmailFail(err) {
  return {
    type: POST_EMAIL_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}
