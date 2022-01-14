import { DashboardRootState, dashboardStore } from "dashboard-init-app";
import { ChangePasswordState } from "reducers/ChangePassword";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";

export const dashboardTestState: DashboardRootState = {
  config: {
    csrf_token: "csrf-token",
  },
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },

  chpass: {} as ChangePasswordState,
  emails: undefined as any,
  groups: undefined as any,
  invites: undefined as any,
  openid_data: undefined as any,
  lookup_mobile: undefined as any,
  nins: undefined as any,
  openid_freja_data: undefined as any,
  personal_data: undefined as any,
  phones: undefined as any,
  letter_proofing: undefined as any,
  notifications: undefined as any,
  account_linking: undefined as any,
  security: undefined as any,
  eidas_data: undefined as any,
  ladok: undefined as any,
};

export type DashboardStoreType = typeof dashboardStore;

export function fakeStore(state: DashboardRootState = dashboardTestState) {
  const middlewares = [thunk];
  const store = createMockStore<DashboardRootState>(middlewares);
  return store(state);
}
