import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { fetchErrorInfo, LoginErrorInfoResponse } from "apis/eduidLogin";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface ErrorsConfig extends EduidJSAppCommonConfig {
  error_info?: LoginErrorInfoResponse;
  error_info_url?: string;
}

// export for use in tests
export const initialState: ErrorsConfig = {
  debug: false,
  error: false,
  is_configured: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchErrorInfo.fulfilled, (state, action) => {
        state.error_info = action.payload;
      })
      .addCase(fetchJsConfig.fulfilled, (state, action) => {
        return { ...state, ...action.payload, is_configured: true };
      })
      .addCase(storeCsrfToken, (state, action) => {
        state.csrf_token = action.payload;
      });
  },
});

export default configSlice;
