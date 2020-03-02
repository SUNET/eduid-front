
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


// Send the chosen password (either the suggested one or a custom one) to the central store
export function passwordToReset(newPassword) {
  return {
    type: PASSWORD_TO_RESET,
    payload: {
      new_password: newPassword,
    }
  }
}

// show the modal that asks the user for the SMS'd code
export function askForSMSCode() {
  return {
    type: ASK_FOR_SMS_CODE,
  }
}

// Trigger the saga to send the password reset request to the backend - with no extra security.
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

// Trigger the saga to send the password reset request to the backend
// with extra security provided by a phone number.
export function doResetPasswordSMS(code) {
  return {
    type: DO_RESET_PASSWORD_SMS,
    payload: {
      sms_code: code,
    }
  }
}

// Some problem has prevented resetting the password, after trying with
// extra security by phone.
export function resetPasswordSMSFail(err) {
  return {
    type: DO_RESET_PASSWORD_SMS_FAIL,
    error: err,
    payload: {
      message: err.toString(),
    }
  }
}

// hide the modal asking for the SMS'ed verification code
export function stopResetPasswordSMS() {
  return {
    type: STOP_RESET_PASSWORD_SMS,
  }
}

// there was some problem verifying a fido token.
export function mfaProblem(msg) {
  return {
    type: MFA_PROBLEM,
    error: msg,
    payload: {
      message: msg,
    },
  }
}

// retry verification opf a fido token.
export function retry() {
  return {
    type: RETRY
  }
}

// The user has provided fido credentials, to be checked against her stored credentials.
export function credentialsGot(assertion) {
  return {
    type: WEBAUTHN_CREDS_GOT,
    payload: assertion
  }
}

// Some problem ocurred server side trying to reset a password,
// after choosing extra security with a fido token.
export function resetPasswordTokenFail(err) {
  return {
    type: DO_RESET_PASSWORD_TOKEN_FAIL,
    error: err,
    payload: {
      message: err.toString(),
    }
  }
}

// Trigger asking the user for proof of a fido token,
// prior to making a request to the backend to reset the password.
export function askForTokenAndReset() {
  return {
    type: ASK_FOR_TOKEN_AND_RESET
  }
}
