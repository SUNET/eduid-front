import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import eduIDApp from "./errors-store";
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const indexStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IndexRootState = ReturnType<typeof indexStore.getState>;
export type IndexAppDispatch = typeof indexStore.dispatch;
