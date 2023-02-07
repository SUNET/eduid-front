import { createSlice } from "@reduxjs/toolkit";

// export for use in tests
export const initialState = {
  is_loaded: false,
  loading_data: false,
  request_in_progress: false,
};

export const appLoadingSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    appLoaded: (state) => {
      state.is_loaded = true;
    },
    loadingData: (state) => {
      state.loading_data = true;
    },
    loadingDataComplete: (state) => {
      state.loading_data = false;
    },
    requestInProgress: (state) => {
      state.request_in_progress = true;
    },
    requestCompleted: (state) => {
      state.request_in_progress = false;
    },
  },
});
