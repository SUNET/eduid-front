import { CredentialType, securityApi } from "apis/eduidSecurity";
import { resetSignalledState } from "helperFunctions/webauthnSignals";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { defaultDashboardTestState } from "../helperFunctions/DashboardTestApp-rtl";

const attestation = {
  id: "cred-id",
  rawId: "cred-id",
  type: "public-key",
  response: {},
  clientExtensionResults: { credProps: { rk: true } },
} as unknown as RegistrationResponseJSON;

async function register(extra: { clientExtensionResults?: AuthenticationExtensionsClientOutputsJSON }) {
  let sent: Record<string, unknown> | undefined;
  mswServer.use(
    http.post("https://dashboard.eduid.docker/services/security/webauthn/register/complete", async ({ request }) => {
      sent = (await request.json()) as Record<string, unknown>;
      return HttpResponse.json({ type: "test response", payload: { credentials: [] } });
    }),
  );
  const store = getTestEduIDStore({
    ...defaultDashboardTestState,
    config: {
      ...defaultDashboardTestState.config,
      security_service_url: "https://dashboard.eduid.docker/services/security",
    },
  });
  await store.dispatch(
    securityApi.endpoints.registerWebauthn.initiate({
      webauthn_attestation: attestation,
      description: "a key",
      ...extra,
    }),
  );
  return sent;
}

describe("securityApi registerWebauthn", () => {
  test("sends the extension results to the backend", async () => {
    const sent = await register({ clientExtensionResults: { credProps: { rk: true } } });
    expect(sent?.clientExtensionResults).toEqual({ credProps: { rk: true } });
    expect(sent?.description).toBe("a key");
    expect(sent?.response).toEqual(attestation);
  });

  test("sends no extension results when there are none", async () => {
    const sent = await register({});
    expect(sent).toBeDefined();
    expect(sent).not.toHaveProperty("clientExtensionResults");
  });
});

describe("telling the browser which passkeys are accepted, from the responses", () => {
  const SECURITY_URL = "https://dashboard.eduid.docker/services/security";
  const g = globalThis as unknown as Record<string, unknown>;
  const originalPKC = g.PublicKeyCredential;
  let signal: jest.Mock;

  function passkey(id: string): CredentialType {
    return {
      authenticator: "platform",
      created_ts: "2026-01-01",
      credential_type: "security.webauthn_credential_type",
      description: id,
      key: id,
      keyhandle: id,
      success_ts: "2026-01-01",
      used_for_login: false,
      verified: false,
      mfa_approved: false,
    };
  }

  function listPayload(...ids: string[]) {
    return {
      type: "test response",
      payload: { credentials: ids.map(passkey), rp_id: "eduid.docker", webauthn_user_handle: "handle" },
    };
  }

  function store() {
    return getTestEduIDStore({
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, security_service_url: SECURITY_URL },
    });
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

  test("signals the list that a request for the credentials returns", async () => {
    mswServer.use(http.get(`${SECURITY_URL}/credentials`, () => HttpResponse.json(listPayload("a", "b"))));
    await store().dispatch(securityApi.endpoints.requestCredentials.initiate());
    expect(signal).toHaveBeenCalledWith({
      rpId: "eduid.docker",
      userId: "handle",
      allAcceptedCredentialIds: ["a", "b"],
    });
  });

  test("signals nothing from a backend that does not send the relying party id and the user handle", async () => {
    mswServer.use(
      http.get(`${SECURITY_URL}/credentials`, () =>
        HttpResponse.json({ type: "test response", payload: { credentials: [passkey("a")] } }),
      ),
    );
    await store().dispatch(securityApi.endpoints.requestCredentials.initiate());
    expect(signal).not.toHaveBeenCalled();
  });

  test("a slow read that is answered after a removal does not take back the removal", async () => {
    let releaseRead!: () => void;
    const gate = new Promise<void>((resolve) => {
      releaseRead = resolve;
    });
    mswServer.use(
      // the read sees the list from before the removal, and is answered last
      http.get(`${SECURITY_URL}/credentials`, async () => {
        await gate;
        return HttpResponse.json(listPayload("a", "b"));
      }),
      http.post(`${SECURITY_URL}/webauthn/remove`, () => HttpResponse.json(listPayload("a"))),
    );
    const s = store();
    const read = s.dispatch(securityApi.endpoints.requestCredentials.initiate());
    await s.dispatch(securityApi.endpoints.removeWebauthnToken.initiate({ credential_key: "b" }));
    expect(signalledIds()).toEqual([["a"]]);

    releaseRead();
    await read;
    // the older list ("a" and "b") was not signalled, which would have told the browser that b is still valid
    expect(signalledIds()).toEqual([["a"]]);
  });
});
