/*
 * Code and data structures for talking to the eduid-signup backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EduIDAppDispatch, EduIDAppRootState } from "eduid-init-app";
import { signupSlice } from "slices/Signup";
import { isFSA, KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

// export for use in tests
// TODO: use base url from js config
export const SIGNUP_SERVICE_URL = "https://signup.eduid.docker/services/signup";

export interface SignupState {
  already_signed_up: boolean;
  email: {
    completed: boolean;
    address?: string;
    expires_time_left?: number;
    expires_time_max?: number;
    sent_at?: string;
    throttle_time_left?: number;
    throttle_time_max?: number;
    bad_attempts?: number;
    bad_attempts_max?: number;
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

export interface SignupStatusResponse {
  state: SignupState;
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/fetchState", async (args, thunkAPI) => {
  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "state")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface GetCaptchaResponse {
  captcha_img?: string;
  captcha_audio?: string;
}

/**
 * @public
 * @function getCaptchaResponse
 * @desc Redux async thunk to fetch a captcha image from the backend.
 */
export const getCaptchaRequest = createAsyncThunk<
  GetCaptchaResponse, // return type
  undefined, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/getCaptchaRequest", async (args, thunkAPI) => {
  const body: KeyValues = {};

  return makeSignupRequest<GetCaptchaResponse>(thunkAPI, "get-captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface CaptchaRequest {
  internal_response?: string;
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/sendCaptchaResponse", async (args, thunkAPI) => {
  const body: KeyValues = {
    internal_response: args.internal_response,
    recaptcha_response: args.recaptcha_response,
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface AcceptToURequest {
  tou_accepted: boolean;
  tou_version: string;
}

export interface AcceptToUArgs {
  version: string;
}

/**
 * @public
 * @function acceptToURequest
 * @desc Redux async thunk to record acceptance of a ToU version.
 */
export const acceptToURequest = createAsyncThunk<
  SignupStatusResponse, // return type
  AcceptToUArgs, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/acceptToURequest", async (args, thunkAPI) => {
  const body: AcceptToURequest = {
    tou_accepted: true,
    tou_version: args.version,
  };

  return makeSignupRequest<SignupStatusResponse>(thunkAPI, "accept-tou", body)
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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

  // type predicate to help identify payloads with the signup state.
  function isSignupStateResponse(action: any): action is PayloadAction<SignupStatusResponse> {
    if (!isFSA(action)) {
      return false;
    }
    try {
      const payload = action.payload as unknown as SignupStatusResponse;
      // if the payload has 'state', we consider it a SignupStatusResponse
      return Boolean(payload.state !== undefined);
    } catch {
      return false;
    }
  }

  /* Spot the generic signup state being returned from the backend, and update our copy in
   * redux-store accordingly.
   */
  function updateState(action: PayloadAction<T, string, never, boolean>, thunkAPI: RequestThunkAPI) {
    if (isSignupStateResponse(action)) {
      thunkAPI.dispatch(signupSlice.actions.setSignupState(action.payload.state));
    }
    return action;
  }

  return makeGenericRequest<T>(thunkAPI, SIGNUP_SERVICE_URL, endpoint, body, data)
    .then((response) => updateState(response, thunkAPI))
    .catch((err) => {
      updateState(err, thunkAPI);
      throw err;
    });
}
/*********************************************************************************************************************/
