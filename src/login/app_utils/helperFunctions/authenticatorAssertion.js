import * as CBOR from "../../../sagas/cbor";
import resetPasswordSlice from "../../redux/slices/resetPasswordSlice";

// 1. Ask backend for a challenge
// decode the challenge to use it
export const mfaDecodeMiddleware = (webauthn_options) => {
  if (typeof webauthn_options !== "string") {
    return undefined;
  }
  const options = window.atob(
    webauthn_options.replace(/_/g, "/").replace(/-/g, "+")
  );
  const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
  return CBOR.decode(byte_options.buffer);
};

// challenge for reset-password
export const mfaDecodeMiddlewareForResetPassword = (response) => {
  if (
    response.payload.extra_security &&
    response.payload.extra_security.tokens &&
    response.payload.extra_security.tokens.webauthn_options !== undefined
  ) {
    response.payload.extra_security.tokens.webauthn_options =
      mfaDecodeMiddleware(
        response.payload.extra_security.tokens.webauthn_options
      );
  }
  return response;
};

// 2. Open authenticator
export const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      // assertion failed / cancelled
      dispatch(resetPasswordSlice.actions.cancelWebauthnAssertion());
    });
  if (webauthnAssertion !== undefined) {
    dispatch(
      resetPasswordSlice.actions.getWebauthnAssertion(webauthnAssertion)
    );
  }
};

// 3. Return authenticator assertion to backend for final verification
// encode the assertion before post
export const safeEncode = (obj) => {
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  const unsafeObj = window.btoa(bytesObj);
  return unsafeObj.replace(/\//g, "_").replace(/\+/g, "-").replace(/=*$/, "");
};
