/*
 * Code and data structures for talking to the BankID backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EduIDAppDispatch, EduIDAppRootState } from "eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";

type DispatchWithAuthn = EduIDAppDispatch;
type StateWithAuthn = EduIDAppRootState;

export interface AuthenticateResponse {
  location: string;
}

export interface AuthenticateRequest {
  frontend_action?: string;
}

/*********************************************************************************************************************/
/**
 * @public
 * @function authenticate
 * @desc Redux async thunk to start a verify-identity operation.
 */
export const authenticate = createAsyncThunk<
  AuthenticateResponse, // return type
  AuthenticateRequest, // args type
  { dispatch: DispatchWithAuthn; state: StateWithAuthn }
>("authn/authenticate", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeAuthnRequest<AuthenticateResponse>(thunkAPI, "authenticate", body) // return type
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

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
  return makeAuthnRequest<GetStatusResponse>(thunkAPI, "get-status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeAuthnRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.authn_service_url) {
    throw new Error("Missing configuration state.config.authn_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.authn_service_url, endpoint, body, data);
}
