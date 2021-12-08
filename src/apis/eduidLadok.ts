/*
 * Code and data structures for talking to the eduid-ladok backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "./personalData";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { checkStatus, getRequest, postRequest } from "../sagas/ts_common";

export interface LadokUniversityData {
  [key: string]: LadokUniversity;
}

export interface LadokUniversity {
  names: { [locale: string]: string }; // mapping from locale name to name of university
}

export interface LadokUniversitiesResponse {
  universities: { [key: string]: { name_en: string; name_sv: string } };
}

export interface LadokLinkUserResponse {
  ladok: PDLadok;
}

export interface KeyValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function makeLadokRequest<T>(
  state: DashboardRootState,
  endpoint: string,
  data: KeyValues = {},
  body?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  let ladok_url = state.config.ladok_url;
  if (!ladok_url.endsWith("/")) {
    ladok_url = ladok_url.concat("/");
  }
  const url = ladok_url + endpoint;

  // Add the current CSRF token
  if (body !== undefined && body.csrf_token === undefined) {
    body.csrf_token = state.config.csrf_token;
  }

  // do POST if there is a body, otherwise GET
  const req = body === undefined ? getRequest : postRequest;

  const request: RequestInit = {
    ...req,
    ...data,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  return fetch(url, request)
    .then(checkStatus)
    .then(async (response) => (await response.json()) as PayloadAction<T, string, never, boolean>);
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
    const state = thunkAPI.getState() as DashboardRootState;

    const response = await makeLadokRequest<LadokUniversitiesResponse>(state, "universities", {
      signal: thunkAPI.signal,
    });

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    /*
     * The backend returns data like
     *  {'Uni-A': {name_sv: 'Svenskt namn',
     *             name_en: 'English name',
     *            }
     *  }
     *
     * While we want to store it as
     *
     *  {'Uni-A': {names: {sv: 'Svenskt namn',
     *                     en: 'English name',
     *                    }
     *             }
     *  }
     *
     * Since that makes it easier to find the name using our locale, so we re-format it before dispatching it.
     */
    const uni_data: LadokUniversityData = {};
    Object.keys(response.payload.universities).forEach((key) => {
      uni_data[key] = {
        names: {
          en: response.payload.universities[key].name_en,
          sv: response.payload.universities[key].name_sv,
        },
      };
    });

    return uni_data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(fetchUniversitiesFail(error.toString()));
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
    const state = thunkAPI.getState() as DashboardRootState;

    const body: KeyValues = {
      ladok_name: args.ladok_name,
    };

    const response = await makeLadokRequest<LadokLinkUserResponse>(
      state,
      "link-user",
      { signal: thunkAPI.signal },
      body
    );

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(linkUserFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const fetchUniversitiesFail = createAction("FETCH_LADOK_UNIVERSITIES_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});

// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const linkUserFail = createAction("LADOK_LINK_USER_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
