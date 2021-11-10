import { createAsyncThunk } from "@reduxjs/toolkit";
import * as CBOR from "../../../sagas/cbor";

// serialised version of a PublicKeyCredential
export interface webauthnAssertion {
  credentialId: string;
  authenticatorData: string;
  clientDataJSON: string;
  signature: string;
}

const decodeChallenge = (webauthn_options: string) => {
  if (typeof webauthn_options === "string") {
    const options = window.atob(
      webauthn_options.replace(/_/g, "/").replace(/-/g, "+")
    );
    const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
    return CBOR.decode(byte_options.buffer);
  }
};

/**
 * Async thunk to invoke navigator.credentials.get()
 *  (meaning perform user authentication using a security key or similar)
 */
export const performAuthentication = createAsyncThunk(
  "eduid/credentials/performAuthentication",
  async (webauthn_challenge: string, thunkAPI): webauthnAssertion => {
    console.log("STARTING WEBAUTHN: ", args.webauthn_challenge);
    const decoded_challenge = decodeChallenge(args.webauthn_challenge);
    const assertion = await navigator.credentials
      .get(decoded_challenge)
      .then()
      .catch(() => {
        // assertion failed / cancelled
        return thunkAPI.rejectWithValue(
          "Authentication failed, or was cancelled"
        );
      });
    if (assertion) {
      console.log("GOT ASSERTION: ", assertion);
      const encoded_assertion: webauthnAssertion = {
        // credentialId: assertion.rawId,
        // authenticatorData: safeEncode(assertion.response.authenticatorData),
        // clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        // signature: safeEncode(assertion.response.signature),

        credentialId: "NOT DECODED",
        authenticatorData: "",
        clientDataJSON: "",
        signature: "",
      };
      return encoded_assertion;
    }
  }
);
