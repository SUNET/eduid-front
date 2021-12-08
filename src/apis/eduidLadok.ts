/*
 * Code and data structures for talking to the eduid-ladok backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "./personalData";
import { DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { getRequest, postRequest } from "../sagas/ts_common";
import { checkStatus } from "../sagas/common";

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

    let ladok_url = state.config.ladok_url;
    if (!ladok_url.endsWith("/")) {
      ladok_url = ladok_url.concat("/");
    }
    const universities_url = ladok_url + "universities";

    const response: PayloadAction<LadokUniversitiesResponse, string, never, boolean> = await fetch(universities_url, {
      ...getRequest,
      signal: thunkAPI.signal,
    })
      .then(checkStatus)
      .then((response) => response.json());

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
  PDLadok,
  { ladok_name: string },
  { dispatch: DashboardAppDispatch; state: DashboardRootState }
>("ladok/linkUser", async (args, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as DashboardRootState;

    let ladok_url = state.config.ladok_url;
    if (!ladok_url.endsWith("/")) {
      ladok_url = ladok_url.concat("/");
    }
    const link_user_url = ladok_url + "link-user";

    const data = {
      csrf_token: state.config.csrf_token,
      ladok_name: args.ladok_name,
    };

    const response: PayloadAction<LadokLinkUserResponse, string, never, boolean> = await fetch(link_user_url, {
      ...postRequest,
      body: JSON.stringify(data),
      signal: thunkAPI.signal,
    })
      .then(checkStatus)
      .then((response) => response.json());

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload.ladok;
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
