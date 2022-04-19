import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNewDevice,
  fetchAbort,
  fetchNext,
  fetchUseOtherDevice1,
  fetchUseOtherDevice2,
  IdPAction,
  LoginAuthnOptions,
  LoginNextResponse,
  LoginUseOtherDevice1Response,
  LoginUseOtherDevice2Response,
  SAMLParameters,
  ServiceInfo,
} from "apis/eduidLogin";
import { ToUs } from "login/components/LoginApp/Login/TermsOfUse";
import { performAuthentication, webauthnAssertion } from "../../app_utils/helperFunctions/navigatorCredential";
import { MfaAuthResponse } from "../sagas/login/postRefForWebauthnChallengeSaga";

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
    webauthn_challenge?: string;
    webauthn_assertion?: webauthnAssertion;
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
}

// Define the initial state using that type. Export for use as a baseline in tests.
export const initialState: LoginState = {
  mfa: {},
  tou: { available_versions: Object.keys(ToUs) },
  authn_options: {},
};

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
    postIdpTouSuccess: (state, action: PayloadAction<{ version: string }>) => {
      // Process a successful response from the /tou endpoint. We posted our available TOU versions to the
      // backend, and it returns which one it wants us to show to the user. Record that in the state, so that
      // the TermsOfUse component will render it.
      state.tou.version = action.payload.version;
    },
    addMfaAuthWebauthnChallenge: (state, action: PayloadAction<MfaAuthResponse>) => {
      // Process a successful response from the /mfa_auth endpoint. The response will include a webauthn
      // challenge that we store in the state.
      state.mfa.webauthn_challenge = action.payload.webauthn_options;
    },
    /*
     * TODO: These actions that are not related to updating the state shouldn't really be here,
     *       even though it is nice to have them here to simplify imports elsewhere.
     */
    // Action connected to postTouVersionsSaga. Posts the versions of the ToU available in this bundle to the /tou endpoint.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postTouVersions: (_state, _action) => {},
    // Action connected to postUpdatedTouAcceptSaga. Will post the version of the ToU the user accepts to the /tou endpoint.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedTouAccept: (_state, _action) => {},
    callLoginNext: (state) => {
      // Trigger the Login component fetching of next action to perform from the backend.
      state.next_page = undefined;
    },
    // Action connected to postRefForWebauthnChallengeSaga. Fetches a webauthn challenge from the /mfa_auth endpoint.
    // TODO: Use the fetchNext thunk instead, and remove this
    postRefForWebauthnChallenge: () => {},
    // Common action to signal a caught exception in one of the login app sagas. Because it ends in _FAIL,
    // the notifyAndDispatch() middleware will inform the user that the operation failed.
    loginSagaFail: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(performAuthentication.fulfilled, (state, action) => {
        // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
        state.mfa.webauthn_assertion = action.payload;
      })
      .addCase(fetchUseOtherDevice1.fulfilled, (state, action) => {
        // Store the result for the user requesting to use another device to log in.
        if (action.payload.state === "ABORTED" || action.payload.state === "FINISHED") {
          // Remove state in frontend too when backend confirms the request has been aborted or finished
          state.other_device1 = undefined;
          state.next_page = undefined;
        } else {
          state.other_device1 = action.payload;
        }
      })
      .addCase(fetchUseOtherDevice1.rejected, (state) => {
        state.other_device1 = undefined;
      })
      .addCase(fetchUseOtherDevice2.fulfilled, (state, action) => {
        // Store the result from fetching state about logging in on another device (from this device).
        state.other_device2 = action.payload;
      })
      .addCase(fetchUseOtherDevice2.rejected, (state) => {
        state.other_device2 = undefined;
      })
      .addCase(fetchAbort.fulfilled, (state, action) => {
        if (action.payload.finished) {
          // Trigger fetching of /next on successful abort
          state.next_page = undefined;
        }
      })
      .addCase(fetchNext.pending, (state) => {
        state.fetching_next = true;
      })
      .addCase(fetchNext.fulfilled, (state, action) => {
        // Store the result from asking the backend what action to perform next
        const samlParameters = action.payload.action === "FINISHED" ? action.payload.parameters : undefined;
        state.next_page = action.payload.action;
        state.post_to = action.payload.target;
        state.saml_parameters = samlParameters;
        if (action.payload.authn_options) state.authn_options = action.payload.authn_options;
        state.fetching_next = false;
        state.service_info = action.payload.service_info;
      })
      .addCase(fetchNext.rejected, (state) => {
        state.fetching_next = false;
      })
      .addCase(fetchNewDevice.fulfilled, (state, action) => {
        state.this_device = action.payload.new_device;
      });
  },
});

export default loginSlice;
