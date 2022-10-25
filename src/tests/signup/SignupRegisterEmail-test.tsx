import {
  AcceptToURequest,
  CaptchaRequest,
  CreateUserRequest,
  GetCaptchaResponse,
  RegisterEmailRequest,
  SignupState,
  SignupStatusResponse,
  VerifyEmailRequest,
} from "apis/eduidSignup";
import SignupMain, { SIGNUP_BASE_PATH } from "components/Signup/SignupMain";
import { format_password } from "components/Signup/SignupUserCreated";
import { emailPlaceHolder } from "login/components/Inputs/EmailInput";
import { codeFormTestId } from "login/components/LoginApp/Login/ResponseCodeForm";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/SignupTestApp-rtl";

const emptyState: SignupState = {
  already_signed_up: false,
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

const testEmailAddress = "test@example.org";
const captchaTestValue = "captcha-test-value";
const testPassword = "abcdefghij";
const correctEmailCode = "123456";

let currentState = JSON.parse(JSON.stringify(emptyState)); // make a copy of the state
let getCaptchaCalled = false;
let acceptToUCalled = false;
let registerEmailCalled = false;
let verifyEmailCalled = false;
let getPasswordCalled = false;
let createUserCalled = false;

/* Set up fake backend endpoints to get us through a complete signup.
 * These all need to be registered before the testing begins since we want to have
 * generic functions to test parts of the flow. Otherwise, a request can be missed
 * when returning from one of the functions before the handler is registered in the
 * next function.
 */
function happyCaseBackend(state: SignupState) {
  currentState = JSON.parse(JSON.stringify(state)); // make a fresh copy of the state

  mswServer.use(
    // this request happens at render of SignupMain
    rest.get("/services/signup/state", (req, res, ctx) => {
      return res(ctx.json({ type: "test response", payload: currentState }));
    })
  );

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

      currentState.captcha.completed = true;
      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

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
      currentState.email.address = testEmailAddress;
      currentState.email.expires_time_left = 60;
      currentState.email.expires_time_total = 60;

      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  mswServer.use(
    rest.post("/services/signup/verify-email", (req, res, ctx) => {
      const body = req.body as VerifyEmailRequest;
      if (body.verification_code !== correctEmailCode) {
        return res(ctx.status(400));
      }

      verifyEmailCalled = true;
      currentState.email.completed = true;

      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  mswServer.use(
    rest.post("/services/signup/get-password", (req, res, ctx) => {
      getPasswordCalled = true;
      currentState.credentials.password = testPassword;
      currentState.credentials.completed = true;
      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  mswServer.use(
    rest.post("/services/signup/create-user", (req, res, ctx) => {
      const body = req.body as CreateUserRequest;
      if (body.use_webauthn && !body.use_password) {
        console.error("Missing password, or webauthn is not supported");
        return res(ctx.status(400));
      }

      createUserCalled = true;
      currentState.user_created = true;

      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  mswServer.printHandlers();
}

test("e-mail form works as expected", () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  testEnterEmail("test@example.org");
});

test("Complete signup happy case", async () => {
  happyCaseBackend(emptyState);

  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  await testEnterEmail(testEmailAddress);

  await testInternalCaptcha();

  await testTermsOfUse(emptyState);

  await testEnterEmailCode(testEmailAddress);

  await waitFor(() => {
    expect(getPasswordCalled).toBe(true);
  });

  await waitFor(() => {
    expect(createUserCalled).toBe(true);
  });

  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent(/^You have completed/);
  });

  // verify e-mail and password are shown
  expect(screen.getByRole("status", { name: /mail/i })).toHaveTextContent(testEmailAddress);
  expect(screen.getByRole("status", { name: /password/i })).toHaveTextContent(format_password(testPassword));

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
    fireEvent.change(input, { target: { value: emailAddress } });
    expect(button).toBeEnabled();

    fireEvent.click(button);
  }
}

async function testInternalCaptcha() {
  getCaptchaCalled = false;

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

async function testTermsOfUse(state: SignupState) {
  acceptToUCalled = false;
  registerEmailCalled = false;

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

async function testEnterEmailCode(testEmailAddress: string, tryCodes: string[] = [correctEmailCode]) {
  verifyEmailCalled = false;

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

  await waitFor(() => {
    expect(verifyEmailCalled).toBe(true);
  });
}
