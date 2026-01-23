import { createSlice } from "@reduxjs/toolkit";

// export for use in tests
export const initialState = {};

export const appLoadingSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    appLoaded: () => {
      // This action is handled by IndexConfig.ts to set is_app_loaded
    },
  },
});
