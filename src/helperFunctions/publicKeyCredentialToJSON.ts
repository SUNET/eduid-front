/**
 * This file contains helper functions for converting PublicKeyCredential objects to JSON.
 * It only exists because some password extensions create PublicKeyCredential objects without
 * a toJSON method and (incomplete internal?) data for serialization.
 * This can be removed when extensions start to behave.
 */

type Base64urlString = string;

function bufferToBase64url(buffer: ArrayBuffer | null): Base64urlString | undefined {
  if (!buffer) {
    return undefined;
  }
  // Buffer to binary string
  const byteView = new Uint8Array(buffer);
  const str = Array.from(byteView, (byte) => String.fromCharCode(byte)).join("");

  // Binary string to base64
  const base64String = btoa(str);

  // Base64 to base64url
  // We assume that the base64url string is well-formed.
  const base64urlString = base64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return base64urlString;
}

export function credentialToJSON(credential: PublicKeyCredential): PublicKeyCredentialJSON {
  try {
    return credential.toJSON();
  } catch (error) {
    if (error instanceof TypeError) {
      // An extension has created an incomplete PublicKeyCredential missing a toJSON method
      // We need to serialize it manually
      if (credential.response instanceof AuthenticatorAssertionResponse) {
        // for using credential
        return {
          id: credential.id,
          rawId: bufferToBase64url(credential.rawId),
          type: credential.type,
          clientExtensionResults: credential.getClientExtensionResults(),
          response: {
            clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
            authenticatorData: bufferToBase64url(credential.response.authenticatorData),
            signature: bufferToBase64url(credential.response.signature),
            userHandle: bufferToBase64url(credential.response.userHandle),
          },
        };
      } else if (credential.response instanceof AuthenticatorAttestationResponse) {
        // for registering credential
        return {
          id: credential.id,
          rawId: bufferToBase64url(credential.rawId),
          type: credential.type,
          clientExtensionResults: credential.getClientExtensionResults(),
          response: {
            clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
            authenticatorData: bufferToBase64url(credential.response.getAuthenticatorData()),
            transports: credential.response.getTransports(),
            publicKey: bufferToBase64url(credential.response.getPublicKey()),
            publicKeyAlgorithm: credential.response.getPublicKeyAlgorithm(),
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
