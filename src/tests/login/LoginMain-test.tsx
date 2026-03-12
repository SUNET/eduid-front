import userEvent from "@testing-library/user-event";
import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState } from "tests/helperFunctions/DashboardTestApp-rtl";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("show splash screen when not configured", () => {
  render(<IndexMain />, {
    state: {
      config: configInitialState,
    },
    routes: ["/login/abc123"],
  });

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders FINISHED as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
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
    }),
  );

  render(<IndexMain />, {
    routes: [`/login/${ref}`],
    state: {
      config: { ...defaultDashboardTestState.config, login_service_url: "https://idp.eduid.docker/services/idp" },
    },
  });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});

test("renders UsernamePw as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new Response("", { status: 400 });
      }

      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
  );

  render(<IndexMain />, {
    routes: [`/login/password/${ref}`],
    state: {
      config: { ...defaultDashboardTestState.config, login_service_url: "https://idp.eduid.docker/services/idp" },
    },
  });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Log in/);
  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Username/);
  expect(input).toHaveProperty("placeholder", "email or unique ID");
});

test("renders the login page title", () => {
  render(<IndexMain />);
  expect(document.title).toContain("Log in");
});

test("renders passkey button as expected", async () => {
  const ref = "abc987";

  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new Response("", { status: 400 });
      }

      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
  );

  render(<IndexMain />, {
    routes: [`/login/password/${ref}`],
    state: {
      config: { ...defaultDashboardTestState.config, login_service_url: "https://idp.eduid.docker/services/idp" },
      login: {
        ...loginTestState.login,
        authn_options: {
          webauthn: true,
        },
      },
    },
  });

  await waitFor(() => screen.getByRole("heading", { level: 1 }));

  const loginButton = screen.getByText("log in");
  await userEvent.click(loginButton);
  const buttonText = screen.getByText("log in with passkey");
  expect(buttonText.closest("button")).toBeInTheDocument();
  await userEvent.click(buttonText);

  // check that username and password inputs are disabled when passkey button is clicked
  const usernameInput = screen.getByRole("textbox");
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;

  await userEvent.type(usernameInput, "test@example.com");
  await userEvent.type(passwordInput, "mypassword123");

  expect(usernameInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("mypassword123");

  expect(loginButton).not.toBeDisabled();
});
