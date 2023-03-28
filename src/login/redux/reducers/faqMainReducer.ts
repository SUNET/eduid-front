import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig } from "commonConfig";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FaqConfig extends EduidJSAppCommonConfig {}

// export for use in tests
export const initialState: FaqConfig = {
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
