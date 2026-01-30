import type { AuthCommonRequest, AuthCommonResponse } from "apis/helpers/types";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { act } from "react";
import { mswServer } from "setupTests";
import { defaultDashboardTestState, render, screen, within } from "./helperFunctions/DashboardTestApp-rtl";

test("renders frejaeID as expected", () => {
  const method = "freja_eid";

  mswServer.use(
    http.post("verify-identity", async ({ request }) => {
      const body = (await request.json()) as AuthCommonRequest;
      if (body.method != method) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: AuthCommonResponse = {
        location: "https://dummy-svipe-id-url.se",
      };
      return new HttpResponse(JSON.stringify({ type: "test response", payload: payload }));
    }),
  );

  render(<IndexMain />, {
    state: {
      personal_data: { ...defaultDashboardTestState.personal_data },
      config: {
        ...defaultDashboardTestState.config,
        freja_eid_service_url: "/freja-eid-service-url/",
        is_app_loaded: true,
      },
    },
  });
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(screen.getByRole("heading", { name: "Choose your principal identification method" })).toBeInTheDocument();
  const frejaeIDGroup = screen.getByRole("group", { name: /Most countries With Freja eID/i });
  const frejaeIDAccordion = within(frejaeIDGroup).getByRole("button", { name: /Most countries With Freja eID/i });
  act(() => {
    frejaeIDAccordion.click();
  });
  expect(within(frejaeIDGroup).getByRole("button", { name: /Proceed/ })).toBeEnabled();
});
