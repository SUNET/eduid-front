import type { CredentialType, SecurityResponse } from "apis/eduidSecurity";

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

// The order of the responses that carry the list of credentials, see signalOnResponse()
let issued = 0;
let changeEpoch = 0;
// the changes (a key added or removed) that have been asked for and not yet answered
const changesInFlight = new Set<{ overlapped: boolean }>();
let lastReadApplied = 0;

/** Forget what was last signalled and the order of the requests (for tests). */
export function resetSignalledState() {
  lastSignalled = undefined;
  issued = 0;
  changeEpoch = 0;
  changesInFlight.clear();
  lastReadApplied = 0;
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

/**
 * Signal the credentials of a response from the backend, and only if the response is still the latest word.
 *
 * The browser may remove every passkey of the user that is not in the list, so a list that is older than the
 * server's current one would remove a passkey that is valid. Requests are not answered in the order they were made, so:
 * - a read (a request for the list) that overlapped a change (a key was added or removed) at any time, that is, was
 *   started while one was running, or was running when one started or finished, may have seen the list from before
 *   the change, and is not signalled;
 * - of two reads, only the one that was started last is signalled, if both answer;
 * - a change that overlapped another change is not signalled, since the order in which the server applied them is not
 *   known (the response that arrives first may be the older one); the next read, when the page is shown again,
 *   signals the list as it is then.
 * The list is taken from the response itself and never from what is kept in the page, which may be old.
 *
 * `change` is true for a request that changes the credentials. A request that fails is ignored.
 */
export async function signalOnResponse(
  response: Promise<SecurityResponse | undefined>,
  change: boolean,
): Promise<void> {
  const seq = ++issued;
  const startedDuringChange = changesInFlight.size > 0;
  let thisChange: { overlapped: boolean } | undefined;
  if (change) {
    changeEpoch++; // reads that are running now can no longer be trusted
    thisChange = { overlapped: changesInFlight.size > 0 };
    for (const other of changesInFlight) other.overlapped = true;
    changesInFlight.add(thisChange);
  }
  const startEpoch = changeEpoch;

  let payload: SecurityResponse | undefined;
  try {
    payload = await response;
  } catch {
    return;
  } finally {
    if (thisChange) changesInFlight.delete(thisChange);
  }
  if (!payload) return;

  if (thisChange) {
    changeEpoch++; // reads that are running now may have seen the list from before this change
    if (thisChange.overlapped) return;
  } else {
    if (startedDuringChange || changesInFlight.size > 0 || changeEpoch !== startEpoch || seq < lastReadApplied) return;
    lastReadApplied = seq;
  }
  await signalAllAcceptedCredentials(payload.rp_id, payload.webauthn_user_handle, payload.credentials);
}

/**
 * An `onQueryStarted` for the requests of the security API that return the list of credentials: signals the list in
 * the response, see signalOnResponse().
 */
export function signalFromResponse(change: boolean) {
  return async (
    _arg: unknown,
    api: { queryFulfilled: Promise<{ data: { payload: SecurityResponse } }> },
  ): Promise<void> => {
    await signalOnResponse(
      api.queryFulfilled.then((result) => result.data.payload),
      change,
    );
  };
}
