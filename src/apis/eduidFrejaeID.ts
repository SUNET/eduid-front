/*
 * Code and data structures for talking to the FrejaeID backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EduIDAppDispatch, EduIDAppRootState } from "../eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetStatusRequest, GetStatusResponse, WebauthnMethods } from "./eduidEidas";

interface FrejaeIDCommonRequest {
  frontend_action?: string;
  method: WebauthnMethods;
}

interface FrejaeIDCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

type DispatchWithFrejaeID = EduIDAppDispatch;
type StateWithFrejaeID = EduIDAppRootState;

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends FrejaeIDCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends FrejaeIDCommonResponse {}

/**
 * @public
 * @function frejaeIDVerifyIdentity
 * @desc Redux async thunk to start a verify-identity operation.
 */
export const frejaeIDVerifyIdentity = createAsyncThunk<
  VerifyIdentityResponse, // return type
  VerifyIdentityRequest, // args type
  { dispatch: DispatchWithFrejaeID; state: StateWithFrejaeID }
>("freja/verifyIdentity", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "verifyIdentity";
  }

  return makeFrejaeIDRequest<VerifyIdentityResponse>(thunkAPI, "verify-identity", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function frejaeIDGetStatus
 * @desc Redux async thunk to fetch status for an earlier operation.
 */
export const frejaeIDGetStatus = createAsyncThunk<
  GetStatusResponse, // return type
  GetStatusRequest, // args type
  { dispatch: DispatchWithFrejaeID; state: StateWithFrejaeID }
>("freja/getStatus", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeFrejaeIDRequest<GetStatusResponse>(thunkAPI, "get-status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeFrejaeIDRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.freja_eid_service_url) {
    throw new Error("Missing configuration frejaeID_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.freja_eid_service_url, endpoint, body, data);
}
