import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import {
  NewPasswordRequest,
  NewPasswordResponse,
  RequestEmailLinkRequest,
  RequestEmailLinkResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "apis/eduidResetPassword";
import { emailPlaceHolder } from "components/Common/EmailInput";
import { userNameInputPlaceHolder } from "components/Common/UserNameInput";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse, mswServer } from "setupTests";
import { fireEvent, loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const TEST_PASSWORD = "password";

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("can click 'forgot password' with an e-mail address", async () => {
  const email = "test@example.org";
  const ref = "abc567";
  mswServer.use(
    http.post("/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.post("/reset-password-url", async ({ request }) => {
      const body = (await request.json()) as RequestEmailLinkRequest;
      if (body.email != email) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    })
  );

  mswServer.listHandlers();

  render(<IndexMain />, {
    routes: [`/login/${ref}`],
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
  fireEvent.change(emailInput, { target: { value: email } });

  const forgotButton = screen.getByRole("link", { name: /^forgot/i });
  expect(forgotButton).toBeEnabled();

  fireEvent.click(forgotButton);

  // We should get to a page asking if we want to start the account recovery process
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Start account recovery process");
  });

  expect(screen.getByText(/Click the button below to send an e-mail to/i)).toBeInTheDocument();

  // Verify the e-mail address is shown
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  const confirmButton = screen.getByRole("button", { name: /^send e-mail/i });
  expect(confirmButton).toBeEnabled();
  fireEvent.click(confirmButton);

  // wait for page to change after clicking the confirm button
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Reset Password: Verify email address/));

  // verify e-mail address is shown after response is received from backend
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  // the ok button is initially disabled without code
  const okButton = screen.getByRole("button", { name: /^ok/i });
  expect(okButton).toBeDisabled();
});

test("can click 'forgot password' without an e-mail address", async () => {
  const email = "test@example.org";
  const code = "123456";
  const ref = "abc567";

  mswServer.use(
    http.post("/next", async ({ request }) => {
      const body = (await request.json()) as LoginNextRequest;
      if (body.ref != ref) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.post("/reset-password-url", async ({ request }) => {
      const body = (await request.json()) as RequestEmailLinkRequest;
      if (body.email != email) {
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
    http.post("/reset-password-url/verify-email", async ({ request }) => {
      const body = (await request.json()) as VerifyCodeRequest;
      if (body.email_code != code) {
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
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.post("/reset-password-url/new-password-extra-security-token", async ({ request }) => {
      const body = (await request.json()) as NewPasswordRequest;
      if (body.email_code != code || body.password != TEST_PASSWORD) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: NewPasswordResponse = {};
      return HttpResponse.json({ type: "test response", payload: payload });
    }),
    http.post("/reset-password-url/new-password", async ({ request }) => {
      const body = (await request.json()) as NewPasswordRequest;
      if (body.email_code != code || body.password != TEST_PASSWORD) {
        return new HttpResponse(null, { status: 400 });
      }
      const payload: NewPasswordResponse = {};
      return HttpResponse.json({ type: "test response", payload: payload });
    })
  );

  mswServer.listHandlers();

  render(<IndexMain />, {
    routes: [`/login/${ref}`],
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

  fireEvent.click(forgotButton);

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
  fireEvent.change(emailInput, { target: { value: email } });

  expect(sendButton).toBeEnabled();
  fireEvent.click(sendButton);

  // wait for page to change after clicking the confirm button
  await waitFor(() => expect(screen.getByRole("heading")).toHaveTextContent(/^Reset Password: Verify email address/));

  // verify e-mail address is shown after response is received from backend
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  // the ok button is initially disabled without code
  const okButton = screen.getByRole("button", { name: /^ok/i });
  expect(okButton).toBeDisabled();
});
