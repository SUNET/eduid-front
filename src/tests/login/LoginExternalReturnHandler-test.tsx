import { IndexMain } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { loginTestState, render, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const urls = {
  authn: "https://authn.eduid.docker/services/authn",
  eidas: "https://eidas.eduid.docker/services/eidas",
  bankid: "https://bankid.eduid.docker/services/bankid",
  freja_eid: "https://frejaeid.eduid.docker/services/freja-eid",
  oidceid: "https://oidceid.eduid.docker/services/oidceid",
};

const config = {
  ...loginTestState.config,
  authn_service_url: urls.authn,
  eidas_service_url: urls.eidas,
  bankid_service_url: urls.bankid,
  freja_eid_service_url: urls.freja_eid,
  oidceid_service_url: urls.oidceid,
};

// app_name in the route -> service expected to receive get-status
const cases: [string, keyof typeof urls][] = [
  ["samleid", "eidas"],
  ["eidas", "eidas"],
  ["bankid", "bankid"],
  ["freja_eid", "freja_eid"],
  ["oidceid", "oidceid"],
  ["something_else", "authn"],
];

test.each(cases)("login ext-return for app_name %s polls the %s service", async (app_name, expected) => {
  const hits: Record<string, { authn_id?: string }[]> = {};
  for (const [name, url] of Object.entries(urls)) {
    mswServer.use(
      http.post(`${url}/get-status`, async ({ request }) => {
        (hits[name] ??= []).push((await request.json()) as { authn_id?: string });
        // no frontend_action: handler just navigates back to the login base path
        return HttpResponse.json({ type: "test response", payload: { method: "x" } });
      }),
    );
  }

  render(<IndexMain />, {
    state: { ...loginTestState, config },
    routes: [`/login/ext-return/${app_name}/test-authn-id`],
  });

  await waitFor(() => expect(hits[expected]).toHaveLength(1));
  expect(hits[expected][0]).toEqual(expect.objectContaining({ authn_id: "test-authn-id" }));
  expect(Object.keys(hits)).toEqual([expected]);
});
