import { finish_url } from "components/Dashboard/ChangePassword";
import ChangePasswordForm from "components/Dashboard/ChangePasswordForm";
import { fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders ChangePasswordForm, suggested password value is field in suggested-password-field", () => {
  render(<ChangePasswordForm finish_url={finish_url} />);

  const oldPasswordInput = screen.getByLabelText(/Current password/i) as HTMLInputElement;
  expect(oldPasswordInput.value).toBe("");

  const suggestedPasswordInput = screen.getByLabelText(/Suggested password/i) as HTMLInputElement;
  expect(suggestedPasswordInput.value).toBeDefined();
});

test("save button will be enabled once current password field is filled", () => {
  render(<ChangePasswordForm finish_url={finish_url} />);

  const input = screen.getByLabelText(/Current password/i) as HTMLInputElement;
  // change password save button is initially disabled
  const savePasswordButton = screen.getByRole("button", { name: /save/i });
  expect(savePasswordButton).toBeDisabled();

  fireEvent.change(input, { target: { value: "current password" } });
  expect(input.value).toBe("current password");

  expect(savePasswordButton).toBeEnabled();
});

test("renders custom password form after clicking do not want a suggested password", async () => {
  render(<ChangePasswordForm finish_url={finish_url} />);
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
