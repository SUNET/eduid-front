import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// CreateSlice function will return an object with actions and reducer
import { performAuthentication, webauthnAssertion } from "../../app_utils/helperFunctions/navigatorCredential";

// Define a type for the slice state
export type ExtraSecurityType = {
  external_mfa: boolean;
  phone_numbers: [];
  tokens: { webauthn_options: string };
};
export type Phone = { index: string; number: string; phone_code: string };

interface ResetPasswordState {
  email_address?: string;
  email_code?: string;
  phone: { index?: number; number?: string; phone_code?: string };
  webauthn_assertion?: webauthnAssertion;
  selected_option?: string;
  new_password?: string;
  suggested_password?: string;
  extra_security?: ExtraSecurityType;
  goto_url?: string;
}

// Define the initial state using that type
export const initialState: ResetPasswordState = {
  email_address: undefined,
  email_code: undefined,
  phone: { index: undefined, number: undefined, phone_code: undefined },
  webauthn_assertion: undefined,
  selected_option: undefined,
  new_password: undefined,
  suggested_password: undefined,
  extra_security: undefined,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    // Store phone_code for API call /new-password-extra-security-phone endpoint.
    savePhoneCode: (state, action: PayloadAction<string>) => {
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
    selectExtraSecurity: (state, action: PayloadAction<string>) => {
      state.selected_option = action.payload;
    },
    // Action connected to postExtraSecurityPhoneSaga. Will post phone.index to the /extra-security-phone endpoint.
    requestPhoneCode: (state, action: PayloadAction<{ index: number; number: string }>) => {
      state.phone.index = action.payload.index;
      state.phone.number = action.payload.number;
    },
    storeNewPassword: (state, action: PayloadAction<string>) => {
      state.new_password = action.payload;
    },
    resetPasswordVerifyEmailSuccess: (
      state,
      action: PayloadAction<{
        email_address: string;
        email_code: string;
        extra_security: ExtraSecurityType;
        suggested_password: string;
      }>
    ) => {
      state.email_address = action.payload.email_address;
      state.email_code = action.payload.email_code;
      state.extra_security = action.payload.extra_security;
      state.suggested_password = action.payload.suggested_password;
    },
    // Common action to signal a caught exception in one of the reset password sagas.
    resetPasswordSagaFail: () => {},
    // Action connected to postVerifySaga.
    useLinkCode: () => {},
    // Action connected to postSetNewPasswordSaga. Will post stored new_password to the /new-password endpoint.
    setNewPassword: () => {},
    // Action connected to postSetNewPasswordExtraSecurityPhoneSaga. Will post stored phone_code, new_password to the /new-password-extra-security-phone endpoint.
    setNewPasswordExtraSecurityPhone: () => {},
    // Action connected to postSetNewPasswordExtraSecurityPhoneSaga. Will post stored phone_code, new_password to the /new-password-extra-security-phone endpoint.
    setNewPasswordExtraSecurityToken: () => {},
    // Action connected to postSetNewPasswordExternalMfaSaga. Will post stored phone_code, new_password to the /new-password-extra-security-external-mfa endpoint.
    setNewPasswordExtraSecurityExternalMfa: () => {},
    setGotoUrl: (state, action: PayloadAction<string | undefined>) => {
      // when sagas have completed and want to direct the user to a new route, they set goto_url.
      state.goto_url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performAuthentication.fulfilled, (state, action) => {
      // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
      state.webauthn_assertion = action.payload;
    });
  },
});

export default resetPasswordSlice;
