import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  beginRegisterWebauthn,
  CredentialType,
  postDeleteAccount,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
} from "apis/eduidSecurity";
import { createCredential, webauthnAttestation } from "helperFunctions/navigatorCredential";

export interface SecurityState {
  credentials: CredentialType[];
  code?: string;
  location?: string;
  webauthn_token_description?: string;
  webauthn_attestation?: webauthnAttestation;
  webauthn_authenticator?: string;
  registration_data?: string;
}

// export this for use in tests
export const initialState: SecurityState = {
  credentials: [],
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    chooseAuthenticator: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        webauthn_authenticator: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(beginRegisterWebauthn.fulfilled, (state, action) => {
      state.registration_data = action.payload;
    });
    builder.addCase(createCredential.fulfilled, (state, action) => {
      state.webauthn_attestation = action.payload;
    });
    builder.addCase(registerWebauthn.fulfilled, (state, action) => {
      state.webauthn_attestation = action.payload.webauthn_attestation;
      state.credentials = action.payload.credentials;
      // last step in the webauthn registration, we can remove the registration data
      // state.registration_data = undefined;
      // state.webauthn_authenticator = undefined;
    });
    builder.addCase(requestCredentials.fulfilled, (state, action) => {
      state.credentials = action.payload.credentials;
    });
    builder.addCase(removeWebauthnToken.fulfilled, (state, action) => {
      state.credentials = action.payload.credentials;
    });
    builder.addCase(postDeleteAccount.fulfilled, (state, action) => {
      state.location = action.payload.location;
    });
  },
});
export default securitySlice;
