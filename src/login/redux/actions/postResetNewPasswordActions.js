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
