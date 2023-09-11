import { combineReducers } from "redux";
import { intlReducer } from "slices/Internationalisation";
import { notificationsSlice } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import configSlice from "slices/SignupConfig";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  signup: signupSlice.reducer,
});

export default eduIDApp;
