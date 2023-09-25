import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import eduIDApp from "./eduid-store";
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const eduidStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// The same thing again, for use in tests
export function getTestIndexStore(preloadedState: Partial<EduIDAppRootState>) {
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
