import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import { routerReducer } from "react-router-redux";
import errorsReducer from "reducers/ErrorsMain";
import notificationsReducer from "reducers/Notifications";

const eduIDApp = combineReducers({
  router: routerReducer,
  config: errorsReducer,
  intl: intlReducer,
  notifications: notificationsReducer
});

export default eduIDApp;
