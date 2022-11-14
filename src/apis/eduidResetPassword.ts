/*
 * Code and data structures for talking to the eduid-reset-password backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginAppDispatch, LoginRootState } from "login-init-app";
import { webauthnAssertion } from "login/app_utils/helperFunctions/navigatorCredential";
import { ExtraSecurityType } from "login/redux/slices/resetPasswordSlice";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/

export interface NewPasswordExternalMfaRequest {
  email_code: string;
  password: string;
}

export interface NewPasswordExternalMfaResponse {
  message: string;
}

/**
 * @public
 * @function postSetNewPasswordExternalMfa
 * @desc Redux async thunk to set new password with external MFA.
 */
export const postSetNewPasswordExternalMfa = createAsyncThunk<
  NewPasswordExternalMfaResponse, // return type
  NewPasswordExternalMfaRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExternalMfa", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    password: args.password,
  };
  return makeResetPasswordRequest<NewPasswordExternalMfaResponse>(
    thunkAPI,
    "new-password-extra-security-external-mfa",
    data
  )
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface NewPasswordExtraSecurityKeyRequest {
  email_code: string;
  password: string;
  webauthn_assertion: webauthnAssertion;
}

export interface NewPasswordExtraSecurityKeyResponse {
  message: string;
}

/**
 * @public
 * @function postSetNewPasswordExtraSecurityToken
 * @desc Redux async thunk to set new password with extra security key token.
 */
export const postSetNewPasswordExtraSecurityToken = createAsyncThunk<
  NewPasswordExtraSecurityKeyResponse, // return type
  NewPasswordExtraSecurityKeyRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExtraSecurityToken", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    password: args.password,
    ...args.webauthn_assertion,
  };
  return makeResetPasswordRequest<NewPasswordExtraSecurityKeyResponse>(
    thunkAPI,
    "new-password-extra-security-token",
    data
  )
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface NewPasswordExtraSecurityPhoneRequest {
  email_code: string;
  password: string;
  phone_code: string;
}

export interface NewPasswordExtraSecurityPhoneResponse {
  message: string;
}

/**
 * @public
 * @function postSetNewPasswordExtraSecurityPhone
 * @desc Redux async thunk to set new password with extra security phone.
 */
export const postSetNewPasswordExtraSecurityPhone = createAsyncThunk<
  NewPasswordExtraSecurityPhoneResponse, // return type
  NewPasswordExtraSecurityPhoneRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPasswordExtraSecurityPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    phone_code: args.phone_code,
    password: args.password,
  };
  return makeResetPasswordRequest<NewPasswordExtraSecurityPhoneResponse>(
    thunkAPI,
    "new-password-extra-security-phone",
    data
  )
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface RequestPhoneCodeRequest {
  email_code: string;
  phone_index: number;
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

export interface PostSetNewPasswordRequest {
  email_code: string;
  password: string;
}

export interface PostSetNewPasswordResponse {
  message: string;
}

/**
 * @public
 * @function postSetNewPassword
 * @desc Redux async thunk to set new password.
 */
export const postSetNewPassword = createAsyncThunk<
  PostSetNewPasswordResponse, // return type
  PostSetNewPasswordRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/postSetNewPassword", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
    password: args.password,
  };
  return makeResetPasswordRequest<PostSetNewPasswordResponse>(thunkAPI, "new-password", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface VerifyEmailLinkRequest {
  email_code: string;
}

export interface VerifyEmailLinkResponse {
  email_address: string;
  email_code: string;
  extra_security: ExtraSecurityType;
  suggested_password: string;
}

/**
 * @public
 * @function verifyEmailLink
 * @desc Redux async thunk to verify a reset password link.
 */
export const verifyEmailLink = createAsyncThunk<
  VerifyEmailLinkResponse, // return type
  VerifyEmailLinkRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("resetPassword/verifyEmailLink", async (args, thunkAPI) => {
  const data: KeyValues = {
    email_code: args.email_code,
  };
  return makeResetPasswordRequest<VerifyEmailLinkResponse>(thunkAPI, "verify-email", data)
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

  if (!state.config.reset_password_url) {
    throw new Error("Missing configuration reset_password_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.reset_password_url, endpoint, body, data);
}
