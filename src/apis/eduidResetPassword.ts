/*
 * Code and data structures for talking to the eduid-reset-password backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginAppDispatch, LoginRootState } from "login-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/

export interface RequestEmailLinkRequest {
  email: string;
}

export interface RequestEmailLinkResponse {
  email: string;
  email_code_timeout: number; // How many seconds the link in the e-mail is valid. Currently unused in frontend.
  throttled_seconds: number;
  throttled_max: number;
}

/**
 * @public
 * @function requestEmailLink
 * @desc Redux async thunk to request a reset password link to be sent to an email address.
 */
export const requestEmailLink = createAsyncThunk<
  RequestEmailLinkResponse, // return type
  RequestEmailLinkRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/requestEmailLink", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeResetPasswordRequest<RequestEmailLinkResponse>(thunkAPI, "", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface VerifyCodeRequest {
  email_code: string;
}

export interface VerifyCodeResponse {
  suggested_password: string;
  email_code: string;
  email_address: string;
  extra_security: ExtraSecurityAlternatives;
  success: boolean;
  zxcvbn_terms: string[];
}

export interface ExtraSecurityAlternatives {
  external_mfa?: boolean;
  phone_numbers?: ExtraSecurityPhoneWithIndex[];
  tokens?: ExtraSecurityTokens;
}

export interface ExtraSecurityPhoneWithIndex {
  number: string;
  index: number;
}

export interface ExtraSecurityTokens {
  webauthn_options?: string;
}

// interfaces used in tests, actual thunk not implemented yet

/*********************************************************************************************************************/

export interface NewPasswordRequest {
  email_code: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewPasswordResponse {}

// interfaces used in tests, actual thunk not implemented yet

/*********************************************************************************************************************/
async function makeResetPasswordRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.reset_password_url) {
    throw new Error("Missing configuration reset_password_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.reset_password_url, endpoint, body, data);
}
