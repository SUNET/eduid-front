import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MfaAuthResponse } from "../sagas/login/postRefForWebauthnChallengeSaga";
import { NextResponse, SAMLParameters } from "../sagas/login/postRefLoginSaga";

// Define a type for the slice state
interface LoginState {
  ref?: string;
  next_page?: string;
  post_to?: string;
  mfa: {
    webauthn_challenge?: string;
    webauthn_assertion?: string;
  };
  saml_parameters?: SAMLParameters;
  tou: {
    available_versions?: string[];
    version?: string;
  };
}

// Define the initial state using that type
const initialState: LoginState = {
  ref: undefined,
  next_page: undefined,
  post_to: undefined,
  mfa: {
    webauthn_challenge: undefined,
    webauthn_assertion: undefined,
  },
  saml_parameters: undefined,
  tou: {
    available_versions: undefined,
    version: undefined,
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLoginRef: (state, action: PayloadAction<string>) => {
      // Add the login reference (currently an UUID extracted from the URL), to the store.
      state.ref = action.payload;
    },
    postIdpNextSuccess: (state, action: PayloadAction<NextResponse>) => {
      // Process a successful response from the /next endpoint.
      const samlParameters =
        action.payload.action === "FINISHED"
          ? action.payload.parameters
          : undefined;
      state.next_page = action.payload.action;
      state.post_to = action.payload.target;
      state.saml_parameters = samlParameters;
    },
    addTouVersions: (state, action: PayloadAction<string[]>) => {
      // During app initialisation, we figure out what versions of the TOU we have. Store that in the state.
      state.tou.available_versions = action.payload;
    },
    postIdpTouSuccess: (state, action: PayloadAction<{ version: string }>) => {
      // Process a successful response from the /tou endpoint. We posted our available TOU versions to the
      // backend, and it returns which one it wants us to show to the user. Record that in the state, so that
      // the TermOfUse (sic) component will render it.
      state.tou.version = action.payload.version;
    },
    addMfaAuthWebauthnChallenge: (
      state,
      action: PayloadAction<MfaAuthResponse>
    ) => {
      // Process a successful response from the /mfa_auth endpoint. The response will include a webauthn
      // challenge that we store in the state.
      state.mfa.webauthn_challenge = action.payload.webauthn_options;
    },
    // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
    addWebauthnAssertion: (state, action: PayloadAction<string>) => {
      state.mfa.webauthn_assertion = action.payload;
    },
    // Action connected to postTouVersionsSaga. Posts the versions of the ToU available in this bundle to the /tou endpoint.
    postTouVersions: () => {},
    // Action connected to postUpdatedTouAcceptSaga. Will post the version of the ToU the user accepts to the /tou endpoint.
    updatedTouAccept: () => {},
    // Action connected to postRefLoginSaga.
    callLoginNext: () => {},
    // Action connected to postRefForWebauthnChallengeSaga. Fetches a webauthn challenge from the /mfa_auth endpoint.
    postRefForWebauthnChallenge: () => {},
    // Common action to signal a caught exception in one of the login app sagas. Because it ends in _FAIL,
    // the notifyAndDispatch() middleware will inform the user that the operation failed.
    loginSagaFail: () => {},
    // Action connected to postUsernamePasswordSaga. Will post username and password to the /pw_auth endpoint.
    postUsernamePassword: () => {},
  },
});

export default loginSlice;
