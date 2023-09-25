import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EmailInfo } from "apis/eduidEmail";
import { IndexAppDispatch as DashboardAppDispatch, IndexRootState as DashboardRootState } from "eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { LadokData } from "./eduidLadok";
import { OrcidInfo } from "./eduidOrcid";
import { PhoneInfo } from "./eduidPhone";

/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */

export interface PersonalDataRequest {
  given_name?: string;
  surname?: string;
  display_name?: string;
  language?: string;
}

export interface AllUserData {
  display_name?: string;
  emails: EmailInfo[];
  eppn: string;
  given_name?: string;
  language?: string;
  identities: UserIdentities;
  phones: PhoneInfo[];
  surname?: string;
  orcid?: OrcidInfo;
  ladok?: LadokData;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SvipeIdentity extends EidasIdentity {}

export interface UserIdentities {
  nin?: NinIdentity;
  eidas?: EidasIdentity;
  svipe?: SvipeIdentity;
  is_verified: boolean;
}

export interface FetchIdentitiesResponse {
  identities: UserIdentities;
}

/*********************************************************************************************************************/
/**
 * @public
 * @function postPersonalData
 * @desc Redux async thunk to post personal data.
 */
export const postPersonalData = createAsyncThunk<
  AllUserData, // return type
  PersonalDataRequest, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("personalData/postPersonalData", async (args, thunkAPI) => {
  const data: KeyValues = {
    display_name: args.display_name,
    given_name: args.given_name,
    surname: args.surname,
    language: args.language,
  };
  return makePersonalDataRequest<AllUserData>(thunkAPI, "user", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function requestAllPersonalData
 * @desc Redux async thunk to fetch all personal data.
 */
export const requestAllPersonalData = createAsyncThunk<
  AllUserData, // return type
  undefined, // args type
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("personalData/requestAllPersonalData", async (args, thunkAPI) => {
  return makePersonalDataRequest<AllUserData>(thunkAPI, "all-user-data", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
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
