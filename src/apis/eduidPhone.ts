/*
 * Code and data structures for talking to the eduidPhone backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "slices/Notifications";
import { EduIDAppDispatch, EduIDAppRootState } from "../eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

export interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

export interface PhoneCaptchaResponse {
  captcha_img?: string;
  captcha_audio?: string;
}
export interface PhonesResponse {
  phones: PhoneInfo[];
  captcha?: PhoneCaptchaResponse;
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
 * @function requestSendPhoneCode
 * @desc Redux async thunk to request a code for verifying possession of a phone number.
 */
export const requestSendPhoneCode = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("phones/requestSendPhoneCode", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makePhoneRequest<PhonesResponse>(thunkAPI, "send-code", data)
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("phones/postNewPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  PhoneCaptchaResponse, // return type
  undefined, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("phones/getCaptcha", async (args, thunkAPI) => {
  const body: KeyValues = {};
  return makePhoneRequest<PhoneCaptchaResponse>(thunkAPI, "get-captcha", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function sendCaptchaResponse
 * @desc Redux async thunk to post the result of a CAPTCHA operation.
 */
export const sendCaptchaResponse = createAsyncThunk<
  PhoneCaptchaResponse, // return type
  { internal_response?: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("phone/sendCaptchaResponse", async (args, thunkAPI) => {
  const body: KeyValues = {
    internal_response: args.internal_response,
  };

  return makePhoneRequest<PhoneCaptchaResponse>(thunkAPI, "captcha", body)
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

  if (!state.config.phone_service_url) {
    throw new Error("Missing configuration phone_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.phone_service_url, endpoint, body, data);
}
