/**
 * This file contains helper functions for converting PublicKeyCredential objects to JSON.
 * It only exists because some password extensions create PublicKeyCredential objects without
 * a toJSON method and (incomplete internal?) data for serialization.
 * This can be removed when extensions start to behave.
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

export function credentialToJSON(credential: PublicKeyCredential): PublicKeyCredentialJSON {
  try {
    return credential.toJSON();
  } catch (error) {
    if (error instanceof TypeError) {
      // An extension has created an incomplete PublicKeyCredential missing a toJSON method
      // We need to serialize it manually

      // Let us assume we have a plain object and build from there
      if (hasAssertionResponse(credential)) {
        // Include the data expected by backend and only that
        return {
          id: credential.id,
          rawId: bufferToBase64url(credential.rawId),
          type: credential.type,
          clientExtensionResults: encodeBuffersDeep(credential.getClientExtensionResults()),
          response: {
            clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
            authenticatorData: bufferToBase64url(credential.response.authenticatorData),
            signature: bufferToBase64url(credential.response.signature),
            userHandle: bufferToBase64url(credential.response.userHandle),
          },
        };
      } else if (hasAttestationResponse(credential)) {
        // Include the data expected by backend and only that
        return {
          id: credential.id,
          rawId: bufferToBase64url(credential.rawId),
          type: credential.type,
          clientExtensionResults: encodeBuffersDeep(credential.getClientExtensionResults()),
          response: {
            clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
            attestationObject: bufferToBase64url(credential.response.attestationObject),
          },
        };
      }
    } else {
      // re-throw the error
      throw error;
    }
  }
}
