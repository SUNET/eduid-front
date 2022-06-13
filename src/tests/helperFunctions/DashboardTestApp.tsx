import React from "react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, dashboardStore } from "dashboard-init-app";
import { mount, ReactWrapper } from "enzyme";
import { ChangePasswordState } from "reducers/ChangePassword";
import { initialState as emailsInitialState } from "reducers/Emails";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { NinState } from "reducers/Nins";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

export const dashboardTestHistory = createMemoryHistory();

export const dashboardTestState: DashboardRootState = {
  config: {
    csrf_token: "csrf-token",
  },
  form: undefined as any,
  intl: { locale: "en", messages: {} },

  chpass: {} as ChangePasswordState,
  emails: emailsInitialState,
  groups: undefined as any,
  invites: undefined as any,
  openid_data: undefined as any,
  lookup_mobile: undefined as any,
  nins: undefined as any as NinState,
  openid_freja_data: undefined as any,
  personal_data: undefined as any,
  phones: undefined as any,
  letter_proofing: undefined as any,
  notifications: undefined as any,
  account_linking: undefined as any,
  security: undefined as any,
  ladok: undefined as any,
};

export type DashboardStoreType = typeof dashboardStore;

/**
 * Get a MockStore for testing Dashboard components.
 * MockStores are good for testing that actions are dispatched, but actions aren't _really_ dispatched
 * and the reducers states are never _really_ updated. Use realStore() for tests that want to exercise
 * such things.
 */
export function fakeStore(state: DashboardRootState = dashboardTestState): MockStoreEnhanced<DashboardRootState> {
  const middlewares = [thunk];
  const store = createMockStore<DashboardRootState>(middlewares);
  return store(state);
}

/**
 * Get a real Signup store that can be used with e.g. tests fetching data from backends using thunks,
 * and updating component state or redux state.
 */
export function realStore(): DashboardStoreType {
  return dashboardStore;
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: DashboardStoreType;
  overrides?: Partial<DashboardRootState>;
}

export function setupComponent({ component, store, overrides }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    if (overrides) {
      store = fakeStore({ ...dashboardTestState, ...overrides });
    } else {
      store = fakeStore();
    }
  }
  const wrapper = mount(
    <ReduxIntlProvider store={store}>
      <Router history={dashboardTestHistory}>{component}</Router>
    </ReduxIntlProvider>
  );
  return wrapper;
}
