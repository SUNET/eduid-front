export const GET_SUGGESTED_PASSWORD = "GET_SUGGESTED_PASSWORD";
export const GET_SUGGESTED_PASSWORD_SUCCESS =
  "GET_SECURITY_SUGGESTED_PASSWORD_SUCCESS";
export const GET_SUGGESTED_PASSWORD_FAIL =
  "GET_SECURITY_SUGGESTED_PASSWORD_FAIL";

export const START_PASSWORD_CHANGE = "START_PASSWORD_CHANGE";
export const POST_PASSWORD_CHANGE = "POST_PASSWORD_CHANGE";
export const POST_SECURITY_CHANGE_PASSWORD_SUCCESS =
  "POST_SECURITY_CHANGE_PASSWORD_SUCCESS";
export const POST_SECURITY_CHANGE_PASSWORD_FAIL =
  "POST_SECURITY_CHANGE_PASSWORD_FAIL";

export const SET_ZXCVBN = "SET_ZXCVBN";

export function getSuggestedPassword() {
  return {
    type: GET_SUGGESTED_PASSWORD,
  };
}

export function getSuggestedPasswordFail(err) {
  return {
    type: GET_SUGGESTED_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function startPasswordChange() {
  return {
    type: START_PASSWORD_CHANGE,
  };
}

export function postPasswordChange(oldPassword, newPassword) {
  return {
    type: POST_PASSWORD_CHANGE,
    payload: {
      old: oldPassword,
      next: newPassword,
    },
  };
}

export function postPasswordChangeFail(err) {
  return {
    type: POST_SECURITY_CHANGE_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function setZxcvbn(module) {
  return {
    type: SET_ZXCVBN,
    payload: {
      module: module,
    },
  };
}
