import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import { appLoaded } from "login/components/App/App_actions";

export interface DashboardConfig extends EduidJSAppCommonConfig {
  is_app_loaded: boolean;
  password_entropy?: number;
  default_country_code: string;
  token_verify_idp?: string;
  loading_data: boolean;
}

// export for use in tests
export const initialState: DashboardConfig = {
  available_languages: [],
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
      .addCase(appLoaded, (state) => {
        state.is_app_loaded = true;
      });
  },
});

export default configSlice;

// import * as actions from "actions/DashboardConfig";
// import * as loadingDataActions from "../login/redux/actions/loadingDataActions";

// // see the config params in eduid-developer/etcd/conf.yaml
// const configData = {
//   show_sidebar: true,
//   is_configured: false,
//   loading_data: false,
//   //is_fetching: false,

//   is_app_loaded: false,
//   available_languages: [],
//   debug: true,
// };

// const urls_with_no_sidebar = ["chpass"];

// let configReducer = (state = configData, action) => {
//   switch (action.type) {
//     case actions.APP_LOADED:
//       return {
//         ...state,
//         is_fetching: false,
//         is_app_loaded: true,
//       };
//     case actions.GET_JSCONFIG_CONFIG:
//       return {
//         ...state,
//         is_configured: false,
//       };
//     case actions.GET_JSCONFIG_CONFIG_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//         is_configured: true,
//       };
//     case actions.GET_JSCONFIG_CONFIG_FAIL:
//       return {
//         ...state,
//         is_configured: false,
//       };
//     case actions.NEW_CSRF_TOKEN:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case "@@router/LOCATION_CHANGE": {
//       let show_sidebar = true;
//       if (urls_with_no_sidebar.filter((v) => action.payload.pathname.endsWith(v)).length > 0) {
//         show_sidebar = false;
//       }
//       return {
//         ...state,
//         show_sidebar: show_sidebar,
//       };
//     }
//     case loadingDataActions.loadingData.toString():
//       return {
//         ...state,
//         loading_data: true,
//       };
//     case loadingDataActions.loadingDataComplete.toString():
//       return {
//         ...state,
//         loading_data: false,
//       };
//     default:
//       return state;
//   }
// };

// export default configReducer;
