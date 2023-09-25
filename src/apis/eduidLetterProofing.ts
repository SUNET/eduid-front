/*
 * Code and data structures for talking to the letter-proofing backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IndexAppDispatch as DashboardAppDispatch, IndexRootState as DashboardRootState } from "../eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface LetterProofingResponse {
  letter_expired?: boolean;
  letter_expires?: string;
  letter_expires_in_days?: number;
  letter_sent?: string;
  letter_sent_days_ago?: number;
  message?: string;
}

/**
 * @public
 * @function fetchLetterProofingState
 * @desc Redux async thunk to get letter proofing state from the backend.
 */
export const fetchLetterProofingState = createAsyncThunk<
  LetterProofingResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/fetchLetterProofingState", async (args, thunkAPI) => {
  return makeLetterProofingRequest<LetterProofingResponse>(thunkAPI, "proofing")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/**
 * @public
 * @function postRequestLetter
 * @desc Redux async thunk to request letter from the backend.
 */
export const postRequestLetter = createAsyncThunk<
  LetterProofingResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/postRequestLetter", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const data: KeyValues = {
    nin: state.identities.nin?.number,
  };

  if (!data.nin) {
    throw new Error("Missing NIN to request letter for");
  }

  return makeLetterProofingRequest<LetterProofingResponse>(thunkAPI, "proofing", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

export interface ConfirmLetterCodeResponse {
  message?: string;
}

/**
 * @public
 * @function confirmLetterCode
 * @desc Redux async thunk to confirm letter proofing code with backend.
 */
export const confirmLetterCode = createAsyncThunk<
  LetterProofingResponse, // return type
  { code: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/confirmLetterCode", async (args, thunkAPI) => {
  const data: KeyValues = {
    code: args.code,
  };
  return makeLetterProofingRequest<ConfirmLetterCodeResponse>(thunkAPI, "verify-code", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeLetterProofingRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.letter_proofing_url) {
    throw new Error("Missing configuration letter_proofing_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.letter_proofing_url, endpoint, body, data);
}

/*********************************************************************************************************************/
