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

export const useLinkCode = createAction("useLinkCode");

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

export const savePhoneCode = createAction("savePhoneCode", function prepare(code) {
  return {
    payload: {
      phone: {
        phone_code: code
      }
    }
  };
});

export const selectExtraSecurity = createAction("selectExtraSecurity");

export const storeNewPassword = createAction("storeNewPassword", function prepare(newPassword) {
  return {
    payload: {
      new_password: newPassword
    }
  };
});

export const setNewPassword = createAction("setNewPassword");

export const setNewPasswordExtraSecurityPhone = createAction("setNewPasswordExtraSecurityPhone");

export const setNewPasswordExtraSecurityToken = createAction("setNewPasswordExtraSecurityToken");

export const setNewPasswordExtraSecurityExternalMfa = createAction("setNewPasswordExtraSecurityExternalMfa");