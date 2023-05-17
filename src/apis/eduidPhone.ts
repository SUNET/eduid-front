/*
 * Code and data structures for talking to the eduidPhone backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "reducers/Notifications";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetCaptchaResponse } from "./eduidSignup";

export interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

export interface PhonesResponse {
  phones: PhoneInfo[];
  captcha?: { captcha_img?: string; captcha_audio?: string };
}

/*********************************************************************************************************************/
/**
 * @public
 * @function requestMakePrimaryPhone
 * @desc Redux async thunk to add a new phone.
 */
export const requestMakePrimaryPhone = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/requestMakePrimaryPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "primary", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestVerifyPhone
 * @desc Redux async thunk to attempt to verify phone using verification code.
 */
export const requestVerifyPhone = createAsyncThunk<
  PhonesResponse, // return type
  { code: string; number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/requestVerifyPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
    code: args.code,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "verify", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestResendPhoneCode
 * @desc Redux async thunk to request new code for verification by phone.
 */
export const requestResendPhoneCode = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/requestResendPhoneCode", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "resend-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function postNewPhone
 * @desc Redux async thunk to add a new phone number.
 */
export const postNewPhone = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/postNewPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
    verified: false,
    primary: false,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => {
      return (
        // Show correct error message instead of "Check the form below for errors."
        thunkAPI.dispatch(showNotification({ message: err.payload.error.number, level: "error" })),
        thunkAPI.rejectWithValue(err)
      );
    });
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestRemovePhone
 * @desc Redux async thunk to remove a phone number.
 */
export const requestRemovePhone = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/requestRemovePhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "remove", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function getCaptchaRequest
 * @desc Redux async thunk to get Captcha.
 */
export const getCaptchaRequest = createAsyncThunk<
  GetCaptchaResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/getCaptcha", async (args, thunkAPI) => {
  const body: KeyValues = {};
  return makePhoneRequest<GetCaptchaResponse>(thunkAPI, "get-captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface CaptchaRequest {
  internal_response: string;
}

/**
 * @public
 * @function sendCaptchaResponse
 * @desc Redux async thunk to post the result of a CAPTCHA operation.
 */
export const sendCaptchaResponse = createAsyncThunk<
  any, // return type
  any, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phone/sendCaptchaResponse", async (args, thunkAPI) => {
  const body: KeyValues = {
    internal_response: args.internal_response,
  };

  return makePhoneRequest<any>(thunkAPI, "captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makePhoneRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.phone_url) {
    throw new Error("Missing configuration phone_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.phone_url, endpoint, body, data);
}
