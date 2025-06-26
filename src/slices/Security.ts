import { createSlice } from "@reduxjs/toolkit";
import { CredentialType, securityApi } from "apis/security";
import { webauthnAttestation } from "helperFunctions/navigatorCredential";

export interface SecurityState {
  credentials: CredentialType[];
  code?: string;
  location?: string;
  webauthn_token_description?: string;
  webauthn_attestation?: webauthnAttestation;
  webauthn_authenticator?: string;
}

// export this for use in tests
export const initialState: SecurityState = {
  credentials: [],
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(securityApi.endpoints.requestCredentials.matchFulfilled, (state, action) => {
        state.credentials = action.payload.payload.credentials;
      })
      .addMatcher(securityApi.endpoints.removeWebauthnToken.matchFulfilled, (state, action) => {
        state.credentials = action.payload.payload.credentials;
      })
      .addMatcher(securityApi.endpoints.postDeleteAccount.matchFulfilled, (state, action) => {
        state.location = action.payload.payload.location;
      })
      .addMatcher(securityApi.endpoints.registerWebauthn.matchFulfilled, (state, action) => {
        state.credentials = action.payload.payload.credentials;
      })
  },
});
export default securitySlice;
