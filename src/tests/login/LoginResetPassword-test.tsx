import React from "react";
import { LoginNextRequest, LoginNextResponse } from "apis/eduidLogin";
import { LoginMain } from "login/components/LoginMain";
import { mswServer, rest } from "setupTests";
import {
  fireEvent,
  loginTestHistory,
  loginTestState,
  render,
  screen,
  waitFor,
} from "../helperFunctions/LoginTestApp-rtl";
import { emailPlaceHolder } from "login/components/Inputs/EmailInput";
import { RequestEmailLinkRequest, RequestEmailLinkResponse } from "apis/eduidResetPassword";

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
      const payload: RequestEmailLinkResponse = {};
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  mswServer.printHandlers();

  loginTestHistory.push(`/login/${ref}`);
  render(<LoginMain />);

  // Wait for the username-password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Log in");
  });

  const forgotButton = screen.getByRole("link", { name: /^forgot/i });
  expect(forgotButton).toBeEnabled();

  fireEvent.click(forgotButton);

  // Wait for the reset password "enter your email" screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("form")).toHaveTextContent(/^Email address/);
  });

  const sendButton = screen.getByRole("button", { name: /^send/i });
  expect(sendButton).toBeDisabled();

  const emailInput = screen.getByRole("textbox");
  //expect(input).toHaveFocus();
  expect(emailInput).toHaveAccessibleName(/^Email address/);
  expect(emailInput).toHaveProperty("placeholder", emailPlaceHolder);
  fireEvent.change(emailInput, { target: { value: email } });

  expect(sendButton).toBeEnabled();
  fireEvent.click(sendButton);

  // Wait for the username-password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent("Reset password");
  });

  // verify e-mail address is shown
});
