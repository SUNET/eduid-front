import { userEvent } from "@testing-library/user-event";
import { VerifyCodeRequest, VerifyCodeResponse } from "apis/eduidResetPassword";
import { codeFormTestId } from "components/Login/ResponseCodeForm";
import { ResetPasswordApp } from "components/ResetPassword/ResetPasswordApp";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import {
  loginTestState,
  render,
  RESET_PASSWORD_SERVICE_URL,
  screen,
  waitFor,
  within,
} from "../helperFunctions/LoginTestApp-rtl";

const user = userEvent.setup();
const email = "test@example.org";

function mockVerifyEmailLink(requests: VerifyCodeRequest[]) {
  mswServer.use(
    http.post(RESET_PASSWORD_SERVICE_URL + "verify-email", async ({ request }) => {
      requests.push((await request.json()) as VerifyCodeRequest);
      const payload: VerifyCodeResponse = {
        suggested_password: "suggested",
        email_code: "123456",
        email_address: email,
        extra_security: {},
        success: true,
        zxcvbn_terms: [],
      };
      return HttpResponse.json({ type: "test success", payload });
    }),
  );
}

// Scope to the code form itself, so a stray textbox or spinbutton elsewhere on the page could
// never make these tests pass without the real inputs being filled in.
function getCodeForm() {
  return within(screen.getByTestId(codeFormTestId));
}

async function typeCode(form: ReturnType<typeof getCodeForm>) {
  const digits = form.getAllByRole("spinbutton");
  for (const [i, digit] of ["1", "2", "3", "4", "5", "6"].entries()) {
    await user.type(digits[i], digit);
  }
}

test("submits the email address together with the code, and proceeds to the new-password screen", async () => {
  const requests: VerifyCodeRequest[] = [];
  mockVerifyEmailLink(requests);

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_ENTER_CODE" },
    },
  });

  const form = getCodeForm();

  await user.type(form.getByRole("textbox"), email);
  await typeCode(form);

  await user.click(screen.getByRole("button", { name: /^ok$/i }));

  await waitFor(() => {
    expect(requests).toEqual([expect.objectContaining({ email, email_code: "123456" })]);
  });

  // A successful verify with no extra_security options must route to SET_NEW_PASSWORD - a
  // regression that routed elsewhere (or dropped the dispatch) would leave the code form on
  // screen and this would time out.
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reset Password: Suggested password");
  });
});

test("prefills the email field from the address the reset was started with", async () => {
  const requests: VerifyCodeRequest[] = [];
  mockVerifyEmailLink(requests);

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        next_page: "RESET_PW_ENTER_CODE",
        email_address: email,
      },
    },
  });

  const form = getCodeForm();

  // The field must already carry the stored address - it is never typed in this test.
  expect(form.getByRole("textbox")).toHaveValue(email);

  await typeCode(form);
  await user.click(screen.getByRole("button", { name: /^ok$/i }));

  await waitFor(() => {
    expect(requests).toEqual([expect.objectContaining({ email, email_code: "123456" })]);
  });
});

test("says what is missing when the code is submitted with an empty email address", async () => {
  const requests: VerifyCodeRequest[] = [];
  mockVerifyEmailLink(requests);

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_ENTER_CODE" },
    },
  });

  await typeCode(getCodeForm());

  // The Ok button is disabled, but ResponseCodeForm submits on Enter whether the form is valid or
  // not, and EmailInput never flags a blank value while autoComplete is set. Enter therefore
  // reaches the submit handler with no email address, and the user has to be told why nothing
  // happened.
  await user.keyboard("{Enter}");

  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(/email address/i);
  });

  expect(getCodeForm().getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  expect(getCodeForm().getByRole("textbox")).toHaveAttribute("aria-errormessage", "missing-email-error");

  expect(requests).toEqual([]);
  // The typed code has to survive, or the user has to enter all six digits again.
  const digits = getCodeForm()
    .getAllByRole("spinbutton")
    .map((input) => (input as HTMLInputElement).value);
  expect(digits).toEqual(["1", "2", "3", "4", "5", "6"]);
});

test("keeps the Ok button disabled while the email field is empty", async () => {
  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_ENTER_CODE" },
    },
  });

  const form = getCodeForm();
  await typeCode(form);

  // All six digits are filled in, but the email field was never touched - Ok must stay disabled
  // so the user isn't left with a dead click and no explanation.
  expect(screen.getByRole("button", { name: /^ok$/i })).toBeDisabled();
});
