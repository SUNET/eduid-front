/*
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import { configureStore } from "@reduxjs/toolkit";
import { history } from "components/SignupMain";
import { routerMiddleware } from "react-router-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import notifyAndDispatch from "./notify-middleware";
import rootSaga from "./signup-root-saga";
import eduIDApp from "./signup-store";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history), notifyAndDispatch, logger];

export const signupStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type SignupRootState = ReturnType<typeof signupStore.getState>;
export type SignupAppDispatch = typeof signupStore.dispatch;
