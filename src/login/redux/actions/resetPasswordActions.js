export const GET_RESET_PASSWORD = "GET_RESET_PASSWORD";
export const GET_RESET_PASSWORD_FAIL = "GET_RESET_PASSWORD_FAIL";
export const POST_RESET_PASSWORD = "POST_RESET_PASSWORD";
export const POST_RESET_PASSWORD_FAIL = "POST_RESET_PASSWORD_FAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL";

export function postResetPassword() {
  return {
    type: POST_RESET_PASSWORD
  };
}

export function getResetPassword() {
  return {
    type: GET_RESET_PASSWORD
  };
}

export function getResetPasswordDataFail(err) {
  return {
    type: GET_RESET_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function postEmail(email) {
  return {
    type: POST_RESET_PASSWORD,
    payload: {
      email: email
    }
  };
}

export function postEmailFail(err) {
  return {
    type: POST_RESET_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}


export function useLinkCode(code) {
  return {
    type: POST_RESET_PASSWORD_VERIFY_EMAIL,
    payload: {
      code: code
    }
  };
}
