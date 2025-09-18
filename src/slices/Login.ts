import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IdPAction,
  loginApi,
  LoginAuthnOptions,
  LoginNextResponse,
  LoginUseOtherDevice1Response,
  LoginUseOtherDevice2Response,
  SAMLParameters,
  ServiceInfo,
} from "apis/eduidLogin";
import { ToUs } from "helperFunctions/ToUs";

// Define a type for the slice state
interface LoginState {
  ref?: string;
  this_device?: string;
  previous_this_device?: string; // when disabling 'remember me', this_device is remembered here if the user regrets it
  remember_me?: boolean;
  start_url?: string; // what to use as 'return URL' when sending the user off for external authentication (Freja)
  next_page?: IdPAction; // should be called 'current page'
  fetching_next?: boolean;
  post_to?: string; // the target endpoint for the action at the current page
  mfa: {
    state?: "loading" | "loaded";
  };
  saml_parameters?: SAMLParameters;
  tou: {
    available_versions: string[];
    version?: string;
  };
  authn_options: LoginAuthnOptions;
  other_device1?: LoginUseOtherDevice1Response; // state on device 1 (rendering QR code)
  other_device2?: LoginUseOtherDevice2Response; // state on device 2 (scanning QR code)
  service_info?: ServiceInfo;
  error?: string;
}

// Define the initial state using that type. Export for use as a baseline in tests.
export const initialState: LoginState = {
  mfa: {},
  tou: { available_versions: Object.keys(ToUs) },
  authn_options: {},
};

interface ActionWithErrorMessage {
  payload: {
    error: string;
    payload: {
      message: string;
    };
  };
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLoginRef: (state, action: PayloadAction<{ ref: string; start_url: string }>) => {
      // Add the login reference (currently an UUID extracted from the URL), to the store.
      state.ref = action.payload.ref;
      state.start_url = action.payload.start_url;
    },
    addThisDevice: (state, action: PayloadAction<string>) => {
      // Add the identifier for this device from local storage.
      state.this_device = action.payload;
    },
    clearThisDevice: (state) => {
      if (state.this_device !== undefined) {
        // Move contents from this_device to previous_this_device
        state.previous_this_device = state.this_device;
      }
      state.this_device = undefined;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      // Set the 'remember me' user preference.
      state.remember_me = action.payload;
    },
    startLoginWithAnotherDevice: (state, action: PayloadAction<{ username?: string }>) => {
      if (action.payload.username && !state.authn_options.forced_username) {
        state.authn_options.forced_username = action.payload.username;
      }
      state.next_page = "OTHER_DEVICE";
    },
    stopLoginWithAnotherDevice: (state) => {
      // Abort/cancel/recover from use another device state
      state.next_page = undefined;
      state.other_device1 = undefined;
    },
    postIdpNextSuccess: (state, action: PayloadAction<LoginNextResponse>) => {
      // Process a successful response from the /next endpoint.
      // TODO: Use the fetchNext thunk instead, and remove this
      const samlParameters = action.payload.action === "FINISHED" ? action.payload.parameters : undefined;
      state.next_page = action.payload.action;
      state.post_to = action.payload.target;
      state.saml_parameters = samlParameters;
      if (action.payload.authn_options) state.authn_options = action.payload.authn_options;
    },
    callLoginNext: (state) => {
      // Trigger the Login component fetching of next action to perform from the backend.
      state.next_page = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.fetchUseOtherDevice1.matchFulfilled, (state, action) => {
        // Store the result for the user requesting to use another device to log in.
        if (action.payload.payload.state === "ABORTED" || action.payload.payload.state === "FINISHED") {
          // Remove state in frontend too when backend confirms the request has been aborted or finished
          state.other_device1 = undefined;
          state.next_page = undefined;
        } else {
          state.other_device1 = action.payload.payload;
        }
      })
      .addMatcher(loginApi.endpoints.fetchUseOtherDevice1.matchRejected, (state) => {
        state.other_device1 = undefined;
      })
      .addMatcher(loginApi.endpoints.fetchUseOtherDevice2.matchFulfilled, (state, action) => {
        // Store the result from fetching state about logging in on another device (from this device).
        state.other_device2 = action.payload.payload;
      })
      .addMatcher(loginApi.endpoints.fetchUseOtherDevice2.matchRejected, (state) => {
        state.other_device2 = undefined;
      })
      .addMatcher(loginApi.endpoints.fetchAbort.matchFulfilled, (state, action) => {
        if (action.payload.payload.finished) {
          // Trigger fetching of /next on successful abort
          state.next_page = undefined;
        }
      })
      .addMatcher(loginApi.endpoints.fetchNext.matchPending, (state) => {
        state.fetching_next = true;
      })
      .addMatcher(loginApi.endpoints.fetchNext.matchFulfilled, (state, action) => {
        // Store the result from asking the backend what action to perform next
        const samlParameters =
          action.payload.payload.action === "FINISHED" ? action.payload.payload.parameters : undefined;
        state.next_page = action.payload.payload.action;
        state.post_to = action.payload.payload.target;
        state.saml_parameters = samlParameters;
        if (action.payload.payload.authn_options) state.authn_options = action.payload.payload.authn_options;
        state.fetching_next = false;
        state.service_info = action.payload.payload.service_info;
        state.error = undefined;
      })
      .addMatcher(loginApi.endpoints.fetchNext.matchRejected, (state, action) => {
        if (
          (action as ActionWithErrorMessage).payload.error &&
          (action as ActionWithErrorMessage).payload.payload.message === "login.user_terminated"
        ) {
          state.error = (action as ActionWithErrorMessage).payload.payload.message;
        }
        state.fetching_next = false;
      })
      .addMatcher(loginApi.endpoints.fetchNewDevice.matchFulfilled, (state, action) => {
        state.this_device = action.payload.payload.new_device;
      })
      .addMatcher(loginApi.endpoints.fetchMfaAuth.matchPending, (state) => {
        state.mfa = { state: "loading" };
      })
      .addMatcher(loginApi.endpoints.fetchMfaAuth.matchFulfilled, (state, action) => {
        if (action.payload.payload.finished) {
          // Trigger fetching of /next on successful MFA authentication
          state.next_page = undefined;
        }
        state.mfa.state = "loaded";
      })
      .addMatcher(loginApi.endpoints.fetchToU.matchFulfilled, (state, action) => {
        if (action.payload.payload.version) {
          state.tou.version = action.payload.payload.version;
        }
      });
  },
});

export default loginSlice;
