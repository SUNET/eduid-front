import SignupMain, { SIGNUP_BASE_PATH } from "components/SignupMain";
import { SignupState } from "reducers/Signup";
import { render, screen, waitFor } from "../helperFunctions/SignupTestApp-rtl";

const email = "test@example.org";
const password = "very-secret";
const paramsCode = "123abc";

const fakeState: SignupState = {
  code: paramsCode,
  password: password,
  dashboard_url: "https://dashboard.example.org/",
  email: email,
  tou_accepted: false,
  current_step: "register",
};

test("shows new user data", async () => {
  render(<SignupMain />, {
    state: { signup: { status: "verified", ...fakeState } },
    routes: [`${SIGNUP_BASE_PATH}/code/${fakeState.code}`],
  });

  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(/^You have completed/);
  expect(screen.getByRole("status", { name: /mail/ })).toHaveTextContent(email);
  expect(screen.getByRole("status", { name: "Password" })).toHaveTextContent(password);
});

test("handles already-verified", async () => {
  const { findByText } = render(<SignupMain />, {
    state: { signup: { status: "already-verified", ...fakeState } },
    routes: [`${SIGNUP_BASE_PATH}/code/${fakeState.code}`],
  });
  // we should be redirected to the main registration page on invalid codes
  const heading = findByText(/^Register your/);
  await waitFor(() => expect(heading).toBeTruthy());
  //is it error message "Success"? not "already verified"?
  expect(screen.getByRole("alert")).toHaveTextContent(/Success/);
});

test("handles unknown-code", async () => {
  const { findByText } = render(<SignupMain />, {
    state: { signup: { status: "unknown-code", ...fakeState } },
    routes: [`${SIGNUP_BASE_PATH}/code/${fakeState.code}`],
  });
  // we should be redirected to the main registration page on invalid codes
  const heading = findByText(/^Register your/);
  await waitFor(() => expect(heading).toBeTruthy());
  await waitFor(() => screen.getByRole("status", { name: "Information" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/Unknown.*code/i);
});
