import { oidceidApi } from "apis/eduidOidceid";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { defaultDashboardTestState } from "../helperFunctions/DashboardTestApp-rtl";

const url = "https://oidceid.eduid.docker/services/oidceid";

function setup(path: string) {
  const captured: { body?: Record<string, unknown> } = {};
  mswServer.use(
    http.post(`${url}/${path}`, async ({ request }) => {
      captured.body = (await request.json()) as Record<string, unknown>;
      return HttpResponse.json({ type: "test response", payload: { location: "" } });
    }),
  );
  const store = getTestEduIDStore({
    ...defaultDashboardTestState,
    config: { ...defaultDashboardTestState.config, oidceid_service_url: url },
  });
  return { captured, store };
}

describe("oidceid API request bodies", () => {
  it("mfa-authenticate defaults frontend_action to loginMfaAuthn", async () => {
    const { captured, store } = setup("mfa-authenticate");
    await store.dispatch(oidceidApi.endpoints.oidceidMfaAuthenticate.initiate({ method: "sverigeid" }));
    expect(captured.body).toEqual({ method: "sverigeid", frontend_action: "loginMfaAuthn" });
  });

  it("mfa-authenticate forwards frontend_action and frontend_state unchanged", async () => {
    const { captured, store } = setup("mfa-authenticate");
    await store.dispatch(
      oidceidApi.endpoints.oidceidMfaAuthenticate.initiate({
        method: "sverigeid",
        frontend_action: "resetpwMfaAuthn",
        frontend_state: "email-code",
      }),
    );
    expect(captured.body).toEqual({
      method: "sverigeid",
      frontend_action: "resetpwMfaAuthn",
      frontend_state: "email-code",
    });
  });

  it("verify-identity defaults frontend_action to verifyIdentity", async () => {
    const { captured, store } = setup("verify-identity");
    await store.dispatch(oidceidApi.endpoints.oidceidVerifyIdentity.initiate({ method: "sverigeid" }));
    expect(captured.body).toEqual({ method: "sverigeid", frontend_action: "verifyIdentity" });
  });

  it("verify-identity forwards a passed frontend_action and frontend_state", async () => {
    const { captured, store } = setup("verify-identity");
    await store.dispatch(
      oidceidApi.endpoints.oidceidVerifyIdentity.initiate({
        method: "sverigeid",
        frontend_action: "custom",
        frontend_state: "state",
      }),
    );
    expect(captured.body).toEqual({ method: "sverigeid", frontend_action: "custom", frontend_state: "state" });
  });

  it("verify-credential sends credential_id and defaults frontend_action to verifyCredential", async () => {
    const { captured, store } = setup("verify-credential");
    await store.dispatch(
      oidceidApi.endpoints.oidceidVerifyCredential.initiate({ method: "sverigeid", credential_id: "cred-1" }),
    );
    expect(captured.body).toEqual({
      method: "sverigeid",
      credential_id: "cred-1",
      frontend_action: "verifyCredential",
    });
  });

  it("verify-credential forwards a passed frontend_action and frontend_state", async () => {
    const { captured, store } = setup("verify-credential");
    await store.dispatch(
      oidceidApi.endpoints.oidceidVerifyCredential.initiate({
        method: "sverigeid",
        credential_id: "cred-1",
        frontend_action: "custom",
        frontend_state: "state",
      }),
    );
    expect(captured.body).toEqual({
      method: "sverigeid",
      credential_id: "cred-1",
      frontend_action: "custom",
      frontend_state: "state",
    });
  });

  it("mfa-register sends method sverigeid and signupExternalMfa", async () => {
    const { captured, store } = setup("mfa-register");
    await store.dispatch(oidceidApi.endpoints.oidceidMfaRegister.initiate());
    expect(captured.body).toEqual({ method: "sverigeid", frontend_action: "signupExternalMfa" });
  });
});
