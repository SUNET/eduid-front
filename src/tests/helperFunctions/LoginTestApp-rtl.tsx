import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import type { InitialEntry } from "history";
import { getTestLoginStore, LoginRootState } from "login-init-app";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { loginTestState } from "./LoginTestApp";

interface renderArgs {
  state?: Partial<LoginRootState>;
  options?: Omit<RenderOptions, "wrapper">;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const store = getTestLoginStore(args.state || loginTestState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <MemoryRouter initialEntries={args.routes}>{children}</MemoryRouter>
      </ReduxIntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// mirror some exports from old Enzyme testing helper
export { loginTestState };
// override render method
export { render };
