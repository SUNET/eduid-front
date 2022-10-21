import {
  AcceptToURequest,
  CaptchaRequest,
  GetCaptchaResponse,
  RegisterEmailRequest,
  SignupState,
  SignupStatusResponse,
  VerifyEmailRequest,
} from "apis/eduidSignup";
import SignupMain, { SIGNUP_BASE_PATH } from "components/Signup/SignupMain";
import { emailPlaceHolder } from "login/components/Inputs/EmailInput";
import { codeFormTestId } from "login/components/LoginApp/Login/ResponseCodeForm";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/SignupTestApp-rtl";

const emptyState: SignupState = {
  captcha: {
    completed: false,
  },
  credentials: {
    completed: false,
  },
  email: {
    completed: false,
  },
  invite: {
    completed: false,
    initiated_signup: false,
    is_logged_in: false,
  },
  tou: {
    completed: false,
    version: "1999-v1",
  },
  user_created: false,
};

test("e-mail form works as expected", () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  testEnterEmail("test@example.org");
});

test("Complete signup happy case", async () => {
  const testEmailAddress = "test@example.org";

  mswServer.use(
    // this request happens at render()
    rest.get("/services/signup/state", (req, res, ctx) => {
      return res(ctx.json({ type: "test response", payload: emptyState }));
    })
  );

  mswServer.printHandlers();
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  await testEnterEmail(testEmailAddress);

  await testInternalCaptcha();

  await testTermsOfUse(emptyState, testEmailAddress);

  await testEnterEmailCode(testEmailAddress);

  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent(/^Confirm.*human/);
  });

  // async tests need to await the last expect (to not get console warnings about logging after test finishes)
  await waitFor(() => {
    expect(screen.queryByText(/Never here, just testing/)).not.toBeInTheDocument();
  });
});

test("e-mail form handles rejected ToU", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", "name@example.com");
  fireEvent.change(input, { target: { value: "test@example.org" } });

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeEnabled();
  fireEvent.click(button);

  // Wait for the ToU to be displayed
  await screen.findByText(/^General rules/);

  const rejectToUButton = screen.getByRole("button", { name: "Close" });
  expect(rejectToUButton).toBeEnabled();
  fireEvent.click(rejectToUButton);

  // Wait for the ToU to be removed
  await waitFor(() => {
    expect(screen.queryByText(/^General rules/)).not.toBeInTheDocument();
  });
});

async function testEnterEmail(emailAddress?: string) {
  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  // there should be no visible form error for example when the page has just loaded
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", emailPlaceHolder);

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "not-an-email" } });
  expect(button).toBeDisabled();

  if (emailAddress) {
    fireEvent.change(input, { target: { value: "test@example.org" } });
    expect(button).toBeEnabled();

    fireEvent.click(button);
  }
}

async function testInternalCaptcha() {
  const captchaTestValue = "captcha-test-value";
  let getCaptchaCalled = false;

  mswServer.use(
    rest.post("/services/signup/get-captcha", (req, res, ctx) => {
      getCaptchaCalled = true;
      const payload: GetCaptchaResponse = { captcha_img: "data:image/png;base64,captcha-test-image" };
      return res(ctx.json({ type: "test success", payload }));
    }),
    rest.post("/services/signup/captcha", (req, res, ctx) => {
      const body = req.body as CaptchaRequest;
      if (body.internal_response != captchaTestValue) {
        return res(ctx.status(400));
      }

      const payload: SignupStatusResponse = { state: { ...emptyState, captcha: { completed: true } } };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  // Wait for the (internal) Captcha to be displayed
  await screen.findByText(/^Enter the text from the image/);

  await waitFor(() => {
    expect(getCaptchaCalled).toBe(true);
  });

  const captchaInput = screen.getByRole("textbox", { name: "Enter the text from the image" });
  expect(captchaInput).toHaveFocus();
  fireEvent.change(captchaInput, { target: { value: captchaTestValue } });

  const captchaButton = screen.getByRole("button", { name: "Continue" });
  expect(captchaButton).toBeEnabled();
  fireEvent.click(captchaButton);
}

async function testTermsOfUse(state: SignupState, testEmailAddress: string) {
  let acceptToUCalled = false;
  let registerEmailCalled = false;

  mswServer.use(
    rest.post("/services/signup/accept-tou", (req, res, ctx) => {
      const body = req.body as AcceptToURequest;
      if (body.tou_version != state.tou.version || body.tou_accepted !== true) {
        return res(ctx.status(400));
      }

      acceptToUCalled = true;
      const newState = { ...state, tou: { accepted: true } };
      return res(ctx.json({ type: "test success", payload: { state: newState } }));
    }),
    rest.post("/services/signup/register-email", (req, res, ctx) => {
      const body = req.body as RegisterEmailRequest;
      if (body.email !== testEmailAddress) {
        return res(ctx.status(400));
      }

      registerEmailCalled = true;
      const payload: SignupStatusResponse = {
        state: {
          ...emptyState,
          email: { completed: true, address: testEmailAddress, expires_time_left: 60, expires_time_max: 60 },
        },
      };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  // Wait for the ToU to be displayed
  await screen.findByText(/^Terms of use/);

  // specifically verify that the test-version ("1999-v1") of the ToU is displayed
  if (state.tou.version === "1999-v1") {
    await screen.findByText(/This a test version of terms of use version/);
  }

  const acceptToUButton = screen.getByRole("button", { name: /Accept/i });
  expect(acceptToUButton).toBeEnabled();
  fireEvent.click(acceptToUButton);

  await waitFor(() => {
    expect(acceptToUCalled).toBe(true);
  });

  await waitFor(() => {
    expect(registerEmailCalled).toBe(true);
  });
}

const correctEmailCode = "123456";
async function testEnterEmailCode(testEmailAddress: string, tryCodes: string[] = [correctEmailCode]) {
  mswServer.use(
    rest.post("/services/signup/verify-email", (req, res, ctx) => {
      const body = req.body as VerifyEmailRequest;
      if (body.verification_code !== correctEmailCode) {
        return res(ctx.status(400));
      }

      const newState = { ...emptyState, captcha: { completed: true } };
      const payload: SignupStatusResponse = { state: newState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );
  // Wait for the code inputs to be displayed
  await screen.findByText(/^Enter the .*code/);

  // Verify the e-mail address is shown
  expect(screen.getByTestId("email-address")).toHaveTextContent(testEmailAddress);

  // Verify the code inputs are shown
  // TODO: 'spinbutton' is perhaps not the ideal aria role for the code inputs?
  const inputs = screen.getAllByRole("spinbutton");
  expect(inputs).toHaveLength(6);

  for (const code of tryCodes) {
    for (let i = 0; i < code.length; i++) {
      fireEvent.change(inputs[i], { target: { value: code[i] } });
    }

    // Submit the form. This is usually done by Javascript in the browser, but we need to help it along.
    fireEvent.submit(screen.getByTestId(codeFormTestId));

    if (code !== correctEmailCode && code !== tryCodes[tryCodes.length - 1]) {
      // Incorrect code. Wait for the code inputs to be displayed again.
      await screen.findByText(/^Enter the .*code/);
    }
  }
}
