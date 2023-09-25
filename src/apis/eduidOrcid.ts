/*
 * Code and data structures for talking to the eduid-orcid backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EduIDAppDispatch, EduIDAppRootState } from "../eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

export interface OrcidInfo {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
}

/*********************************************************************************************************************/
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FetchOrcidRequest {}

export interface FetchOrcidResponse {
  orcid?: OrcidInfo;
}

/**
 * @public
 * @function fetchOrcid
 * @desc Redux async thunk to fetch a users' ORCID iD info.
 */
export const fetchOrcid = createAsyncThunk<
  FetchOrcidResponse, // return type
  FetchOrcidRequest, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/fetchOrcid", async (args, thunkAPI) => {
  return makeOrcidRequest<FetchOrcidResponse>(thunkAPI, "")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveOrcidResponse {}

/**
 * @public
 * @function removeOrcid
 * @desc Redux async thunk to unlink a users' ORCID iD info in eduID.
 */
export const removeOrcid = createAsyncThunk<
  RemoveOrcidResponse, // return type
  undefined, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("signup/removeOrcid", async (args, thunkAPI) => {
  const body: KeyValues = {}; // Need a body to make this a POST, not a GET
  return makeOrcidRequest<RemoveOrcidResponse>(thunkAPI, "remove", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

function makeOrcidRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();
  if (!state.config.orcid_url) {
    throw new Error("Missing orcid_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.orcid_url, endpoint, body, data);
}

/*********************************************************************************************************************/
