import Eidas from "components/Dashboard/Eidas";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders frejaeID", () => {
  render(<Eidas />);
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeEnabled();
  expect(screen.getByText(/To use this option you will need to first create a digital ID-card /i)).toBeInTheDocument();
});

test("renders Confirmation Modal, enabled to click proceed button", async () => {
  render(<Eidas />);
  const button = screen.getByRole("button", { name: /proceed/i });
  expect(button).toBeEnabled();
  act(() => {
    button.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/Create a Freja eID Plus account/i)).toBeInTheDocument();
  });

  const modalConfirmButton = screen.getByRole("button", { name: /Use my freja eID+/i });
  expect(modalConfirmButton).toBeEnabled();
});
