import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, dashboardStore } from "dashboard-init-app";
import { mount, ReactWrapper } from "enzyme";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import { initialState as initialChangePasswordState } from "reducers/ChangePassword";
import { initialState as initialConfigState } from "reducers/DashboardConfig";
import { initialState as initialEmailsState } from "reducers/Emails";
import { initialState as initialNinsState } from "reducers/Identities";
import { initialState as initialLadokState } from "reducers/Ladok";
import { initialState as initialLetterProofingState } from "reducers/LetterProofing";
import { initialState as initialLookupMobileProofingState } from "reducers/LookupMobileProofing";
import { initialState as initialNotificationsState } from "reducers/Notifications";
import { initialState as initialPersonalDataState } from "reducers/PersonalData";
import { initialState as initialPhonesState } from "reducers/Phones";
import { initialState as initialSecurityState } from "reducers/Security";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

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
  identities: initialNinsState,
  openid_freja_data: undefined as any,
  personal_data: initialPersonalDataState,
  phones: initialPhonesState,
  letter_proofing: initialLetterProofingState,
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
