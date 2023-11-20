import { DashboardMain } from "components/Dashboard/DashboardMain";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "slices/DashboardConfig";
import { render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders bankID as expected", async () => {
  render(<DashboardMain />, {
    state: {
      config: { ...configInitialState, bankid_service_url: "/bankid-url/", is_app_loaded: true },
    },
  });
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(screen.getByRole("heading", { name: "Choose your principal identification method" })).toBeInTheDocument();
  const swedishMethodAccordion = screen.getByRole("button", { name: /Swedish personal ID number/i });
  act(() => {
    swedishMethodAccordion.click();
  });

  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: / with a BankID/i })).toBeInTheDocument();
  });
});
