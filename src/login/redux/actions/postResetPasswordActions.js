export const POST_RESET_PASSWORD = "POST_RESET_PASSWORD";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_FAIL = "POST_RESET_PASSWORD_FAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL";

export function postEmailLink(email) {
  return {
    type: POST_RESET_PASSWORD,
    payload: {
      email: email
    }
  };
}

export function postEmailLinkFail(err) {
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

export function postLinkCodeFail(err) {
  return {
    type: POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

