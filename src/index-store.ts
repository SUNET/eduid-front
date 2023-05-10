import { signupSlice } from "reducers/Signup";
import { combineReducers } from "redux";
import configSlice from "./login/redux/reducers/errorsMainReducer";
import { intlReducer } from "./reducers/Internationalisation";
import { notificationsSlice } from "./reducers/Notifications";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  signup: signupSlice.reducer,
});

export default eduIDApp;
