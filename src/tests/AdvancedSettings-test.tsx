import { DashboardMain } from "components/DashboardMain";
import { activeClassName } from "components/HeaderNav";
import { act } from "react-dom/test-utils";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { initialState } from "reducers/PersonalData";
import { render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders AccountId as expected", () => {
  const test_eppn = "test-123";

  render(<DashboardMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: {
        ...initialState,
        response: {
          eppn: "hubba-bubba",
          display_name: "test user",
        },
      },
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

  expect(screen.getByRole("status")).toHaveTextContent(test_eppn);
  // renders the advanced settings page title
  expect(document.title).toContain("Advanced Settings");
});
