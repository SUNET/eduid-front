import * as CBOR from "../../../sagas/cbor";

// 1. Ask backend for a challenge
// decode the challenge to use it
export const mfaDecodeMiddleware = (response) => {
  if (response.payload && response.payload.webauthn_options !== undefined) {
    const raw_options = response.payload.webauthn_options;
    if (typeof raw_options === "string") {
      const options = window.atob(
        raw_options.replace(/_/g, "/").replace(/-/g, "+")
      );
      const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
      response.payload.webauthn_options = CBOR.decode(byte_options.buffer);
    }
  }
  // challenge for reset-password
  else if (response.payload.extra_security && response.payload.extra_security.tokens.webauthn_options !== undefined) {
    const raw_options = response.payload.extra_security.tokens.webauthn_options;
    if (typeof raw_options === "string") {
      const options = window.atob(
        raw_options.replace(/_/g, "/").replace(/-/g, "+")
      );
      const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
      response.payload.extra_security.tokens.webauthn_options = CBOR.decode(byte_options.buffer);
    }
  }
  return response;
};

// 2. Return autheticator assertion to backend for final verification
// encode the assertion before post
export const safeEncode = (obj) => {
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  const unsafeObj = window.btoa(bytesObj);
  return unsafeObj.replace(/\//g, "_").replace(/\+/g, "-").replace(/=*$/, "");
};
