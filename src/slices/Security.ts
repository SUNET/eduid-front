import { createSlice } from "@reduxjs/toolkit";
import { CredentialType, SecurityResponse, securityApi } from "apis/eduidSecurity";

export interface SecurityState {
  credentials: CredentialType[];
  // from the same response as the credentials, for the Signal API
  rp_id?: string;
  webauthn_user_handle?: string;
  code?: string;
  location?: string;
  webauthn_token_description?: string;
  webauthn_attestation?: RegistrationResponseJSON;
  webauthn_authenticator?: string;
}

// export this for use in tests
export const initialState: SecurityState = {
  credentials: [],
};

function setCredentials(state: SecurityState, payload: SecurityResponse) {
  state.credentials = payload.credentials;
  state.rp_id = payload.rp_id;
  state.webauthn_user_handle = payload.webauthn_user_handle;
}

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(securityApi.endpoints.requestCredentials.matchFulfilled, (state, action) => {
        setCredentials(state, action.payload.payload);
      })
      .addMatcher(securityApi.endpoints.removeWebauthnToken.matchFulfilled, (state, action) => {
        setCredentials(state, action.payload.payload);
      })
      .addMatcher(securityApi.endpoints.postDeleteAccount.matchFulfilled, (state, action) => {
        state.location = action.payload.payload.location;
      })
      .addMatcher(securityApi.endpoints.registerWebauthn.matchFulfilled, (state, action) => {
        setCredentials(state, action.payload.payload);
      });
  },
});
export default securitySlice;
