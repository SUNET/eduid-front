/*
 * Code and data structures for talking to the letter-proofing backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";
import { clearNotifications } from "reducers/Notifications";

/*********************************************************************************************************************/
export interface LetterProofingResponse {
  letter_expired?: boolean;
  letter_expires?: string;
  letter_expires_in_day?: number;
  letter_sent?: string;
  letter_sent_days_ago?: number;
  message?: string;
}

/**
 * @public
 * @function fetchLetterProofingState
 * @desc Redux async thunk to get letter proofing state from the backend.
 */
export const fetchLetterProofingState = createAsyncThunk<
  LetterProofingResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/fetchLetterProofingState", async (args, thunkAPI) => {
  return makeLetterProofingRequest<LetterProofingResponse>(thunkAPI, "proofing")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeLetterProofingRequest<T>(
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

      const response = await makeRequest<T>(thunkAPI, state.config.letter_proofing_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        reject(saved);
      }

      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(letterProofingFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}

/**
 * @public
 * @function postRequestLetter
 * @desc Redux async thunk to request letter from the backend.
 */
export const postRequestLetter = createAsyncThunk<
  LetterProofingResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/postRequestLetter", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    nin: state.nins.nin,
    csrf_token: state.config.csrf_token,
  };

  return makeLetterProofingRequest<LetterProofingResponse>(thunkAPI, "proofing", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

export interface ConfirmLetterCodeResponse {
  message?: string;
}

/**
 * @public
 * @function confirmLetterCode
 * @desc Redux async thunk to confirm letter proofing code.
 */
export const confirmLetterCode = createAsyncThunk<
  LetterProofingResponse, // return type
  { code: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/confirmLetterCode", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    code: args.code,
    csrf_token: state.config.csrf_token,
  };
  return makeLetterProofingConfirmCode<ConfirmLetterCodeResponse>(thunkAPI, "verify-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeLetterProofingConfirmCode<T>(
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

      const response = await makeRequest<T>(thunkAPI, state.config.letter_proofing_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        return reject(saved);
      }

      // remove remained error messages
      thunkAPI.dispatch(clearNotifications());
      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(letterProofingFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}

/*********************************************************************************************************************/
// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const letterProofingFail = createAction("letterProofing_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
