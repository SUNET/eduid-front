import { combineReducers } from "redux";
import configSlice from "slices/ErrorsMain";
import { intlReducer } from "./slices/Internationalisation";
import { notificationsSlice } from "./slices/Notifications";

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
});

export default eduIDApp;
