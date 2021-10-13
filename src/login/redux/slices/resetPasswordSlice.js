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
    resetPasswordSagaFail: () => {
      "RESET_PASSWORD_SAGA_FAIL",
        function prepare(err) {
          return {
            error: true,
            payload: {
              message: err.toString(),
              info: err,
            },
          };
        };
    },

    savePhoneCode: (state, action) => {
      state.phone.phone_code = action.payload;
    },
    requestEmailLink: (state, action) => {
      state.email_address = action.payload;
    },
    saveLinkCode: (state, action) => {
      state.email_code = action.payload;
    },
    selectExtraSecurity: (state, action) => {
      state.selected_option = action.payload;
    },
    useLinkCode: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    requestPhoneCode: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    getWebauthnAssertion: (state, action) => {
      state.webauthn_assertion = action.payload;
    },
    cancelWebauthnAssertion: (state) => {
      state.webauthn_assertion = undefined;
    },
    storeNewPassword: (state, action) => {
      state.new_password = action.payload;
    },

    successVerifyEmail: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setNewPassword: (state, action) => ({ ...state, ...action.payload }),
    setNewPasswordExtraSecurityPhone: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setNewPasswordExtraSecurityToken: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setNewPasswordExtraSecurityExternalMfa: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  resetPasswordSagaFail,
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
  successVerifyEmail,
  getWebauthnAssertion,
  cancelWebauthnAssertion,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
