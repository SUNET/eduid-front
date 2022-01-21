import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { intlReducer } from "./reducers/Internationalisation";
import errorsReducer from "./login/redux/reducers/errorsMainReducer";
import { notificationsSlice } from "./reducers/Notifications";

const eduIDApp = combineReducers({
  router: routerReducer,
  config: errorsReducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
