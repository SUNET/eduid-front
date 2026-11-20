import type { AuthCommonRequest, AuthCommonResponse } from "apis/helpers/types";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { act } from "react";
import { mswServer } from "setupTests";
import { defaultDashboardTestState, render, screen, waitFor, within } from "../helperFunctions/DashboardTestApp-rtl";

const OIDCEID_URL = "https://oidceid.eduid.docker/services/oidceid";

function goToIdentity() {
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(
    screen.getByRole("heading", {
      name: "Choose your principal identification method",
    }),
  ).toBeInTheDocument();
}

function renderWithConfig(config: Record<string, unknown>) {
  render(<IndexMain />, {
    state: {
      personal_data: { ...defaultDashboardTestState.personal_data },
      config: {
        ...defaultDashboardTestState.config,
        ...config,
        is_app_loaded: true,
      },
    },
  });
  goToIdentity();
}

test("renders SverigeID option when oidceid_service_url is configured", async () => {
  let postedMethod: string | undefined;
  mswServer.use(
    http.post(`${OIDCEID_URL}/verify-identity`, async ({ request }) => {
      const body = (await request.json()) as AuthCommonRequest;
      postedMethod = body.method;
      // no location, so the test does not try to navigate
      const payload = {} as AuthCommonResponse;
      return HttpResponse.json({ type: "test response", payload });
    }),
  );

  renderWithConfig({ oidceid_service_url: OIDCEID_URL });

  const swedish = screen.getByRole("group", {
    name: /Swedish personal ID or coordination number/i,
  });
  act(() => {
    within(swedish).getByText("Swedish personal ID or coordination number").click();
  });
  const group = within(swedish).getByRole("group", { name: /with SverigeID/i });
  act(() => {
    within(group).getByText("with SverigeID").click();
  });
  const proceed = within(group).getByRole("button", {
    name: /Proceed with SverigeID/,
  });
  expect(proceed).toBeEnabled();
  await act(async () => {
    proceed.click();
  });
  await waitFor(() => expect(postedMethod).toBe("sverigeid"));
});

test("does not render SverigeID option without oidceid_service_url", () => {
  renderWithConfig({ oidceid_service_url: undefined });
  expect(screen.queryByText("with SverigeID")).not.toBeInTheDocument();
});
