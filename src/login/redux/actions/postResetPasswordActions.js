export const POST_RESET_PASSWORD = "POST_RESET_PASSWORD";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_FAIL = "POST_RESET_PASSWORD_FAIL";
export const SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE = "SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE";
export const POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS = "POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS";
export const SAVE_USER_DETAILES = "SAVE_USER_DETAILES";

export function postEmailLink(email) {
  return {
    type: POST_RESET_PASSWORD,
    payload: {
      email_address: email
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

export function saveLinkCode(code) {
  return {
    type: SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE,
    payload: {
      code: code
    }
  };
}

export function useLinkCode() {
  return {
    type: POST_RESET_PASSWORD_VERIFY_EMAIL,
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

export function saveUserDetail() {
  return {
    type: SAVE_USER_DETAILES
   
  };
}

