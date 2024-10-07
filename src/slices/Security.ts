import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
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
    builder.addCase(createCredential.fulfilled, (state, action) => {
      state.webauthn_attestation = action.payload;
    });
    builder.addCase(registerWebauthn.fulfilled, (state, action) => {
      state.webauthn_attestation = action.payload.webauthn_attestation;
      state.credentials = action.payload.credentials;
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
