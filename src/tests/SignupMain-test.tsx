import SignupMain, { SIGNUP_BASE_PATH } from "components/Signup/SignupMain";
import { fireEvent, render, screen, signupTestState } from "./helperFunctions/SignupTestApp-rtl";

test("show splash screen when not configured", () => {
  render(<SignupMain />, {
    state: { config: { ...signupTestState.config, is_configured: false } },
    routes: [`${SIGNUP_BASE_PATH}/email`],
  });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders e-mail form as expected", () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  // there should be no visible form error for example when the page has just loaded
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", "name@example.com");

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "not-an-email" } });
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: "test@example.org" } });
  expect(button).toBeEnabled();
});

test("redirects from slash", () => {
  render(<SignupMain />, { routes: [SIGNUP_BASE_PATH] });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);
});
