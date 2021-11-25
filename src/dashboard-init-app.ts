/*
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import { routerMiddleware } from "react-router-redux";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./dashboard-root-saga";
import eduIDApp from "./dashboard-store";
import notifyAndDispatch from "./notify-middleware";
import logger from "redux-logger";

import { history } from "components/DashboardMain";
import { configureStore } from "@reduxjs/toolkit";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history), notifyAndDispatch, logger];

export const dashboardStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardAppDispatch = typeof dashboardStore.dispatch;
