/**
 * Fallbacks for PublicKeyCredential.parseRequestOptionsFromJSON() and parseCreationOptionsFromJSON().
 *
 * The native methods exist in Chrome/Edge 129+, Firefox 119+ and Safari 18.4+. They only decode the
 * base64url strings of the WebAuthn JSON format into ArrayBuffers (WebAuthn Level 3, "JSON
 * serialization"), so on older browsers we can do the same by hand and still use
 * navigator.credentials.get()/create(), which have been available much longer.
 *
 * Not installed on PublicKeyCredential: we call the native method when present and fall back
 * otherwise, to avoid patching browser globals that password manager extensions also wrap.
 *
 * Can be removed once the supported browser floor includes the native methods.
 * The response direction (credential.toJSON()) already has a fallback in publicKeyCredentialToJSON.ts.
 */

type Json = Record<string, unknown>;

export function base64urlToBuffer(value: string): ArrayBuffer {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function decodeDescriptors(list: unknown): unknown {
  if (!Array.isArray(list)) return list;
  return list.map((d: Json) => ({ ...d, id: base64urlToBuffer(d.id as string) }));
}

function decodePrfValues(values: unknown): unknown {
  if (!values || typeof values !== "object") return values;
  const v = values as { first: string; second?: string };
  return {
    first: base64urlToBuffer(v.first),
    ...(v.second !== undefined && { second: base64urlToBuffer(v.second) }),
  };
}

// Only the extensions with binary inputs need decoding: prf (eval, evalByCredential) and largeBlob.write.
// Everything else (credProps, appid, ...) is already plain JSON.
function decodeExtensions(extensions: unknown): unknown {
  if (!extensions || typeof extensions !== "object") return extensions;
  const out: Json = { ...(extensions as Json) };

  const prf = out.prf as Json | undefined;
  if (prf) {
    const decoded: Json = { ...prf };
    if (prf.eval) decoded.eval = decodePrfValues(prf.eval);
    if (prf.evalByCredential) {
      decoded.evalByCredential = Object.fromEntries(
        Object.entries(prf.evalByCredential as Json).map(([id, v]) => [id, decodePrfValues(v)]),
      );
    }
    out.prf = decoded;
  }

  const largeBlob = out.largeBlob as Json | undefined;
  if (largeBlob?.write) {
    out.largeBlob = { ...largeBlob, write: base64urlToBuffer(largeBlob.write as string) };
  }
  return out;
}

export function parseRequestOptions(options: PublicKeyCredentialRequestOptionsJSON): PublicKeyCredentialRequestOptions {
  if (typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") {
    return PublicKeyCredential.parseRequestOptionsFromJSON(options);
  }
  const { challenge, allowCredentials, extensions, ...rest } = options;
  return {
    ...rest,
    challenge: base64urlToBuffer(challenge),
    ...(allowCredentials && { allowCredentials: decodeDescriptors(allowCredentials) }),
    ...(extensions && { extensions: decodeExtensions(extensions) }),
  } as PublicKeyCredentialRequestOptions;
}

export function parseCreationOptions(
  options: PublicKeyCredentialCreationOptionsJSON,
): PublicKeyCredentialCreationOptions {
  if (typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") {
    return PublicKeyCredential.parseCreationOptionsFromJSON(options);
  }
  const { challenge, user, excludeCredentials, extensions, ...rest } = options;
  return {
    ...rest,
    challenge: base64urlToBuffer(challenge),
    user: { ...user, id: base64urlToBuffer(user.id) },
    ...(excludeCredentials && { excludeCredentials: decodeDescriptors(excludeCredentials) }),
    ...(extensions && { extensions: decodeExtensions(extensions) }),
  } as PublicKeyCredentialCreationOptions;
}
