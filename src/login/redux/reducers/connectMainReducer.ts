import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";

// export for use in tests
export const initialState = {
  debug: false,
  error: false,
  is_configured: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJsConfig.fulfilled, (state, action) => {
      return { ...state, ...action.payload, is_configured: true };
    });
  },
});

export default configSlice;
