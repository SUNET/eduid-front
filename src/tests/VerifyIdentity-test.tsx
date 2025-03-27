import { activeClassName } from "components/Common/HeaderNav";
import VerifyIdentity from "components/Dashboard/Identity";
import { IndexMain } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState, fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

async function linkToIdentitySettings() {
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
}

test("renders verifyIdentity, non verified user", async () => {
  render(<VerifyIdentity />);
  expect(screen.getByRole("heading", { name: /Identity/i })).toBeInTheDocument();
  // show two options for verification, swedish id and eu id
  const swedishAccordion = screen.getByRole("button", {
    name: /swedish personal ID or coordination number With a digital ID/i,
  });
  expect(swedishAccordion).toBeEnabled();
  const eidasAccordion = screen.getByRole("button", { name: /EU citizen/i });
  expect(eidasAccordion).toBeEnabled();
  // click swedish id option, expanded accordion
  act(() => {
    swedishAccordion.click();
  });
  const byPostAccordion = screen.getAllByRole("button", {
    name: /by post/i,
  })[0];
  act(() => {
    byPostAccordion.click();
  });
  await waitFor(() => {
    expect(screen.getByLabelText(/ID number/i)).toBeInTheDocument();
  });
  act(() => {
    eidasAccordion.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/If you have an electronic ID from a country connected to eIDAS/i)).toBeInTheDocument();
  });
});

test("renders verifyIdentity as expected, verified user with swedish person number", async () => {
  render(<VerifyIdentity />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: {
        response: {
          eppn: "test",
          identities: { is_verified: true, nin: { number: "190102031234", verified: true } },
        },
      },
    },
  });
  expect(
    screen.getByRole("heading", { name: /The identities below are now connected to your eduID/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/19010203/i)).toBeInTheDocument();
});

test("renders verifyIdentity as expected, verified with eidas", async () => {
  render(<VerifyIdentity />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: {
        response: {
          eppn: "test",
          identities: {
            is_verified: true,
            eidas: {
              country_code: "1234",
              verified: true,
              date_of_birth: "19850101",
              prid: "prid",
              prid_persistence: "A",
            },
          },
        },
      },
    },
  });
  expect(
    screen.getByRole("heading", { name: /The identities below are now connected to your eduID/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/19850101/i)).toBeInTheDocument();
  // after eidas verification, still showing swedish identification options
  expect(
    screen.getByRole("button", { name: /swedish personal ID or coordination number With a digital ID/i })
  ).toBeInTheDocument();
});

test("renders the identity page title", async () => {
  render(<IndexMain />);
  await linkToIdentitySettings();

  expect(document.title).toContain("Identity");
});

test("renders the wizard link that can go back to the start and continue to the security page", async () => {
  render(<IndexMain />);
  await linkToIdentitySettings();

  const continueSecuritySettings = screen.getByLabelText(/To Security settings/i);
  expect(continueSecuritySettings).toBeInTheDocument();
  act(() => {
    continueSecuritySettings.click();
  });
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Security/);
});

test("renders the edit view, then be able to change names", async () => {
  render(<IndexMain />, {
    state: {
      ...defaultDashboardTestState,
      personal_data: {
        ...defaultDashboardTestState.personal_data,
        response: {
          eppn: "test-test",
          given_name: "Test",
          identities: {
            is_verified: false,
            nin: {
              number: "197010632391",
              verified: false,
            },
          },
          language: "en",
          legal_name: "Test Test",
          preferences: {
            always_use_security_key: true,
          },
          surname: "Test",
        },
      },
    },
  });
  await linkToIdentitySettings();

  const editButton = screen.getByRole("button", { name: /edit/i });
  act(() => {
    editButton.click();
  });
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(/^Edit name and display name/);
  const firstName = screen.getByRole("textbox", { name: "First name" });
  expect(firstName).toHaveAccessibleName(/^First name/);
  const surName = screen.getByRole("textbox", { name: "Last name" });
  expect(surName).toHaveAccessibleName(/^Last name/);

  fireEvent.change(firstName, { target: { value: "Sixten" } });
  fireEvent.change(surName, { target: { value: "von Samordnungsnummer" } });
  const saveButton = screen.getByRole("button", { name: /^save/i });
  expect(saveButton).toBeEnabled();

  fireEvent.click(saveButton);

  expect(firstName).toHaveValue("Sixten");
  expect(surName).toHaveValue("von Samordnungsnummer");
});
