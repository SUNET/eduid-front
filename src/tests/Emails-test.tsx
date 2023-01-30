import Emails from "components/Emails";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

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
  const cell = screen.getAllByRole("cell");
  expect(cell)[0].toBeEnabled();
  expect(screen.getByText("primary")).toBeInTheDocument();
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
