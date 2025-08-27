import { configureStore } from "@reduxjs/toolkit";
import { eduIDApi } from "apis/common";
import authnMiddleware from "middleware/AuthnMiddleware";
import csrfTokenMiddleware from "middleware/CsrfTokenMiddleware";
import notifyAndDispatch from "middleware/notify-middleware";
import { reAuthnMiddleware } from "middleware/ReAuthnMiddleware";
import logger from "redux-logger";
import eduIDApp from "./eduid-store";

/* setup middlewares */
const middlewares = [
  notifyAndDispatch,
  eduIDApi.middleware,
  csrfTokenMiddleware,
  authnMiddleware.middleware,
  reAuthnMiddleware.middleware];
if (process.env.NODE_ENV !== "production") {
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
