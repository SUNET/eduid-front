import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EmailInfo } from "apis/eduidEmail";
import { EduIDAppDispatch, EduIDAppRootState } from "eduid-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";
import { LadokData } from "./eduidLadok";
import { OrcidInfo } from "./eduidOrcid";

/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */

export interface PreferencesData {
  always_use_security_key: boolean;
  message?: string;
}

export interface PersonalDataRequest {
  given_name?: string;
  surname?: string;
  chosen_given_name?: string;
  language?: string;
  preferences?: PreferencesData;
}

export interface UserNameRequest {
  given_name?: string;
  surname?: string;
  chosen_given_name?: string;
  preferences?: PreferencesData;
}

export interface UserLanguageRequest {
  language: string;
}

export interface AllUserData {
  chosen_given_name?: string;
  emails: EmailInfo[];
  eppn: string;
  given_name?: string;
  language?: string;
  identities: UserIdentities;
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
export interface FrejaeIDIdentity extends EidasIdentity {}

export interface UserIdentities {
  nin?: NinIdentity;
  eidas?: EidasIdentity;
  freja?: FrejaeIDIdentity;
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/postPersonalData", async (args, thunkAPI) => {
  const data: KeyValues = {
    chosen_given_name: args.chosen_given_name,
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
 * @function postUserName
 * @desc Redux async thunk to post user name.
 */
export const postUserName = createAsyncThunk<
  AllUserData, // return type
  PersonalDataRequest, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/postUserName", async (args, thunkAPI) => {
  const data: KeyValues = {
    chosen_given_name: args.chosen_given_name,
    given_name: args.given_name,
    surname: args.surname,
  };
  return makePersonalDataRequest<AllUserData>(thunkAPI, "user/name", data)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function postUserLanguage
 * @desc Redux async thunk to post user language.
 */
export const postUserLanguage = createAsyncThunk<
  AllUserData, // return type
  UserLanguageRequest, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/postUserLanguage", async (args, thunkAPI) => {
  const data: KeyValues = {
    language: args.language,
  };
  return makePersonalDataRequest<AllUserData>(thunkAPI, "user/language", data)
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
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
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/fetchIdentities", async (args, thunkAPI) => {
  return makePersonalDataRequest<FetchIdentitiesResponse>(thunkAPI, "identities", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
/**
 * @public
 * @function postSecurityKeyPreference
 * @desc Redux async thunk to post user preferences
 */
export const postSecurityKeyPreference = createAsyncThunk<
  PreferencesData, // return type
  PreferencesData, // args type
  { dispatch: EduIDAppDispatch; state: EduIDAppRootState }
>("personalData/postSecurityKeyPreference", async (args, thunkAPI) => {
  return makePersonalDataRequest<any>(thunkAPI, "preferences", args)
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

  if (!state.config.personal_data_service_url) {
    throw new Error("Missing configuration personal_data_service_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.personal_data_service_url, endpoint, body, data);
}
