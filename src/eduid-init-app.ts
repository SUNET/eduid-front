import { configureStore } from "@reduxjs/toolkit";
import { csrfTokenMiddleware } from "middleware/CsrfTokenMiddleware";
import logger from "redux-logger";
import { eduIDApi } from "services/api";
import eduIDApp from "./eduid-store";
import notifyAndDispatch from "./middleware/notify-middleware";

/* setup middlewares */
const middlewares = [notifyAndDispatch, eduIDApi.middleware, csrfTokenMiddleware];
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
