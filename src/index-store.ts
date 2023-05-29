import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { appLoadingSlice } from "reducers/AppLoading";
import { signupSlice } from "reducers/Signup";
import { combineReducers } from "redux";
import { intlReducer } from "./reducers/Internationalisation";
import { notificationsSlice } from "./reducers/Notifications";
import configSlice from "./reducers/SignupConfig";

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
