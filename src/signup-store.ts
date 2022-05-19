import { routerReducer } from "react-router-redux";
import { notificationsSlice } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import verifiedReducer from "./reducers/CodeVerified";
import { intlReducer } from "./reducers/Internationalisation";
import signupConfigReducer from "./reducers/SignupMain";

const eduIDApp = combineReducers({
  config: signupConfigReducer,
  signup: signupSlice.reducer,
  verified: verifiedReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
