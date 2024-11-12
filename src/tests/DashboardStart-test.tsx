import { IDENTITY_PATH, IndexMain, SECURITY_PATH } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

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

  await waitFor(() => {
    expect(screen.getByRole("link", { name: /Go to Identity/i })).toHaveAttribute("href", IDENTITY_PATH);
  });
});

test("recommendations for new user, adding security key", async () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });
  const addingSecurityButton = screen.getByRole("button", { name: /Add your security key/i });
  expect(addingSecurityButton).toBeEnabled();
  act(() => {
    addingSecurityButton.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("link", { name: /Go to Advanced Settings/i })).toHaveAttribute("href", SECURITY_PATH);
  });
});

test("not renders letter proofing progress, verified user with swedish id number", () => {
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

  await waitFor(() => {
    expect(screen.getByText(/Add two-factor authentication at/i)).toBeInTheDocument();
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
  await waitFor(() => {
    expect(screen.getByText(/Verify your Security key at/i)).toBeInTheDocument();
  });
});
