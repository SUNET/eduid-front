import { configureStore } from "@reduxjs/toolkit";
import { eduIDApi } from "apis/common";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import logger from "redux-logger";
import eduIDApp from "./eduid-store";

/* setup middlewares */
const middlewares = [eduIDApi.middleware, navigatorCredentialsApi.middleware];
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  middlewares.push(logger);
}

export const eduidStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// The same thing again, for use in tests
export function getTestEduIDStore(preloadedState: Partial<EduIDAppRootState>) {
  const testStore = configureStore({
    reducer: eduIDApp,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type EduIDAppRootState = ReturnType<typeof eduidStore.getState>;
export type EduIDAppDispatch = typeof eduidStore.dispatch;
