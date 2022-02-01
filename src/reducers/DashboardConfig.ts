import { createSlice } from "@reduxjs/toolkit";
import * as actions from "actions/DashboardConfig";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import * as loadingDataActions from "../login/redux/actions/loadingDataActions";

export interface DashboardConfig extends EduidJSAppCommonConfig {
  is_fetching: boolean;
  is_app_loaded: boolean;
  loading_data: boolean;
  password_entropy?: number;
}

// export for use in test cases
export const initialState: DashboardConfig = {
  available_languages: [],
  debug: true,
  error: false,
  is_app_loaded: false,
  is_configured: false,
  is_fetching: false,
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
      .addCase(fetchJsConfig.rejected, (state) => {
        state.is_configured = false;
      })
      .addCase(storeCsrfToken, (state, action) => {
        state.csrf_token = action.payload;
      })
      .addCase(actions.APP_LOADED, (state) => {
        state.is_fetching = false;
        state.is_app_loaded = true;
      })
      .addCase(loadingDataActions.loadingData, (state) => {
        state.loading_data = true;
      })
      .addCase(loadingDataActions.loadingDataComplete, (state) => {
        state.loading_data = false;
      });
  },
});

export default configSlice;
