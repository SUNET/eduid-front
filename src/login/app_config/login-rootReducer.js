import { combineReducers } from "redux";
import notificationsReducer from "../components/Notifications/Notifications_reducer";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";
import initReducer from "../app_init/init_reducer";
import appReducer from "../components/App/App_reducer";
import loginReducer from "../components/LoginApp/LoginForm/LoginForm_reducer";
import resetPasswordReducer from "../redux/reducers/resetPasswordReducer";

const eduIDLoginApp = combineReducers({
  config: initReducer,
  app: appReducer,
  login: loginReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  resetPassword: resetPasswordReducer
});

export default eduIDLoginApp;
