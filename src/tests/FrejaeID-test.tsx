import { VerifyIdentityRequest, VerifyIdentityResponse } from "apis/eduidFrejaeID";
import { IndexMain } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { mswServer, rest } from "setupTests";
import { defaultDashboardTestState, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders frejaeID as expected", () => {
  const method = "frejaeIDVerifyIdentity";

  mswServer.use(
    rest.post("verify-identity", (req, res, ctx) => {
      const body = req.body as VerifyIdentityRequest;
      if (body.method != method) {
        return res(ctx.status(400));
      }
      const payload: VerifyIdentityResponse = {
        location: "https://dummy-svipe-id-url.se",
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );
  mswServer.printHandlers();

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
  const frejaeIDAccordion = screen.getByRole("button", { name: /Other countries With Freja eID/i });
  act(() => {
    frejaeIDAccordion.click();
  });
  expect(screen.getByRole("button", { name: /Proceed/ })).toBeEnabled();
});
