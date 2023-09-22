import { IndexMain, advancedSettingsPath, identityPath, settingsPath } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "slices/IndexConfig";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("start page heading text for new user", async () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, !/);
  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(/Your identity is not verified./);
});

test("recommendations for new users, adding name", async () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });
  const addingNameButton = screen.getByRole("button", { name: /Add your name/i });
  expect(addingNameButton).toBeEnabled();
  act(() => {
    addingNameButton.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("link", { name: /Go to Settings/i })).toBeInTheDocument();
  });
});

test("recommendations for new users, adding phone", async () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });

  const addingPhoneButton = screen.getByRole("button", { name: /Add your phone number/i });
  expect(addingPhoneButton).toBeEnabled();
  act(() => {
    addingPhoneButton.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("link", { name: /Go to Settings/i })).toHaveAttribute("href", `${settingsPath}/#phone`);
  });
});

test("recommendations for new user, verify identity", async () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });

  const verifyIdentityButton = screen.getByRole("button", { name: /Verify your identity/i });
  expect(verifyIdentityButton).toBeEnabled();
  act(() => {
    verifyIdentityButton.click();
  });
  await waitFor(() => {
    expect(screen.getByRole("link", { name: /Go to Identity/i })).toHaveAttribute("href", identityPath);
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
    expect(screen.getByRole("link", { name: /Go to Advanced Settings/i })).toHaveAttribute(
      "href",
      advancedSettingsPath
    );
  });
});

test("not renders letter proofing progress, verified user with swedish id number", () => {
  render(<IndexMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: false },
      identities: {
        is_verified: true,
        nin: { number: "190102031234", verified: true },
      },
      letter_proofing: {
        letter_expired: false,
        letter_expires: "2023-04-10T23:59:59.678000+00:00",
        letter_expires_in_days: 12,
        letter_sent: "2023-03-27T10:25:37.678000+00:00",
        letter_sent_days_ago: 2,
      },
    },
    routes: ["/profile/"],
  });
  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(/Your identity is verified./);
  const progressHeading = screen.queryByText("Currently in progress");
  expect(progressHeading).not.toBeInTheDocument();
});

test("heading text after password reset", () => {
  render(<IndexMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: false },
      identities: {
        is_verified: false,
        nin: { number: "190102031234", verified: false },
      },
    },
    routes: ["/profile/"],
  });
  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(
    /Your identity is no longer verified after password reset./
  );
  expect(screen.getByRole("button", { name: /Verify your identity/i })).toBeEnabled();
});

test("renders swedish verification options when user verified with eidas", () => {
  render(<IndexMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: false },
      identities: {
        is_verified: true,
        nin: { number: "190102031234", verified: false },
        eidas: { prid: "abcd", prid_persistence: "A", date_of_birth: "1990-08-19", country_code: "XE", verified: true },
      },
    },
    routes: ["/profile/"],
  });
  expect(screen.getByRole("button", { name: /Verify your identity with Swedish/i })).toBeEnabled();
});
