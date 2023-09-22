import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { LoginErrorInfoResponse, fetchErrorInfo } from "apis/eduidLogin";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import { appLoadingSlice } from "slices/AppLoading";

export interface IndexConfig extends EduidJSAppCommonConfig {
  recaptcha_public_key?: string;
  reset_password_link?: string;
  preferred_captcha: "internal" | "recaptcha";
  error_info?: LoginErrorInfoResponse;
  error_info_url?: string;
  is_app_loaded: boolean;
  password_entropy?: number;
  default_country_code: string;
  token_verify_idp?: string;
  loading_data: boolean;
  next_url?: string;
  mfa_auth_idp?: string;
}

// export for use in tests
export const initialState: IndexConfig = {
  debug: false,
  error: false,
  is_configured: false,
  preferred_captcha: "internal",
  is_app_loaded: false,
  default_country_code: "46",
  loading_data: false,
};

const indexSlice = createSlice({
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
      })
      .addCase(appLoadingSlice.actions.appLoaded, (state) => {
        state.is_app_loaded = true;
      });
  },
});

export default indexSlice;
