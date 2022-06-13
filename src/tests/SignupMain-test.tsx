import SignupMain from "components/SignupMain";
import React from "react";
import { initialState as configInitialState } from "reducers/SignupConfig";
import { fireEvent, render, screen, signupTestHistory } from "./helperFunctions/SignupTestApp-rtl";

test("show splash screen when not configured", () => {
  signupTestHistory.push("/register/email");
  render(<SignupMain />, { state: { config: { ...configInitialState, is_configured: false } } });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders e-mail form as expected", () => {
  signupTestHistory.push("/register/email");
  render(<SignupMain />, { state: { config: { ...configInitialState, is_configured: true } } });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName("Email address");
  expect(input).toHaveProperty("placeholder", "name@example.com");

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "not-an-email" } });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "test@example.org" } });
  expect(button).toBeEnabled();
});
