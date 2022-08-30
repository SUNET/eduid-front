import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, ReactWrapper } from "enzyme";
import type { InitialEntry } from "history";
import { MemoryRouter } from "react-router-dom";
import { initialState as signupInitialState } from "reducers/Signup";
import { initialState as configInitialState } from "reducers/SignupConfig";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { SignupRootState, signupStore } from "signup-init-app";

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
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  notifications: {},
};

export type SignupStoreType = typeof signupStore;

interface FakeStoreArgs {
  state?: SignupRootState;
  overrides?: Partial<SignupRootState>;
}

/**
 * Get a MockStore for testing Signup components.
 * MockStores are good for testing that actions are dispatched, but actions aren't _really_ dispatched
 * and the reducers states are never _really_ updated. Use realStore() for tests that want to exercise
 * such things.
 */
export function fakeStore(args: FakeStoreArgs = {}): MockStoreEnhanced<SignupRootState> {
  const middlewares = [thunk];
  const store = createMockStore<SignupRootState>(middlewares);
  return store({ ...(args.state || signupTestState), ...args.overrides });
}

/**
 * Get a real Signup store that can be used with e.g. tests fetching data from backends using thunks,
 * and updating component state or redux state.
 */
export function realStore(): SignupStoreType {
  return signupStore;
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: SignupStoreType;
  overrides?: Partial<SignupRootState>;
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
