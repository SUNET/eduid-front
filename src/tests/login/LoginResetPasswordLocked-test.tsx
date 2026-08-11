import { ResetPasswordApp } from "components/ResetPassword/ResetPasswordApp";
import { render, screen } from "../helperFunctions/LoginTestApp-rtl";
import { loginTestState } from "../helperFunctions/LoginTestApp-rtl";

test("shows a terminal message when the reset state is locked", () => {
  render(<ResetPasswordApp />, {
    state: {
      ...loginTestState,
      resetPassword: { ...loginTestState.resetPassword, next_page: "RESET_PW_LOCKED" },
    },
  });

  expect(screen.getByRole("heading")).toHaveTextContent("Too many attempts");
  expect(screen.getByText(/wait until the code expires/i)).toBeInTheDocument();
  // The flow is terminal - there must be no way to retry from here.
  expect(screen.queryByRole("button", { name: /try again|send|start over/i })).not.toBeInTheDocument();
});
