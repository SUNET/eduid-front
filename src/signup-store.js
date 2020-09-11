import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import captchaReducer from "reducers/Captcha";
import signupReducer from "reducers/SignupMain";
import registerEmailReducer from "./login/redux/reducers/registerEmailReducer";
import verifiedReducer from "reducers/CodeVerified";
import notificationsReducer from "reducers/Notifications";

const eduIDApp = combineReducers({
  config: signupReducer,
  email: registerEmailReducer,
  captcha: captchaReducer,
  verified: verifiedReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  notifications: notificationsReducer
});

export default eduIDApp;
