export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export const GET_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";

// POST_EMAIL_LINK_CODE: posts the code at the end of the email link to the backend > if successful, recieves config to load the reset password flow in the app again
export const POST_EMAIL_LINK_CODE = "POST_EMAIL_LINK_CODE";

// FROM BACKEND:
// consequences of FAIL are defined here (in _actions)
export const FROM_BACKEND_EMAIL_LINK_FAIL =
  "POST_RESET_PASSWORD_RESET_CONFIG_FAIL";
export const GET_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";
// consequences of SUCESS is defined in _reducer
export const FROM_BACKEND_EMAIL_LINK_SUCCESS =
  "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS";
export const GET_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";

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
    type: GET_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

// resetting the password, after sending the emailed code
export function useLinkCode(code) {
  return {
    type: POST_EMAIL_LINK_CODE,
    payload: {
      code: code
    }
  };
}

export function postLinkCodeFail(err) {
  return {
    type: FROM_BACKEND_EMAIL_LINK_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}
