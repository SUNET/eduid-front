/*
 * Code and data structures for talking to the eduid-signup backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignupAppDispatch, SignupRootState } from "../signup-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

// export for use in tests
export const SIGNUP_SERVICE_URL = "/services/signup";

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
  undefined, // args type
  { dispatch: SignupAppDispatch; state: SignupRootState }
>("signup/fetchVerifyLink", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  return makeSignupRequest<VerifyLinkResponse>(thunkAPI, `verify-link/${state.signup.code}`)
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
