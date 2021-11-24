import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import { intlReducer } from "./reducers/Internationalisation";
import captchaReducer from "./reducers/Captcha";
import signupReducer from "./reducers/SignupMain";
import emailReducer from "./reducers/Email";
import verifiedReducer from "./reducers/CodeVerified";
import notificationsReducer from "./reducers/Notifications";

const eduIDApp = combineReducers({
  config: signupReducer,
  email: emailReducer,
  captcha: captchaReducer,
  verified: verifiedReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsReducer,
});

export default eduIDApp;
