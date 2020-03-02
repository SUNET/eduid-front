export const CHOOSE_EXTRA_SECURITY_PHONE = "CHOOSE_EXTRA_SECURITY_PHONE"
export const CHOOSE_EXTRA_SECURITY_TOKEN = "CHOOSE_EXTRA_SECURITY_TOKEN"
export const CHOOSE_EXTRA_SECURITY_NONE = "CHOOSE_EXTRA_SECURITY_NONE"

export const POST_EXTRASEC_PHONE_SUCCESS = "POST_RESET_PASSWORD_RESET_EXTRA_SECURITY_PHONE_SUCCESS";
export const POST_EXTRASEC_PHONE_FAIL = "POST_RESET_PASSWORD_RESET_EXTRA_SECURITY_PHONE_FAIL";


export function chooseExtraSecurityPhone(index) {
  return {
    type: CHOOSE_EXTRA_SECURITY_PHONE,
    payload: {
      index: index
    }
  };
}

export function extrasecWithSMSCodeFail(err) {
  return {
    type: POST_EXTRASEC_PHONE_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}

export function chooseExtraSecurityToken(desc) {
  return {
    type: CHOOSE_EXTRA_SECURITY_TOKEN,
    payload: {
      desc: desc
    }
  };
}

export function chooseExtraSecurityNone() {
  return {
    type: CHOOSE_EXTRA_SECURITY_NONE,
  };
}
