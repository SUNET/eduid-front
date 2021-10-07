import { createAction } from "@reduxjs/toolkit";

export const resetPasswordSagaFail = createAction("RESET_PASSWORD_SAGA_FAIL", function prepare(err) {
  return {
    error: true,
    payload: {
      message: err.toString(),
      info: err
    },
 };
});

// Action connected to postResetPasswordSaga. Will post the email address to the /(reset-password) endpoint.
export const requestEmailLink = createAction("requestEmailLink");

export const saveLinkCode = createAction("saveLinkCode");

// Action for reloading page to get users reset password data
export const useLinkCode = createAction("useLinkCode");

// Action connected to postExtraSecurityPhonSaga. Will post the phone code the user request to the extra-security-phone/ endpoint.
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

// Action connected to postSetNewPasswordSaga. Will post the new password to the new-password/ endpoint.  
export const setNewPassword = createAction("setNewPassword");

// Action connected to postSetNewPasswordSecurityPhoneSaga. Will post the new password to the extra-security-phone/ endpoint.   
export const setNewPasswordExtraSecurityPhone = createAction("setNewPasswordExtraSecurityPhone");

// Action connected to postSetNewPasswordSecurityTokenSaga. Will post the new password to the new-password-extra-security-token/ endpoint.  
export const setNewPasswordExtraSecurityToken = createAction("setNewPasswordExtraSecurityToken");

// Action connected to postSetNewPasswordExtraSecurityExternalMfaSaga. Will post the new password to the new-password-extra-security-external-mfa/ endpoint.  
export const setNewPasswordExtraSecurityExternalMfa = createAction("setNewPasswordExtraSecurityExternalMfa");