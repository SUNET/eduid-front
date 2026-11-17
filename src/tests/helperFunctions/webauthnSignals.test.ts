import { CredentialType, SecurityResponse } from "apis/eduidSecurity";
import {
  acceptedCredentialIds,
  isSignalAllAcceptedCredentialsSupported,
  resetSignalledState,
  signalAllAcceptedCredentials,
  signalOnResponse,
} from "helperFunctions/webauthnSignals";

const g = globalThis as unknown as Record<string, unknown>;

function credential(overrides: Partial<CredentialType>): CredentialType {
  return {
    authenticator: "cross-platform",
    created_ts: "2026-01-01",
    credential_type: "security.webauthn_credential_type",
    description: null,
    key: "key",
    success_ts: "2026-01-01",
    used_for_login: false,
    verified: false,
    mfa_approved: false,
    ...overrides,
  };
}

const passkeyB = credential({ key: "b", keyhandle: "id-b" });
const passkeyA = credential({ key: "a", keyhandle: "id-a" });
const password = credential({ key: "pw", credential_type: "security.password_credential_type", keyhandle: null });
const u2f = credential({ key: "u2f", credential_type: "security.u2f_credential_type", keyhandle: "u2f-handle" });

describe("acceptedCredentialIds", () => {
  test("returns the sorted ids of the WebAuthn credentials only", () => {
    expect(acceptedCredentialIds([passkeyB, password, u2f, passkeyA])).toEqual(["id-a", "id-b"]);
  });

  test("a user without WebAuthn credentials has an empty list", () => {
    expect(acceptedCredentialIds([password])).toEqual([]);
    expect(acceptedCredentialIds([])).toEqual([]);
  });

  test("returns nothing if any WebAuthn credential has no keyhandle, so that no valid passkey is dropped", () => {
    expect(acceptedCredentialIds([passkeyA, credential({ key: "old" })])).toBeUndefined();
    expect(acceptedCredentialIds([passkeyA, credential({ key: "old", keyhandle: null })])).toBeUndefined();
  });
});

describe("signalAllAcceptedCredentials", () => {
  const originalPKC = g.PublicKeyCredential;
  let signal: jest.Mock;

  beforeEach(() => {
    resetSignalledState();
    signal = jest.fn().mockResolvedValue(undefined);
    g.PublicKeyCredential = { signalAllAcceptedCredentials: signal };
  });

  afterEach(() => {
    g.PublicKeyCredential = originalPKC;
  });

  test("tells the browser which credentials are accepted", async () => {
    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyB, passkeyA, password]);
    expect(signal).toHaveBeenCalledTimes(1);
    expect(signal).toHaveBeenCalledWith({
      rpId: "eduid.docker",
      userId: "handle",
      allAcceptedCredentialIds: ["id-a", "id-b"],
    });
  });

  test("an empty list is sent when the last passkey has been removed", async () => {
    await signalAllAcceptedCredentials("eduid.docker", "handle", [password]);
    expect(signal).toHaveBeenCalledWith({ rpId: "eduid.docker", userId: "handle", allAcceptedCredentialIds: [] });
  });

  test("does nothing when the backend did not send the relying party id or the user handle", async () => {
    await signalAllAcceptedCredentials(undefined, "handle", [passkeyA]);
    await signalAllAcceptedCredentials("eduid.docker", undefined, [passkeyA]);
    await signalAllAcceptedCredentials("", "", [passkeyA]);
    expect(signal).not.toHaveBeenCalled();
  });

  test("does nothing when a credential id is missing", async () => {
    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA, credential({ key: "old" })]);
    expect(signal).not.toHaveBeenCalled();
  });

  test("does not send the same list twice, but sends a changed one", async () => {
    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA, passkeyB]);
    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyB, passkeyA]);
    expect(signal).toHaveBeenCalledTimes(1);

    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA]);
    expect(signal).toHaveBeenCalledTimes(2);
  });

  test("does nothing where the browser has no Signal API", async () => {
    g.PublicKeyCredential = function PublicKeyCredential() {};
    expect(isSignalAllAcceptedCredentialsSupported()).toBe(false);
    await signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA]);
    expect(signal).not.toHaveBeenCalled();

    delete g.PublicKeyCredential;
    expect(isSignalAllAcceptedCredentialsSupported()).toBe(false);
    await expect(signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA])).resolves.toBeUndefined();
  });

  test("swallows errors from the browser", async () => {
    signal.mockRejectedValue(new DOMException("not allowed", "NotAllowedError"));
    await expect(signalAllAcceptedCredentials("eduid.docker", "handle", [passkeyA])).resolves.toBeUndefined();
  });
});

