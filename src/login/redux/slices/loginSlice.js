import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    ref: null,
    next_page: null,
    post_to: null,
    mfa: {
      webauthn_challenge: null,
      webauthn_assertion: null,
    },
    saml_parameters: null,
    tou: {
      available_versions: null,
      version: null,
    },
  },
  reducers: {
    addLoginRef: (state, action) => {
      // Add the login reference (currently an UUID extracted from the URL), to the store.
      state.ref = action.payload;
    },
    postIdpNextSuccess: (state, action) => {
      // Process a successful response from the /next endpoint.
      const samlParameters =
        action.payload.action === "FINISHED" ? action.payload.parameters : null;
      state.next_page = action.payload.action;
      state.post_to = action.payload.target;
      state.saml_parameters = samlParameters;
    },
    addTouVersions: (state, action) => {
      // During app initialisation, we figure out what versions of the TOU we have. Store that in the state.
      state.tou.available_versions = action.payload;
    },
    postIdpTouSuccess: (state, action) => {
      // Process a successful response from the /tou endpoint. We posted our available TOU versions to the
      // backend, and it returns which one it wants us to show to the user. Record that in the state, so that
      // the TermOfUse (sic) component will render it.
      state.tou.version = action.payload.version;
    },
    postIdpMfaAuthSuccess: (state, action) => {
      // Process a successful response from the /mfa_auth endpoint. The response will include a webauthn
      // challenge that we store in the state.
      // TODO: if action.payload.finished is true there won't be a challenge in the payload.
      state.mfa.webauthn_challenge = action.payload.webauthn_options;
    },
    // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
    addWebauthnAssertion: (state, action) => {
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
