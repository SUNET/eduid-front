import SignupMain, { SIGNUP_BASE_PATH } from "components/Signup/SignupMain";
import { emailPlaceHolder } from "login/components/Inputs/EmailInput";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/SignupTestApp-rtl";

test("e-mail form works as expected", () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

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

  fireEvent.change(input, { target: { value: "test@example.org" } });
  expect(button).toBeEnabled();
});

test("e-mail form accepts valid data (signup happy case)", async () => {
  render(<SignupMain />, { routes: [`${SIGNUP_BASE_PATH}/email`] });

  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your email/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", emailPlaceHolder);
  fireEvent.change(input, { target: { value: "test@example.org" } });

  const button = screen.getByRole("button", { name: "Create eduID" });
  expect(button).toBeEnabled();
  fireEvent.click(button);

  // Wait for the ToU to be displayed
  await screen.findByText(/^General rules/);

  const acceptToUButton = screen.getByRole("button", { name: "Accept" });
  expect(acceptToUButton).toBeEnabled();
  fireEvent.click(acceptToUButton);

  // Wait for the ToU to be removed
  await waitFor(() => {
    expect(screen.queryByText(/^General rules/)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByRole("heading")).toHaveTextContent(/^Confirm.*human/);
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
