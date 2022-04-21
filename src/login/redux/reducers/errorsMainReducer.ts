import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface ErrorsConfig extends EduidJSAppCommonConfig {
  static_faq_url?: string;
}

// export for use in tests
export const initialState: ErrorsConfig = {
  available_languages: [],
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
      .addCase(fetchJsConfig.fulfilled, (state, action) => {
        return { ...state, ...action.payload, is_configured: true };
      })
      .addCase(storeCsrfToken, (state, action) => {
        state.csrf_token = action.payload;
      });
  },
});

export default configSlice;
