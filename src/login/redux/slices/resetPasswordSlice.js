import { createSlice } from "@reduxjs/toolkit";
// CreateSlice function will return an object with actions and reducer

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    email_address: null,
    email_code: null,
    phone: {},
    webauthn_assertion: null,
    selected_option: null,
    new_password: null,
  },
  reducers: {
    // Common action to signal a caught exception in one of the reset password sagas.
    resetPasswordSagaFail: () => ({}),
    // If API call is successfull, save data to store
    resetPasswordSagaSuccess: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // Store phone_code for API call /new-password-extra-security-phone endpoint.
    savePhoneCode: (state, action) => {
      state.phone.phone_code = action.payload;
    },
    // Action connected to postResetPasswordSaga. Will post email_address to the state.config.reset_password_url/ endpoint.
    requestEmailLink: (state, action) => {
      state.email_address = action.payload;
    },
    saveLinkCode: (state, action) => {
      state.email_code = action.payload;
    },
    // Depending on selectedOption, this will call correct action of new password.
    selectExtraSecurity: (state, action) => {
      state.selected_option = action.payload;
    },
    useLinkCode: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // Action connected to postExtraSecurityPhoneSaga. Will post phone.index to the /extra-security-phone endpoint.
    requestPhoneCode: (state, action) => {
      state.phone.index = action.payload.index;
    },
    getWebauthnAssertion: (state, action) => {
      state.webauthn_assertion = action.payload;
    },
    cancelWebauthnAssertion: (state) => {
      state.webauthn_assertion = undefined;
    },
    storeNewPassword: (state, action) => {
      state.new_password = action.payload;
    },
    // Action connected to postSetNewPasswordSaga. Will post stored new_password to the /new-password endpoint.
    setNewPassword: (state, action) => ({ ...state, ...action.payload }),
    // Action connected to postSetNewPasswordExtraSecurityPhoneSaga. Will post stored phone_code, new_password to the /new-password-extra-security-phone endpoint.
    setNewPasswordExtraSecurityPhone: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // Action connected to postSetNewPasswordExtraSecurityPhoneSaga. Will post stored phone_code, new_password to the /new-password-extra-security-phone endpoint.
    setNewPasswordExtraSecurityToken: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // Action connected to postSetNewPasswordExternalMfaSaga. Will post stored phone_code, new_password to the /new-password-extra-security-external-mfa endpoint.
    setNewPasswordExtraSecurityExternalMfa: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  resetPasswordSagaFail,
  resetPasswordSagaSuccess,
  savePhoneCode,
  requestEmailLink,
  saveLinkCode,
  selectExtraSecurity,
  useLinkCode,
  requestPhoneCode,
  storeNewPassword,
  setNewPassword,
  setNewPasswordExtraSecurityPhone,
  setNewPasswordExtraSecurityToken,
  setNewPasswordExtraSecurityExternalMfa,
  getWebauthnAssertion,
  cancelWebauthnAssertion,
} = resetPasswordSlice.actions;

export default resetPasswordSlice;
