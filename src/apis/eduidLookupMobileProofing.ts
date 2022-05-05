import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface LookupMobileProofingResponse {
  success: boolean;
  message: string;
}

/**
 * @public
 * @function lookupMobileProofing
 * @desc Redux async thunk to invoke the backend endpoint that will try to perform a mobile proofing of this user.
 */
export const lookupMobileProofing = createAsyncThunk<
  LookupMobileProofingResponse, // return type
  string, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("lookupMobileProofing/proofing", async (nin, thunkAPI) => {
  const body: KeyValues = {
    nin: nin,
  };

  return makeLookupMobileProofingRequest<LookupMobileProofingResponse>(thunkAPI, undefined, body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makeLookupMobileProofingRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint?: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.lookup_mobile_proofing_url) {
    throw new Error("Missing configuration lookup_mobile_proofing_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.lookup_mobile_proofing_url, endpoint, body, data);
}
