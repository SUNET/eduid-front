import { NinInfo } from "reducers/Identities";
import { LadokData } from "./eduidLadok";
import { EmailInfo } from "apis/eduidEmail";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardAppDispatch, DashboardRootState } from "dashboard-init-app";

/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */
export interface AllUserData {
  display_name?: string;
  emails: EmailInfo[];
  eppn: string;
  given_name?: string;
  language?: string;
  nins: NinInfo[];
  phones: PDPhone[];
  surname?: string;
  orcid?: PDOrcid;
  ladok?: LadokData;
}

export interface PDPhone {
  number: string;
  primary: boolean;
  verified: boolean;
}

export interface PDOrcid {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
}

/*********************************************************************************************************************/
export interface FetchNinsResponse {
  nins: NinInfo[];
}

/**
 * @public
 * @function fetchNins
 * @desc Redux async thunk to fetch users' National Identity Numbers.
 */
export const fetchNins = createAsyncThunk<
  FetchNinsResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("personalData/fetchNins", async (args, thunkAPI) => {
  return makePersonalDataRequest<FetchNinsResponse>(thunkAPI, "nins", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
function makePersonalDataRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.personal_data_url) {
    throw new Error("Missing configuration personal_data_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.personal_data_url, endpoint, body, data);
}
