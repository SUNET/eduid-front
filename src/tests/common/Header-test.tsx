import userEvent from "@testing-library/user-event";
import { Header } from "components/Common/Header";
import { LOGIN_BASE_PATH } from "components/IndexMain";
import { initialState as configInitialState } from "slices/IndexConfig";
import { signupTestState } from "tests/helperFunctions/SignupTestApp-rtl";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const baseConfig = {
  ...configInitialState,
  dashboard_link: "https://dashboard.eduid.se",
  login_service_url: "https://login.eduid.se",
  eduid_site_link: "https://eduid.se",
};

const loggedInState = {
  config: baseConfig,
  personal_data: { eppn: "abc123" },
};

const sessionState = {
  config: baseConfig,
  login: {
    ...loginTestState.login,
    authn_options: { has_session: true },
  },
};

const loginPageState = {
  config: baseConfig,
  login: {
    ...loginTestState.login,
    authn_options: { webauthn: true },
  },
};

test("renders eduID logo with correct link", () => {
  render(<Header />, { state: { config: baseConfig } });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toBeInTheDocument();
  expect(logoLink).toHaveAttribute("href", "https://eduid.se");
});

test("logo links to dashboard when user is logged in", () => {
  render(<Header />, { state: loggedInState });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toHaveAttribute("href", "https://dashboard.eduid.se");
});

test("logo has correct accessibility attributes", () => {
  render(<Header />, { state: { config: baseConfig } });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toHaveAttribute("aria-label", "eduID start");
  expect(logoLink).toHaveAttribute("title", "eduID start");
});

test.each(["/register", "/error", "/reset-password"])("shows Login button on %s page", (route) => {
  render(<Header />, {
    state: { config: baseConfig },
    routes: [route],
  });

  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(loginButton).toBeInTheDocument();
});

test("shows Register button on login page with auth options", () => {
  render(<Header />, {
    state: loginPageState,
    routes: [`${LOGIN_BASE_PATH}/abc123`],
  });

  const registerButton = screen.getByRole("button", { name: /create eduid/i });
  expect(registerButton).toBeInTheDocument();
});

test("when Register button is clicked, changes header button text to Login", async () => {
  render(<Header />, {
    state: {
      ...loginPageState,
      signup: { ...signupTestState.signup },
    },
    routes: [`${LOGIN_BASE_PATH}/abc123`],
  });

  const registerButton = screen.getByRole("button", { name: /create eduid/i });
  await userEvent.click(registerButton);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
  expect(screen.queryByRole("button", { name: /create eduid/i })).not.toBeInTheDocument();
});

test("shows Logout button when user has session", () => {
  render(<Header />, { state: sessionState });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  expect(logoutButton).toBeInTheDocument();
  expect(logoutButton).toBeEnabled();
});

test("disables Logout button when login_url is not available", () => {
  render(<Header />, {
    state: {
      ...sessionState,
      config: { ...baseConfig, login_service_url: undefined },
    },
  });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  expect(logoutButton).toBeDisabled();
});

test("Logout button has logout icon", () => {
  render(<Header />, { state: sessionState });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  const icon = logoutButton.querySelector("svg");
  expect(icon).toBeInTheDocument();
});

test("shows HeaderNav when user has eppn", () => {
  render(<Header />, { state: loggedInState });

  expect(screen.queryByRole("button", { name: /log in/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /create eduid/i })).not.toBeInTheDocument();
});
