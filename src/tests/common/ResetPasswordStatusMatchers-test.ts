import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import { oidceidApi } from "apis/eduidOidceid";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { defaultDashboardTestState } from "../helperFunctions/DashboardTestApp-rtl";

const services = {
  eidas: { url: "https://eidas.eduid.docker/services/eidas", config: "eidas_service_url" },
  bankid: { url: "https://bankid.eduid.docker/services/bankid", config: "bankid_service_url" },
  frejaeid: { url: "https://frejaeid.eduid.docker/services/freja-eid", config: "freja_eid_service_url" },
  oidceid: { url: "https://oidceid.eduid.docker/services/oidceid", config: "oidceid_service_url" },
} as const;

type ServiceName = keyof typeof services;

const endpoints = {
  eidas: eidasApi.endpoints.eidasGetStatus,
  bankid: bankIDApi.endpoints.bankIDGetStatus,
  frejaeid: frejaeIDApi.endpoints.frejaeIDGetStatus,
  oidceid: oidceidApi.endpoints.oidceidGetStatus,
};

async function pollStatus(service: ServiceName, status: { frontend_action: string; error?: boolean }) {
  const { url, config } = services[service];
  mswServer.use(
    http.post(`${url}/get-status`, () =>
      HttpResponse.json({
        type: "test response",
        payload: { method: "sverigeid", status: "x", ...status },
      }),
    ),
  );
  const store = getTestEduIDStore({
    ...defaultDashboardTestState,
    config: { ...defaultDashboardTestState.config, [config]: url },
  });
  await store.dispatch(endpoints[service].initiate({ authn_id: "id" }) as never);
  return store.getState().resetPassword;
}

describe.each(Object.keys(services) as ServiceName[])("reset-password get-status matchers (%s)", (service) => {
  it("advances the flow on a successful recovery MFA", async () => {
    const state = await pollStatus(service, { frontend_action: "resetpwMfaAuthn", error: false });
    expect(state.next_page).toBe("SET_NEW_PASSWORD");
    expect(state.selected_option).toBe("recoveryOption");
  });

  it("does not advance on a failed recovery MFA", async () => {
    const state = await pollStatus(service, { frontend_action: "resetpwMfaAuthn", error: true });
    expect(state.next_page).not.toBe("SET_NEW_PASSWORD");
    expect(state.selected_option).not.toBe("recoveryOption");
  });

  it("does not advance for a login MFA status", async () => {
    const state = await pollStatus(service, { frontend_action: "loginMfaAuthn" });
    expect(state.next_page).not.toBe("SET_NEW_PASSWORD");
    expect(state.selected_option).not.toBe("recoveryOption");
  });
});
