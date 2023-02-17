import { connectSlice } from "reducers/Connect";
import { combineReducers } from "redux";
import configSlice from "./login/redux/reducers/connectMainReducer";
import { intlReducer } from "./reducers/Internationalisation";
import { notificationsSlice } from "./reducers/Notifications";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  connect: connectSlice.reducer,
});

export default eduIDApp;
