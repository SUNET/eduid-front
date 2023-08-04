import LookupMobileProofing from "components/Dashboard/LookupMobileProofing";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

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
  expect(screen.getByText(/Start by adding your Swedish phone number/i)).toBeInTheDocument();
});

test("renders Confirmation Modal, enabled to click proceed button", async () => {
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

test("renders button text, confirm phone number to verify by phone", async () => {
  render(<LookupMobileProofing disabled={false} />, {
    state: {
      identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
      phones: { phones: [{ number: "+46700011555", verified: false, primary: false }] },
    },
  });
  expect(screen.getByText(/Confirm your phone number/i)).toBeInTheDocument();
});
