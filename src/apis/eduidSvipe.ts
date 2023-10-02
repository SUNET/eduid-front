/*
 * Code and data structures for talking to the Svipe backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";

interface SvipeCommonRequest {
  frontend_action?: string;
  method: string;
}

interface SvipeCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

type DispatchWithSvipe = DashboardAppDispatch;
type StateWithSvipe = DashboardRootState;

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends SvipeCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends SvipeCommonResponse {}

/**
 * @public
 * @function svipeVerifyIdentity
 * @desc Redux async thunk to start a verify-identity operation.
 */
export const svipeVerifyIdentity = createAsyncThunk<
  VerifyIdentityResponse, // return type
  VerifyIdentityRequest, // args type
  { dispatch: DispatchWithSvipe; state: StateWithSvipe }
>("svipe/verifyIdentity", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "svipeidVerifyIdentity";
  }

  return makeSvipeRequest<VerifyIdentityResponse>(thunkAPI, "verify-identity", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function svipeGetStatus
 * @desc Redux async thunk to fetch status for an earlier operation.
 */
export const svipeGetStatus = createAsyncThunk<
  GetStatusResponse, // return type
  GetStatusRequest, // args type
  { dispatch: DispatchWithSvipe; state: StateWithSvipe }
>("svipe/getStatus", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeSvipeRequest<GetStatusResponse>(thunkAPI, "get_status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeSvipeRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.svipe_service_url) {
    throw new Error("Missing configuration svipe_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.svipe_service_url, endpoint, body, data);
}
