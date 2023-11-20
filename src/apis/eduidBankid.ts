/*
 * Code and data structures for talking to the BankID backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";

interface BankIDCommonRequest {
  frontend_action?: string;
  method: string;
}

interface BankIDCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

type DispatchWithBankID = DashboardAppDispatch;
type StateWithBankID = DashboardRootState;

/*********************************************************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends BankIDCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends BankIDCommonResponse {}

/**
 * @public
 * @function bankIDVerifyIdentity
 * @desc Redux async thunk to start a verify-identity operation.
 */
export const bankIDVerifyIdentity = createAsyncThunk<
  VerifyIdentityResponse, // return type
  VerifyIdentityRequest, // args type
  { dispatch: DispatchWithBankID; state: StateWithBankID }
>("bankid/verifyIdentity", async (args, thunkAPI) => {
  const body: KeyValues = args;
  if (body.frontend_action === undefined) {
    body.frontend_action = "bankidVerifyIdentity";
  }

  return makeBankIDRequest<VerifyIdentityResponse>(thunkAPI, "verify-identity", body)
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
  { dispatch: DispatchWithBankID; state: StateWithBankID }
>("bankid/getStatus", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeBankIDRequest<GetStatusResponse>(thunkAPI, "get_status", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeBankIDRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();
  // TODO: Change to bankid_url
  if (!state.config.svipe_url) {
    throw new Error("Missing configuration bankid_url");
  }

  return makeGenericRequest<T>(thunkAPI, "https://bankid.eduid.docker", endpoint, body, data);
}
