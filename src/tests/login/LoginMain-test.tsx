import userEvent from "@testing-library/user-event";
import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { IndexMain, LOGIN_BASE_PATH } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState } from "tests/helperFunctions/DashboardTestApp-rtl";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const TEST_REF = "abc987";
const LOGIN_SERVICE_URL = "https://idp.eduid.docker/services/idp";

const baseState = {
  config: { ...defaultDashboardTestState.config, login_service_url: LOGIN_SERVICE_URL },
  login: loginTestState.login,
};
interface StateOptions {
  webauthn?: boolean;
}

function createState(options: StateOptions = {}) {
  return {
    ...baseState,
    login: {
      ...baseState.login,
      authn_options: {
        ...baseState.login.authn_options,
        webauthn: options.webauthn ?? false,
      },
    },
  };
}

function createLoginNextHandler(ref: string, payload: LoginNextResponse) {
  return http.post(`${LOGIN_SERVICE_URL}/next`, async ({ request }) => {
    const body = (await request.json()) as LoginNextRequest;
    if (body.ref !== ref) {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json({ type: "test response", payload });
  });
}

function renderLoginPage(route: string, options: StateOptions = {}) {
  return render(<IndexMain />, {
    routes: [route],
    state: createState(options),
  });
}

test("show splash screen when not configured", () => {
  render(<IndexMain />, {
    state: { config: configInitialState },
    routes: [`${LOGIN_BASE_PATH}/abc123`],
  });

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders FINISHED as expected", async () => {
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "FINISHED",
      target: "/foo",
      parameters: { SAMLResponse: "saml-response" },
    }),
  );
  renderLoginPage(`${LOGIN_BASE_PATH}/${TEST_REF}`);

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});

test("renders UsernamePw as expected", async () => {
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "USERNAMEPASSWORD",
      target: "/foo",
    }),
  );

  renderLoginPage(`${LOGIN_BASE_PATH}/password/${TEST_REF}`);

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
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "USERNAMEPASSWORD",
      target: "/foo",
    }),
  );

  renderLoginPage(`${LOGIN_BASE_PATH}/password/${TEST_REF}`, { webauthn: true });

  await waitFor(() => screen.getByRole("heading", { level: 1 }));

  const loginButton = screen.getByText("log in");
  await userEvent.click(loginButton);
  const buttonText = screen.getByText("log in with passkey");
  expect(buttonText.closest("button")).toBeInTheDocument();
  await userEvent.click(buttonText);

  const usernameInput = screen.getByRole("textbox");
  const passwordInput = screen.getByPlaceholderText(/enter password/i);

  await userEvent.type(usernameInput, "test@example.com");
  await userEvent.type(passwordInput, "password123");

  expect(usernameInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password123");

  expect(loginButton).toBeEnabled();
});
