import { userEvent } from "@testing-library/user-event";
import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import {
  GetResetPasswordStateResponse,
  NewPasswordRequest,
  NewPasswordResponse,
  RequestEmailLinkRequest,
  RequestEmailLinkResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "apis/eduidResetPassword";
import { emailPlaceHolder } from "components/Common/EmailInput";
import { userNameInputPlaceHolder } from "components/Common/UserNameInput";
<<<<<<< HEAD
import { IndexMain, LOGIN_BASE_PATH } from "components/IndexMain";
import { ResetPasswordApp } from "components/ResetPassword/ResetPasswordApp";
=======
import { IndexMain } from "components/IndexMain";
import { LOGIN_BASE_PATH } from "helperFunctions/paths";
>>>>>>> fd3f1e27f (apply consistent fetchStatus pattern across all ExternalReturnHandler components)
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const TEST_PASSWORD = "password";
const user = userEvent.setup();
const email = "test@example.org";
const ref = "abc567";

function expectStepIndicator(activeStep: number) {
  const steps = document.querySelectorAll(".step-item");
  expect(steps).toHaveLength(6);
  steps.forEach((step, i) => {
    const stepNum = i + 1;
    if (stepNum < activeStep) {
      expect(step).toHaveClass("completed");
    } else if (stepNum === activeStep) {
      expect(step).toHaveClass("active");
    } else {
      expect(step).not.toHaveClass("active");
      expect(step).not.toHaveClass("completed");
    }
  });
}

function makeResetPasswordPayload(): GetResetPasswordStateResponse {
  return {
    state: {
      captcha: { completed: true },
      email: {
        address: email,
        completed: false,
        expires_time_left: 368,
        expires_time_max: 7200,
        sent_at: "2025-10-23T09:45:21.179902+00:00",
      },
    },
  };
}

test("can click 'forgot password' with an e-mail address", async () => {
  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref !== ref) {
        return new Response(null, { status: 400 });
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.get("https://idp.eduid.docker/services/reset-password/", () => {
      const payload = makeResetPasswordPayload();
      return HttpResponse.json({ type: "test success", payload: payload });
    }),
    http.post("https://idp.eduid.docker/services/reset-password/", async ({ request }) => {
      const body = (await request.json()) as RequestEmailLinkRequest;
      if (body.email !== email) {
        return new Response(null, { status: 400 });
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
  );

  render(<IndexMain />, {
    routes: [`${LOGIN_BASE_PATH}/${ref}`],
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        captcha_completed: true,
      },
    },
  });

  // Wait for the username-password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Log in");
  });

  const emailInput = screen.getByRole("textbox");
  expect(emailInput).toHaveFocus();
  expect(emailInput).toHaveAccessibleName(/^Username/);
  expect(emailInput).toHaveProperty("placeholder", userNameInputPlaceHolder);
  await user.type(emailInput, email);

  const forgotButton = screen.getByRole("link", { name: /^forgot/i });
  expect(forgotButton).toBeEnabled();

  await user.click(forgotButton);

  // We should get to a page asking if we want to start the account recovery process
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Start account recovery process");
  });

  expect(screen.getByText(/Click the button below to send an e-mail to/i)).toBeInTheDocument();

  // Verify the e-mail address is shown
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  const confirmButton = screen.getByRole("button", { name: /^send e-mail/i });
  expect(confirmButton).toBeEnabled();
  await user.click(confirmButton);

  // wait for page to change after clicking the confirm button
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Reset Password: Verify email address/));

  // verify e-mail address is shown after response is received from backend
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  // the continue button is initially disabled without code
  const continueButton = screen.getByRole("button", { name: /^continue/i });
  expect(continueButton).toBeDisabled();

  expectStepIndicator(3);
});

