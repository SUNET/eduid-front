import { createAction } from "@reduxjs/toolkit";

export const resetPasswordSagaFail = createAction("RESET_PASSWORD_SAGA_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString(),
    },
 };
});

export const requestEmailLink = createAction("requestEmailLink");

export const saveLinkCode = createAction("saveLinkCode");

export const useLinkCode = createAction("POST_RESET_PASSWORD_VERIFY_EMAIL");

export const requestPhoneCode = createAction("requestPhoneCode", function prepare(phone) {
  return {
    payload: {
      phone: {
        index: phone.index,
        number: phone.number
      }
    }
  };
});

export const savePhoneCode = createAction("SAVE_PHONE_CODE", function prepare(code) {
  return {
    payload: {
        phone_code: code
      }
  };
});

export const selectExtraSecurity = createAction("SELECT_EXTRA_SECURITY_OPTION");

export const storeNewPassword = createAction("STORE_RESET_PASSWORD_NEW_PASSWORD", function prepare(newPassword) {
  return {
    payload: {
      new_password: newPassword
      }
  };
});

export const setNewPassword = createAction("POST_RESET_PASSWORD_NEW_PASSWORD");

export const setNewPasswordExtraSecurityPhone = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE");

export const setNewPasswordExtraSecurityToken = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN");

export const setNewPasswordExtraSecurityExternalMfa = createAction("POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_EXTERNAL_MFA");