/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { EmailInfo } from "reducers/Emails";

/*********************************************************************************************************************/
export interface EmailResponse {
  emails: EmailInfo[];
}

/**
 * @public
 * @function requestMakePrimaryEmail
 * @desc Redux async thunk to request an email to become primary.
 */
export const requestMakePrimaryEmail = createAsyncThunk<
  EmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestMakePrimaryEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeEmailsRequest<EmailResponse>(thunkAPI, "primary", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestVerifyEmail
 * @desc Redux async thunk to attempt to verify email using verification code.
 */
export const requestVerifyEmail = createAsyncThunk<
  EmailResponse, // return type
  { code: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestVerifyEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: state.emails.confirming,
    code: args.code,
  };
  return makeEmailsRequest<EmailResponse>(thunkAPI, "verify", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestResendEmailCode
 * @desc Redux async thunk to request new code for verification by email.
 */
export const requestResendEmailCode = createAsyncThunk<
  EmailResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestResendEmailCode", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: state.emails.confirming,
  };
  return makeEmailsRequest<EmailResponse>(thunkAPI, "resend-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function postNewEmail
 * @desc Redux async thunk to add a new email.
 */
export const postNewEmail = createAsyncThunk<
  EmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/postNewEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
    verified: false,
    primary: false,
  };
  return makeEmailsRequest<EmailResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestRemoveEmail
 * @desc Redux async thunk to remove an email.
 */
export const requestRemoveEmail = createAsyncThunk<
  EmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestRemoveEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeEmailsRequest<EmailResponse>(thunkAPI, "remove", data)
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

  if (!state.config.emails_url) {
    throw new Error("Missing configuration emails_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.emails_url, endpoint, body, data);
}
