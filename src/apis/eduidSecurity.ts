/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { safeDecodeCBOR } from "sagas/common";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { FetchIdentitiesResponse } from "./eduidPersonalData";

/*********************************************************************************************************************/
export interface CreateWebauthnResponse {
  registration_data: any;
}

/**
 * @public
 * @function createRegisterWebauthn
 * @desc Redux async thunk to get a suggested new password from the backend.
 */
export const createRegisterWebauthn = createAsyncThunk<
  string,
  undefined,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("security/createRegisterWebauthn", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const body: KeyValues = {
    authenticator: state.security.webauthn_authenticator,
  };
  return makeSecurityRequest<RegisterWebauthnResponse>(thunkAPI, "webauthn/register/begin", body)
    .then((response) => (response.payload.registration_data = safeDecodeCBOR(response.payload.registration_data)))
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface RegisterWebauthnResponse {
  registration_data: any;
}

/**
 * @public
 * @function beginRegisterWebauthn
 * @desc Redux async thunk to get a suggested new password from the backend.
 */
export const beginRegisterWebauthn = createAsyncThunk<
  string,
  undefined,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("security/beginRegisterWebauthn", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const body: KeyValues = {
    authenticator: state.security.webauthn_authenticator,
  };
  return makeSecurityRequest<RegisterWebauthnResponse>(thunkAPI, "webauthn/register/begin", body)
    .then((response) => response.payload.registration_data)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

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
export interface NinPayload {
  nin: string;
}

/**
 * @public
 * @function addNin
 * @desc Redux async thunk to add a NIN.
 */
export const addNin = createAsyncThunk<
  FetchIdentitiesResponse, // return type
  string, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("security/addNin", async (nin, thunkAPI) => {
  const body: KeyValues = {
    nin: nin,
  };

  return makeSecurityRequest<FetchIdentitiesResponse>(thunkAPI, "add-nin", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/* Shares args and response type with addNin above */

/**
 * @public
 * @function removeNin
 * @desc Redux async thunk to remove a NIN.
 */
export const removeNin = createAsyncThunk<
  FetchIdentitiesResponse, // return type
  string, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("security/removeNin", async (nin, thunkAPI) => {
  const body: KeyValues = {
    nin: nin,
  };

  return makeSecurityRequest<FetchIdentitiesResponse>(thunkAPI, "remove-nin", body)
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
  const state = thunkAPI.getState();

  if (!state.config.security_url) {
    throw new Error("Missing configuration security_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.security_url, endpoint, body, data);
}

/*********************************************************************************************************************/
