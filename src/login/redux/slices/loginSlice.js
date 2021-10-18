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
    "POST_IDP_PW_AUTH_SUCCESS": () => {
      // Process a successful response from the /pw_auth endpoint.
      // This is currently a NO-OP. The saga that sent the request and received the response will have
      // also requested a new call to the /next endpoint to see what needs to be done now.
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
    useLoginRef: (state, action) => {
      state.ref = action.payload;
    },
    loginSagaFail: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    postUsernamePassword: (state, { payload }) => ({
      ...state,
      payload,
    }),
    postTouVersions: (state, action) => ({ ...state, ...action.payload }),
    postRefForWebauthnChallenge: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updatedTouAccept: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
    addWebauthnAssertion: (state, action) => {
      state.mfa.webauthn_assertion = action.payload;
    },
  },
});

export default loginSlice;
