import { Emails } from "components/Dashboard/Emails";
import { act } from "react";
import { fireEvent, render, screen } from "../helperFunctions/DashboardTestApp-rtl";

test("renders Emails component as expected", () => {
  render(<Emails />);
  expect(screen.getByRole("heading")).toHaveTextContent(/^Email addresses/);

  const addMoreButton = screen.getByRole("button", { name: /add more/i });
  act(() => {
    addMoreButton.click();
  });

  const input = screen.getByRole("textbox");
  expect(input).toHaveFocus();
  expect(input).toHaveAccessibleName(/^Email address/);
  expect(input).toHaveProperty("placeholder", "name@example.com");

  const addButton = screen.getByRole("button", { name: /add/i });
  expect(addButton).toBeDisabled();

  fireEvent.change(input, { target: { value: "test@email.com" } });
  expect(input).toHaveValue("test@email.com");

  expect(addButton).toBeEnabled();
});

test("renders label text when emails primary state is true", () => {
  render(<Emails />, {
    state: {
      emails: {
        emails: [{ email: "test2023@test.se", primary: true, verified: true }],
      },
    },
  });
  const cellPrimary = screen.getByRole("cell", { name: /primary/i });
  expect(cellPrimary).toBeEnabled();
});

test("renders make primary button when emails state verified is true", () => {
  render(<Emails />, {
    state: {
      emails: {
        emails: [
          { email: "test2023@test.se", primary: true, verified: true },
          { email: "test2021@test.se", primary: false, verified: true },
        ],
      },
    },
  });
  const makePrimaryButton = screen.getByRole("button", { name: /make primary/i });
  expect(makePrimaryButton).toBeEnabled();
});

test("disables removal of the primary email while another email is unverified", () => {
  const { container } = render(<Emails />, {
    state: {
      emails: {
        emails: [
          { email: "primary@test.se", primary: true, verified: true },
          { email: "unverified@test.se", primary: false, verified: false },
        ],
      },
    },
  });

  const removeButtons = container.querySelectorAll<HTMLButtonElement>("button.remove");
  expect(removeButtons).toHaveLength(2);
  expect(removeButtons[0]).toBeDisabled();
  expect(removeButtons[1]).toBeEnabled();
});
