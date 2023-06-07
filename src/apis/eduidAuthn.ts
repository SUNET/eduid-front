/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./GetStatusResponse";

export type DispatchWithAuthn = DashboardAppDispatch;
type StateWithAuthn = DashboardRootState;

type AuthnMethods = "authenticate";

interface AuthnCommonRequest {
  frontend_state?: string; // frontend can pass something here (like a ref) and get it back after the authn flow
  frontend_action: string; // this maps to config in the backend telling it where to return to after completion
  method: AuthnMethods;
}

interface AuthnCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

/*********************************************************************************************************************/

/**
 * @public
 * @function authnGetStatus
 * @desc Redux async thunk to fetch status for an earlier operation.
 */
export const authnGetStatus = createAsyncThunk<
  GetStatusResponse, // return type
  GetStatusRequest, // args type
  { dispatch: DispatchWithAuthn; state: StateWithAuthn }
>("authn/getStatus", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeAuthnRequest<GetStatusResponse>(thunkAPI, "get_status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthenticateRequest extends AuthnCommonRequest {
  same_user?: boolean;
  force_authn?: boolean;
  high_security?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthenticateResponse extends AuthnCommonResponse {}

/**
 * @public
 * @function authnAuthenticate
 * @desc Redux async thunk to perform an authentication
 */
export const authnAuthenticate = createAsyncThunk<
  AuthenticateResponse, // return type
  AuthenticateRequest, // args type
  { dispatch: DispatchWithAuthn; state: StateWithAuthn }
>("authn/Authenticate", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeAuthnRequest<AuthenticateResponse>(thunkAPI, "authenticate", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
interface AuthnLogoutResponse {
  location?: string;
}

/**
 * @public
 * @function fetchLogout
 * @desc Redux async thunk to request updated name from the Swedish Tax Agency.
 */
export const fetchLogout = createAsyncThunk<
  AuthnLogoutResponse, // return type
  undefined, // args type
  { dispatch: DispatchWithAuthn; state: StateWithAuthn }
>("authn/logout", async (args, thunkAPI) => {
  return makeAuthnRequest<AuthnLogoutResponse>(thunkAPI, "logout")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

function makeAuthnRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.token_service_url) {
    throw new Error("Missing configuration token_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.token_service_url, endpoint, body, data);
}

/*********************************************************************************************************************/
