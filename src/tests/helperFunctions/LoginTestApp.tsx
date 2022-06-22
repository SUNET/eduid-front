import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, ReactWrapper } from "enzyme";
import { createMemoryHistory } from "history";
import { LoginRootState, loginStore } from "login-init-app";
import { initialState as loginInitialState } from "login/redux/slices/loginSlice";
import React from "react";
import { Router } from "react-router";
import { initialState as configInitialState } from "reducers/LoginConfig";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

export const loginTestHistory = createMemoryHistory();

export const loginTestState: LoginRootState = {
  config: {
    ...configInitialState,
    next_url: "http://localhost/next",
    mfa_auth_idp: "https//swedenconnect.idp/",
    eidas_url: "http://eidas.docker",
    csrf_token: "csrf-token",
  },
  login: {
    ...loginInitialState,
    ref: "e0367c25-3853-45a9-806",
    tou: { available_versions: ["1999-v1"] },
  },
  app: { is_loaded: true, loading_data: false, request_in_progress: false },
  notifications: undefined as any,
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  resetPassword: undefined as any,

  // config: {
  //   ...configInitialState,
  //   is_configured: true,
  // },
  // login: loginInitialState,
  // form: undefined as any,
  // intl: { locale: "en", messages: {} },
  // notifications: {},
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
}

export function setupComponent({ component, store, overrides }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    store = fakeStore({ overrides });
  }
  const wrapper = mount(
    <ReduxIntlProvider store={store}>
      <Router history={loginTestHistory}>{component}</Router>
    </ReduxIntlProvider>
  );
  return wrapper;
}
