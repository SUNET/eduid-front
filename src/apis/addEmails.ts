/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { EmailInfo } from "reducers/Emails";

/*********************************************************************************************************************/
export interface requestMakePrimaryEmailResponse {
  message?: string;
  email?: string;
  emails: EmailInfo[];
}

/**
 * @public
 * @function requestMakePrimaryEmail
 * @desc Redux async thunk to request an email to become primary.
 */
export const requestMakePrimaryEmail = createAsyncThunk<
  requestMakePrimaryEmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestMakePrimaryEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: args.email,
    csrf_token: state.config.csrf_token,
  };
  return makeEmailsRequest<requestMakePrimaryEmailResponse>(thunkAPI, "primary", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface requestVerifyEmailResponse {
  message?: string;
  email?: string;
  code?: string;
  emails: EmailInfo[];
}

/**
 * @public
 * @function requestVerifyEmail
 * @desc Redux async thunk to attempt to verify email using verification code.
 */
export const requestVerifyEmail = createAsyncThunk<
  requestVerifyEmailResponse, // return type
  { code: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestVerifyEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: state.emails.confirming,
    code: args.code,
    csrf_token: state.config.csrf_token,
  };
  return makeEmailsRequest<requestVerifyEmailResponse>(thunkAPI, "verify", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface requestResendEmailCodeResponse {
  message?: string;
  email?: string;
  emails: EmailInfo[];
}

/**
 * @public
 * @function requestResendEmailCode
 * @desc Redux async thunk to request new code for verification by email.
 */
export const requestResendEmailCode = createAsyncThunk<
  requestResendEmailCodeResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestResendEmailCode", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: state.emails.confirming,
    csrf_token: state.config.csrf_token,
  };
  return makeEmailsRequest<requestResendEmailCodeResponse>(thunkAPI, "resend-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface postNewEmailResponse {
  message?: string;
  email?: string;
  emails: EmailInfo[];
}

/**
 * @public
 * @function postNewEmail
 * @desc Redux async thunk to add a new email.
 */
export const postNewEmail = createAsyncThunk<
  postNewEmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/postNewEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: args.email,
    verified: false,
    primary: false,
    csrf_token: state.config.csrf_token,
  };
  return makeEmailsRequest<RemoveEmailResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface RemoveEmailResponse {
  message?: string;
  email?: string;
  emails: EmailInfo[];
}

/**
 * @public
 * @function requestRemoveEmail
 * @desc Redux async thunk to remove an email.
 */
export const requestRemoveEmail = createAsyncThunk<
  RemoveEmailResponse, // return type
  { email: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestRemoveEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: args.email,
    csrf_token: state.config.csrf_token,
  };
  return makeEmailsRequest<RemoveEmailResponse>(thunkAPI, "remove", data)
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
