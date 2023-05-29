<<<<<<< HEAD
=======
import loginSlice from "login/redux/slices/loginSlice";
import { signupSlice } from "reducers/Signup";
>>>>>>> e8d0f065b (Add getLoginConfig)
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
  login: loginSlice.reducer,
});

export default eduIDApp;
