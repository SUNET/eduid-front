import ChangePasswordForm from "components/ChangePasswordForm";
import { finish_url } from "components/ChangePassword";
import { render, screen, fireEvent, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders ChangePasswordForm, suggested password value is field in suggested-password-field", () => {
  render(<ChangePasswordForm finish_url={finish_url} />);

  const oldPasswordInput = screen.getByTestId("old-password-field") as HTMLInputElement;
  expect(oldPasswordInput.value).not.toBeDefined;

  const suggestedPasswordInput = screen.getByTestId("suggested-password-field") as HTMLInputElement;
  expect(suggestedPasswordInput.value).toBeDefined;
});

test("save button will be enabled once current password field is filled", () => {
  render(<ChangePasswordForm finish_url={finish_url} />);

  const input = screen.getByTestId("old-password-field") as HTMLInputElement;
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

  const newPasswordInput = screen.getByTestId("custom-password-field") as HTMLInputElement;
  const repeatNewPasswordInput = screen.getByTestId("repeat-password-field") as HTMLInputElement;

  await waitFor(() => {
    expect(newPasswordInput).toBeDefined;
  });

  await waitFor(() => {
    expect(repeatNewPasswordInput).toBeDefined;
  });
});

test("url should match finish_url", async () => {
  global.window = Object.create(window);
  const url = finish_url;
  Object.defineProperty(window, "location", {
    value: {
      href: url,
    },
  });
  expect(window.location.href).toContain("/profile");
});
