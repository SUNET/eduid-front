import { combineReducers } from "redux";
import notificationsReducer from "../components/Notifications/Notifications_reducer";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";
import initReducer from "../app_init/init_reducer";
import appReducer from "../components/App/App_reducer";
import loginSlice from "../redux/slices/loginSlice";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";

const eduIDLoginApp = combineReducers({
  config: initReducer,
  app: appReducer,
  login: loginSlice.reducer,
  notifications: notificationsReducer,
  router: routerReducer,
  form: formReducer,
  intl: intlReducer,
  resetPassword: resetPasswordSlice.reducer,
});

export default eduIDLoginApp;
