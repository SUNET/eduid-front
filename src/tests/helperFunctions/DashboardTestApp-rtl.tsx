import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, getTestDashboardStore } from "dashboard-init-app";
import type { InitialEntry } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
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
        <MemoryRouter initialEntries={args.routes}>
          <CompatRouter>{children}</CompatRouter>
        </MemoryRouter>
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
