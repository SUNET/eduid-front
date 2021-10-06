export const POST_RESET_PASSWORD = "POST_RESET_PASSWORD";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_FAIL = "POST_RESET_PASSWORD_FAIL";
export const SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE = "SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE";
export const POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL";
export const POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS = "POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS";
export const POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE = "POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE";
export const POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL = "POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL";
export const SAVE_PHONE_CODE = "SAVE_PHONE_CODE";
export const SELECT_EXTRA_SECURITY_OPTION = "SELECT_EXTRA_SECURITY_OPTION";
export const POST_RESET_PASSWORD_NEW_PASSWORD = "POST_RESET_PASSWORD_NEW_PASSWORD";
export const POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_NEW_PASSWORD_FAIL = "POST_RESET_PASSWORD_NEW_PASSWORD_FAIL";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE_FAIL = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE_FAIL";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN_FAIL = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN_FAIL";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA";
export const POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA_FAIL = "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA_FAIL";
export const STORE_RESET_PASSWORD_NEW_PASSWORD = "STORE_RESET_PASSWORD_NEW_PASSWORD";

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
      email_code: code
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

export function requestPhoneCode(phone) {
  return {
    type: POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE,
    payload: {
      phone: {
        index: phone.index,
        number: phone.number
      }
    }
  };
}

export function requestPhoneCodeFail(err) {
  return {
    type: POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function savePhoneCode(code) {
  return {
    type: SAVE_PHONE_CODE,
    payload: {
      phone_code: code
    }
  };
}

export function selectExtraSecurity(option) {
  return {
    type: SELECT_EXTRA_SECURITY_OPTION,
    payload: {
      selected_option: option
    }
  };
}

export function storeNewPassword(newPassword) {
  return {
    type: STORE_RESET_PASSWORD_NEW_PASSWORD,
    payload: {
      new_password: newPassword
    }
  };
}

export function setNewPassword() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD
  };
}

export function setNewPasswordFail(err) {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function setNewPasswordExtraSecurityPhone() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE
  };
}

export function setNewPasswordExtraSecurityPhoneFail(err) {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function setNewPasswordExtraSecurityToken() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN
  };
}

export function setNewPasswordExtraSecurityTokenFail(err) {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function setNewPasswordExtraSecurityExternalMfa() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA
  };
}

export function setNewPasswordExtraSecurityExternalMfaFail(err) {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}
