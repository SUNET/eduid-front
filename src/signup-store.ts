import { notificationsSlice } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { combineReducers } from "redux";
import { intlReducer } from "./reducers/Internationalisation";
import configSlice from "./reducers/SignupConfig";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  signup: signupSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
