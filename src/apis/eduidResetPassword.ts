/*
 * Code and data structures for talking to the eduid-reset-password backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { webauthnAssertion } from "helperFunctions/navigatorCredential";
import { LoginAppDispatch, LoginRootState } from "login-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/

/**
 * @public
 * @function postSetNewPasswordExternalMfa
 * @desc Redux async thunk to set new password with external MFA.
 */
export const postSetNewPasswordExternalMfa = createAsyncThunk<
  NewPasswordResponse, // return type
  NewPasswordRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExternalMfa", async (args, thunkAPI) => {
  const body: KeyValues = {
    email_code: args.email_code,
    password: args.password,
  };
  return makeResetPasswordRequest<NewPasswordResponse>(thunkAPI, "new-password-extra-security-external-mfa", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface NewPasswordExtraSecurityKeyRequest {
  email_code: string;
  password: string;
  webauthn_assertion: webauthnAssertion;
}

/**
 * @public
 * @function postSetNewPasswordExtraSecurityToken
 * @desc Redux async thunk to set new password with extra security key token.
 */
export const postSetNewPasswordExtraSecurityToken = createAsyncThunk<
  NewPasswordResponse, // return type
  NewPasswordExtraSecurityKeyRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExtraSecurityToken", async (args, thunkAPI) => {
  const body: KeyValues = {
    email_code: args.email_code,
    password: args.password,
    ...args.webauthn_assertion,
  };
  return makeResetPasswordRequest<NewPasswordResponse>(thunkAPI, "new-password-extra-security-token", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface NewPasswordExtraSecurityPhoneRequest {
  email_code: string;
  password: string;
  phone_code: string;
}

/**
 * @public
 * @function postSetNewPasswordExtraSecurityPhone
 * @desc Redux async thunk to set new password with extra security phone.
 */
export const postSetNewPasswordExtraSecurityPhone = createAsyncThunk<
  NewPasswordResponse, // return type
  NewPasswordExtraSecurityPhoneRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExtraSecurityPhone", async (args, thunkAPI) => {
  const body: KeyValues = {
    email_code: args.email_code,
    phone_code: args.phone_code,
    password: args.password,
  };
  return makeResetPasswordRequest<NewPasswordResponse>(thunkAPI, "new-password-extra-security-phone", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface RequestPhoneCodeRequest {
  email_code: string;
  phone_index?: number;
}

export interface RequestPhoneCodeResponse {
  message: string;
}

/**
 * @public
 * @function requestPhoneCodeForNewPassword
 * @desc Redux async thunk to request phone code for new password.
 */
export const requestPhoneCodeForNewPassword = createAsyncThunk<
  RequestPhoneCodeResponse, // return type
  RequestPhoneCodeRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/requestPhoneCodeForNewPassword", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    phone_index: args.phone_index,
  };
  return makeResetPasswordRequest<RequestPhoneCodeResponse>(thunkAPI, "extra-security-phone", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function postSetNewPassword
 * @desc Redux async thunk to set new password.
 */
export const postSetNewPassword = createAsyncThunk<
  NewPasswordResponse, // return type
  NewPasswordRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPassword", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    password: args.password,
  };
  return makeResetPasswordRequest<NewPasswordResponse>(thunkAPI, "new-password", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function verifyEmailLink
 * @desc Redux async thunk to verify a reset password link.
 */
export const verifyEmailLink = createAsyncThunk<
  VerifyCodeResponse, // return type
  VerifyCodeRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/verifyEmailLink", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
  };
  return makeResetPasswordRequest<VerifyCodeResponse>(thunkAPI, "verify-email", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

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

  if (!state.config.reset_password_service_url) {
    throw new Error("Missing configuration reset_password_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.reset_password_service_url, endpoint, body, data);
}
