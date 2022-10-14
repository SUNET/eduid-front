/*
 * Code and data structures for talking to the eduid-signup backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignupAppDispatch, SignupRootState } from "../signup-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

// export for use in tests
export const SIGNUP_SERVICE_URL = "/services/signup";

export interface SignupStatusResponse {
  email: {
    completed: boolean;
    address?: string;
    expires_time_left?: number;
    expires_time_max?: number;
    sent_at?: string;
    throttle_time_left?: number;
    throttle_time_max?: number;
  };
  invite: {
    user?: { given_name?: string; surname?: string; email?: string };
    code?: string;
    completed: boolean;
    finish_url?: string;
    initiated_signup: boolean;
    is_logged_in: boolean;
  };
  tou: { completed: boolean; version?: string };
  captcha: { completed: boolean };
  credentials: { completed: boolean; password?: string };
  user_created: boolean;
}

/*********************************************************************************************************************/

/**
 * @public
 * @function fetchState
 * @desc Redux async thunk to fetch the signup state from the backend.
 */
export const fetchState = createAsyncThunk<
  SignupStatusResponse, // return type
  undefined, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/fetchState", async (args, thunkAPI) => {
  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "state")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface CaptchaRequest {
  recaptcha_response?: string;
}

/**
 * @public
 * @function sendCaptchaResponse
 * @desc Redux async thunk to post the result of a CAPTCHA operation.
 */
export const sendCaptchaResponse = createAsyncThunk<
  SignupStatusResponse, // return type
  CaptchaRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/sendCaptchaResponse", async (args, thunkAPI) => {
  const body: KeyValues = {
    recaptcha_response: args.recaptcha_response,
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface RegisterEmailRequest {
  email: string;
}

/**
 * @public
 * @function registerEmailRequest
 * @desc Redux async thunk to add the users stated e-mail address to the signup state.
 */
export const registerEmailRequest = createAsyncThunk<
  SignupStatusResponse, // return type
  RegisterEmailRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/registerEmailRequest", async (args, thunkAPI) => {
  const body: KeyValues = {
    email: args.email,
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "register-email", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface VerifyEmailRequest {
  verification_code: string;
}

/**
 * @public
 * @function verifyEmailRequest
 * @desc Redux async thunk to send the verification code for an email address to the backend.
 */
export const verifyEmailRequest = createAsyncThunk<
  SignupStatusResponse, // return type
  VerifyEmailRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/verifyEmailRequest", async (args, thunkAPI) => {
  const body: KeyValues = {
    verification_code: args.verification_code,
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "verify-email", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function getPasswordRequest
 * @desc Redux async thunk to ask the backend to generate a password for this user.
 */
export const getPasswordRequest = createAsyncThunk<
  SignupStatusResponse, // return type
  undefined, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/getPasswordRequest", async (args, thunkAPI) => {
  const body: KeyValues = {};

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "get-password", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface CreateUserRequest {
  use_password?: boolean;
  use_webauthn?: boolean;
}

/**
 * @public
 * @function createUserRequest
 * @desc Redux async thunk to ask the backend to complete the signup by actually creating the user.
 */
export const createUserRequest = createAsyncThunk<
  SignupStatusResponse, // return type
  CreateUserRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/createUserRequest", async (args, thunkAPI) => {
  const body: KeyValues = {
    use_password: Boolean(args.use_password),
    use_webauthn: Boolean(args.use_webauthn),
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "create-user", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
// OLD INTERFACES BELOW
/*********************************************************************************************************************/

/*********************************************************************************************************************/
export interface TryCaptchaRequest {
  email: string;
  recaptcha_response: string;
  tou_accepted: boolean;
}

export type TryCaptchaNextStep = "new" | "address-used"; // possible backend 'next' return values

export interface TryCaptchaResponse {
  next: TryCaptchaNextStep;
}

/**
 * @public
 * @function fetchTryCaptcha
 * @desc Redux async thunk to post a CAPTCHA result, e-mail address and ToU acceptance status to backend.
 */
export const fetchTryCaptcha = createAsyncThunk<
  TryCaptchaResponse, // return type
  TryCaptchaRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/fetchTryCaptcha", async (args, thunkAPI) => {
  const body: KeyValues = {
    email: args.email,
    recaptcha_response: args.recaptcha_response,
    tou_accepted: args.tou_accepted,
  };

  return makeSignupRequest<TryCaptchaResponse>(thunkAPI, "trycaptcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

// type predicate to help identify rejected payloads from backend
export function isTryCaptchaResponse(data: any): data is TryCaptchaResponse {
  return "next" in data;
}

/*********************************************************************************************************************/
export interface VerifyLinkRequest {
  code: string;
}

export interface VerifyLinkResponseFail {
  status: "unknown-code" | "already-verified";
}

export interface VerifyLinkResponseSuccess {
  status: "verified";
  password: string;
  email?: string;
  dashboard_url: string;
}

export type VerifyLinkResponse = VerifyLinkResponseFail | VerifyLinkResponseSuccess;

/**
 * @public
 * @function fetchVerifyLink
 * @desc Redux async thunk to verify a signup link the user got from an e-mail.
 */
export const fetchVerifyLink = createAsyncThunk<
  VerifyLinkResponse, // return type
  VerifyLinkRequest, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/fetchVerifyLink", async (args, thunkAPI) => {
  return makeSignupRequest<VerifyLinkResponse>(thunkAPI, `verify-link/${args.code}`)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

// type predicate to help identify rejected payloads from backend
export function isVerifyLinkResponse(data: any): data is VerifyLinkResponse {
  return "status" in data;
}

/*********************************************************************************************************************/

function makeSignupRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // TODO: Get SIGNUP_SERVICE_URL from jsconfig instead? signup_url isn't the full path to the services
  //const state = thunkAPI.getState();
  //if (!state.config.signup_service_url) {
  if (!SIGNUP_SERVICE_URL) {
    throw new Error("Missing global SIGNUP_SERVICE_URL");
  }

  return makeGenericRequest<T>(thunkAPI, SIGNUP_SERVICE_URL, endpoint, body, data);
}

/*********************************************************************************************************************/
