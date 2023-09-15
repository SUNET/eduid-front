import { combineReducers } from "redux";
import { appLoadingSlice } from "slices/AppLoading";
import { intlReducer } from "slices/Internationalisation";
import loginSlice from "slices/Login";
import { notificationsSlice } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { signupSlice } from "slices/Signup";
import configSlice from "slices/SignupConfig";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  signup: signupSlice.reducer,
  login: loginSlice.reducer,
  app: appLoadingSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
});

export default eduIDApp;
