export const CHOOSE_EXTRA_SECURITY_PHONE = "CHOOSE_EXTRA_SECURITY_PHONE"
export const CHOOSE_EXTRA_SECURITY_TOKEN = "CHOOSE_EXTRA_SECURITY_TOKEN"
export const CHOOSE_EXTRA_SECURITY_NONE = "CHOOSE_EXTRA_SECURITY_NONE"

export const POST_EXTRASEC_PHONE_SUCCESS = "POST_RESET_PASSWORD_RESET_EXTRA_SECURITY_PHONE_SUCCESS";
export const POST_EXTRASEC_PHONE_FAIL = "POST_RESET_PASSWORD_RESET_EXTRA_SECURITY_PHONE_FAIL";


// The user chooses to reset the password with extra security provided by a verified phone number.
// This will trigger the postExtrasecWithSMSCode saga, that will indicate the backend to send an SMS with
// a security code to the chosen phone number.
export function chooseExtraSecurityPhone(index) {
  return {
    type: CHOOSE_EXTRA_SECURITY_PHONE,
    payload: {
      index: index
    }
  };
}

// This indicated that the backend has been unable to send the SMS.
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

// The user chooses to reset the password with extra security provided by a fido token.
export function chooseExtraSecurityToken(desc) {
  return {
    type: CHOOSE_EXTRA_SECURITY_TOKEN,
    payload: {
      desc: desc
    }
  };
}

// The user chooses to reset the password with no extra security.
export function chooseExtraSecurityNone() {
  return {
    type: CHOOSE_EXTRA_SECURITY_NONE,
  };
}
