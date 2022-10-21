import { createAsyncThunk } from "@reduxjs/toolkit";
import * as CBOR from "../../../sagas/cbor";
import { safeDecode, safeEncode } from "./base64Utils";

export interface webauthnAttestation {
  attestationObject: string;
  clientDataJSON: string;
  credentialId: string;
}

// serialised version of a PublicKeyCredential
export interface webauthnAssertion {
  credentialId: string;
  authenticatorData: string;
  clientDataJSON: string;
  signature: string;
}

/**
 * Decode webauthn options (from the eduid backend) before passing it to navigator.credentials.get().
 *
 * The return data from this function generally looks like this:
 *
 *   { publicKey: { rpId: "eduid.docker",
 *                  challenge: Uint8Array(32),
 *                  allowCredentials: [ ... ]
 *                }
 *   }
 *
 * but since it depends on the input data, we can't type declare it stricter than 'any'.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeChallenge = (webauthn_options: string): { [key: string]: any } | undefined => {
  if (typeof webauthn_options === "string") {
    return CBOR.decode(safeDecode(webauthn_options).buffer);
  }
};

/**
 * Async thunk to invoke navigator.credentials.get()
 *  (meaning perform user authentication using a security key or similar)
 */
export const performAuthentication = createAsyncThunk(
  "eduid/credentials/performAuthentication",
  async (webauthn_challenge: string, thunkAPI): Promise<webauthnAssertion | undefined> => {
    const decoded_challenge = decodeChallenge(webauthn_challenge);
    const assertion = await navigator.credentials
      .get(decoded_challenge)
      .then()
      .catch(() => {
        // assertion failed / cancelled
        return thunkAPI.rejectWithValue("Authentication failed, or was cancelled");
      });
    if (assertion instanceof PublicKeyCredential && assertion.response instanceof AuthenticatorAssertionResponse) {
      // encode the assertion into strings that can be stored in the state
      const encoded_assertion: webauthnAssertion = {
        credentialId: safeEncode(assertion.rawId),
        authenticatorData: safeEncode(assertion.response.authenticatorData),
        clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        signature: safeEncode(assertion.response.signature),
      };
      return encoded_assertion;
    }
  }
);

export const createCredential = createAsyncThunk(
  "eduid/credentials/createCredential",
  async (webauthn_challenge: string, thunkAPI): Promise<webauthnAttestation | undefined> => {
    const decoded_challenge = decodeChallenge(webauthn_challenge);
    const credential = await navigator.credentials
      .create(decoded_challenge)
      .then()
      .catch(() => {
        // create credential failed / cancelled
        return thunkAPI.rejectWithValue("Create credential failed, or was cancelled");
      });

    if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAttestationResponse) {
      // encode the credential into strings that can be stored in the state
      const encoded_credential: webauthnAttestation = {
        attestationObject: safeEncode(credential.response.attestationObject),
        clientDataJSON: safeEncode(credential.response.clientDataJSON),
        credentialId: safeEncode(credential.rawId),
      };
      return encoded_credential;
    }
  }
);
