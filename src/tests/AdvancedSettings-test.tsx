import { DashboardMain } from "components/DashboardMain";
import { activeClassName } from "components/DashboardNav";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { initialState } from "reducers/PersonalData";
import { render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders AccountId as expected", () => {
  const test_eppn = "test-123";

  render(<DashboardMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: { ...initialState, eppn: test_eppn },
    },
  });

  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Advanced settings" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  expect(screen.getByRole("heading", { name: /unique id/i })).toBeInTheDocument();

  expect(screen.getByLabelText("eppn")).toHaveTextContent(test_eppn);
  // renders the advanced settings page title
  expect(document.title).toContain("Advanced Settings");
});
