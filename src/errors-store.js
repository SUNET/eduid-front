import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { intlReducer } from "./reducers/Internationalisation";
import errorsReducer from "./login/redux/reducers/errorsMainReducer";
import notificationsReducer from "./reducers/Notifications";

const eduIDApp = combineReducers({
  router: routerReducer,
  config: errorsReducer,
  intl: intlReducer,
  notifications: notificationsReducer,
});

export default eduIDApp;
