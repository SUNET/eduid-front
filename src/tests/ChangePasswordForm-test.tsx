import { ChangePassword } from "components/Dashboard/ChangePassword";

import { fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders ChangePasswordForm, suggested password value is field in suggested-password-field", () => {
  render(<ChangePassword />);

  const suggestedPasswordInput = screen.getByLabelText(/Suggested password/i) as HTMLInputElement;
  expect(suggestedPasswordInput.value).toBeDefined();
});

test("renders custom password form after clicking do not want a suggested password", async () => {
  render(<ChangePassword />);
  const customPasswordButton = screen.getByRole("button", { name: /I don't want a suggested password/i });
  expect(customPasswordButton).toBeInTheDocument();

  fireEvent.click(customPasswordButton);
  expect(screen.getByText(/Suggest a password for me/i)).toBeInTheDocument();

  const newPasswordInput = screen.getByLabelText(/Enter new password/i) as HTMLInputElement;
  const repeatNewPasswordInput = screen.getByLabelText(/Repeat new password/i) as HTMLInputElement;

  await waitFor(() => {
    expect(newPasswordInput).toBeDefined();
  });

  await waitFor(() => {
    expect(repeatNewPasswordInput).toBeDefined();
  });
});
