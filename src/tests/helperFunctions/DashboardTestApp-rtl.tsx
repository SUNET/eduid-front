import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import React from "react";
import { Router } from "react-router";
import { getTestDashboardStore, DashboardRootState } from "dashboard-init-app";
import { dashboardTestHistory, dashboardTestState } from "./DashboardTestApp";

interface renderArgs {
  state?: Partial<DashboardRootState>;
  options?: RenderOptions;
}
function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const store = getTestDashboardStore(args.state || {});
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
