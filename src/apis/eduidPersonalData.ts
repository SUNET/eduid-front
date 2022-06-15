import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EmailInfo } from "apis/eduidEmail";
import { DashboardAppDispatch, DashboardRootState } from "dashboard-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { LadokData } from "./eduidLadok";

/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */
export interface AllUserData {
  display_name?: string;
  emails: EmailInfo[];
  eppn: string;
  given_name?: string;
  language?: string;
  identities: UserIdentities;
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
export interface NinIdentity {
  number: string;
  verified: boolean;
}

export interface EidasIdentity {
  prid: string;
  prid_persistence: "A" | "B" | "C";
  date_of_birth: string;
  country_code: string;
  verified: boolean;
}

export interface UserIdentities {
  nin?: NinIdentity;
  eidas?: EidasIdentity;
  is_verified: boolean;
}

export interface FetchIdentitiesResponse {
  identities: UserIdentities;
}

/**
 * @public
 * @function fetchIdentities
 * @desc Redux async thunk to fetch users' National Identity Numbers.
 */
export const fetchIdentities = createAsyncThunk<
  FetchIdentitiesResponse, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("personalData/fetchIdentities", async (args, thunkAPI) => {
  return makePersonalDataRequest<FetchIdentitiesResponse>(thunkAPI, "identities", args)
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
