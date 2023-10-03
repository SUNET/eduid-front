import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { SignupGlobalStateProvider } from "components/Signup/SignupGlobalState";
import type { InitialEntry } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SignupRootState, getTestSignupStore } from "signup-init-app";
import { initialState as signupInitialState } from "slices/Signup";
import { initialState as configInitialState } from "slices/SignupConfig";

export const signupTestState: SignupRootState = {
  config: {
    ...configInitialState,
    recaptcha_public_key: "",
    reset_password_service_url: "http://dummy.example.com/reset-password",
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
  options?: Omit<RenderOptions, "wrapper">;
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
      <SignupGlobalStateProvider>
        <ReduxIntlProvider store={store}>
          <MemoryRouter initialEntries={args.routes}>{children}</MemoryRouter>
        </ReduxIntlProvider>
      </SignupGlobalStateProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
