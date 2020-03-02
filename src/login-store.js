import { combineReducers } from "redux";

import notificationsReducer from "reducers/Notifications";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";

import loginReducer from "login/LoginMain/LoginMain_reducer";
import initResetFormReducer from "login/InitResetForm/InitResetForm_reducer";
import resettingReducer from "login/Resetting/Resetting_reducer";
import doResetReducer from "login/DoReset/DoReset_reducer";


const eduIDLoginApp = combineReducers({
  config: loginReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  reset: initResetFormReducer,
  resetting: resettingReducer,
  do_reset: doResetReducer,
});

export default eduIDLoginApp;
