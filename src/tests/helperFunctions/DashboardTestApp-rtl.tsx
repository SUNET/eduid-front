import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import React from "react";
import { Router } from "react-router";
import { getTestDashboardStore, DashboardRootState } from "dashboard-init-app";
import { dashboardTestHistory, dashboardTestState } from "./DashboardTestApp";
import { initialState as configInitialState } from "reducers/DashboardConfig";

interface renderArgs {
  state?: Partial<DashboardRootState>;
  options?: RenderOptions;
}
function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const defaultState = {
    config: {
      ...configInitialState,
      // default to being in 'configured' state, since only the test of
      // the splash screen is ever interested in the opposite
      is_configured: true,
      debug: true,
    },
  };

  const store = getTestDashboardStore(args.state || defaultState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <Router history={dashboardTestHistory}>{children}</Router>
      </ReduxIntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// mirror some exports from old Enzyme testing helper
export { dashboardTestState, dashboardTestHistory };
// override render method
export { render };
