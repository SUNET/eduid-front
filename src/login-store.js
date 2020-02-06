import { combineReducers } from "redux";

import notificationsReducer from "reducers/Notifications";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";

import loginReducer from "login/components/LoginMain/LoginMain_reducer";
// import initResetFormReducer from "login/InitResetForm/InitResetForm_reducer";
// import resettingReducer from "login/Resetting/Resetting_reducer";


const eduIDLoginApp = combineReducers({
  config: loginReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  // reset: initResetFormReducer,
  // resetting: resettingReducer,
});

export default eduIDLoginApp;
