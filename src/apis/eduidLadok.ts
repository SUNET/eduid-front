/*
 * Code and data structures for talking to the eduid-ladok backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  const body: KeyValues = {
    ladok_name: args.ladok_name,
  };

  return makeLadokRequest<LadokLinkUserResponse>(thunkAPI, "link-user", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
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
  const body: KeyValues = {};
  return makeLadokRequest<LadokLinkUserResponse>(thunkAPI, "unlink-user", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

function makeLadokRequest<T>(
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

      if (!state.config.ladok_service_url) {
        throw new Error("Missing configuration ladok_service_url");
      }

      const response = await makeRequest<T>(thunkAPI, state.config.ladok_service_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        reject(saved);
      }

      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(ladokFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}

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
