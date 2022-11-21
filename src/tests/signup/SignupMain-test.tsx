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
import { formatPassword } from "components/Signup/SignupUserCreated";
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
      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test response", payload }));
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
      currentState.tou.completed = true;

      const payload: SignupStatusResponse = { state: currentState };
      return res(ctx.json({ type: "test success", payload }));
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
        const bad_attempts = currentState.email.bad_attempts || 0;
        currentState.email.bad_attempts = bad_attempts + 1;
        currentState.email.bad_attempts_max = 3;
        const payload: SignupStatusResponse = { state: currentState };
        return res(
          ctx.json({
            type: "test_FAIL",
            error: true,
            payload: { ...payload, message: "testing-too-many-incorrect-email-codes" },
          })
        );
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

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
  happyCaseBackend(emptyState);
});

afterEach(async () => {
  // async tests need to await the last expect (to not get console warnings about logging after test finishes)
  await waitFor(() => expect(screen.queryByTestId("test-cleanup")).not.toBeInTheDocument());
});

test("e-mail form works as expected", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/`] });

  await testEnterEmail({ email: testEmailAddress });
});

test("complete signup happy case", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}`] });

  screen.debug();

  await testEnterEmail({ email: testEmailAddress });

  await testInternalCaptcha();

  await testTermsOfUse({ state: emptyState });

  await testEnterEmailCode({ email: testEmailAddress });

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
  expect(screen.getByRole("status", { name: /password/i })).toHaveTextContent(formatPassword(testPassword));
});

test("handles rejected ToU", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}`] });

  await testEnterEmail({ email: testEmailAddress });

  await testInternalCaptcha();

  await testTermsOfUse({ state: emptyState, clickAccept: false, clickCancel: true });

  await testEnterEmail({ email: testEmailAddress });

  // no captcha should be required this time around, since we already completed it

  // don't click anything, just verify the ToU is shown again
  await testTermsOfUse({ state: emptyState, clickAccept: false, clickCancel: false });
});

test("handles wrong email code", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  await testEnterEmail({ email: testEmailAddress });

  await testInternalCaptcha();

  await testTermsOfUse({ state: emptyState });

  await testEnterEmailCode({
    email: testEmailAddress,
    tryCodes: ["111111", "222222", "333333"],
    expectSuccess: false,
  });

  // after three incorrect attempts, we should be returned to the first page where we enter an e-mail address
  await testEnterEmail({ email: testEmailAddress, expectErrorShown: true });
});

async function testEnterEmail({ email, expectErrorShown = false }: { email?: string; expectErrorShown?: boolean }) {
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/));

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  if (expectErrorShown) {
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  } else {
    // there should be no visible form error for example when the page has just loaded
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  }

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", emailPlaceHolder);

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "not-an-email" } });
  expect(button).toBeDisabled();

  if (email) {
    fireEvent.change(input, { target: { value: email } });
    expect(button).toBeEnabled();

    fireEvent.click(button);
  }
}

async function testInternalCaptcha() {
  getCaptchaCalled = false;

  // Wait for the (internal) Captcha to be displayed
  await screen.findByText(/^Enter the code from the image/);

  await waitFor(() => {
    expect(getCaptchaCalled).toBe(true);
  });

  const captchaInput = screen.getByRole("textbox", { name: "Enter the code from the image" });
  expect(captchaInput).toHaveFocus();
  fireEvent.change(captchaInput, { target: { value: captchaTestValue } });

  const captchaButton = screen.getByRole("button", { name: "Continue" });
  expect(captchaButton).toBeEnabled();
  fireEvent.click(captchaButton);
}

async function testTermsOfUse({
  state,
  clickAccept = true,
  clickCancel = false,
}: {
  state: SignupState;
  clickAccept?: boolean;
  clickCancel?: boolean;
}) {
  acceptToUCalled = false;
  registerEmailCalled = false;

  // Wait for the ToU to be displayed
  await screen.findByText(/^Terms of use/);

  // specifically verify that the test-version ("1999-v1") of the ToU is displayed
  if (state.tou.version === "1999-v1") {
    await screen.findByText(/This a test version of terms of use version/);
  }

  if (clickAccept) {
    const acceptToUButton = screen.getByRole("button", { name: /Accept/i });
    expect(acceptToUButton).toBeEnabled();
    fireEvent.click(acceptToUButton);

    await waitFor(() => {
      expect(acceptToUCalled).toBe(true);
    });

    await waitFor(() => {
      expect(registerEmailCalled).toBe(true);
    });
  } else if (clickCancel) {
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    expect(cancelButton).toBeEnabled();
    fireEvent.click(cancelButton);
  }
}

async function testEnterEmailCode({
  email,
  tryCodes = [correctEmailCode],
  expectSuccess = true,
}: {
  email: string;
  tryCodes?: string[];
  expectSuccess?: boolean;
}) {
  verifyEmailCalled = false;

  // Wait for the code inputs to be displayed
  await screen.findByText(/^Enter the .*code/);

  // Verify the e-mail address is shown
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  for (const code of tryCodes) {
    console.log(`Trying code ${code}`);
    await enterEmailCode(code);
  }

  await waitFor(() => {
    expect(verifyEmailCalled).toBe(expectSuccess);
  });
}

async function enterEmailCode(code: string) {
  await screen.findByText(/^Enter the .*code/);

  // Verify the code inputs are shown
  // TODO: 'spinbutton' is perhaps not the ideal aria role for the code inputs?
  const form = await screen.findByTestId(codeFormTestId);
  const inputs = await screen.findAllByRole("spinbutton");
  expect(inputs).toHaveLength(code.length);

  for (let i = 0; i < code.length; i++) {
    fireEvent.change(inputs[i], { target: { value: code[i] } });
  }

  // Submit the form. This is usually done by Javascript in the browser, but we need to help it along.
  fireEvent.submit(form);

  // wait until the form disappears
  waitFor(() => {
    expect(screen.queryByTestId(codeFormTestId)).not.toBeInTheDocument();
  });
}
