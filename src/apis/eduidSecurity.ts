/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface SuggestedPasswordResponse {
  suggested_password: string;
}

/**
 * @public
 * @function fetchSuggestedPassword
 * @desc Redux async thunk to get a suggested new password from the backend.
 */
export const fetchSuggestedPassword = createAsyncThunk<
  string,
  undefined,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("chpass/fetchSuggestedPassword", async (args, thunkAPI) => {
  return makeSecurityRequest<SuggestedPasswordResponse>(thunkAPI, "suggested-password")
    .then((response) => response.payload.suggested_password)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

/**
 * @public
 * @function changePassword
 * @desc Redux async thunk to attempt a password change.
 */
export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordPayload,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("chpass/changePassword", async (args, thunkAPI) => {
  return makeSecurityRequest<ChangePasswordResponse>(thunkAPI, "change-password", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeSecurityRequest<T>(
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

      if (!state.config.security_url) {
        throw new Error("Missing configuration security_url");
      }

      const response = await makeRequest<T>(thunkAPI, state.config.security_url, endpoint, body, data);

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
        thunkAPI.dispatch(securityFail(error.toString()));
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
export const securityFail = createAction("security_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
