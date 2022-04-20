import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./errors-root-saga";
import eduIDApp from "./errors-store";
import { history } from "./login/components/SwamidErrors/ErrorsMain";
import notifyAndDispatch from "./notify-middleware";
import logger from "redux-logger";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history), notifyAndDispatch, logger];

export const errorsStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ErrorsRootState = ReturnType<typeof errorsStore.getState>;
export type ErrorsAppDispatch = typeof errorsStore.dispatch;
