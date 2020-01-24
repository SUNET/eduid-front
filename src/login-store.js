import { combineReducers } from "redux";

import notificationsReducer from "reducers/Notifications";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";

import loginReducer from "login/LoginMain/LoginMain_reducer";
import initResetFormReducer from "login/InitResetForm/InitResetForm_reducer";


const eduIDLoginApp = combineReducers({
  config: loginReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  reset: initResetFormReducer,
});

export default eduIDLoginApp;
