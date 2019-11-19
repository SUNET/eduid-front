import { combineReducers } from "redux";

import loginReducer from "reducers/LoginMain";
import notificationsReducer from "reducers/Notifications";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";

const eduIDLoginApp = combineReducers({
  app: loginReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer
});

export default eduIDLoginApp;
