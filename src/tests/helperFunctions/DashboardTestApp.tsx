/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState, dashboardStore } from "dashboard-init-app";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { DashboardConfig, initialState as DashboardInitialConfig } from "reducers/DashboardConfig";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

const bareMinimumTestState: Partial<DashboardRootState> = {
  config: {
    ...DashboardInitialConfig,
    csrf_token: "csrf-token",
  } as DashboardConfig,

  intl: { locale: "en", messages: {} },
};
export const dashboardTestState = bareMinimumTestState as DashboardRootState;

export type DashboardStoreType = typeof dashboardStore;
type DispatchExts = ThunkDispatch<DashboardRootState, void, AnyAction>;

/**
 * Create a fake redux store object, for use in tests. The store object has a dispatch() and a getState() etc.
 * @returns
 */
export function fakeStore(
  state: DashboardRootState = dashboardTestState
): MockStoreEnhanced<DashboardRootState, DispatchExts> {
  const middlewares = [thunk];

  const store = createMockStore<DashboardRootState, DispatchExts>(middlewares);
  return store(state);
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: DashboardStoreType;
  overrides?: Partial<DashboardRootState>;
}

/**
 * Mount `component' in a ReduxIntlProvider, with a fakeStore (optionally initialised with some overrides).
 * @returns
 */
export function setupComponent({ component, store, overrides }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    if (overrides) {
      store = fakeStore({ ...dashboardTestState, ...overrides });
    } else {
      store = fakeStore();
    }
  }
  const wrapper = mount(<ReduxIntlProvider store={store}>{component}</ReduxIntlProvider>);
  return wrapper;
}

/**
 * Convenience function to create a correctly typed DashboardRootState with some overrides for use in tests.
 * @returns
 */
export function createTestState(overrides: Partial<DashboardRootState>): DashboardRootState {
  return { ...dashboardTestState, ...overrides } as DashboardRootState;
}
