import { ChangePassword } from "components/Dashboard/ChangePassword";
import { initialState as configInitialState } from "slices/IndexConfig";

import { fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders ChangePasswordForm, suggested password value is field in suggested-password-field", () => {
  render(<ChangePassword />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      chpass: {
        suggested_password: "test password",
      },
    },
  });
  expect(screen.getByRole("heading")).toHaveTextContent(/^Change password: Suggested password/);
  const suggestedPasswordInput = screen.getByLabelText(/Repeat new password/i) as HTMLInputElement;
  expect(suggestedPasswordInput.value).toBeDefined();
});

test("renders custom password form after clicking do not want a suggested password", async () => {
  render(<ChangePassword />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      chpass: {
        suggested_password: "test password",
      },
    },
  });
  const customPasswordButton = screen.getByRole("checkbox", { name: /Create a custom password?/i });
  expect(customPasswordButton).toBeInTheDocument();

  fireEvent.click(customPasswordButton);
  expect(customPasswordButton).toBeChecked();

  const newPasswordInput = screen.getByLabelText(/Enter new password/i) as HTMLInputElement;
  const repeatNewPasswordInput = screen.getByLabelText(/Repeat new password/i) as HTMLInputElement;

  await waitFor(() => {
    expect(newPasswordInput).toBeDefined();
  });

  await waitFor(() => {
    expect(repeatNewPasswordInput).toBeDefined();
  });
});
