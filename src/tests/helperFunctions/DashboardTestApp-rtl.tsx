import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
<<<<<<< HEAD
import { EduIDAppRootState, getTestEduIDStore } from "eduid-init-app";
=======
>>>>>>> 3cb06bdce (DashboardMain -> IndexMain)
import type { InitialEntry } from "history";
import { IndexRootState as DashboardRootState, getTestIndexStore } from "index-init-app";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { initialState as configInitialState } from "slices/IndexConfig";

export const defaultDashboardTestState = {
  config: {
    ...configInitialState,
    // default to being in 'configured' state, since only the test of
    // the splash screen is ever interested in the opposite
    is_configured: true,
    is_app_loaded: true,
    debug: true,
  },
};

interface renderArgs {
  state?: Partial<EduIDAppRootState>;
  options?: Omit<RenderOptions, "wrapper">;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const routes = args.routes || ["/profile/"];
<<<<<<< HEAD
  const store = getTestEduIDStore(args.state || defaultDashboardTestState);
=======
  const store = getTestIndexStore(args.state || defaultDashboardTestState);
>>>>>>> 3cb06bdce (DashboardMain -> IndexMain)

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
// override render method
export { render };
