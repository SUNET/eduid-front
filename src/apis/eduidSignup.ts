/*
 * Code and data structures for talking to the eduid-signup backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SIGNUP_SERVICE_URL } from "globals";
import { SignupAppDispatch, SignupRootState } from "../signup-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface TryCaptchaRequest {
  email: string;
  recaptcha_response: string;
  tou_accepted: boolean;
}

export interface TryCaptchaResponse {
  next: "new" | "resend-code" | "address-used";
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
>("captcha/fetchTryCaptcha", async (args, thunkAPI) => {
  return makeSignupRequest<TryCaptchaResponse>(thunkAPI, "trycaptcha")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

function makeSignupRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.signup_url) {
    throw new Error("Missing configuration signup_url");
  }

  // TODO: Get SIGNUP_SERVICE_URL from jsconfig instead? signup_url isn't the full path to the services

  return makeGenericRequest<T>(thunkAPI, SIGNUP_SERVICE_URL, endpoint, body, data);
}

/*********************************************************************************************************************/
