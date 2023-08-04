import { combineReducers } from "redux";
import { notificationsSlice } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { intlReducer } from "./slices/Internationalisation";
import configSlice from "./slices/SignupConfig";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  signup: signupSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
