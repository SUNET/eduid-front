import { configureStore } from "@reduxjs/toolkit";
import { eduIDApi } from "apis/common";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import logger from "redux-logger";
import eduIDApp from "./eduid-store";

/* setup middlewares */
const middlewares = [eduIDApi.middleware, navigatorCredentialsApi.middleware];
if (import.meta.env.MODE !== "production" && import.meta.env.MODE !== "test") {
  middlewares.push(logger);
}

export const eduidStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: import.meta.env.MODE !== "production",
});

// The same thing again, for use in tests
export function getTestEduIDStore(preloadedState: Partial<EduIDAppRootState>) {
  const testStore = configureStore({
    reducer: eduIDApp,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: import.meta.env.MODE !== "production",
    preloadedState,
  });
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type EduIDAppRootState = ReturnType<typeof eduidStore.getState>;
export type EduIDAppDispatch = typeof eduidStore.dispatch;
