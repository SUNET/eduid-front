import React from "react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, dashboardStore } from "dashboard-init-app";
import { mount, ReactWrapper } from "enzyme";
import { initialState as initialEmailsState } from "reducers/Emails";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { NinState } from "reducers/Nins";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { initialState as initialConfigState } from "reducers/DashboardConfig";
import { initialState as initialChangePasswordState } from "reducers/ChangePassword";
import { initialState as initialNinsState } from "reducers/Nins";
import { initialState as initialPhonesState } from "reducers/Phones";
import { initialState as initialLookupMobileProofingState } from "reducers/LookupMobileProofing";
import { initialState as initialPersonalDataState } from "reducers/PersonalData";
import { initialState as initialLetterProogingState } from "reducers/LetterProofing";
import { initialState as initialSecurityState } from "reducers/Security";
import { initialState as initialNotificationsState } from "reducers/Notifications";
import { initialState as initialLadokState } from "reducers/Ladok";

export const dashboardTestHistory = createMemoryHistory();

export const dashboardTestState: DashboardRootState = {
  config: {
    ...initialConfigState,
    csrf_token: "csrf-token",
  },
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  chpass: initialChangePasswordState,
  emails: initialEmailsState,
  groups: undefined as any,
  invites: undefined as any,
  openid_data: undefined as any,
  lookup_mobile: initialLookupMobileProofingState,
  nins: initialNinsState,
  openid_freja_data: undefined as any,
  personal_data: initialPersonalDataState,
  phones: initialPhonesState,
  letter_proofing: initialLetterProogingState,
  notifications: initialNotificationsState,
  account_linking: undefined as any,
  security: initialSecurityState,
  ladok: initialLadokState,
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
 * Get a real Dashboard store that can be used with e.g. tests fetching data from backends using thunks,
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
