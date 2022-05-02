/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

export interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

export interface PhonesResponse {
  phones: PhoneInfo[];
}

/*********************************************************************************************************************/
/**
 * @public
 * @function postNewPhone
 * @desc Redux async thunk to add a new phone.
 */
export const postNewPhone = createAsyncThunk<
  PhonesResponse, // return type
  { number: string }, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("emails/postNewPhone", async (args, thunkAPI) => {
  const data: KeyValues = {
    number: args.number,
    verified: false,
    primary: false,
  };
  return makeEmailsRequest<PhonesResponse>(thunkAPI, "new", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeEmailsRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.phone_url) {
    throw new Error("Missing configuration phone_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.phone_url, endpoint, body, data);
}
