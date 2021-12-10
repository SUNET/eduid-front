/*
 * Code and data structures for talking to the eduid-ladok backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { eduidRMAllNotify } from "actions/Notifications";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

export interface LadokUniversityData {
  [key: string]: LadokUniversity;
}

export interface LadokUniversity {
  ladok_name: string;
  name: { [locale: string]: string }; // mapping from locale name to name of university
}

// Data about a user in Ladok
export interface LadokData {
  external_id: string; // Ladok's unique and stable identifier for a user
  university: LadokUniversity; // The source of the information
}

export interface LadokUniversitiesResponse {
  universities: LadokUniversityData;
}

export interface LadokLinkUserResponse {
  ladok: LadokData;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LadokUnlinkUserResponse {}

function makeLadokRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  return makeRequest(thunkAPI, state.config.ladok_url, endpoint, body, data);
}

/**
 * @public
 * @function fetchLadokUniversities
 * @desc Redux async thunk to get info about universities eduID can access in Ladok.
 */
export const fetchLadokUniversities = createAsyncThunk<
  LadokUniversityData,
  undefined,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("ladok/fetchUniversities", async (args, thunkAPI) => {
  try {
    const response = await makeLadokRequest<LadokUniversitiesResponse>(thunkAPI, "universities");

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload.universities;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(ladokFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

/**
 * @public
 * @function linkUser
 * @desc Redux async thunk to attempt linking an eduID user to Ladok data from a university.
 */
export const linkUser = createAsyncThunk<
  LadokLinkUserResponse,
  { ladok_name: string },
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("ladok/linkUser", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {
      ladok_name: args.ladok_name,
    };

    const response = await makeLadokRequest<LadokLinkUserResponse>(thunkAPI, "link-user", body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    // clear any displayed errors (presumably from selecting another university right before this)
    thunkAPI.dispatch(eduidRMAllNotify());

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(ladokFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

/**
 * @public
 * @function unlinkUser
 * @desc Redux async thunk to unlink the users account from Ladok.
 */
export const unlinkUser = createAsyncThunk<
  LadokUnlinkUserResponse,
  undefined,
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("ladok/unlinkUser", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {};

    const response = await makeLadokRequest<LadokLinkUserResponse>(thunkAPI, "unlink-user", body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    // clear any displayed errors or messages
    thunkAPI.dispatch(eduidRMAllNotify());

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(ladokFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const ladokFail = createAction("LADOK_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
