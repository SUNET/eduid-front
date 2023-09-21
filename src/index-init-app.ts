import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
<<<<<<< HEAD
import eduIDApp from "./errors-store";
=======
<<<<<<< HEAD
import eduIDApp from "./index-store";
=======
import eduIDApp from "./errors-store";
>>>>>>> befc32532 (Fix conflict)
>>>>>>> 9e6cdfb36 (Fix conflict)
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const indexStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

<<<<<<< HEAD
// The same thing again, for use in tests
export function getTestSignupStore(preloadedState: Partial<IndexRootState>) {
  const testStore = configureStore({
    reducer: eduIDApp,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return testStore;
}

=======
>>>>>>> befc32532 (Fix conflict)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type IndexRootState = ReturnType<typeof indexStore.getState>;
export type IndexAppDispatch = typeof indexStore.dispatch;
