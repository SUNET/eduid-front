import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { LoginMain } from "login/components/LoginMain";
import { mswServer, rest } from "setupTests";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("show splash screen when not configured", () => {
  render(<LoginMain />, {
    state: {
      app: { ...loginTestState.app, is_loaded: false },
    },
    routes: ["/login/abc123"],
  });

  const button = screen.getByRole("button", { name: "Register" });
  expect(button).toBeEnabled();

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders FINISHED as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    rest.post("/next", (req, res, ctx) => {
      const body = req.body as LoginNextRequest;
      if (body.ref != ref) {
        return res(ctx.status(400));
      }

      const payload: LoginNextResponse = {
        action: "FINISHED",
        target: "/foo",
        parameters: { SAMLResponse: "saml-response" },
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  render(<LoginMain />, { routes: [`/login/${ref}`] });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});
