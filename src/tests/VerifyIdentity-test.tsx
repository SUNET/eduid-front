import VerifyIdentity from "components/Dashboard/Identity";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "slices/IndexConfig";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders verifyIdentity, non verified user", async () => {
  render(<VerifyIdentity />);
  expect(screen.getByRole("heading", { name: /Connect your identity to your eduID/i })).toBeInTheDocument();
  // show two options for verification, swedish id and eu id
  const swedishAccordion = screen.getByRole("button", {
    name: /swedish personal ID or coordination number With a digital ID-card/i,
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
    screen.getByRole("button", { name: /swedish personal ID or coordination number With a digital ID-card/i })
  ).toBeInTheDocument();
});

test("renders the identity page title", () => {
  render(<VerifyIdentity />);
  expect(document.title).toContain("Identity");
});
