import { CredentialType } from "apis/eduidSecurity";
import {
  acceptedCredentialIds,
  isSignalAllAcceptedCredentialsSupported,
  resetSignalledState,
  signalAllAcceptedCredentials,
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
