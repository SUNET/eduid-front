import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse, mswServer } from "setupTests";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("show splash screen when not configured", () => {
  render(<IndexMain />, {
    state: {
      app: { ...loginTestState.app, is_loaded: false },
    },
    routes: ["/login/abc123"],
  });

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders FINISHED as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    http.post("/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new HttpResponse(null, { status: 400 });
      }

      const payload: LoginNextResponse = {
        action: "FINISHED",
        target: "/foo",
        parameters: { SAMLResponse: "saml-response" },
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    })
  );

  render(<IndexMain />, { routes: [`/login/${ref}`] });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});

test("renders UsernamePw as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    http.post("/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new HttpResponse(null, { status: 400 });
      }

      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    })
  );

  render(<IndexMain />, { routes: [`/login/password/${ref}`] });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Log in/);
  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Username/);
  expect(input).toHaveProperty("placeholder", "email or username");
});

test("renders the login page title", () => {
  render(<IndexMain />);
  expect(document.title).toContain("Log in");
});
