import { createSlice } from "@reduxjs/toolkit";
// CreateSlice function will return an object with actions and reducer
import * as getWebauthnActions from "../actions/getWebauthnAssertionActions";

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
    resetPasswordSagaFail: (state, action) => {
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
      state.phone_code = action.payload;
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
    [getWebauthnActions.GET_WEBAUTHN_ASSERTION]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [getWebauthnActions.GET_WEBAUTHN_ASSERTION_FAIL]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    storeNewPassword: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    successVerifyEmail: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setNewPassword: (state, action) => ({}),
    setNewPasswordExtraSecurityPhone: (state, action) => ({}),
    setNewPasswordExtraSecurityToken: (state, action) => ({}),
    setNewPasswordExtraSecurityExternalMfa: (state, action) => ({}),
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
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
