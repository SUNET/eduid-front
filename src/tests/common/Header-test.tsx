import userEvent from "@testing-library/user-event";
import { Header } from "components/Common/Header";
import { initialState as configInitialState } from "slices/IndexConfig";
import { signupTestState } from "tests/helperFunctions/SignupTestApp-rtl";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("renders eduID logo with correct link", () => {
  render(<Header />, {
    state: {
      config: { ...configInitialState, eduid_site_link: "https://eduid.se" },
    },
  });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toBeInTheDocument();
  expect(logoLink).toHaveAttribute("href", "https://eduid.se");
});

test("logo links to dashboard when user is logged in", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
      },
      personal_data: {
        eppn: "abc123",
      },
    },
  });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toHaveAttribute("href", "https://dashboard.eduid.se");
});

test("shows Login button on register page", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
      },
    },
    routes: ["/register"],
  });

  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(loginButton).toBeInTheDocument();
});

test("shows Register button on login page with auth options", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
      },
      login: {
        ...loginTestState.login,
        authn_options: {
          ...loginTestState.authn,
          webauthn: true,
        },
      },
    },
    routes: ["/login/abc123"],
  });

  const registerButton = screen.getByRole("button", { name: /create eduid/i });
  expect(registerButton).toBeInTheDocument();
});

test("shows Logout button when user has session", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
        login_service_url: "https://login.eduid.se",
      },
      login: {
        ...loginTestState.login,
        authn_options: { has_session: true },
      },
      personal_data: {
        ...loginTestState.personal_data,
      },
    },
  });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  expect(logoutButton).toBeInTheDocument();
  expect(logoutButton).toBeEnabled();
});

test("disables Logout button when login_url is not available", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        login_service_url: undefined,
      },
      login: {
        ...loginTestState.login,
        authn_options: { has_session: true },
      },
    },
  });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  expect(logoutButton).toBeDisabled();
});

test("shows HeaderNav when user has eppn", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        login_service_url: "https://login.eduid.se",
      },
      personal_data: {
        eppn: "abc123",
      },
    },
  });

  expect(screen.queryByRole("button", { name: /log in/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /create eduid/i })).not.toBeInTheDocument();
});
test("when Register button is clicked and changes header button text to Login", async () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        login_service_url: "https://login.eduid.se",
      },
      login: {
        ...loginTestState.login,
        authn_options: { webauthn: true },
      },
      signup: {
        ...signupTestState.signup,
      },
    },
    routes: ["/login/abc123"],
  });

  const registerButton = screen.getByRole("button", { name: /create eduid/i });
  await userEvent.click(registerButton);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
  expect(screen.queryByRole("button", { name: /create eduid/i })).not.toBeInTheDocument();
});

test("shows Login button on error page", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
      },
    },
    routes: ["/error"],
  });

  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(loginButton).toBeInTheDocument();
});

test("shows Login button on reset-password page", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        dashboard_link: "https://dashboard.eduid.se",
      },
    },
    routes: ["/reset-password"],
  });

  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(loginButton).toBeInTheDocument();
});

test("logo has correct accessibility attributes", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        eduid_site_link: "https://eduid.se",
      },
    },
  });

  const logoLink = screen.getByRole("link", { name: /eduid start/i });
  expect(logoLink).toHaveAttribute("aria-label", "eduID start");
  expect(logoLink).toHaveAttribute("title", "eduID start");
});

test("Logout button has logout icon", () => {
  render(<Header />, {
    state: {
      config: {
        ...configInitialState,
        login_service_url: "https://login.eduid.se",
      },
      login: {
        ...loginTestState.login,
        authn_options: { has_session: true },
      },
    },
  });

  const logoutButton = screen.getByRole("button", { name: /log out/i });
  const icon = logoutButton.querySelector("svg");
  expect(icon).toBeInTheDocument();
});
