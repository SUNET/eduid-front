import { combineReducers } from "redux";
import { intlReducer } from "slices/Internationalisation";
import { notificationsSlice } from "slices/Notifications";
import configSlice from "slices/helpMainReducer";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
