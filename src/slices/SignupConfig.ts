import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface SignupConfig extends EduidJSAppCommonConfig {
  recaptcha_public_key?: string;
  reset_password_service_url?: string;
  preferred_captcha: "internal" | "recaptcha";
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
      });
  },
});

export default configSlice;
