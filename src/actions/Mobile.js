export const GET_MOBILES_SUCCESS = "GET_PHONE_ALL_SUCCESS";
export const POST_MOBILE = "POST_MOBILE";
export const POST_MOBILE_SUCCESS = "POST_PHONE_NEW_SUCCESS";
export const POST_MOBILE_FAIL = "POST_PHONE_NEW_FAIL";
export const START_CONFIRMATION = "START_PHONE_CONFIRMATION";
export const STOP_CONFIRMATION = "STOP_PHONE_CONFIRMATION";
export const START_RESEND_MOBILE_CODE = "START_RESEND_MOBILE_CODE";
export const START_RESEND_MOBILE_CODE_SUCCESS =
  "POST_PHONE_RESEND_CODE_SUCCESS";
export const START_RESEND_MOBILE_CODE_FAIL = "START_RESEND_MOBILE_CODE_FAIL";
export const START_VERIFY = "START_VERIFY_PHONE";
export const POST_PHONE_VERIFY_SUCCESS = "POST_PHONE_VERIFY_SUCCESS";
export const POST_PHONE_VERIFY_FAIL = "POST_PHONE_VERIFY_FAIL";
export const POST_MOBILE_REMOVE = "POST_MOBILE_REMOVE";
export const POST_PHONE_REMOVE_SUCCESS = "POST_PHONE_REMOVE_SUCCESS";
export const POST_MOBILE_REMOVE_FAIL = "POST_PHONE_REMOVE_FAIL";
export const POST_MOBILE_PRIMARY = "POST_MOBILE_PRIMARY";
export const POST_MOBILE_PRIMARY_SUCCESS = "POST_PHONE_PRIMARY_SUCCESS";
export const POST_MOBILE_PRIMARY_FAIL = "POST_PHONE_PRIMARY_FAIL";

export function postMobile() {
  return {
    type: POST_MOBILE
  };
}

export function postMobileFail(err) {
  return {
    type: POST_MOBILE_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

export function stopConfirmation() {
  return {
    type: STOP_CONFIRMATION
  };
}

export function startConfirmation(data) {
  return {
    type: START_CONFIRMATION,
    payload: data
  };
}
export function startResendMobileCode() {
  return {
    type: START_RESEND_MOBILE_CODE
  };
}

export function resendMobileCodeFail(err) {
  return {
    type: START_RESEND_MOBILE_CODE_FAIL,
    error: true,
    payload: {
      message: err
    }
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
    type: POST_PHONE_VERIFY_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

export function startRemove(data) {
  return {
    type: POST_MOBILE_REMOVE,
    payload: data
  };
}

export function startRemoveFail(err) {
  return {
    type: POST_MOBILE_REMOVE_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

export function makePrimary(data) {
  return {
    type: POST_MOBILE_PRIMARY,
    payload: data
  };
}

export function makePrimaryFail(err) {
  return {
    type: POST_MOBILE_PRIMARY_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