test("can click 'forgot password' without an e-mail address", async () => {
  // const email = "test@example.org";
  const code = "123456";
  // const ref = "abc567";

  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref !== ref) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.get("https://idp.eduid.docker/services/reset-password/", () => {
      const resetPasswordPayload = makeResetPasswordPayload();
      return HttpResponse.json({ type: "success", payload: resetPasswordPayload });
    }),
    http.post("https://idp.eduid.docker/services/reset-password/", async ({ request }) => {
      const body = (await request.json()) as RequestEmailLinkRequest;
      if (body.email !== email) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.post("https://idp.eduid.docker/services/reset-password/verify-email", async ({ request }) => {
      const body = (await request.json()) as VerifyCodeRequest;
      if (body.email_code !== code) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: VerifyCodeResponse = {
        suggested_password: TEST_PASSWORD,
        email_code: code,
        email_address: email,
        extra_security: {},
        success: true,
        zxcvbn_terms: [],
      };
      return new HttpResponse(JSON.stringify({ type: "test response", payload: payload }));
    }),
    http.post(
      "https://idp.eduid.docker/services/reset-password/new-password-extra-security-token",
      async ({ request }) => {
        const body = (await request.json()) as NewPasswordRequest;
        if (body.email_code !== code || body.password !== TEST_PASSWORD) {
          return new HttpResponse(null, { status: 400 });
        }
        const payload: NewPasswordResponse = {};
        return new HttpResponse(JSON.stringify({ type: "test response", payload: payload }));
      },
    ),
    http.post("https://idp.eduid.docker/services/reset-password/new-password", async ({ request }) => {
      const body = (await request.json()) as NewPasswordRequest;
      if (body.email_code !== code || body.password !== TEST_PASSWORD) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: NewPasswordResponse = {};
      return new HttpResponse(JSON.stringify({ type: "test response", payload: payload }));
    }),
  );

  render(<IndexMain />, {
    routes: [`${LOGIN_BASE_PATH}/${ref}`],
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        captcha_completed: true,
      },
    },
  });

  // Wait for the username-password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Log in");
  });

  const forgotButton = screen.getByRole("link", { name: /^forgot/i });
  expect(forgotButton).toBeEnabled();

  await user.click(forgotButton);

  // Wait for the reset password "enter your email" screen to be displayed
  await waitFor(() => {
    expect(screen.getByLabelText(/^email address/i)).toBeInTheDocument();
  });

  const sendButton = screen.getByRole("button", { name: /^send/i });
  expect(sendButton).toBeDisabled();

  const emailInput = screen.getByRole("textbox");
  expect(emailInput).toHaveFocus();
  expect(emailInput).toHaveAccessibleName(/^Email address/);
  expect(emailInput).toHaveProperty("placeholder", emailPlaceHolder);
  await user.type(emailInput, email);

  expect(sendButton).toBeEnabled();
  await user.click(sendButton);

  // wait for page to change after clicking the confirm button
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Reset Password: Verify email address/));

  // verify e-mail address is shown after response is received from backend
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  // the continue button is initially disabled without code
  const continueButton = screen.getByRole("button", { name: /^continue/i });
  expect(continueButton).toBeDisabled();
  expectStepIndicator(3);
});

test("shows the code expiry from the status response", async () => {
  mswServer.use(
    http.get("https://idp.eduid.docker/services/reset-password/", () =>
      HttpResponse.json({ type: "test success", payload: makeResetPasswordPayload() }),
    ),
  );

  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        next_page: "EMAIL_LINK_SENT",
        email_response: { email, email_code_timeout: 7200, throttled_max: 300, throttled_seconds: 300 },
        reset_pw_status: makeResetPasswordPayload().state,
      },
    },
  });

  expect(screen.queryByText(/valid for 2 hours/i)).toBeInTheDocument();
});

test("does not show an expired countdown before the status response arrives", () => {
  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        next_page: "EMAIL_LINK_SENT",
        email_response: { email, email_code_timeout: 7200, throttled_max: 300, throttled_seconds: 300 },
      },
    },
  });

  expect(screen.queryByText("Code expires in")).not.toBeInTheDocument();
  expect(screen.queryByText("00:00")).not.toBeInTheDocument();
});

test("refreshes the status after sending, so the countdown reflects the code that was just sent", async () => {
  // GET / is hit twice in this flow: once from the confirm-email screen (pre-send status) and
  // once from ProcessCaptcha.sendEmailLink's refresh (post-send status). Returning a different
  // expires_time_left on each call makes the two distinguishable, so asserting on the rendered
  // value proves which fetch's data actually reaches the screen.
  let getCount = 0;
  const preSendExpiresLeft = 7000; // renders as 116:40
  const postSendExpiresLeft = 368; // renders as 06:08

  mswServer.use(
    http.post("https://idp.eduid.docker/services/idp/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new Response(null, { status: 400 });
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.get("https://idp.eduid.docker/services/reset-password/", () => {
      getCount += 1;
      const payload = makeResetPasswordPayload();
      payload.state.email.expires_time_left = getCount === 1 ? preSendExpiresLeft : postSendExpiresLeft;
      return HttpResponse.json({ type: "test success", payload: payload });
    }),
    http.post("https://idp.eduid.docker/services/reset-password/", async ({ request }) => {
      const body = (await request.json()) as RequestEmailLinkRequest;
      if (body.email != email) {
        return new Response(null, { status: 400 });
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
  );

  render(<IndexMain />, {
    routes: [`${LOGIN_BASE_PATH}/${ref}`],
    state: {
      ...loginTestState,
      resetPassword: {
        ...loginTestState.resetPassword,
        captcha_completed: true,
      },
    },
  });

  // Wait for the username-password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Log in");
  });

  const emailInput = screen.getByRole("textbox");
  await user.type(emailInput, email);

  const forgotButton = screen.getByRole("link", { name: /^forgot/i });
  await user.click(forgotButton);

  // We should get to a page asking if we want to start the account recovery process
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Start account recovery process");
  });

  const confirmButton = screen.getByRole("button", { name: /^send e-mail/i });
  await user.click(confirmButton);

  // wait for page to change after clicking the confirm button
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Reset Password: Verify email address/));

  expect(screen.queryByText("116:40")).not.toBeInTheDocument();
  expect(getCount).toBeGreaterThanOrEqual(2);
});
