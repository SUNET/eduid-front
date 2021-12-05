import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "apis/personalData";
import { checkStatus } from "sagas/common";
import { getRequest } from "sagas/ts_common";

interface LadokState {
  linked: boolean;
  external_id?: string;
  uni_ladok_name?: string;
  unis?: { [key: string]: LadokUniversity };
  unis_fetch_failed?: boolean;
}

export interface LadokUniversity {
  names: { [key: string]: string }; // mapping from locale name to name of university
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
    const fetchResponse = await fetch("/ladok/universities", { ...getRequest, signal: thunkAPI.signal });
    console.log("FETCH RESPONSE: ", fetchResponse);
    const response: PayloadAction<LadokUniversitiesResponse> = checkStatus(fetchResponse);
    console.log("LADOK UNIS: ", response.payload.universities);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLadokUniversities.fulfilled, (state, action) => {
        console.log("FULFILLED IN REDUCER WITH ACTION: ", action);
        state.unis_fetch_failed = false;
      })
      .addCase(fetchLadokUniversities.rejected, (state, action) => {
        console.log("REJECTED IN REDUCER WITH ACTION: ", action);
        state.unis_fetch_failed = true;
      });
  },
});

export default ladokSlice;
