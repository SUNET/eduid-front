import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// CreateSlice function will return an object with actions and reducer
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import {
  ExtraSecurityAlternatives,
  GetResetPasswordState,
  RequestEmailLinkResponse,
  resetPasswordApi,
} from "apis/eduidResetPassword";
import { CaptchaRequest } from "apis/eduidSignup";
import { ApiResponse } from "apis/helpers/types";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";

export type Phone = { index: string; number: string; phone_code: string };

export type EmailStatus = "requested" | "success" | "failed";
export interface ResetPasswordState {
  email_address?: string;
  email_code?: string;
  phone: { index?: number; number?: string; phone_code?: string };
  webauthn_assertion?: AuthenticationResponseJSON;
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
  next_page?: string;
  reset_pw_status?: GetResetPasswordState;
}

// Define the initial state using that type
export const initialState: ResetPasswordState = {
  phone: { index: undefined, number: undefined, phone_code: undefined },
  suggested: true,
  captcha_completed: false,
};

// Read the backend message key off a rejected RTK Query action, so screens can be selected by it.
function rejectedApiMessage(action: unknown): string | undefined {
  const payload = (action as { payload?: ApiResponse<{ message?: string }> }).payload;
  return payload?.payload?.message;
}

// The post-verification endpoints now require a session that completed /verify-email/. Both of
// these messages mean the code step has to be done again in this browser.
function codeEntryOrUnchanged(message: string | undefined, next_page: string | undefined): string | undefined {
  if (message === "resetpw.email-not-validated" || message === "resetpw.invalid_session") {
    return "RESET_PW_ENTER_CODE";
  }
  return next_page;
}

// Everything the screens after the code step render from - extra_security, email_code and
// suggested_password - is only put in this slice by verifyEmailLink. Redux is in-memory only, so
// after a reload HandleExtraSecurities and SetNewPassword have nothing to render and both return
// null: a blank page the user can not get out of. Send them back to code entry instead, which
// repopulates all three by re-verifying. /verify-email/ accepts a code for a state that has
// already completed verification, so this costs the user one code entry, not a new email.
function extraSecuritiesOrCodeEntry(state: ResetPasswordState): string {
  return state.extra_security !== undefined ? "HANDLE_EXTRA_SECURITIES" : "RESET_PW_ENTER_CODE";
}

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
    resetState: () => {
      return initialState;
    },
    useSuggestedPassword: (state, action: PayloadAction<boolean>) => {
      state.suggested = action.payload;
    },
    setCaptchaResponse: (state, action: PayloadAction<CaptchaRequest>) => {
      state.captcha = action.payload;
    },
    setNextPage: (state, action: PayloadAction<string>) => {
      state.next_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(navigatorCredentialsApi.endpoints.performAuthentication.matchFulfilled, (state, action) => {
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
      .addMatcher(resetPasswordApi.endpoints.getResetPasswordState.matchFulfilled, (state, action) => {
        const backendState = action.payload.payload.state;
        state.captcha_completed = backendState.captcha?.completed;
        state.reset_pw_status = backendState;
        if (backendState.email?.address || state.email_address) {
          if (backendState.email?.completed) {
            // The emailed code is already verified in this session - don't send another email.
            state.next_page = extraSecuritiesOrCodeEntry(state);
          } else if (backendState.captcha?.completed) {
            state.next_page = "PROCESS_CAPTCHA";
          } else {
            state.next_page = "RESET_PW_CAPTCHA";
          }
        }
      })
      .addMatcher(resetPasswordApi.endpoints.getResetPasswordState.matchRejected, (state, action) => {
        if (rejectedApiMessage(action) === "resetpw.invalid_session") {
          // This browser holds a session that can not be used - the code step has to be redone.
          state.next_page = "RESET_PW_ENTER_CODE";
        } else {
          // Any other failure - HTTP 500, a dropped connection, resetpw.state-not-found - leaves
          // this browser knowing nothing about the reset, so the same guard applies.
          state.next_page = extraSecuritiesOrCodeEntry(state);
        }
      })
      .addMatcher(resetPasswordApi.endpoints.requestEmailLink.matchRejected, (state, action) => {
        state.email_status = "failed";
        if (rejectedApiMessage(action) === "resetpw.email-code-too-many-tries") {
          state.next_page = "RESET_PW_LOCKED";
        }
      })
      .addMatcher(resetPasswordApi.endpoints.verifyEmailLink.matchRejected, (state, action) => {
        const message = rejectedApiMessage(action);
        if (message === "resetpw.email-code-too-many-tries") {
          // The reset state is locked until the code expires. Requesting a new code returns the
          // same message, so there is nothing for the user to retry.
          state.next_page = "RESET_PW_LOCKED";
        } else if (message === "resetpw.email-address-required") {
          // This browser holds no identity hint, so the code has to be sent with an address.
          state.next_page = "RESET_PW_ENTER_CODE";
        }
      })
      .addMatcher(resetPasswordApi.endpoints.verifyEmailLink.matchFulfilled, (state, action) => {
        state.email_address = action.payload.payload.email_address;
        state.extra_security = action.payload.payload.extra_security;
        state.suggested_password = action.payload.payload.suggested_password;
        state.email_code = action.payload.payload.email_code;
      })
      .addMatcher(resetPasswordApi.endpoints.postSetNewPassword.matchRejected, (state, action) => {
        state.next_page = codeEntryOrUnchanged(rejectedApiMessage(action), state.next_page);
      })
      .addMatcher(resetPasswordApi.endpoints.postSetNewPasswordExtraSecurityToken.matchRejected, (state, action) => {
        state.next_page = codeEntryOrUnchanged(rejectedApiMessage(action), state.next_page);
      })
      .addMatcher(resetPasswordApi.endpoints.postSetNewPasswordExternalMfa.matchRejected, (state, action) => {
        state.next_page = codeEntryOrUnchanged(rejectedApiMessage(action), state.next_page);
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
          (action.payload as ApiResponse<{ message: string }>).payload?.message === "resetpw.captcha-already-completed"
        ) {
          state.captcha_completed = true;
        }
      })
      .addMatcher(eidasApi.endpoints.eidasGetStatus.matchFulfilled, (state, action) => {
        state.swedishEID_status = action.payload.payload.status;
        state.next_page = "SET_NEW_PASSWORD";
        state.selected_option = "recoveryOption";
      })
      .addMatcher(bankIDApi.endpoints.bankIDGetStatus.matchFulfilled, (state, action) => {
        state.swedishEID_status = action.payload.payload.status;
        state.next_page = "SET_NEW_PASSWORD";
        state.selected_option = "recoveryOption";
      })
      .addMatcher(frejaeIDApi.endpoints.frejaeIDGetStatus.matchFulfilled, (state, action) => {
        state.swedishEID_status = action.payload.payload.status;
        state.next_page = "SET_NEW_PASSWORD";
        state.selected_option = "recoveryOption";
      });
  },
});

export default resetPasswordSlice;
