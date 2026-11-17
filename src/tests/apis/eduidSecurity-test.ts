import { securityApi } from "apis/eduidSecurity";
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

describe("securityApi registerWebauthn", () => {
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
