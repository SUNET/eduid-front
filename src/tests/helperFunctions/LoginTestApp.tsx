import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, ReactWrapper } from "enzyme";
import type { InitialEntry } from "history";
import { LoginRootState, loginStore } from "login-init-app";
import { initialState as loginInitialState } from "login/redux/slices/loginSlice";
import { initialState as resetPasswordInitialState } from "login/redux/slices/resetPasswordSlice";
import { MemoryRouter } from "react-router-dom";
import { initialState as configInitialState } from "reducers/LoginConfig";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

export const loginTestState: LoginRootState = {
  config: {
    ...configInitialState,
    next_url: "http://localhost/next",
    mfa_auth_idp: "https://swedenconnect.idp/",
    eidas_url: "http://eidas.docker",
    reset_password_url: "/reset-password-url/",
    csrf_token: "csrf-token",
    base_url: "/",
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

export type LoginStoreType = typeof loginStore;

interface FakeStoreArgs {
  state?: LoginRootState;
  overrides?: Partial<LoginRootState>;
}

/**
 * Get a MockStore for testing Login components.
 * MockStores are good for testing that actions are dispatched, but actions aren't _really_ dispatched
 * and the reducers states are never _really_ updated. Use realStore() for tests that want to exercise
 * such things.
 */
export function fakeStore(args: FakeStoreArgs = {}): MockStoreEnhanced<LoginRootState> {
  const middlewares = [thunk];
  const store = createMockStore<LoginRootState>(middlewares);
  return store({ ...(args.state || loginTestState), ...args.overrides });
}

/**
 * Get a real Login store that can be used with e.g. tests fetching data from backends using thunks,
 * and updating component state or redux state.
 */
export function realStore(): LoginStoreType {
  return loginStore;
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: LoginStoreType;
  overrides?: Partial<LoginRootState>;
  routes?: InitialEntry[];
}

export function setupComponent({ component, store, overrides, routes }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    store = fakeStore({ overrides });
  }
  const wrapper = mount(
    <ReduxIntlProvider store={store}>
      <MemoryRouter initialEntries={routes}>{component}</MemoryRouter>
    </ReduxIntlProvider>
  );
  return wrapper;
}
