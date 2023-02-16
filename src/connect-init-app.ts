import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import eduIDApp from "./connect-store";
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const connectStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ConnectRootState = ReturnType<typeof connectStore.getState>;
export type ConnectAppDispatch = typeof connectStore.dispatch;
