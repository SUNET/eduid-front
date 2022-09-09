import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, getTestDashboardStore } from "dashboard-init-app";
import type { InitialEntry } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { dashboardTestState } from "./DashboardTestApp";

interface renderArgs {
  state?: Partial<DashboardRootState>;
  options?: RenderOptions;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const defaultState = {
    config: {
      ...configInitialState,
      // default to being in 'app_loaded' state, since only the test of
      // the splash screen is ever interested in the opposite
      is_app_loaded: true,
      debug: true,
    },
  };

  const routes = args.routes || ["/profile/"];
  const store = getTestDashboardStore(args.state || defaultState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <MemoryRouter initialEntries={routes}>{children}</MemoryRouter>
      </ReduxIntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// mirror some exports from old Enzyme testing helper
export { dashboardTestState };
// override render method
export { render };
