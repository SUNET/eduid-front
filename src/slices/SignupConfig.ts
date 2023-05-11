import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { LoginErrorInfoResponse, fetchErrorInfo } from "apis/eduidLogin";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface SignupConfig extends EduidJSAppCommonConfig {
  recaptcha_public_key?: string;
  reset_password_link?: string;
  preferred_captcha: "internal" | "recaptcha";
  error_info?: LoginErrorInfoResponse;
  error_info_url?: string;
}

// export for use in tests
export const initialState: SignupConfig = {
  debug: false,
  error: false,
  is_configured: false,
  preferred_captcha: "internal",
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
      })
      .addCase(fetchErrorInfo.fulfilled, (state, action) => {
        state.error_info = action.payload;
      });
  },
});

export default configSlice;
