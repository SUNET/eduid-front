import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk to invoke navigator.credentials.get()
 *  (meaning perform user authentication using a security key or similar)
 */
export const performAuthentication = createAsyncThunk(
  "eduid/credentials/performAuthentication",
  async (credentialRequestOptions: PublicKeyCredentialRequestOptionsJSON, thunkAPI) => {
    const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(credentialRequestOptions);
    const credential = (await navigator.credentials.get({ publicKey })) as PublicKeyCredential;
    if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAssertionResponse) {
      return credential.toJSON();
    }
    // assertion failed / cancelled
    return thunkAPI.rejectWithValue("Authentication failed, or was cancelled");
  }
);

export const createCredential = createAsyncThunk(
  "eduid/credentials/createCredential",
  async (registerRequestOptions: PublicKeyCredentialCreationOptionsJSON, thunkAPI) => {
    const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(registerRequestOptions);
    const credential = (await navigator.credentials.create({ publicKey })) as PublicKeyCredential;
    if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAttestationResponse) {
      return credential.toJSON();
    }
    // create credential failed / cancelled
    return thunkAPI.rejectWithValue("Credential creation failed, or was cancelled");
  }
);
