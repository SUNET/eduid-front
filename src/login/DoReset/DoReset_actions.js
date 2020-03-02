
export const PASSWORD_TO_RESET = "PASSWORD_TO_RESET";
export const ASK_FOR_SMS_CODE = "ASK_FOR_SMS_CODE";
export const DO_RESET_PASSWORD = "DO_RESET_PASSWORD";
export const DO_RESET_PASSWORD_FAIL = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_FAIL";
export const DO_RESET_PASSWORD_SUCESS = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_SUCCESS";
export const DO_RESET_PASSWORD_SMS = "DO_RESET_PASSWORD_SMS";
export const DO_RESET_PASSWORD_SMS_FAIL = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_SECURE_PHONE_FAIL";
export const DO_RESET_PASSWORD_SMS_SUCESS = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_SECURE_PHONE_SUCCESS";
export const STOP_RESET_PASSWORD_SMS = "STOP_RESET_PASSWORD_SMS";
export const MFA_PROBLEM = 'MFA_PROBLEM';
export const CREDENTIALS_GOT = 'CREDENTIALS_GOT';
export const RETRY = 'RETRY';
export const WEBAUTHN_CREDS_GOT = "WEBAUTHN_CREDS_GOT";
export const DO_RESET_PASSWORD_TOKEN_FAIL = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_SECURE_TOKEN_FAIL";
export const DO_RESET_PASSWORD_TOKEN_SUCESS = "POST_RESET_PASSWORD_RESET_NEW_PASSWORD_SECURE_TOKEN_SUCCESS";
export const ASK_FOR_TOKEN_AND_RESET = 'ASK_FOR_TOKEN_AND_RESET';


export function passwordToReset(newPassword) {
  return {
    type: PASSWORD_TO_RESET,
    payload: {
      new_password: newPassword,
    }
  }
}

export function askForSMSCode() {
  return {
    type: ASK_FOR_SMS_CODE,
  }
}

export function doResetPassword() {
  return {
    type: DO_RESET_PASSWORD,
  }
}

export function resetPasswordFail(err) {
  return {
    type: DO_RESET_PASSWORD_FAIL,
    error: err,
    payload: {
      message: err.toString(),
    }
  }
}

export function doResetPasswordSMS(code) {
  return {
    type: DO_RESET_PASSWORD_SMS,
    payload: {
      sms_code: code,
    }
  }
}

export function resetPasswordSMSFail(err) {
  return {
    type: DO_RESET_PASSWORD_SMS_FAIL,
    error: err,
    payload: {
      message: err.toString(),
    }
  }
}

export function stopResetPasswordSMS() {
  return {
    type: STOP_RESET_PASSWORD_SMS,
  }
}

export function mfaProblem(msg) {
  return {
    type: MFA_PROBLEM,
    error: msg,
    payload: {
      message: msg,
    },
  }
}

export function retry() {
  return {
    type: RETRY
  }
}

export function credentialsGot(assertion) {
  return {
    type: WEBAUTHN_CREDS_GOT,
    payload: assertion
  }
}

export function resetPasswordTokenFail(err) {
  return {
    type: DO_RESET_PASSWORD_TOKEN_FAIL,
    error: err,
    payload: {
      message: err.toString(),
    }
  }
}

export function askForTokenAndReset() {
  return {
    type: ASK_FOR_TOKEN_AND_RESET
  }
}
