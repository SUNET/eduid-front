import { IndexMain } from "components/IndexMain";
import { act } from "react";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

test("renders bankID as expected", async () => {
  render(<IndexMain />, {
    state: {
      personal_data: { ...defaultDashboardTestState.personal_data },
      config: {
        ...configInitialState,
        svipe_service_url: "/svipe-url/",
        is_app_loaded: true,
        preferred_captcha: "internal",
      },
    },
  });
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Identity" });
  act(() => {
    nav.click();
  });
  expect(screen.getByRole("heading", { name: "Choose your principal identification method" })).toBeInTheDocument();
  const swedishMethodAccordion = screen.getByRole("button", { name: /Swedish personal ID or coordination number/i });
  act(() => {
    swedishMethodAccordion.click();
  });

  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: / with a BankID/i })).toBeInTheDocument();
  });
});
