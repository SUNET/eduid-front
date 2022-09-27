import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";
import { act } from "react-dom/test-utils";

test("renders LookupMobileProofing without ID number", () => {
  render(<LookupMobileProofing disabled={true} />, {
    state: {
      identities: { is_verified: false },
    },
  });
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeDisabled();
  expect(screen.getByText(/start by adding your ID number/i)).toBeInTheDocument();
});

test("renders LookupMobileProofing without phone number", () => {
  render(<LookupMobileProofing disabled={true} />, {
    state: {
      identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
    },
  });
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeDisabled();
  expect(screen.getByText(/start by adding your phone number/i)).toBeInTheDocument();
  // TODO: Unable to find role="link"
  // const link = screen.getByRole("link");
  // expect(link).toBeInTheDocument();
  // expect(link).toHaveAttribute("href", "/profile/settings/#phone");
});

test("renders Confirmation Modal, enabled to click modal button", async () => {
  render(<LookupMobileProofing disabled={false} />, {
    state: {
      identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
      phones: { phones: [{ number: "+46700011555", verified: true, primary: true }] },
    },
  });
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeEnabled();
  act(() => {
    button.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/phone number is connected to your id number/i)).toBeInTheDocument();
  });

  const modalConfirmButton = screen.getByRole("button", { name: /Accept/i });
  expect(modalConfirmButton).toBeEnabled();
});

test("renders button text, confirm phone number to verify phone", async () => {
  render(<LookupMobileProofing disabled={false} />, {
    state: {
      identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
      phones: { phones: [{ number: "+46700011555", verified: false, primary: false }] },
    },
  });
  expect(screen.getByText(/Confirm your phone number/i)).toBeInTheDocument();
});
