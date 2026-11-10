/**
 * This file contains helper functions for converting PublicKeyCredential objects to the WebAuthn JSON
 * wire format that the backend parses (python-fido2 RegistrationResponse/AuthenticationResponse.from_dict).
 * It is the response half of the fallbacks in parseOptionsFromJSON.ts.
 *
 * It is needed when credential.toJSON() is missing, which is the case for:
 *  - browsers older than Chrome/Edge 129, Firefox 119 and Safari 18.4
 *  - password manager extensions that create PublicKeyCredential objects without a toJSON method
 *    and with (incomplete internal?) data for serialization.
 * Can be removed when neither is a concern anymore.
 */

function isArrayBufferView(obj: unknown): obj is ArrayBufferView {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "buffer" in obj &&
    (obj as ArrayBufferView).buffer instanceof ArrayBuffer &&
    typeof (obj as ArrayBufferView).byteLength === "number"
  );
}

function getArrayBufferOrNull(obj: unknown): ArrayBuffer | null {
  return obj instanceof ArrayBuffer ? obj : null;
}

function encodeBuffersDeep(obj: unknown): unknown {
  if (obj instanceof ArrayBuffer) {
    return bufferToBase64url(obj);
  }
  if (isArrayBufferView(obj)) {
    // Only encode the underlying buffer if the view covers the whole buffer, otherwise slice
    if (obj.byteOffset === 0 && obj.byteLength === obj.buffer.byteLength) {
      return bufferToBase64url(getArrayBufferOrNull(obj.buffer));
    } else {
      const sliced = obj.buffer.slice(obj.byteOffset, obj.byteOffset + obj.byteLength);
      return bufferToBase64url(getArrayBufferOrNull(sliced));
    }
  }
  if (Array.isArray(obj)) {
    return obj.map(encodeBuffersDeep);
  }
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      result[key] = encodeBuffersDeep((obj as Record<string, unknown>)[key]);
    }
    return result;
  }
  return obj;
}

// Base64 to base64url
// We assume that the base64url string is well-formed.
function base64urlReplacer(c: string): string {
  if (c === "+") return "-";
  if (c === "/") return "_";
  return "";
}

function bufferToBase64url(buffer: ArrayBuffer | null): string | undefined {
  if (!buffer) {
    return undefined;
  }
  // Buffer to binary string
  const byteView = new Uint8Array(buffer);
  const str = Array.from(byteView, (byte) => String.fromCharCode(byte)).join("");

  // Binary string to base64
  const base64String = btoa(str);

  const base64urlString = base64String.replaceAll(/[+/=]/g, base64urlReplacer);
  return base64urlString;
}

/**
 * Type guard to check if a credential has an assertion response (login/authentication)
 */
function hasAssertionResponse(
  credential: PublicKeyCredential
): credential is PublicKeyCredential & { response: AuthenticatorAssertionResponse } {
  return typeof credential.response === "object" && credential.response !== null && "signature" in credential.response;
}

/**
 * Type guard to check if a credential has an attestation response (registration)
 */
function hasAttestationResponse(
  credential: PublicKeyCredential
): credential is PublicKeyCredential & { response: AuthenticatorAttestationResponse } {
  return (
    typeof credential.response === "object" &&
    credential.response !== null &&
    "attestationObject" in credential.response
  );
}

function safeTransports(response: AuthenticatorAttestationResponse): string[] | undefined {
  // getTransports() is missing in older browsers and breaks on some extension-injected credentials
  try {
    return typeof response.getTransports === "function" ? response.getTransports() : undefined;
  } catch {
    return undefined;
  }
}

function manualCredentialToJSON(credential: PublicKeyCredential): AuthenticationResponseJSON | RegistrationResponseJSON {
  // Include the data expected by backend and only that
  const common = {
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    type: credential.type,
    authenticatorAttachment: credential.authenticatorAttachment ?? undefined,
    clientExtensionResults: encodeBuffersDeep(credential.getClientExtensionResults()),
  };
  if (hasAssertionResponse(credential)) {
    return {
      ...common,
      response: {
        clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
        authenticatorData: bufferToBase64url(credential.response.authenticatorData),
        signature: bufferToBase64url(credential.response.signature),
        userHandle: bufferToBase64url(credential.response.userHandle),
      },
    } as AuthenticationResponseJSON;
  }
  if (hasAttestationResponse(credential)) {
    // Intentionally omits authenticatorData/publicKeyAlgorithm/publicKey — those methods
    // break on Safari with extension-injected credentials. The backend only needs
    // clientDataJSON and attestationObject.
    return {
      ...common,
      response: {
        clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
        attestationObject: bufferToBase64url(credential.response.attestationObject),
        transports: safeTransports(credential.response),
      },
    } as RegistrationResponseJSON;
  }
  throw new TypeError("Unrecognized PublicKeyCredential response type");
}

export function credentialToJSON(
  credential: PublicKeyCredential
): AuthenticationResponseJSON | RegistrationResponseJSON {
  if (typeof credential.toJSON === "function") {
    try {
      return credential.toJSON();
    } catch (error) {
      // An extension has created an incomplete PublicKeyCredential; serialize it manually
      if (!(error instanceof TypeError)) {
        throw error;
      }
    }
  }
  return manualCredentialToJSON(credential);
}
