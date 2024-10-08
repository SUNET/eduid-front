/*
 * Code and data structures for talking to the eduid-security backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { webauthnAttestation } from "helperFunctions/navigatorCredential";
import { EduIDAppDispatch, EduIDAppRootState } from "../eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { FetchIdentitiesResponse } from "./eduidPersonalData";

/*********************************************************************************************************************/
export interface UpdateOfficialUserDataResponse {
  message: string;
}

/**
 * @public
 * @function updateOfficialUserData
 * @desc Redux async thunk to request updated name from the Swedish Tax Agency.
 */
export const updateOfficialUserData = createAsyncThunk<
  string,
  undefined,
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/updateOfficialUserData", async (args, thunkAPI) => {
  const body: KeyValues = {};
  return makeSecurityRequest<UpdateOfficialUserDataResponse>(thunkAPI, "refresh-official-user-data", body)
    .then((response) => response.payload.message)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface PostDeleteAccountResponse {
  location: string;
}

/**
 * @public
 * @function postDeleteAccount
 * @desc Redux async thunk to postDeleteAccount.
 */
export const postDeleteAccount = createAsyncThunk<
  PostDeleteAccountResponse,
  undefined,
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/postDeleteAccount", async (args, thunkAPI) => {
  const body: KeyValues = {};
  return makeSecurityRequest<PostDeleteAccountResponse>(thunkAPI, "terminate-account", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface RemoveWebauthnTokensRequest {
  credential_key: string;
}

export interface RemoveWebauthnTokensResponse {
  credentials: CredentialType[];
}

/**
 * @public
 * @function removeWebauthnTokens
 * @desc Redux async thunk to removeWebauthnToken.
 */
export const removeWebauthnToken = createAsyncThunk<
  RemoveWebauthnTokensResponse,
  RemoveWebauthnTokensRequest,
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/removeWebauthnToken", async (args, thunkAPI) => {
  const body: KeyValues = {
    credential_key: args.credential_key,
  };
  return makeSecurityRequest<RemoveWebauthnTokensResponse>(thunkAPI, "webauthn/remove", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface CredentialType {
  created_ts: string;
  credential_type: string;
  description: string | null;
  key: string;
  success_ts: string;
  used_for_login: boolean;
  verified: boolean;
}

export interface RequestCredentialsResponse {
  credentials: CredentialType[];
}

/**
 * @public
 * @function requestCredentials
 * @desc Redux async thunk to requestCredentials.
 */
export const requestCredentials = createAsyncThunk<
  RequestCredentialsResponse,
  undefined,
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/requestCredentials", async (args, thunkAPI) => {
  return makeSecurityRequest<RequestCredentialsResponse>(thunkAPI, "credentials")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface RegisterWebauthnResponse {
  webauthn_attestation: webauthnAttestation;
  credentials: CredentialType[];
}

/**
 * @public
 * @function registerWebauthn
 * @desc Redux async thunk to register web auth to the backend.
 */
export const registerWebauthn = createAsyncThunk<
  RegisterWebauthnResponse,
  { descriptionValue: string },
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/registerWebauthn", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const body: KeyValues = {
    attestationObject: state.security.webauthn_attestation?.attestationObject,
    clientDataJSON: state.security.webauthn_attestation?.clientDataJSON,
    credentialId: state.security.webauthn_attestation?.credentialId,
    description: args.descriptionValue,
  };
  return makeSecurityRequest<RegisterWebauthnResponse>(thunkAPI, "webauthn/register/complete", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface BeginRegisterWebauthnResponse {
  registration_data: string;
}

/**
 * @public
 * @function beginRegisterWebauthn
 * @desc Redux async thunk to prepare registering web auth.
 */
export const beginRegisterWebauthn = createAsyncThunk<
  string,
  undefined,
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/beginRegisterWebauthn", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const body: KeyValues = {
    authenticator: state.security.webauthn_authenticator,
  };
  return makeSecurityRequest<BeginRegisterWebauthnResponse>(thunkAPI, "webauthn/register/begin", body)
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("chpass/fetchSuggestedPassword", async (args, thunkAPI) => {
  return makeSecurityRequest<SuggestedPasswordResponse>(thunkAPI, "change-password/suggested-password")
    .then((response) => response.payload.suggested_password)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface ChangePasswordPayload {
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("chpass/changePassword", async (args, thunkAPI) => {
  return makeSecurityRequest<ChangePasswordResponse>(thunkAPI, "change-password/set-password", args)
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/removeNin", async (nin, thunkAPI) => {
  const body: KeyValues = {
    nin: nin,
  };

  return makeSecurityRequest<FetchIdentitiesResponse>(thunkAPI, "remove-nin", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function fetchApprovedSecurityKeys
 * @desc Redux async thunk to fetch approved security keys.
 */
export const fetchApprovedSecurityKeys = createAsyncThunk<
  any, // return type
  undefined, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/approvedSecurityKeys", async (nin, thunkAPI) => {
  return makeSecurityRequest<FetchIdentitiesResponse>(thunkAPI, "webauthn/approved-security-keys")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

/**
 * @public
 * @function removeIdentity
 * @desc Redux async thunk to post remove identity.
 */
export const removeIdentity = createAsyncThunk<
  any, // return type
  { identity_type: string }, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/removeIdentity", async (args, thunkAPI) => {
  return makeSecurityRequest<any>(thunkAPI, "remove-identity", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export enum ActionStatus {
  OK = "ok",
  NOT_FOUND = "not-found",
  CONSUMED = "consumed",
  STALE = "stale",
  WRONG_ACCR = "wrong-accr",
  NO_MFA = "no-mfa",
  CREDENTIAL_NOT_RECENTLY_USED = "credential-not-recently-used",
}

export interface AuthnActionStatusResponse {
  authn_status: ActionStatus;
}

export interface AuthnActionStatusRequest {
  frontend_action: string;
  credential_id?: string;
}

/**
 * @public
 * @function getAuthnStatus
 * @desc Redux async thunk to post get authn status.
 */
export const getAuthnStatus = createAsyncThunk<
  AuthnActionStatusResponse, // return type
  AuthnActionStatusRequest, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("security/authn-status", async (args, thunkAPI) => {
  const body: KeyValues = args;
  return makeSecurityRequest<any>(thunkAPI, "authn-status", body)
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

  if (!state.config.security_service_url) {
    throw new Error("Missing configuration security_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.security_service_url, endpoint, body, data);
}

/*********************************************************************************************************************/
