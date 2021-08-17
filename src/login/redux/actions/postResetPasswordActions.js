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
export const ADD_EXTRA_SECURITY_PHONE_INFO = "ADD_EXTRA_SECURITY_PHONE_INFO";
export const POST_RESET_PASSWORD_NEW_PASSWORD = "POST_RESET_PASSWORD_NEW_PASSWORD";
export const POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_NEW_PASSWORD_FAIL = "POST_RESET_PASSWORD_NEW_PASSWORD_FAIL";

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

export function selectedPhoneInfo(phone) {
  return {
    type: ADD_EXTRA_SECURITY_PHONE_INFO,
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

export function setNewPassword() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD
  };
}

export function setNewPasswordFail() {
  return {
    type: POST_RESET_PASSWORD_NEW_PASSWORD_FAIL
  };
}