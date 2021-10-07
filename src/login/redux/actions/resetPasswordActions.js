import { createAction } from "@reduxjs/toolkit";

export const postEmailLink = createAction("POST_RESET_PASSWORD");

export const postEmailLinkFail = createAction("POST_RESET_PASSWORD_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const saveLinkCode = createAction('SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE', function prepare(code) {
  return {
    payload: {
      email_code: code
    }
  };
});

export const useLinkCode = createAction("POST_RESET_PASSWORD_VERIFY_EMAIL");

export const postLinkCodeFail = createAction("POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const requestPhoneCode = createAction("POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE", function prepare(phone) {
  return {
    payload: {
      phone: {
        index: phone.index,
        number: phone.number
      }
    }
  };
});

export const requestPhoneCodeFail = createAction("POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const savePhoneCode = createAction("SAVE_PHONE_CODE", function prepare(code) {
  return {
    payload: {
        phone_code: code
      }
  };
});

export const selectExtraSecurity = createAction("SELECT_EXTRA_SECURITY_OPTION", function prepare(option) {
  return {
    payload: {
        selected_option: option
      }
  };
});

export const storeNewPassword = createAction("STORE_RESET_PASSWORD_NEW_PASSWORD", function prepare(newPassword) {
  return {
    payload: {
      new_password: newPassword
      }
  };
});

export const setNewPassword = createAction("POST_RESET_PASSWORD_NEW_PASSWORD");

export const setNewPasswordFail = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const setNewPasswordExtraSecurityPhone = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE");

export const setNewPasswordExtraSecurityPhoneFail = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const setNewPasswordExtraSecurityToken = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN");

export const setNewPasswordExtraSecurityTokenFail = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});

export const setNewPasswordExtraSecurityExternalMfa = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA");

export const setNewPasswordExtraSecurityExternalMfaFail = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString()
    },
 };
});
