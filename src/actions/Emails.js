export const GET_EMAILS_SUCCESS = "GET_EMAIL_ALL_SUCCESS";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const POST_EMAIL = "POST_EMAIL";
export const POST_EMAIL_SUCCESS = "POST_EMAIL_NEW_SUCCESS";
export const POST_EMAIL_FAIL = "POST_EMAIL_NEW_FAIL";
export const START_CONFIRMATION = "START_CONFIRMATION_EMAIL";
export const STOP_CONFIRMATION = "STOP_CONFIRMATION_EMAIL";
export const START_RESEND_EMAIL_CODE = "START_RESEND_EMAIL_CODE";
export const START_RESEND_EMAIL_CODE_SUCCESS = "POST_EMAIL_RESEND_CODE_SUCCESS";
export const START_RESEND_EMAIL_CODE_FAIL = "POST_EMAIL_RESEND_CODE_FAIL";
export const START_VERIFY = "START_VERIFY_EMAIL";
export const START_VERIFY_FAIL = "START_VERIFY_EMAIL_FAIL";
export const POST_EMAIL_VERIFY_SUCCESS = "POST_EMAIL_VERIFY_SUCCESS";
export const POST_EMAIL_VERIFY_FAIL = "POST_EMAIL_VERIFY_FAIL";
export const POST_EMAIL_REMOVE = "POST_EMAIL_REMOVE";
export const POST_EMAIL_REMOVE_SUCCESS = "POST_EMAIL_REMOVE_SUCCESS";
export const POST_EMAIL_REMOVE_FAIL = "POST_EMAIL_REMOVE_FAIL";
export const POST_EMAIL_PRIMARY = "POST_EMAIL_PRIMARY";
export const POST_EMAIL_PRIMARY_SUCCESS = "POST_EMAIL_PRIMARY_SUCCESS";
export const POST_EMAIL_PRIMARY_FAIL = "POST_EMAIL_PRIMARY_FAIL";

export function changeEmail(data) {
  return {
    type: CHANGE_EMAIL,
    payload: data
  };
}

export function postEmail() {
  return {
    type: POST_EMAIL
  };
}

export function postEmailFail(err) {
  return {
    type: POST_EMAIL_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startConfirmation(data) {
  return {
    type: START_CONFIRMATION,
    payload: data
  };
}

export function stopConfirmation() {
  return {
    type: STOP_CONFIRMATION
  };
}

export function startResendEmailCode() {
  return {
    type: START_RESEND_EMAIL_CODE
  };
}

export function resendEmailCodeFail(err) {
  return {
    type: START_RESEND_EMAIL_CODE_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startVerify(data) {
  return {
    type: START_VERIFY,
    payload: data
  };
}

export function startVerifyFail(err) {
  return {
    type: START_VERIFY_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startRemove(data) {
  return {
    type: POST_EMAIL_REMOVE,
    payload: data
  };
}

export function startRemoveFail(err) {
  return {
    type: POST_EMAIL_REMOVE_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function makePrimary(data) {
  return {
    type: POST_EMAIL_PRIMARY,
    payload: data
  };
}

export function makePrimaryFail(err) {
  return {
    type: POST_EMAIL_PRIMARY_FAIL,
    error: true,
    payload: new Error(err)
  };
}
