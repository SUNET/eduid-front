import * as onLoadActions from "../actions/addDataToStoreActions";
import * as addDataToStoreActions from "../actions/addDataToStoreActions";
import { createReducer } from "@reduxjs/toolkit";

const loginData = {
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
};

const loginReducer = createReducer(loginData, {
  [onLoadActions.addLoginRef]: (state, action) => {
    // Add the login reference (currently an UUID extracted from the URL), to the store.
    state.ref = action.payload;
  },
  "POST_IDP_NEXT_SUCCESS": (state, action) => {
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
  [addDataToStoreActions.addTouVersions]: (state, action) => {
    // During app initialisation, we figure out what versions of the TOU we have. Store that in the state.
    state.tou.available_versions = action.payload;
  },
  "POST_IDP_TOU_SUCCESS": (state, action) => {
    // Process a successful response from the /tou endpoint. We posted our available TOU versions to the
    // backend, and it returns which one it wants us to show to the user. Record that in the state, so that
    // the TermOfUse (sic) component will render it.
    state.tou.version = action.payload.version;
  },
  "POST_IDP_MFA_AUTH_SUCCESS": (state, action) => {
    // Process a successful response from the /mfa_auth endpoint. The response will include a webauthn
    // challenge that we store in the state.
    // TODO: if action.payload.finished is true there won't be a challenge in the payload.
    state.mfa.webauthn_challenge = action.payload.webauthn_options;
  },
  [onLoadActions.addWebauthnAssertion]: (state, action) => {
    // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
    state.mfa.webauthn_assertion = action.payload;
  },
});

export default loginReducer;
