import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import React from "react";
import { Router } from "react-router";
import { getTestLoginStore, LoginRootState } from "login-init-app";
import { loginTestHistory, loginTestState } from "./LoginTestApp";

interface renderArgs {
  state?: Partial<LoginRootState>;
  options?: RenderOptions;
}
function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const store = getTestLoginStore(args.state || loginTestState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <Router history={loginTestHistory}>{children}</Router>
      </ReduxIntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// mirror some exports from old Enzyme testing helper
export { loginTestState, loginTestHistory };
// override render method
export { render };
