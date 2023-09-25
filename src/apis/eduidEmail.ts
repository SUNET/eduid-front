/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EduIDAppDispatch, EduIDAppRootState } from "eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

export interface EmailInfo {
  email: string;
  verified: boolean;
  primary: boolean;
}

export interface EmailsResponse {
  emails: EmailInfo[];
}

/*********************************************************************************************************************/

/**
 * @public
 * @function requestMakePrimaryEmail
 * @desc Redux async thunk to request an email to become primary.
 */
export const requestMakePrimaryEmail = createAsyncThunk<
  EmailsResponse, // return type
  { email: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("emails/requestMakePrimaryEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeEmailsRequest<EmailsResponse>(thunkAPI, "primary", data)
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
  EmailsResponse, // return type
  { code: string; email: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("emails/requestVerifyEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
    code: args.code,
  };
  return makeEmailsRequest<EmailsResponse>(thunkAPI, "verify", data)
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
  EmailsResponse, // return type
  { email: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("emails/requestResendEmailCode", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeEmailsRequest<EmailsResponse>(thunkAPI, "resend-code", data)
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
  EmailsResponse, // return type
  { email: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("emails/postNewEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
    verified: false,
    primary: false,
  };
  return makeEmailsRequest<EmailsResponse>(thunkAPI, "new", data)
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
  EmailsResponse, // return type
  { email: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("emails/requestRemoveEmail", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeEmailsRequest<EmailsResponse>(thunkAPI, "remove", data)
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

  if (!state.config.emails_service_url) {
    throw new Error("Missing configuration emails_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.emails_service_url, endpoint, body, data);
}
