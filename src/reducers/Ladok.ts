import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "apis/personalData";
import { DashboardRootState } from "dashboard-init-app";
import { checkStatus } from "sagas/common";
import { getRequest } from "sagas/ts_common";

interface LadokUniversityData {
  [key: string]: LadokUniversity;
}

interface LadokState {
  linked: boolean;
  external_id?: string;
  uni_ladok_name?: string;
  unis?: LadokUniversityData;
  unis_fetch_failed?: boolean;
}

export interface LadokUniversity {
  names: { [locale: string]: string }; // mapping from locale name to name of university
}

export interface LadokUniversitiesResponse {
  universities: { [key: string]: { name_en: string; name_sv: string } };
}

const initialState: LadokState = { linked: false };

/**
 * @public
 * @function fetchConfig
 * @desc Redux async thunk to get info about universities eduID can access in Ladok.
 */
export const fetchLadokUniversities = createAsyncThunk("ladok/fetchUniversities", async (args, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as DashboardRootState;

    let ladok_url = state.config.ladok_url;
    if (!ladok_url.endsWith("/")) {
      ladok_url = ladok_url.concat("/");
    }
    const universities_url = ladok_url + "universities";

    const response: PayloadAction<LadokUniversitiesResponse> = await fetch(universities_url, {
      ...getRequest,
      signal: thunkAPI.signal,
    })
      .then(checkStatus)
      .then((response) => response.json());

    if (response.payload.universities) {
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
      thunkAPI.dispatch(ladokSlice.actions.updateUniversities(uni_data));
    }

    return response.payload.universities;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(fetchUniversitiesFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

// Fake an error response from the backend. The action ending in _FAIL ought to mean the notification
// middleware picks this error up and shows something to the user.
export const fetchUniversitiesFail = createAction("FETCH_LADOK_UNIVERSITIES_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});

const ladokSlice = createSlice({
  name: "ladok",
  initialState,
  reducers: {
    updateLadok: (state, action: PayloadAction<PDLadok>) => {
      /* Update user state from a personal-data all-user-data backend response */
      state.external_id = action.payload.external_id;
      state.uni_ladok_name = action.payload.university.ladok_name;
      state.linked = action.payload.external_id !== undefined && action.payload.university !== undefined;
    },
    updateUniversities: (state, action: PayloadAction<LadokUniversityData>) => {
      state.unis = action.payload;
      state.unis_fetch_failed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLadokUniversities.rejected, (state) => {
      state.unis_fetch_failed = true;
    });
  },
});

export default ladokSlice;
