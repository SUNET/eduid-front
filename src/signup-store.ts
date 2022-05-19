import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import { intlReducer } from "./reducers/Internationalisation";
import { captchaSlice } from "./reducers/Captcha";
import signupConfigReducer from "./reducers/SignupMain";
import emailReducer from "./reducers/Email";
import verifiedReducer from "./reducers/CodeVerified";
import { notificationsSlice } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";

const eduIDApp = combineReducers({
  config: signupConfigReducer,
  //email: emailReducer,
  signup: signupSlice.reducer,
  //  captcha: captchaSlice.reducer,
  verified: verifiedReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
