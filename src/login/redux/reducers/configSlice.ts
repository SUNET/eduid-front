import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface LoginConfig extends EduidJSAppCommonConfig {
  next_url?: string;
  sentry_dsn?: string;
  mfa_auth_idp?: string;
  eidas_url?: string;
  base_url?: string;
}

// export for use in tests
export const initialState: LoginConfig = {
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
        return { ...state, ...action.payload };
      })
      .addCase(storeCsrfToken, (state, action) => {
        state.csrf_token = action.payload;
      });
  },
});

export default configSlice;
