/*
 * Code and data structures for talking to the eduid-reset-password backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/

export interface RequestEmailLinkRequest {
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestEmailLinkResponse {}

/**
 * @public
 * @function requestEmailLink
 * @desc Redux async thunk to request a reset password link to be sent to an email address.
 */
export const requestEmailLink = createAsyncThunk<
  RequestEmailLinkResponse, // return type
  RequestEmailLinkRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("phones/requestMakePrimaryPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    email: args.email,
  };
  return makeResetPasswordRequest<RequestEmailLinkResponse>(thunkAPI, "primary", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeResetPasswordRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.reset_password_url) {
    throw new Error("Missing configuration reset_password_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.reset_password_url, endpoint, body, data);
}
