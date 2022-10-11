/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { safeDecodeCBOR, safeEncode } from "sagas/common";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { FetchIdentitiesResponse } from "./eduidPersonalData";

/*********************************************************************************************************************/
// export interface RegisterWebauthnResponse {
//   webauthn_attestation: any;
// }

// /**
//  * @public
//  * @function registerWebauthn
//  * @desc Redux async thunk to get a suggested new password from the backend.
//  */
// export const registerWebauthn = createAsyncThunk<
//   string,
//   { descriptionValue: string },
//   { dispatch: DashboardAppDispatch; state: DashboardRootState }
// >("security/registerWebauthn", async (args, thunkAPI) => {
//   const state = thunkAPI.getState();
//   const body: KeyValues = {
//     attestationObject: safeEncode(state.security.webauthn_attestation?.attestationObject),
//     clientDataJSON: safeEncode(state.security.webauthn_attestation?.response?.clientDataJSON),
//     credentialId: state.security.webauthn_attestation?.id,
//     description: args.descriptionValue,
//   };
//   return makeSecurityRequest<any>(thunkAPI, "webauthn/register/complete", body)
//     .then((response) => response.payload.webauthn_attestation)
//     .catch((err) => thunkAPI.rejectWithValue(err));
// });

/*********************************************************************************************************************/
export interface beginRegisterWebauthn {
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
  return makeSecurityRequest<beginRegisterWebauthn>(thunkAPI, "webauthn/register/begin", body)
    .then((response) => (response.payload.registration_data = safeDecodeCBOR(response.payload.registration_data)))
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
