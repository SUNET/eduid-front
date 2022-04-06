/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface AddEmailsResponse {
  message?: string;
}

/**
 * @public
 * @function fetchLetterProofingState
 * @desc Redux async thunk to get letter proofing state from the backend.
 */
export const getEmailDataState = createAsyncThunk<
  AddEmailsResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("letterProofing/fetchLetterProofingState", async (args, thunkAPI) => {
  return makeAddEmailRequest<AddEmailsResponse>(thunkAPI, "new")
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeAddEmailRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const state = thunkAPI.getState();

      const response = await makeRequest<T>(thunkAPI, state.config.emails_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        return reject(saved);
      }
      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        //   thunkAPI.dispatch(letterProofingFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}
