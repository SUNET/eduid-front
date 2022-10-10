/*
 * Code and data structures for talking to the eidas backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

type EidasMethods = "eidas" | "freja";

interface EidasCommonRequest {
  frontend_state?: string;
  frontend_action?: string;
  method: EidasMethods;
}

interface EidasCommonResponse {
  location: string;
}

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends EidasCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends EidasCommonResponse {}

/**
 * @public
 * @function verifyIdentity
 * @desc Redux async thunk to start a verify-identity operation.
 */
export const eidasVerifyIdentity = createAsyncThunk<
  VerifyIdentityResponse, // return type
  VerifyIdentityRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("eidas/verifyIdentity", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "eidasVerifyIdentity";
  }
  return makeEidasRequest<VerifyIdentityResponse>(thunkAPI, "verify-identity", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface VerifyCredentialRequest extends EidasCommonRequest {
  credential_id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyCredentialResponse extends EidasCommonResponse {}

/**
 * @public
 * @function verifyCredential
 * @desc Redux async thunk to start a verify-credential operation.
 */
export const eidasVerifyCredential = createAsyncThunk<
  VerifyCredentialResponse, // return type
  VerifyCredentialRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("eidas/verifyCredential", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "eidasVerifyCredential";
  }
  return makeEidasRequest<VerifyCredentialResponse>(thunkAPI, "verify-credential", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateRequest extends EidasCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateResponse extends EidasCommonResponse {}

/**
 * @public
 * @function eidasMfaAuthenticate
 * @desc Redux async thunk to start an mfa-authenticate operation.
 */
export const eidasMfaAuthenticate = createAsyncThunk<
  MfaAuthenticateResponse, // return type
  MfaAuthenticateRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("eidas/mfaAuthenticate", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "eidasMfaAuthenticate";
  }
  return makeEidasRequest<MfaAuthenticateResponse>(thunkAPI, "mfa-authenticate", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetStatusRequest {
  authn_id: string;
}

export interface GetStatusResponse {
  frontend_action: string;
  frontend_state?: string;
  method: EidasMethods;
  error?: boolean;
  status?: string;
}

/**
 * @public
 * @function eidasGetStatus
 * @desc Redux async thunk to fetch status for an earlier operation.
 */
export const eidasGetStatus = createAsyncThunk<
  GetStatusResponse, // return type
  GetStatusRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("eidas/getStatus", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeEidasRequest<GetStatusResponse>(thunkAPI, "get_status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeEidasRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.eidas_url) {
    throw new Error("Missing configuration eidas_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.eidas_url, endpoint, body, data);
}