/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

export interface SuggestedPasswordResponse {
  suggested_password: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

function makeSecurityRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  return makeRequest(thunkAPI, state.config.security_url, endpoint, body, data);
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
  try {
    const response = await makeSecurityRequest<SuggestedPasswordResponse>(thunkAPI, "suggested-password");

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload.suggested_password;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(securityFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

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
  try {
    const response = await makeSecurityRequest<ChangePasswordResponse>(thunkAPI, "change-password", args);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(securityFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const securityFail = createAction("SECURITY_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
