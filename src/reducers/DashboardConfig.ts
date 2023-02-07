import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import { appLoadingSlice } from "reducers/AppLoading";

export interface DashboardConfig extends EduidJSAppCommonConfig {
  is_app_loaded: boolean;
  password_entropy?: number;
  default_country_code: string;
  token_verify_idp?: string;
  loading_data: boolean;
}

// export for use in tests
export const initialState: DashboardConfig = {
  debug: false,
  error: false,
  is_configured: false,
  is_app_loaded: false,
  default_country_code: "46",
  loading_data: false,
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
      .addCase(appLoadingSlice.actions.appLoaded, (state) => {
        state.is_app_loaded = true;
      });
  },
});

export default configSlice;
