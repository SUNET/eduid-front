import { DashboardMain } from "components/Dashboard/DashboardMain";
import { initialState as configInitialState } from "slices/DashboardConfig";
import { initialState } from "slices/PersonalData";
import { render } from "./helperFunctions/DashboardTestApp-rtl";

test("renders AccountId as expected", () => {
  const test_eppn = "test-123";

  render(<DashboardMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: {
        ...initialState,
        eppn: test_eppn,
        response: {
          eppn: test_eppn,
          display_name: "test user",
        },
      },
    },
  });
});
