//import { routerReducer } from "react-router-redux";
import { notificationsSlice } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "./reducers/Internationalisation";
import configSlice from "./reducers/SignupConfig";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  signup: signupSlice.reducer,
  //router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
