import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import captchaReducer from "reducers/Captcha";
import signupReducer from "reducers/SignupMain";
import addEmailReducer from "./login/redux/reducers/addEmailReducer";
import verifiedReducer from "reducers/CodeVerified";
import notificationsReducer from "reducers/Notifications";

const eduIDApp = combineReducers({
  config: signupReducer,
  email: addEmailReducer,
  captcha: captchaReducer,
  verified: verifiedReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsReducer
});

export default eduIDApp;
