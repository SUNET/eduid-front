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
});

export default eduIDApp;
