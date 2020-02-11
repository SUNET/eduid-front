export const ADD_EMAIL = "ADD_EMAIL";
export const VALIDATE = "VALIDATE";

export const POST_EMAIL = "POST_EMAIL";
export const POST_EMAIL_SUCCESS = "POST_EMAIL_SUCCESS";
export const POST_EMAIL_FAIL = "POST_EMAIL_FAIL";
// export const ACCEPT_TOU = "ACCEPT_TOU";

export function addEmail(email) {
  return {
    type: ADD_EMAIL,
    payload: {
      email: email
    }
  };
}

export function validate() {
  return {
    type: VALIDATE,
    payload: {
      valid: true
    }
  };
}

export function saveEmailFail(err) {
  return {
    type: POST_EMAIL_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
