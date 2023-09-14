import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { RequestEmailLinkRequest, RequestEmailLinkResponse } from "apis/eduidResetPassword";
import { emailPlaceHolder } from "components/Common/EmailInput";
import { IndexMain } from "components/IndexMain";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("can click 'forgot password' with an e-mail address", async () => {
  const email = "test@example.org";
  const ref = "abc567";
  mswServer.use(
    rest.post("/next", (req, res, ctx) => {
      const body = req.body as LoginNextRequest;
      if (body.ref != ref) {
        return res(ctx.status(400));
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    }),
    rest.post("/reset-password-url", (req, res, ctx) => {
      const body = req.body as RequestEmailLinkRequest;
      if (body.email != email) {
        return res(ctx.status(400));
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  mswServer.printHandlers();

  render(<IndexMain />, { routes: [`/login/${ref}`] });

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
    expect(screen.getByRole("heading")).toHaveTextContent("Reset password");
  });

  expect(screen.getByText(/To start the account recovery/i)).toBeInTheDocument();

  // Verify the e-mail address is shown
  expect(screen.getByTestId("email-address")).toHaveTextContent(email);

  const confirmButton = screen.getByRole("button", { name: /^send e-mail/i });
  expect(confirmButton).toBeEnabled();
  fireEvent.click(confirmButton);

  // verify e-mail address is shown after response is received from backend
  await waitFor(() => {
    expect(screen.getByTestId("email-address")).toHaveTextContent(email);
  });

  // go back button is shown
  const resendButton = screen.getByRole("button", { name: /^go back/i });
  expect(resendButton).toBeInTheDocument();
});

test("can click 'forgot password' without an e-mail address", async () => {
  const email = "test@example.org";
  const ref = "abc567";
  mswServer.use(
    rest.post("/next", (req, res, ctx) => {
      const body = req.body as LoginNextRequest;
      if (body.ref != ref) {
        return res(ctx.status(400));
      }
      const payload: LoginNextResponse = {
        action: "USERNAMEPASSWORD",
        target: "/foo",
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    }),
    rest.post("/reset-password-url", (req, res, ctx) => {
      const body = req.body as RequestEmailLinkRequest;
      if (body.email != email) {
        return res(ctx.status(400));
      }
      const payload: RequestEmailLinkResponse = {
        email_code_timeout: 600,
        email,
        throttled_max: 60,
        throttled_seconds: 60,
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  mswServer.printHandlers();

  render(<IndexMain />, { routes: [`/login/${ref}`] });

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

  // verify e-mail address is shown after response is received from backend
  await waitFor(() => {
    expect(screen.getByTestId("email-address")).toHaveTextContent(email);
  });

  // verify resend button is initially disabled
  const resendButton = screen.getByRole("button", { name: /^resend/i });
  expect(resendButton).toBeDisabled();
});
