/*
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import eduIDApp from "./dashboard-store";
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const dashboardStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// The same thing again, for use in tests
export function getTestDashboardStore(preloadedState: Partial<DashboardRootState>) {
  const testStore = configureStore({
    reducer: eduIDApp,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardAppDispatch = typeof dashboardStore.dispatch;
