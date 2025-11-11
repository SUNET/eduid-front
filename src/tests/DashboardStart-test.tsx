import { IDENTITY_PATH, IndexMain, SECURITY_PATH } from "components/IndexMain";
import { act } from "react";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("start page heading text for new user", async () => {
  render(<IndexMain />, {
    state: {
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...configInitialState, is_app_loaded: false },
      personal_data: {
        response: {
          eppn: "12345",
          identities: {
            is_verified: false,
          },
        },
      },
    },
    routes: ["/profile/"],
  });
  expect(screen.getAllByRole("progressbar")[0]).toBeInTheDocument();
  expect(screen.getAllByRole("progressbar")[0]).toHaveClass("spinner");
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, test@test.se!/);
});

test("recommendations for new users, connect your identity", async () => {
  render(<IndexMain />, {
    state: {
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test user",
          identities: {
            is_verified: false,
          },
        },
      },
    },
    routes: ["/profile/"],
  });

  expect(screen.getByText(/Connect your identity to eduID at/i)).toBeInTheDocument();
  const identityPath = screen.getByRole("link", { name: /Identity/i });
  expect(identityPath).toHaveAttribute("href", IDENTITY_PATH);

  act(() => {
    identityPath.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Identity/);
  });
});

test("recommendations for new users, add your security key", async () => {
  render(<IndexMain />, {
    state: {
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test user",
          identities: {
            is_verified: false,
          },
        },
      },
      security: {
        credentials: [
          {
            created_ts: "2022-10-14",
            credential_type: "security.password_credential_type",
            description: null,
            key: "dummy key1",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
        ],
      },
    },
    routes: ["/profile/"],
  });

  expect(screen.getByText(/Add multi-factor authentication at/i)).toBeInTheDocument();
  const securityPath = screen.getAllByRole("link", { name: /Security/i })[0];
  expect(securityPath).toHaveAttribute("href", SECURITY_PATH);

  act(() => {
    securityPath.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Security/);
  });
});

test("recommendations for new user, verify security key", async () => {
  render(<IndexMain />, {
    state: {
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      security: {
        credentials: [
          {
            created_ts: "2021-12-02",
            credential_type: "security.webauthn_credential_type",
            description: "touchID",
            key: "dummy dummy",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
          {
            created_ts: "2022-10-14",
            credential_type: "security.password_credential_type",
            description: null,
            key: "dummy key1",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
        ],
      },
    },
    routes: ["/profile/"],
  });
  expect(screen.getByText(/Verify your Security key at/i)).toBeInTheDocument();
  const securityPath = screen.getAllByRole("link", { name: /Security/i })[0];
  expect(securityPath).toHaveAttribute("href", SECURITY_PATH);

  act(() => {
    securityPath.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Security/);
  });
});
