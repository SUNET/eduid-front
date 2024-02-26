import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { ResetPasswordGlobalStateProvider } from "components/ResetPassword/ResetPasswordGlobalState";
import { EduIDAppRootState, getTestEduIDStore } from "eduid-init-app";
import type { InitialEntry } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { initialState as accountLinkingInitialState } from "slices/AccountLinking";
import { initialState as changePasswordInitialState } from "slices/ChangePassword";
import { initialState as emailsInitialState } from "slices/Emails";
import { initialState as identityInitialState } from "slices/Identities";
import { initialState as configInitialState } from "slices/IndexConfig";
import { initialState as ladokInitialState } from "slices/Ladok";
import { initialState as letterProofingInitialState } from "slices/LetterProofing";
import { initialState as loginInitialState } from "slices/Login";
import { initialState as lookupMobileInitialState } from "slices/LookupMobileProofing";
import { initialState as personalDataInitialState } from "slices/PersonalData";
import { initialState as phonesInitialState } from "slices/Phones";
import { initialState as resetPasswordState } from "slices/ResetPassword";
import { initialState as securityInitialState } from "slices/Security";
import { initialState as signupInitialState } from "slices/Signup";

export const RESET_PASSWORD_SERVICE_URL = "/reset-password-url/";

export const loginTestState: EduIDAppRootState = {
  config: {
    ...configInitialState,
    next_url: "http://localhost/next",
    mfa_auth_idp: "https://swedenconnect.idp/",
    eidas_service_url: "http://eidas.docker",
    reset_password_service_url: RESET_PASSWORD_SERVICE_URL,
    csrf_token: "csrf-token",
    login_service_url: "/",
    // default to being in 'configured' state, since only the test of
    // the splash screen is ever interested in the opposite
    is_configured: true,
    debug: true,
  },
  login: loginInitialState,
  app: { is_loaded: true, loading_data: false, request_in_progress: false },
  notifications: undefined as any,
  intl: { locale: "en", messages: {} },
  resetPassword: resetPasswordState,
  chpass: changePasswordInitialState,
  emails: emailsInitialState,
  lookup_mobile: lookupMobileInitialState,
  identities: identityInitialState,
  personal_data: personalDataInitialState,
  phones: phonesInitialState,
  letter_proofing: letterProofingInitialState,
  account_linking: accountLinkingInitialState,
  security: securityInitialState,
  ladok: ladokInitialState,
  signup: signupInitialState,
};

interface renderArgs {
  state?: Partial<EduIDAppRootState>;
  options?: Omit<RenderOptions, "wrapper">;
  routes?: InitialEntry[];
}

function render(ui: React.ReactElement, args: renderArgs = {}): RenderResult {
  const store = getTestEduIDStore(args.state || loginTestState);
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
