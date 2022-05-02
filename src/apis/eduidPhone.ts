/*
 * Code and data structures for talking to the eduidPhone backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

export interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

export interface PhonesResponse {
  phones: PhoneInfo[];
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
>("emails/requestMakePrimaryPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "primary", data)
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
>("emails/requestVerifyPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
    code: args.code,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "verify", data)
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
>("emails/requestResendPhoneCode", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "resend-code", data)
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
>("emails/postNewPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
    verified: false,
    primary: false,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
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
>("emails/requestRemovePhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "remove", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeEmailsRequest<T>(
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
