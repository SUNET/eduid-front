import { createSlice } from "@reduxjs/toolkit";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";

export interface LoginConfig extends EduidJSAppCommonConfig {
  next_url?: string;
  error_info_url?: string;
  mfa_auth_idp?: string;
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
        return { ...state, ...action.payload, is_configured: true };
      })
      .addCase(storeCsrfToken, (state, action) => {
        state.csrf_token = action.payload;
      });
  },
});

export default configSlice;

// import * as actions from "./init_actions";

// const initData = {
//   csrf_token: "",
//   error: false,
//   debug: true,
//   available_languages: [],
//   next_url: null,
//   sentry_dsn: null,
// };

// let initReducer = (state = initData, action) => {
//   switch (action.type) {
//     case actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default initReducer;
