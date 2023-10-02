import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { ResetPasswordGlobalStateProvider } from "components/ResetPassword/ResetPasswordGlobalState";
import type { InitialEntry } from "history";
import { LoginRootState, getTestLoginStore } from "login-init-app";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { initialState as loginInitialState } from "slices/Login";
import { initialState as configInitialState } from "slices/LoginConfig";
import { initialState as resetPasswordInitialState } from "slices/ResetPassword";

export const loginTestState: LoginRootState = {
  config: {
    ...configInitialState,
    next_url: "http://localhost/next",
    mfa_auth_idp: "https://swedenconnect.idp/",
    eidas_service_url: "http://eidas.docker",
    reset_password_url: "/reset-password-url/",
    csrf_token: "csrf-token",
    login_base_url: "/",
    // default to being in 'configured' state, since only the test of
    // the splash screen is ever interested in the opposite
    is_configured: true,
    debug: true,
  },
  login: loginInitialState,
  app: { is_loaded: true, loading_data: false, request_in_progress: false },
  notifications: undefined as any,
  intl: { locale: "en", messages: {} },
  resetPassword: resetPasswordInitialState,
};

interface renderArgs {
  state?: Partial<LoginRootState>;
  options?: Omit<RenderOptions, "wrapper">;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const store = getTestLoginStore(args.state || loginTestState);
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ResetPasswordGlobalStateProvider>
        <ReduxIntlProvider store={store}>
          <MemoryRouter initialEntries={args.routes}>{children}</MemoryRouter>
        </ReduxIntlProvider>
      </ResetPasswordGlobalStateProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...args.options });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
