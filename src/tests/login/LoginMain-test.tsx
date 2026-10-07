import userEvent from "@testing-library/user-event";
import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { IndexMain } from "components/IndexMain";
import { LOGIN_BASE_PATH } from "helperFunctions/paths";
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

test("renders AssuranceInfo when assurance level is not fulfilled", async () => {
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "FINISHED",
      target: "/foo",
      parameters: { SAMLResponse: "saml-response" },
      service_info: { display_name: { en: "Test Service", sv: "Testtjänsten" } },
      assurance: { required_level: "al2", current_level: "al1", fulfilled: false },
    }),
  );
  renderLoginPage(`${LOGIN_BASE_PATH}/${TEST_REF}`);

  await waitFor(() => screen.getByRole("heading", { level: 1 }));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/More secure login method needed/);
  expect(screen.getAllByText(/Test Service/).length).toBeGreaterThan(0);
  expect(screen.getByText(/Verify your identity on the Identity page/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
});

test("continues to SubmitSamlResponse after clicking Continue in AssuranceInfo", async () => {
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "FINISHED",
      target: "/foo",
      parameters: { SAMLResponse: "saml-response" },
      assurance: { required_level: "al3", current_level: "al2", fulfilled: false },
    }),
  );
  renderLoginPage(`${LOGIN_BASE_PATH}/${TEST_REF}`);

  await waitFor(() => screen.getByRole("heading", { level: 1 }));

  // al2 -> al3: the user is told to add a security key
  expect(screen.getByText(/Add a security key on the Security page/)).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /continue/i }));

  await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Logging you in/));
});

test("renders FINISHED directly when assurance is fulfilled", async () => {
  mswServer.use(
    createLoginNextHandler(TEST_REF, {
      action: "FINISHED",
      target: "/foo",
      parameters: { SAMLResponse: "saml-response" },
      assurance: { required_level: "al2", current_level: "al2", fulfilled: true },
    }),
  );
  renderLoginPage(`${LOGIN_BASE_PATH}/${TEST_REF}`);

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);
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
  render(<IndexMain />, {
    routes: [`/login/${TEST_REF}`],
  });
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
