import { GetCaptchaResponse, SignupStatusResponse } from "apis/eduidSignup";
import SignupMain, { SIGNUP_BASE_PATH } from "components/Signup/SignupMain";
import { emailPlaceHolder } from "login/components/Inputs/EmailInput";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/SignupTestApp-rtl";

const emptyState: SignupStatusResponse = {
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
  },
  user_created: false,
};

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
  let getCaptchaCalled = false;

  mswServer.use(
    rest.get("/services/signup/state", (req, res, ctx) => {
      return res(ctx.json({ type: "test response", payload: emptyState }));
    }),
    rest.post("/services/signup/get-captcha", (req, res, ctx) => {
      getCaptchaCalled = true;
      const payload: GetCaptchaResponse = { captcha_img: "data:image/png;base64,captcha-test-image" };
      return res(ctx.json({ type: "test success", payload }));
    })
  );

  mswServer.printHandlers();
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

  // Wait for the (internal) Captcha to be displayed
  await screen.findByText(/^Enter the text from the image/);

  expect(getCaptchaCalled).toBe(true);

  const captchaInput = screen.getByRole("textbox", { name: "Enter the text from the image" });
  expect(captchaInput).toHaveFocus();
  fireEvent.change(captchaInput, { target: { value: "captcha-test-value" } });

  const captchaButton = screen.getByRole("button", { name: "Continue" });
  expect(captchaButton).toBeEnabled();
  fireEvent.click(captchaButton);

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
