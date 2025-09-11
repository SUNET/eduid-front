import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// CreateSlice function will return an object with actions and reducer
import { ApiResponse } from "apis/common";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { ExtraSecurityAlternatives, RequestEmailLinkResponse, resetPasswordApi } from "apis/eduidResetPassword";
import { CaptchaRequest } from "apis/eduidSignup";
import { performAuthentication } from "../helperFunctions/navigatorCredential";

export type Phone = { index: string; number: string; phone_code: string };

export type EmailStatus = "requested" | "success" | "failed";
export interface ResetPasswordState {
  email_address?: string;
  email_code?: string;
  phone: { index?: number; number?: string; phone_code?: string };
  webauthn_assertion?: PublicKeyCredentialJSON;
  selected_option?: string;
  new_password?: string;
  suggested_password?: string;
  suggested: boolean;
  extra_security?: ExtraSecurityAlternatives;
  goto_url?: string;
  email_response?: RequestEmailLinkResponse;
  email_status?: EmailStatus; // status of asking backend to send an email. undefined before asking backend.
  swedishEID_status?: string;
  captcha?: CaptchaRequest;
  captcha_completed: boolean;
}

// Define the initial state using that type
export const initialState: ResetPasswordState = {
  phone: { index: undefined, number: undefined, phone_code: undefined },
  suggested: true,
  captcha_completed: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
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
    resetState: (state) => {
      state.webauthn_assertion = undefined;
      state.selected_option = undefined;
    },
    useSuggestedPassword: (state, action: PayloadAction<boolean>) => {
      state.suggested = action.payload;
    },
    setCaptchaResponse: (state, action: PayloadAction<CaptchaRequest>) => {
      state.captcha = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performAuthentication.fulfilled, (state, action) => {
        // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
        state.webauthn_assertion = action.payload;
      })
      .addMatcher(resetPasswordApi.endpoints.requestEmailLink.matchPending, (state) => {
        state.email_status = "requested";
        // Make sure the ExpiresMeter props change when resending e-mails. Otherwise the timer doesn't
        // start after the resend request arrives.
        state.email_response = undefined;
      })
      .addMatcher(resetPasswordApi.endpoints.requestEmailLink.matchFulfilled, (state, action) => {
        state.email_status = "success";
        if (!action.payload.payload.throttled_seconds || !action.payload.payload.throttled_max) {
          // remove once new backend that always sends this is deployed to production
          state.email_response = { throttled_seconds: 300, throttled_max: 300, email: "", email_code_timeout: 7200 };
          return;
        }
        state.email_response = action.payload.payload;
      })
      .addMatcher(resetPasswordApi.endpoints.requestEmailLink.matchRejected, (state) => {
        state.email_status = "failed";
      })
      .addMatcher(resetPasswordApi.endpoints.verifyEmailLink.matchFulfilled, (state, action) => {
        state.email_address = action.payload.payload.email_address;
        state.extra_security = action.payload.payload.extra_security;
        state.suggested_password = action.payload.payload.suggested_password;
        state.email_code = action.payload.payload.email_code;
      })
      .addMatcher(resetPasswordApi.endpoints.sendResetPasswordCaptchaResponse.matchFulfilled, (state, action) => {
        state.captcha_completed = action?.payload?.payload.captcha_completed;
        if (state.captcha) {
          state.captcha.internal_response = undefined;
        }
      })
      .addMatcher(resetPasswordApi.endpoints.sendResetPasswordCaptchaResponse.matchRejected, (state) => {
        state.captcha_completed = false;
        if (state.captcha) {
          state.captcha.internal_response = undefined;
        }
      })
      .addMatcher(resetPasswordApi.endpoints.getResetPasswordCaptchaRequest.matchRejected, (state, action) => {
        if (
          (action.payload as ApiResponse<{ message: string }>).payload.message === "resetpw.captcha-already-completed"
        ) {
          state.captcha_completed = true;
        }
      })
      .addMatcher(eidasApi.endpoints.eidasGetStatus.matchFulfilled, (state, action) => {
        state.swedishEID_status = action.payload.payload.status;
      })
      .addMatcher(bankIDApi.endpoints.bankIDGetStatus.matchFulfilled, (state, action) => {
        state.swedishEID_status = action.payload.payload.status;
      });
  },
});

export default resetPasswordSlice;
