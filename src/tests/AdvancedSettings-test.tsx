import { IndexMain } from "components/IndexMain";
import { initialState as configInitialState } from "slices/IndexConfig";
import { initialState } from "slices/PersonalData";
import { render } from "./helperFunctions/DashboardTestApp-rtl";

beforeEach(() => {
  // mock globalThis.scroll for the notification middleware that scrolls to the top of the screen
  globalThis.scroll = jest.fn();
});

test("renders AccountId as expected", () => {
  const test_eppn = "test-123";

  render(<IndexMain />, {
    state: {
      config: { ...configInitialState, is_app_loaded: true },
      personal_data: {
        ...initialState,
        eppn: test_eppn,
        response: {
          eppn: test_eppn,
          chosen_given_name: "test user",
        },
      },
    },
  });
});
