import { configureStore } from "@reduxjs/toolkit";
import notifyAndDispatch from "notify-middleware";
import logger from "redux-logger";
import { appLoadingSlice } from "slices/AppLoading";
import intlSlice from "slices/Internationalisation";
import loginSlice from "slices/Login";
import configSlice from "slices/LoginConfig";
import { notificationsSlice } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";

/* setup to run the combined sagas */
const middlewares = [logger, notifyAndDispatch];

export const loginStore = configureStore({
  reducer: {
    config: configSlice.reducer,
    app: appLoadingSlice.reducer,
    login: loginSlice.reducer,
    notifications: notificationsSlice.reducer,
    intl: intlSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// The same thing again, for use in tests
export function getTestLoginStore(preloadedState: Partial<LoginRootState>) {
  const testStore = configureStore({
    reducer: {
      config: configSlice.reducer,
      app: appLoadingSlice.reducer,
      login: loginSlice.reducer,
      notifications: notificationsSlice.reducer,
      intl: intlSlice.reducer,
      resetPassword: resetPasswordSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type LoginRootState = ReturnType<typeof loginStore.getState>;
export type LoginAppDispatch = typeof loginStore.dispatch;
