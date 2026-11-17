import { CredentialType, SecurityResponse } from "apis/eduidSecurity";
import { useSignalAcceptedCredentials } from "components/Hooks/useSignalAcceptedCredentials";
import { resetSignalledState } from "helperFunctions/webauthnSignals";
import securitySlice, { initialState } from "slices/Security";
import { defaultDashboardTestState, render, waitFor } from "../helperFunctions/DashboardTestApp-rtl";

const g = globalThis as unknown as Record<string, unknown>;

const passkey: CredentialType = {
  mfa_approved: false,
  authenticator: "platform",
  created_ts: "2022-10-14",
  credential_type: "security.webauthn_credential_type",
  description: null,
  key: "dummy key1",
  keyhandle: "credential-id-1",
  success_ts: "2022-10-17",
  used_for_login: false,
  verified: false,
};

function Probe() {
  useSignalAcceptedCredentials();
  return null;
}

function requestCredentialsFulfilled(payload: SecurityResponse) {
  return {
    type: "eduIDApi/executeQuery/fulfilled",
    payload: { payload },
    meta: { arg: { endpointName: "requestCredentials" } },
  };
}

describe("the Signal API data in the security state", () => {
  test("is stored with the credentials", () => {
    const state = securitySlice.reducer(
      initialState,
      requestCredentialsFulfilled({
        credentials: [passkey],
        rp_id: "eduid.docker",
        webauthn_user_handle: "dGVzdC1lcHBu",
      }),
    );
    expect(state.rp_id).toBe("eduid.docker");
    expect(state.webauthn_user_handle).toBe("dGVzdC1lcHBu");
  });

  test("is cleared when a response does not have it (an older backend)", () => {
    const loaded = { ...initialState, rp_id: "eduid.docker", webauthn_user_handle: "dGVzdC1lcHBu" };
    const state = securitySlice.reducer(loaded, requestCredentialsFulfilled({ credentials: [passkey] }));
    expect(state.rp_id).toBeUndefined();
    expect(state.webauthn_user_handle).toBeUndefined();
  });
});

describe("useSignalAcceptedCredentials", () => {
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

  test("signals the credentials once they are loaded with the relying party id and user handle", async () => {
    render(<Probe />, {
      state: {
        ...defaultDashboardTestState,
        security: { ...initialState, credentials: [passkey], rp_id: "eduid.docker", webauthn_user_handle: "handle" },
      },
    });

    await waitFor(() => expect(signal).toHaveBeenCalledTimes(1));
    expect(signal).toHaveBeenCalledWith({
      rpId: "eduid.docker",
      userId: "handle",
      allAcceptedCredentialIds: ["credential-id-1"],
    });
  });

  test("signals nothing before the credentials are loaded, or from a backend without the data", () => {
    render(<Probe />, {
      state: { ...defaultDashboardTestState, security: { ...initialState, credentials: [passkey] } },
    });
    expect(signal).not.toHaveBeenCalled();
  });
});
