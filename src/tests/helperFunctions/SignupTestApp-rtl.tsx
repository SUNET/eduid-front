import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import type { InitialEntry } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { initialState as configInitialState } from "reducers/LoginConfig";
import { initialState as signupInitialState } from "reducers/Signup";
import { getTestSignupStore, SignupRootState } from "signup-init-app";

export const signupTestState: SignupRootState = {
  config: {
    ...configInitialState,
    recaptcha_public_key: "",
    reset_password_link: "http://dummy.example.com/reset-password",
    // default to being in 'configured' state, since only the test of
    // the splash screen is ever interested in the opposite
    is_configured: true,
    debug: true,
  },
  signup: signupInitialState,
  intl: { locale: "en", messages: {} },
  notifications: {},
};

interface renderArgs {
  state?: Partial<SignupRootState>;
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
  const store = getTestSignupStore(args.state || defaultState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxIntlProvider store={store}>
        <MemoryRouter initialEntries={args.routes}>{children}</MemoryRouter>
      </ReduxIntlProvider>
    );
  }
  console.log("RTL RENDER WITH ARGS ", args);
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
