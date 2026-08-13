import { userEvent } from "@testing-library/user-event";
import { GetResetPasswordStateResponse } from "apis/eduidResetPassword";
import { ResetPasswordApp } from "components/ResetPassword/ResetPasswordApp";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import {
  loginTestState,
  render,
  RESET_PASSWORD_SERVICE_URL,
  screen,
  waitFor,
} from "../helperFunctions/LoginTestApp-rtl";

/**
 * Resuming a reset that already passed the code step.
 *
 * Everything the screens after the code step render from - extra_security, email_code and
 * suggested_password - is only ever put in redux by /verify-email/, and redux is in-memory only.
 * A reload therefore leaves the browser with a backend state that reports the email as verified
 * and a redux state that holds nothing to render, so these tests render the app rather than
 * asserting on next_page: a screen that returns null looks identical to correct routing in a
 * state assertion, and produces a blank page for the user.
 */

const user = userEvent.setup();
const email = "test@example.org";

function verifiedStateResponse(): GetResetPasswordStateResponse {
  return {
    state: {
      captcha: { completed: true },
      email: { address: email, completed: true },
    },
  };
}

async function submitEmailAddress() {
  await user.type(screen.getByRole("textbox"), email);
  await user.click(screen.getByRole("button", { name: /^send email$/i }));
}

test("asks for the code again when the reset is resumed with nothing left in redux", async () => {
  mswServer.use(
    http.get(RESET_PASSWORD_SERVICE_URL, () =>
      HttpResponse.json({ type: "test success", payload: verifiedStateResponse() }),
    ),
  );

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      // A reload wipes redux, so the user starts over from the email screen.
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_ENTER_EMAIL" },
    },
  });

  await submitEmailAddress();

  // The backend says the email is verified, but this browser has no extra_security, no email_code
  // and no suggested_password - re-verifying the code is what puts them back.
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reset Password: Enter email code");
  });

  // The address just entered is carried over, so only the code has to be typed again.
  expect(screen.getByRole("textbox")).toHaveValue(email);
});

test("goes straight to the verification methods when the code was verified in this browser", async () => {
  mswServer.use(
    http.get(RESET_PASSWORD_SERVICE_URL, () =>
      HttpResponse.json({ type: "test success", payload: verifiedStateResponse() }),
    ),
  );

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        next_page: "RESET_PW_ENTER_EMAIL",
        extra_security: { swedish_eid: true },
      },
    },
  });

  await submitEmailAddress();

  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reset Password: Verification method");
  });
});

test("asks for the code again when the status request fails outright", async () => {
  mswServer.use(http.get(RESET_PASSWORD_SERVICE_URL, () => new HttpResponse(null, { status: 500 })));

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_ENTER_EMAIL" },
    },
  });

  await submitEmailAddress();

  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reset Password: Enter email code");
  });
});
