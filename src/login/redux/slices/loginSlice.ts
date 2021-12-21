import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAuthnOptions, LoginAuthnOptions } from "apis/eduidLogin";
import { ToUs } from "login/components/LoginApp/Login/TermsOfUse";
import { performAuthentication, webauthnAssertion } from "../../app_utils/helperFunctions/navigatorCredential";
import { MfaAuthResponse } from "../sagas/login/postRefForWebauthnChallengeSaga";
import { NextResponse, SAMLParameters } from "../sagas/login/postRefLoginSaga";

// Define a type for the slice state
interface LoginState {
  ref?: string;
  start_url?: string;
  next_page?: string;
  post_to?: string;
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
    postIdpNextSuccess: (state, action: PayloadAction<NextResponse>) => {
      // Process a successful response from the /next endpoint.
      const samlParameters = action.payload.action === "FINISHED" ? action.payload.parameters : undefined;
      state.next_page = action.payload.action;
      state.post_to = action.payload.target;
      state.saml_parameters = samlParameters;
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
    // Action connected to postRefLoginSaga.
    callLoginNext: () => {},
    // Action connected to postRefForWebauthnChallengeSaga. Fetches a webauthn challenge from the /mfa_auth endpoint.
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
      .addCase(fetchAuthnOptions.fulfilled, (state, action) => {
        // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
        state.authn_options = action.payload;
      });
  },
});

export default loginSlice;
