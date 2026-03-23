import { ChangePassword } from "components/Dashboard/ChangePassword";
import { initialState as configInitialState } from "slices/IndexConfig";

import { fireEvent, render, screen, waitFor } from "../helperFunctions/DashboardTestApp-rtl";

const suggestedValue = "abcd-1234-efgh";

test("renders ChangePasswordForm, suggested password value is field in suggested-password-field", () => {
  render(<ChangePassword />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      chpass: {
        suggested_password: suggestedValue,
      },
    },
  });
  expect(screen.getByRole("heading")).toHaveTextContent(/^Change password: Suggested password/);
  expect(screen.getByDisplayValue(suggestedValue)).toBeInTheDocument();
});

test("renders custom password form after clicking do not want a suggested password", async () => {
  render(<ChangePassword />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      chpass: {
        suggested_password: suggestedValue,
      },
    },
  });
  const customPasswordButton = screen.getByLabelText(/Set Your Own Password/i);
  expect(customPasswordButton).toBeInTheDocument();

  fireEvent.click(customPasswordButton);
  expect(customPasswordButton).toBeChecked();

  const newPasswordInput = screen.getByLabelText(/Enter new password/i);
  const repeatNewPasswordInput = screen.getByLabelText(/Repeat new password/i);

  await waitFor(() => {
    expect(newPasswordInput).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(repeatNewPasswordInput).toBeInTheDocument();
  });
});