describe("signalOnResponse", () => {
  const originalPKC = g.PublicKeyCredential;
  let signal: jest.Mock;

  function response(...ids: string[]): SecurityResponse {
    return {
      credentials: ids.map((id) => credential({ key: id, keyhandle: id })),
      rp_id: "eduid.docker",
      webauthn_user_handle: "handle",
    };
  }

  // a response that is answered when the test says so
  function deferred() {
    let resolve!: (value: SecurityResponse | undefined) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<SecurityResponse | undefined>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  function signalledIds(): string[][] {
    return signal.mock.calls.map((call) => call[0].allAcceptedCredentialIds);
  }

  beforeEach(() => {
    resetSignalledState();
    signal = jest.fn().mockResolvedValue(undefined);
    g.PublicKeyCredential = { signalAllAcceptedCredentials: signal };
  });

  afterEach(() => {
    g.PublicKeyCredential = originalPKC;
  });

  test("signals the list of a read", async () => {
    await signalOnResponse(Promise.resolve(response("a", "b")), false);
    expect(signalledIds()).toEqual([["a", "b"]]);
  });

  test("signals the list of a change", async () => {
    await signalOnResponse(Promise.resolve(response("a")), true);
    expect(signalledIds()).toEqual([["a"]]);
  });

  test("does not signal a read that was running when a change started", async () => {
    const read = deferred();
    const pendingRead = signalOnResponse(read.promise, false);
    await signalOnResponse(Promise.resolve(response("a", "b")), true); // a key was added
    read.resolve(response("a")); // the read answers last, with the list from before
    await pendingRead;
    expect(signalledIds()).toEqual([["a", "b"]]);
  });

  test("does not signal a read that was running while a change was in progress", async () => {
    const change = deferred();
    const pendingChange = signalOnResponse(change.promise, true);
    const pendingRead = signalOnResponse(Promise.resolve(response("a")), false); // answers first, may be old
    await pendingRead;
    expect(signal).not.toHaveBeenCalled();
    change.resolve(response("a", "b"));
    await pendingChange;
    expect(signalledIds()).toEqual([["a", "b"]]);
  });

  test("signals a read that was started after a change had completed", async () => {
    await signalOnResponse(Promise.resolve(response("a", "b")), true);
    await signalOnResponse(Promise.resolve(response("a", "b", "c")), false); // another device added a key
    expect(signalledIds()).toEqual([
      ["a", "b"],
      ["a", "b", "c"],
    ]);
  });

  test.each([
    ["the older read answers first", true],
    ["the newer read answers first", false],
  ])("of two reads only the one that was started last is signalled: %s", async (_name, olderFirst) => {
    const older = deferred();
    const newer = deferred();
    const pendingOlder = signalOnResponse(older.promise, false); // sees [a]
    const pendingNewer = signalOnResponse(newer.promise, false); // sees [a, b]

    if (olderFirst) {
      older.resolve(response("a"));
      await pendingOlder;
      // the older list must not be signalled, not even for a moment: the browser may remove b for good
      expect(signal).not.toHaveBeenCalled();
      newer.resolve(response("a", "b"));
      await pendingNewer;
    } else {
      newer.resolve(response("a", "b"));
      await pendingNewer;
      older.resolve(response("a"));
      await pendingOlder;
    }
    expect(signalledIds()).toEqual([["a", "b"]]);
  });

  test("the next read signals the list as it is after overlapping changes", async () => {
    const first = deferred();
    const second = deferred();
    const pendingFirst = signalOnResponse(first.promise, true);
    const pendingSecond = signalOnResponse(second.promise, true);
    first.resolve(response("a"));
    second.resolve(response("a", "b"));
    await Promise.all([pendingFirst, pendingSecond]);
    expect(signal).not.toHaveBeenCalled();

    await signalOnResponse(Promise.resolve(response("a", "b")), false);
    expect(signalledIds()).toEqual([["a", "b"]]);
  });

  test("changes that follow each other are both signalled", async () => {
    await signalOnResponse(Promise.resolve(response("a", "b")), true);
    await signalOnResponse(Promise.resolve(response("a")), true);
    expect(signalledIds()).toEqual([["a", "b"], ["a"]]);
  });

  test("a change that failed does not stop a later one from being signalled", async () => {
    const failing = deferred();
    const pending = signalOnResponse(failing.promise, true);
    failing.reject(new Error("re-authentication needed"));
    await pending;
    await signalOnResponse(Promise.resolve(response("a")), true);
    expect(signalledIds()).toEqual([["a"]]);
  });

  test("ignores a request that fails, and later requests still work", async () => {
    const failing = deferred();
    const pending = signalOnResponse(failing.promise, false);
    failing.reject(new Error("network"));
    await pending;
    expect(signal).not.toHaveBeenCalled();

    await signalOnResponse(Promise.resolve(response("a")), false);
    expect(signalledIds()).toEqual([["a"]]);
  });

  test("ignores a response without a payload", async () => {
    await signalOnResponse(Promise.resolve(undefined), false);
    expect(signal).not.toHaveBeenCalled();
  });
});
