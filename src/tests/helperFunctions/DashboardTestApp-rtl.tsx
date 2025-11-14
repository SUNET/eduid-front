import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { EduIDAppRootState, getTestEduIDStore } from "eduid-init-app";
import { LOCALIZED_MESSAGES } from "globals";
import React from "react";
import { InitialEntry, MemoryRouter } from "react-router";
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
  personal_data: {
    eppn: "test-eppn",
  },
  intl: {
    locale: "en",
    messages: LOCALIZED_MESSAGES.en,
  },
};

interface renderArgs {
  state?: Partial<EduIDAppRootState>;
  options?: Omit<RenderOptions, "wrapper">;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const routes = args.routes || ["/profile/"];
  const store = getTestEduIDStore(args.state || defaultDashboardTestState);

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
