import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { appLoadingSlice } from "reducers/AppLoading";
import intlSlice from "reducers/Internationalisation";
import { notificationsSlice } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import configSlice from "reducers/SignupConfig";
import logger from "redux-logger";
import eduIDApp from "./index-store";
import notifyAndDispatch from "./notify-middleware";

/* setup to run the combined sagas */
const middlewares = [notifyAndDispatch, logger];

export const indexStore = configureStore({
  reducer: eduIDApp,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// The same thing again, for use in tests
export function getTestStore(preloadedState: Partial<IndexRootState>) {
  const testStore = configureStore({
    reducer: {
      config: configSlice.reducer,
      app: appLoadingSlice.reducer,
      login: loginSlice.reducer,
      notifications: notificationsSlice.reducer,
      intl: intlSlice.reducer,
      resetPassword: resetPasswordSlice.reducer,
      signup: signupSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return testStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IndexRootState = ReturnType<typeof indexStore.getState>;
export type IndexAppDispatch = typeof indexStore.dispatch;
