import { DashboardMain } from "components/DashboardMain";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders Phones component as expected", () => {
  render(<DashboardMain />);
  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });

  expect(screen.getByRole("heading", { name: /Mobile phone numbers/i })).toBeInTheDocument();
  const addMorePhoneButton = screen.getAllByText("+ add more", { selector: "button" })[1];
  // Click the 'add more' button
  act(() => {
    addMorePhoneButton.click();
  });
  expect(addMorePhoneButton).not.toBeInTheDocument();

  const input = screen.getByLabelText("Phone number");
  fireEvent.change(input, { target: { value: "+46701233333" } });
  expect(input).toHaveValue("+46701233333");

  const addPhoneButton = screen.getByRole("button", { name: /Cancel/i });
  expect(addPhoneButton).toBeEnabled();
});
