import { VerifyIdentityRequest, VerifyIdentityResponse } from "apis/eduidSvipe";
import { IndexMain } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { mswServer, rest } from "setupTests";
import { defaultDashboardTestState, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders svipeID as expected", () => {
  const method = "svipeidVerifyIdentity";

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
      config: { ...defaultDashboardTestState.config, svipe_service_url: "/svipe-url/", is_app_loaded: true },
    },
  });
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(screen.getByRole("heading", { name: "Choose your principal identification method" })).toBeInTheDocument();
  const svipeAccordion = screen.getByRole("button", { name: /All other countries With Svipe ID/i });
  act(() => {
    svipeAccordion.click();
  });
  expect(screen.getByRole("button", { name: /Proceed/ })).toBeEnabled();
});
