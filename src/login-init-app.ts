import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "login-root-saga";
import appReducer from "login/components/App/App_reducer";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import notifyAndDispatch from "notify-middleware";
import intlSlice from "reducers/Internationalisation";
import { notificationsSlice } from "reducers/Notifications";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import configSlice from "./reducers/LoginConfig";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger, notifyAndDispatch];

export const loginStore = configureStore({
  reducer: {
    config: configSlice.reducer,
    app: appReducer,
    login: loginSlice.reducer,
    notifications: notificationsSlice.reducer,
    intl: intlSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

// The same thing again, for use in tests
export function getTestLoginStore(preloadedState: Partial<LoginRootState>) {
  const testStore = configureStore({
    reducer: {
      config: configSlice.reducer,
      app: appReducer,
      login: loginSlice.reducer,
      notifications: notificationsSlice.reducer,
      intl: intlSlice.reducer,
      resetPassword: resetPasswordSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  sagaMiddleware.run(rootSaga);
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type LoginRootState = ReturnType<typeof loginStore.getState>;
export type LoginAppDispatch = typeof loginStore.dispatch;
