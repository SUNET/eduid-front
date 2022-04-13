/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface requestVerifyEmailResponse {
  message?: string;
  email?: string;
  code?: string;
}

/**
 * @public
 * @function requestVerifyEmail
 * @desc Redux async thunk to get emails state from the backend.
 */
export const requestVerifyEmail = createAsyncThunk<
  requestResendEmailCodeResponse, // return type
  { code: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/requestVerifyEmail", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    email: state.emails.confirming,
    code: args.code,
    csrf_token: state.config.csrf_token,
  };
  return makeAddEmailRequest<requestResendEmailCodeResponse>(thunkAPI, "verify", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface requestResendEmailCodeResponse {
  message?: string;
  email?: string;
}

/**
 * @public
 * @function requestResendEmailCode
 * @desc Redux async thunk to get emails state from the backend.
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
  return makeAddEmailRequest<requestResendEmailCodeResponse>(thunkAPI, "resend-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface postNewEmailResponse {
  message?: string;
  email?: string;
}

/**
 * @public
 * @function postNewEmail
 * @desc Redux async thunk to get emails state from the backend.
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
  return makeAddEmailRequest<RemoveEmailResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface RemoveEmailResponse {
  message?: string;
  email?: string;
}

/**
 * @public
 * @function requestRemoveEmail
 * @desc Redux async thunk to get emails state from the backend.
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
  return makeAddEmailRequest<RemoveEmailResponse>(thunkAPI, "remove", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeAddEmailRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const state = thunkAPI.getState();

      const response = await makeRequest<T>(thunkAPI, state.config.emails_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        return reject(saved);
      }
      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        //   thunkAPI.dispatch(letterProofingFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}
