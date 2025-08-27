import { VerifyIdentityRequest, VerifyIdentityResponse } from "apis/eduidFrejaeID";
import { IndexMain } from "components/IndexMain";
import { act } from "react";
import { http, HttpResponse, mswServer } from "setupTests";
import { defaultDashboardTestState, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("renders frejaeID as expected", () => {
  const method = "frejaeIDVerifyIdentity";

  mswServer.use(
    http.post("verify-identity", async ({ request }) => {
      const body = (await request.json()) as VerifyIdentityRequest;
      if (body.method != method) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: VerifyIdentityResponse = {
        location: "https://dummy-svipe-id-url.se",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    })
  );
  mswServer.listHandlers();

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
  const frejaeIDAccordion = screen.getByRole("button", { name: /Most countries With Freja eID/i });
  act(() => {
    frejaeIDAccordion.click();
  });
  expect(screen.getByRole("button", { name: /Proceed/ })).toBeEnabled();
});
