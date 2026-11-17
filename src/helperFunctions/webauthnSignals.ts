import { CredentialType } from "apis/eduidSecurity";

/**
 * The WebAuthn Signal API tells the browser, and through it the password manager or phone that holds a passkey,
 * what the relying party (eduID) still accepts, so that a passkey that was removed in eduID is also removed there.
 * It exists in Chromium and recent Safari only, so it is always feature detected, and every call is best effort:
 * errors are swallowed and the UI never waits for it.
 */

const WEBAUTHN_CREDENTIAL_TYPE = "security.webauthn_credential_type";

export function isSignalAllAcceptedCredentialsSupported(): boolean {
  return typeof PublicKeyCredential !== "undefined" && "signalAllAcceptedCredentials" in PublicKeyCredential;
}

/**
 * The credential ids of the user's WebAuthn credentials, sorted, or undefined if they cannot be known for sure.
 *
 * The browser may remove every passkey of the user that is not in the list, so a list that is incomplete would
 * remove valid passkeys. If any WebAuthn credential has no `keyhandle` (an older backend), nothing is returned.
 * U2F credentials are not WebAuthn credentials of this relying party and are not part of the list.
 */
export function acceptedCredentialIds(credentials: CredentialType[]): string[] | undefined {
  const webauthn = credentials.filter((cred) => cred.credential_type === WEBAUTHN_CREDENTIAL_TYPE);
  const ids: string[] = [];
  for (const cred of webauthn) {
    if (!cred.keyhandle) return undefined;
    ids.push(cred.keyhandle);
  }
  return ids.sort((a, b) => a.localeCompare(b));
}

// What was last signalled, so that the same list is not sent again every time the page is shown
let lastSignalled: string | undefined;

/** Forget what was last signalled (for tests). */
export function resetSignalledState() {
  lastSignalled = undefined;
}

/**
 * Tell the browser which credentials of this user are still valid. Does nothing when the Signal API is missing, when
 * the relying party id, the user handle or any credential id is not known, or when the same list was just sent.
 */
export async function signalAllAcceptedCredentials(
  rpId: string | undefined,
  userHandle: string | undefined,
  credentials: CredentialType[],
): Promise<void> {
  if (!rpId || !userHandle || !isSignalAllAcceptedCredentialsSupported()) return;
  const ids = acceptedCredentialIds(credentials);
  if (!ids) return;

  const key = JSON.stringify([rpId, userHandle, ids]);
  if (key === lastSignalled) return;
  lastSignalled = key;

  try {
    await PublicKeyCredential.signalAllAcceptedCredentials({
      rpId,
      userId: userHandle,
      allAcceptedCredentialIds: ids,
    });
  } catch {
    // best effort: a browser that does not support it, or a user agent that refuses it, must not affect the page
  }
}
