import userEvent from "@testing-library/user-event";
import LetterProofing from "components/Dashboard/LetterProofing";
import { act } from "react";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders LetterProofing without ID number", () => {
  render(<LetterProofing disabled={true} />, {
    state: {
      personal_data: {
        response: {
          eppn: "test",
          identities: { is_verified: false },
        },
      },
    },
  });
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeDisabled();
  expect(screen.getByText(/start by adding your ID number/i)).toBeInTheDocument();
});

test("renders LetterProofing, after sent letter enabled proceed button to enter code", () => {
  render(<LetterProofing disabled={false} />, {
    state: {
      personal_data: {
        response: {
          eppn: "test",
          identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
        },
      },
      letter_proofing: {
        letter_expired: false,
        letter_expires: "2022-10-17T23:59:59.525002+00:00",
        letter_expires_in_days: 14,
        letter_sent: "2022-10-03T08:10:27.525002+00:00",
        letter_sent_days_ago: 0,
      },
    },
  });
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeEnabled();
  expect(
    screen.getByText(/When you have received the letter, proceed by clicking the button below./i),
  ).toBeInTheDocument();
});

test("renders LetterProofing, expired letter enabled to resend letter", async () => {
  render(<LetterProofing disabled={false} />, {
    state: {
      personal_data: {
        response: {
          eppn: "test",
          identities: { nin: { number: "198812120000", verified: false }, is_verified: false },
        },
      },
      letter_proofing: {
        letter_expired: true,
        letter_expires: "2020-01-15T23:59:59.123000+00:00",
        letter_expires_in_days: undefined,
        letter_sent: "2020-01-01T01:01:01.123000+00:00",
        letter_sent_days_ago: 1006,
      },
    },
  });
  expect(screen.getByText(/To request a new code, proceed by clicking the button below./i)).toBeInTheDocument();
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeEnabled();
  act(() => {
    button.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/Use a code sent by post to your address/i)).toBeInTheDocument();
  });

  const modalConfirmButton = screen.getByRole("button", { name: /Accept/i });
  expect(modalConfirmButton).toBeEnabled();
});

test("show and hide button toggles NIN input visibility", async () => {
  render(<LetterProofing disabled={false} />);

  const ninInput = screen.getByRole("textbox");
  await userEvent.type(ninInput, "198812120000");
  expect(ninInput).toHaveValue("••••••••••••");

  const showButton = screen.getByRole("button", { name: /show/i });
  await act(async () => {
    showButton.click();
  });

  expect(ninInput).toHaveValue("198812120000");
  const hideButton = screen.getByRole("button", { name: /hide/i });
  await act(async () => {
    hideButton.click();
  });

  expect(ninInput).toHaveValue("••••••••••••");
});
