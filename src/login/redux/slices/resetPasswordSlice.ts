import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eidasGetStatus } from "apis/eduidEidas";
import {
  ExtraSecurityAlternatives,
  requestEmailLink,
  RequestEmailLinkResponse,
  verifyEmailLink,
} from "apis/eduidResetPassword";
// CreateSlice function will return an object with actions and reducer
import { performAuthentication, webauthnAssertion } from "../../app_utils/helperFunctions/navigatorCredential";

export type Phone = { index: string; number: string; phone_code: string };

export type EmailStatus = "requested" | "success" | "failed";

interface ResetPasswordState {
  email_address?: string;
  email_code?: string;
  phone: { index?: number; number?: string; phone_code?: string };
  webauthn_assertion?: webauthnAssertion;
  selected_option?: string;
  new_password?: string;
  suggested_password?: string;
  extra_security?: ExtraSecurityAlternatives;
  goto_url?: string;
  email_response?: RequestEmailLinkResponse;
  email_status?: EmailStatus; // status of asking backend to send an email. undefined before asking backend.
  eidas_status?: string;
}

// Define the initial state using that type
export const initialState: ResetPasswordState = {
  phone: { index: undefined, number: undefined, phone_code: undefined },
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    // Store phone_code for API call /new-password-extra-security-phone endpoint.
    savePhoneCode: (state, action: PayloadAction<string>) => {
      state.phone.phone_code = action.payload;
    },
    // Depending on selectedOption, this will call correct action of new password.
    selectExtraSecurity: (state, action: PayloadAction<string>) => {
      state.selected_option = action.payload;
    },
    storeNewPassword: (state, action: PayloadAction<string>) => {
      state.new_password = action.payload;
    },
    setEmailAddress: (state, action: PayloadAction<string | undefined>) => {
      state.email_address = action.payload;
    },
    resetEmailStatus: (state) => {
      state.email_status = undefined;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    initialState: (state) => {
      state.webauthn_assertion = undefined;
      state.selected_option = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performAuthentication.fulfilled, (state, action) => {
        // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
        state.webauthn_assertion = action.payload;
      })
      .addCase(requestEmailLink.pending, (state) => {
        state.email_status = "requested";
        // Make sure the ExpiresMeter props change when resending e-mails. Otherwise the timer doesn't
        // start after the resend request arrives.
        state.email_response = undefined;
      })
      .addCase(requestEmailLink.fulfilled, (state, action) => {
        state.email_status = "success";
        if (!action.payload.throttled_seconds || !action.payload.throttled_max) {
          // remove once new backend that always sends this is deployed to production
          state.email_response = { throttled_seconds: 300, throttled_max: 300, email: "", email_code_timeout: 7200 };
          return;
        }
        state.email_response = action.payload;
      })
      .addCase(requestEmailLink.rejected, (state, action) => {
        state.email_status = "failed";
      })
      .addCase(verifyEmailLink.fulfilled, (state, action) => {
        state.email_address = action.payload.email_address;
        state.extra_security = action.payload.extra_security;
        state.suggested_password = action.payload.suggested_password;
        state.email_code = action.payload.email_code;
      })
      .addCase(eidasGetStatus.fulfilled, (state, action) => {
        state.eidas_status = action.payload.status;
      });
  },
});

export default resetPasswordSlice;
