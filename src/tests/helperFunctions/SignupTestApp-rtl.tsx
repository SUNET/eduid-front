import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import React from "react";
import { Router } from "react-router";
import { initialState as configInitialState } from "reducers/LoginConfig";
import { getTestSignupStore, SignupRootState } from "signup-init-app";
import { signupTestHistory, signupTestState } from "./SignupTestApp";

interface renderArgs {
  state?: Partial<SignupRootState>;
  options?: RenderOptions;
}
function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const defaultState = {
    config: {
      ...configInitialState,
      // default to being in 'configured' state, since only the test of
      // the splash screen is ever interested in the opposite
      is_configured: true,
    },
  };
  const store = getTestSignupStore(args.state || defaultState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <Router history={signupTestHistory}>{children}</Router>
      </ReduxIntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// mirror some exports from old Enzyme testing helper
export { signupTestState, signupTestHistory };
// override render method
export { render };
